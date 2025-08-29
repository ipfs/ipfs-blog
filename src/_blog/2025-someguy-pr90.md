---
date: 2025-08-28
permalink: /2025-delegated-routing-cached-router/
title: 'Faster Peer-to-Peer Retrieval in Browsers With Caching in the Delegated Routing HTTP Server'
description: 'How caching and active peer probing in the Someguy, the Delegated Routing server accelerates peer-to-peer content retrieval in browsers and mobile applications.'
author: Daniel Norman
header_image: /someguy-cache/cover.png
tags:
  - ipfs
  - someguy
  - performance
  - mobile
  - browsers
  - peer-discovery
  - caching
---

## TL;DR

Last year we shipped a major improvement to [Someguy](https://github.com/ipfs/someguy/pull/90), the HTTP Delegated Routing API for the Amino DHT and IPNI. The update introduced a cached address book and active peer probing for DHT peers. This change considerably increases the ratio of providers with addresses returned, which in turn accelerates peer-to-peer content retrieval in browsers and mobile applications. It's included in the [v0.7.0 release](https://github.com/ipfs/someguy/releases/tag/v0.7.0) of Someguy. Follow along for the full story.

## What is Someguy and why it matters?

[Someguy](https://github.com/ipfs/someguy) is a [Delegated Routing HTTP API](https://specs.ipfs.tech/routing/http-routing-v1/) for IPFS routing requests to the Amino DHT and the IPNI.

Its main purpose is to help IPFS clients find provider peers for CIDs and their network addresses, and expose that as an HTTP API. This is crucial for browsers and mobile applications that need to fetch IPFS content without running a full DHT client, which is often impractical on resource-constrained devices, like mobile phones and web browsers.

A typical Amino DHT client is stateful. It typically opens hundreds of connections, maintains a constantly updated routing table, and opens multiple network operations to find provider and peer records. The problem is that browsers and mobiles are limited in their networking capabilities — both in terms of the transports they can use and the number of connections they can maintain. They also have limited battery and bandwidth, which makes it impractical to run a full DHT client.

Delegated routing allows these devices to query the DHT for content providers in a single HTTP request, rather than requiring them to maintain complex DHT connections themselves.

To make decentralised retrieval possible for content provided to the DHT, Someguy serves as a helper, allowing these devices to query the DHT in a single request and get back a list of peers that have the content they want. This is done over HTTP, which is universally supported by browsers and mobile apps.

The IPFS Foundation provides a public delegated routing endpoint backed by someguy with the URL `https://delegated-ipfs.dev/routing/v1` that is used by [Helia](https://github.com/ipfs/helia/blob/a0cac72e5b440bf7ea7356571b0f244e05c896e0/packages/http/src/utils/libp2p-defaults.ts#L31) by default to accelerate peer-to-peer content retrieval in browsers and mobile applications.

## The role of Someguy in IPFS content retrieval

When Helia or [`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch) fetches content from the IPFS network, it goes through the following process:

1. Helia requests providers for a CID from Someguy: `GET https://delegated-ipfs.dev/routing/v1/providers/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
2. Someguy traverses the Amino DHT and responds with the providers that have the content, _typically_ along with their network addresses.
   - Example response:

```json
{
  "Providers": [
    {
      "Addrs": [
        "/ip4/12.144.75.172/tcp/4001",
        "/ip4/12.144.75.172/udp/4001/quic-v1",
        "/dns4/12-144-75-172.k51qzi5uqu5digdd4g1rmh3ircn34nxsehlp9ep60q96fqubc1t2604u88gin4.libp2p.direct/tcp/4001/tls/ws",
        "/ip4/12.144.75.172/udp/4001/webrtc-direct/certhash/uEiCcNkDjuquRDqyq3hvbp80GeS3joyomKoMjddVSLKdYUw",
        "/ip4/12.144.75.172/udp/4001/quic-v1/webtransport/certhash/uEiAUslaNVe83tW3hkVALwQUiKieQjzs77YXb4mLpo2yfJA/certhash/uEiAr6d8yeHt21X9jvRoHGwdtuLm_hDFHra0atSSCK-79HQ"
      ],
      "ID": "12D3KooWFxAMbz588VcN4Ae69nMiGvVscWEyEoA6A3fcJxhSzBFM",
      "Schema": "peer"
    }
  ]
}
```

3. Browser/mobile app connects directly to those peers and fetches the content

**The performance equation is straightforward**: the faster Someguy can respond with working peer addresses, the quicker browsers and mobile apps can start fetching content peer-to-peer. Every millisecond saved in routing queries directly translates to faster content delivery.

## The problem: provider records without peer addresses

Before PR #90, Someguy's would often respond with provider records that included peer IDs but not their network addresses. This meant that clients had to make an additional requests to Someguy to get the actual addresses of the peers.

For example, unlike the response above, Someguy would return a response like this:

```json
{
  "Providers": [
    {
      "Addrs": [],
      "ID": "12D3KooWFxAMbz588VcN4Ae69nMiGvVscWEyEoA6A3fcJxhSzBFM",
      "Schema": "peer"
    }
  ]
}
```

### But why are providers returned without peer addresses?

The go-libp2p and go-libp2p-kad-dht libraries have a couple of important constants that control how long provider and peer addresses are cached in memory:

- `DefaultProvideValidity = 48 * time.Hour`: TTL for provider records mapping between a multihash (from the CID) and peer IDs.
- `DefaultProviderAddrTTL = 24 * time.Hour`: TTL for the **addresses** of those providers. Therse addresses are returned in DHT RPC requests alongside the provider record. After the addresses expires, clients require an extra lookup, to find the multiaddress associated with the returned peer ID.
- `RecentlyConnectedAddrTTL = time.Minute * 15`: Time during which a peer's address is kept in memory after a peer disconnects. Applies to any libp2p peer that has been recently connected to.

In other words, DHT servers can return provider records without peer addresses. This happens in the time window 24 hours after the provider record is published until it expires. This was designed to ensure that provider records are not returned with stale addresses. Since reproviding typically happens every 24 hours, DHT servers should always have fresh addresses for providers, but reality is messier.

## The solution: caching peer addresses

[PR #90](https://github.com/ipfs/someguy/pull/90) introduces several mechanisms that ensures Someguy always returns provider records with fresh peer addresses or doesn't return the provider record at all, thereby saving clients additional peer routing requests for unroutable peers.

This is achieved through a combination of: a cached address book, active peer probing, and a cached router which augments results with addresses and filters out undialable peers.

As it turns out, caching peer addresses is pretty cheap, especially if you consider that the work to discover them will be done anyway in subsequent requests. So we end up reducing the total request rates at the cost of increasing memory consumption slightly.

### Cached address book

The [new cached address book](https://github.com/ipfs/someguy/blob/6cb37a4da3ea3379a89a184335c51370b8abb48b/cached_addr_book.go) wraps the go-libp2p [memoryAddrBook](https://github.com/libp2p/go-libp2p/blob/master/p2p/host/peerstore/pstoremem/addr_book.go) and has the following properties:

- **48-hour cache**: Stores peer addresses for 48 hours, matching the DHT provider record expiration.
- **1M peer capacity**: This sets an upper limit on memory usage, allowing Someguy to handle a large number of peers without excessive memory consumption.
- **Memory-efficient**: Uses LRU eviction to keep the most relevant peers readily available
- **Event driven cache maintennce**: Caches peers by subscribing to the libp2p event bus and caches after successful libp2p identify events, rather than actively polling the DHT for peer addresses, thereby only caching peers based on actual delegated routing requests.

### Active peer probing in the background

Rather than serving stale addresses, Someguy now tests peer connectivity in the background:

- **Background verification**: Every 15 minutes, tests whether cached peer addresses still work
- **Exponential backoff**: Stops wasting time on persistently offline peers (1h → 2h → 4h → 48h delays)
- **Concurrent testing**: Tests up to 20 peer connections simultaneously
- **Selective probing**: Only tests peers that haven't been verified recently

### Cached router: better responses for HTTP clients

The `cachedRouter` (`server_cached_router.go`) uses the cached address book to augment the routing results for both peer and provider requests with a non-blocking iterator:

1. **Cache-first responses**: Returns verified peer addresses immediately when available
2. **Background resolution**: If no cached addresses exist, looks up fresh ones without blocking the response
3. **Streaming results**: Sends working peer addresses as soon as they're found
4. **Fallback handling**: Omits peers that can't be reached rather than sending bad addresses

All these improvements are enabled by default in Someguy v0.7.0 and later (see the [`SOMEGUY_CACHED_ADDR_BOOK`](https://github.com/ipfs/someguy/blob/main/docs/environment-variables.md#someguy_cached_addr_book) env variable for how to disable it).

## Measuring impact

To measure the impact of these changes, we deployed two instances of someguy, one with the cached address book and active probing enabled, and the other with it disabled.

For the instance with the cached address book enabled, we realised that it took some time for the cached address book to warm up, as peers are only cached [following mututal authentication and running the identify protocol](https://github.com/ipfs/someguy/blob/316dbc27f3cfc4df1276a7afcff33f5b4f05688d/cached_addr_book.go#L176-L195) that would be initiated as a downstream effect of incoming content and peer routing requests, rather than active network crawling.

To determine when the cache was sufficiently warm, we observed the cached address book size [metric](https://github.com/ipfs/someguy/blob/316dbc27f3cfc4df1276a7afcff33f5b4f05688d/cached_addr_book.go#L80-L85) and waited until it stabilised, which takes around 12 hours, at which point the cache had about 30k peers. This metric continues growing gradually —at a much slower rate— eventually stagnating at ~60k peers, which correlates with metrics [measured by ProbeLab](https://probelab.io/ipfs/kpi/#client-vs-server-node-estimate).

![cached address book size](../assets/someguy-cache/cached_addr_book_growth.png)

We then piped the last 500k CID that were requested from the public ipfs.io gateway through each instance's `/routing/v1/providers/[CID]` endpoint at a rate of 100 req/second concurrently, and examined the following metrics:

- [Cache hit rates](#cache-hit-rate)
- [HTTP request latency](#http-request-latency-and-success-rate)
- [HTTP success rates](#http-request-latency-and-success-rate)

Note that the list of 500k CIDs was not deduplicated, this was to reflect real-world usage patterns, where popular CIDs are requested more frequently.

### Cache hit rate

Cache hit rates are the most important metric to measure the impact of this work, as it indicates how often clients get working peer addresses directly from from the DHT lookup, and if not, how often they are served from cache or require a fresh lookup.

While this metric is only available with the cached address book enabled, it indicates the percentage of requests of requests that return without peer addresses.

In the experiment with the warmed cache, we observed the following results:

|                  | Lookups   | Percentage |
| ---------------- | --------- | ---------- |
| **Cache Used**   | 1,287,619 | 34.4%      |
| **Cache Unused** | 2,455,120 | 65.6%      |
| **Total**        | 3,742,739 | 100.0%     |

Of the 34.4% of requests that had no peer addresses, we observed the following cache hit rates:

**Cache Hits**: 82.9%
**Cache Misses**: 17.1%

In other words, of the all requests that would previously require an additional peer lookup, 82.9% are now served from cache 🎉.

### HTTP request latency and success rate

Here we examine the P95 (95th percentile) latency for HTTP requests to `/routing/v1/providers/[CID]` grouped by response code (200 vs 404) and the success rates measured by the ratio of 200 to 404 responses.

It's worth noting that we didn't expect significant reduction in latency or error rates as a result of the cache, because the cached address book is only used to augment results from the DHT, and doesn't change the underlying DHT query process.

| Scenario                 | 200s P95 | 404s P95 | Success Rate |
| ------------------------ | -------- | -------- | ------------ |
| **Cache Disabled**       | 1.913s   | 7.345ss  | 52.0%        |
| **Cache Enabled (cold)** | 9.368s   | 7.812s   | 53.7%        |
| **Cache Enabled (warm)** | 1.346s   | 7.459s   | 57.2%        |

### Key insights

- When the cache is warmed, the P95 latency for 200 responses drops to 1.346s from 2.707s when the cache is disabled! Moreover, success rates improve to 57.2% from 52.0%. It's not entirely clear why this is the case — the Amino DHT is permissionless and undergoes natural churn, and it could be that during the time we ran the experiments, some providers went offline. Another hypothesis is that the active probing in the background accelrates DHT lookups, thereby reducing the latency of DHT lookup. This is an area for further investigation.
- With the cached address book enabled but not yet warmed, the P95 latency for 200 responses increases significantly to 9.368s. This is far from ideal, though is likely the result of the [accelerated DHT client](https://github.com/ipfs/someguy/blob/316dbc27f3cfc4df1276a7afcff33f5b4f05688d/docs/environment-variables.md#someguy_dht) initiating a full DHT crawl on startup, which increases the load on the libp2p host and saturating libp2p's connection manager limits. This is an area for further investigation and improvement, though reliminary experiemnts suggest that even waiting 15 minutes after startup to start piping the requests results in a major reduction in latency. benefits outweigh the costs within 12 hours at most.

<!-- - Running a test 29.8 at 14:50 with cache ENABLED, 15 minutes after starting the instance.
  - Running a test 28.8 at 16:25 with cache disabled, 15 minutes after starting the instance
  - Before:
  ```
  ubuntu@someguy-sv15:~$ curl -s http://127.0.0.1:8190/debug/metrics/prometheus | grep delegated_routing_server_http_request_duration_seconds_bucket | grep -v ipns | grep -v peer\-id
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="0.1"} 126
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="0.5"} 1530
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="1"} 1929
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="2"} 1968
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="5"} 1973
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="8"} 1981
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="10"} 3050
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="20"} 3119
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="30"} 3124
delegated_routing_server_http_request_duration_seconds_bucket{code="200",handler="/routing/v1/providers/{cid}",method="GET",service="",le="+Inf"} 3128
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="0.1"} 64
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="0.5"} 554
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="1"} 830
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="2"} 864
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="5"} 944
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="8"} 1002
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="10"} 1018
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="20"} 1022
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="30"} 1040
delegated_routing_server_http_request_duration_seconds_bucket{code="404",handler="/routing/v1/providers/{cid}",method="GET",service="",le="+Inf"} 1106
``` -->

## Configuration

The cached address book and active probing can be configured through the following environment variables:

- [SOMEGUY_CACHED_ADDR_BOOK](https://github.com/ipfs/someguy/blob/main/docs/environment-variables.md#someguy_cached_addr_book)
- [SOMEGUY_CACHED_ADDR_BOOK_ACTIVE_PROBING](https://github.com/ipfs/someguy/blob/main/docs/environment-variables.md#someguy_cached_addr_book_active_probing)
- [SOMEGUY_CACHED_ADDR_BOOK_RECENT_TTL](https://github.com/ipfs/someguy/blob/main/docs/environment-variables.md#someguy_cached_addr_book_recent_ttl)

See the [docs](https://github.com/ipfs/someguy/blob/main/docs/environment-variables.md) for more details.

## Metrics

When the cached address book and active are enabled, Prometheus metrics to monitor the cache and active probing, which can be found in the [metrics docs](https://github.com/ipfs/someguy/blob/main/docs/metrics.md#someguy-caches)

## More than just one cache

This blog post is primarily focused on the caching of peer addresses within Someguy, but it's worth noting that additional caching layers are relevant in the context of the public delegated routing endpoint `https://delegated-ipfs.dev/routing/v1`

- **CDN cache**
  Caches responses from Someguy at the edge, close to users, based on the `Cache-Control` headers set by Someguy.
- **Someguy Cache-Control headers**
  Someguy sets the `Cache-Control` headers as follows:

### Cache-Control header values

- **public**
  Allows the response to be cached by any cache (browser, proxy, CDN, etc.).

- **max-age**

  - When there are results: **5 minutes** (300 seconds)
  - When there are no results: **15 seconds**
    Defines how long the response is considered “fresh” before a cache must revalidate.

- **stale-while-revalidate**
  - **48 hours** (172,800 seconds)
    Allows caches to serve a stale response while they asynchronously fetch a fresh one from the origin.
- **stale-if-error**
  - **48 hours** (same as above)
    Lets caches serve a stale response if the origin server is unavailable (e.g., timeout, 500 error).

### How stale-while-revalidate (SWR) works

When cached data becomes stale (past `max-age`), instead of making the user wait, the cache:

1. **Immediately serves the stale response** to the client.
2. **Fetches a fresh version in the background** from the origin.
3. **Updates the cache** with the new response for future requests.

This gives fast responses (users see something right away) while keeping data reasonably up to date behind the scenes.

## Accelerating peer-to-peer retrieval for browsers and mobile devices

This enhancement is part of the larger effort to enable peer-to-peer retrieval practical even for resource constrained environments like web browsers and mobile devices.

Peer caching and active probing are included starting in the [v0.7.0 release](https://github.com/ipfs/someguy/releases/tag/v0.7.0) of Someguy.

By ensuring that someguy only returns dialable providers with addresses, we save clients an additional peer routing request, and reduces the time to first byte, thereby accelerating peer-to-peer content retrieval in browsers and mobile applications.
