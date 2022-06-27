---
title: A Practical Explainer for IPFS Gateways - Part 2
description: 'Learn tips and tricks for using IPFS gateways in real-world applications - debugging, performance and more'
author: Daniel Norman
date: 2022-06-09
permalink: '/2022-06-09-practical-explainer-ipfs-gateways-2/'
translationKey: ''
header_image: '/2022-ipfs-gateways-2.png'
tags:
  - gateways
---

The Interplanetary File System (IPFS) is a peer-to-peer protocol for storing and accessing **files and websites**. As a distributed **peer-to-peer** protocol, it's fundamentally different from the HTTP protocol. With the help of IPFS Gateways, it's possible to reap the benefits of IPFS using the HTTP protocol.

This blog post is the second of a two-part series about IPFS gateways:

[The first part](https://blog.ipfs.io/2022-06-09-practical-explainer-ipfs-gateways-1/) was mostly theoretical, covering the principles behind IPFS, the challenges with the client-server model, how IPFS approaches these challenges with peer-to-peer networking and content addressing, the relationship between IPFS and HTTP(S), and finally an introduction to IPFS HTTP gateways and resolution styles.

In this second part, you will learn practical tips and tricks for using IPFS gateways in real-world applications:

- Common challenges with IPFS gateways
- Differences between IPFS gateways
- IPFS gateway request lifecycle
- Best practices
- Debugging CID retrievability
- Caching and garbage collection
- Pinning, pinning services
- Improving CID access performance and reliability from the IPFS network

By the end of this article, you should be equipped with the knowledge and tools to use IPFS gateways confidently and systematically debug when you face problems.

## Common challenges with IPFS HTTP Gateways

One of the questions most frequently asked by developers using IPFS in our various community channels is **why CIDs aren't retrievable via public IPFS gateways** or in other cases, why are they slow to load.

For example, when you first upload content to your local IPFS node, it's not uncommon to get [504 Gateway Time-out](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) when requesting the CID from a public gateway.

IPFS gateways abstract the distributed aspect of IPFS while giving you a familiar HTTP interface, but that doesn't mean that complexity is gone.

From a high level, when faced with challenges (either slowness or timeouts) fetching a CID from an IPFS gateway, it's typically related to one of the following:

- The IPFS gateway.
- The provider of the CID, i.e. the IPFS node pinning the CID.
- Content providing: the mechanism by which providers for a given CID advertise it to the distributed hash table (DHT).
- Network latency between the client and the IPFS gateway or the gateway and the provider.

Given all of these factors, it's difficult giving blanket advice. This is where understanding the lifecycle of a CID request to an IPFS gateway is useful as it will allow debugging problems quickly.

## IPFS gateway request lifecycle

When a request for a CID reaches an IPFS gateway, the gateway checks whether the CID is cached locally before attempting to retrieve it from the network.

If the CID is in the gateway's cache, the gateway will respond to the HTTP request with the CID's content.

> **Note:** Cache here can be either an HTTP cache or the local caching by the IPFS node.

If the CID is not in the cache, the CID has to be retrieved from the IPFS network. This is a two-step process:

1. **Content discovery/routing**: asking direct peers and querying the [DHT](https://docs.ipfs.io/concepts/dht/#distributed-hash-tables-dhts) to find the [network addresses](https://multiformats.io/multiaddr/) of peers providing the CID (referred to as _providers_).
2. **Content retrieval**: connecting to one of the providers, fetching the CID's content, and streaming the response to the client.

> **Note:** This assumes that the gateway is separate from the IPFS node providing the CID. However, in many cases they are the same, e.g., when you are running a self-hosted IPFS node to which you pin CIDs that is also a gateway

In summary, the lifecycle of an IPFS gateway request can be split into three parts:

- Cache
- Content discovery
- Content retrieval

## Pinning, caching, and garbage collection

Existing IPFS [implementations](https://ipfs.io/#install) have caching mechanism that will keep CIDs local for a short time after the node has fetched it from the network, but these objects may get garbage-collected periodically.

Pinning is the mechanism that allows you to tell IPFS to **always** store a given CID — by default on your local node. In addition to local pinning, you can also pin your CIDs to [remote pinning services](https://docs.ipfs.io/how-to/work-with-pinning-services/).

In other words, caching is the mechanism by which CID is kept around on the node for a short period until garbage-collected while pinning is a deliberate choice you make to keep the CID stored on the node.

Caching is the reason why requesting a CID for the first time from a gateway can take time while subsequent requests are much faster.

**Pinning services** are services that run IPFS nodes for you and allow you to upload files and pin CIDs, making them available to the IPFS network. Examples include [web3.storage](https://web3.storage/), [Pinata](https://www.pinata.cloud/), [nft.storage](https://nft.storage/), [filebase](https://filebase.com/blog/introducing-support-for-ipfs-backed-by-decentralized-storage/), and [Infura](https://infura.io/product/ipfs).

One thing to note about caching is that it is often multi-layered. In addition to caching done by the IPFS node, it's common to add another layer of HTTP caching based on HTTP cache-control headers. Since CIDs are immutable, there's a wide range of caching opportunities, e.g. putting a CDN or an edge cache in front of an IPFS gateway node.

**Garbage collection** is the process by which an IPFS node frees up storage by deleting data that is no longer required. To read more about garbage collection, [check out the following article](https://blog.logrocket.com/guide-ipfs-garbage-collection/).

## Public vs. dedicated vs. self-hosted gateways

In its simplest form, a gateway is an IPFS node that also accepts HTTP requests for CIDs.

But the reality of IPFS gateways is nuanced, as there are different flavors of IPFS gateways: public, dedicated, and self-hosted.

**Public gateways** allow anyone to use HTTP to fetch CIDs from the IPFS network.

You can find public gateway operators in the [public gateway checker](https://ipfs.github.io/public-gateway-checker/) and check whether they are online and the latency from your location.

Beware that many of the public gateways are provided on a best-effort basis without any SLA. Public gateways are prone to abuse which is why many of them implement request limits.

**Dedicated gateways** such as [Infura](https://blog.infura.io/post/introducing-ipfs-dedicated-gateways), and [Pinata](https://medium.com/pinata/announcing-dedicated-ipfs-gateways-60f599949ce) are services that combine **CID pinning** with an IPFS gateway and guarantee the availability of your pinned CIDs via their gateway.

Another rather unique example of a public gateway is [nftstorage.link](https://nftstorage.link/) which races CID requests across multiple public gateways to provide the fastest response in addition to caching reponses at the edge (find the [source code on GitHub](https://github.com/nftstorage/nftstorage.link/tree/main/packages/edge-gateway#high-level-architecture)).

[NFT.Storage Gateway SuperHot perma-cache](https://nft.storage/blog/post/2022-05-24-superhot-gateway-announcement/) is a paid feature recently launched by the NFT.Storage team, which is similar to dedicated gateways. It gives you the ability to preload your CIDs in all of Cloudflare's 270 points of presence, giving a lightning-fast read experience via the closest CDN location to your users

Finally, a **self-hosted gateway** refers to an IPFS node(s) configured as a gateway that is hosted by you, either on your local machine or in the cloud.

Choosing from the three approaches depends on your requirements, if performance is critical, self-hosting an IPFS node and gateway or using a dedicated gateway is the way to go.

### Best practices for self-hosted IPFS gateways

If you are running an IPFS node that is also configured as an IPFS gateway, consider applying the following best practices:

- Set up [peering](https://docs.ipfs.io/how-to/peering-with-content-providers/) with the pinning services that pin your CIDs.
- Ensure that you are correctly returning HTTP cache headers to the client if the IPFS gateway node is behind a reverse-proxy
- Put a CDN like Cloudflare in front of the IPFS gateway

## Debugging CID retrievability

When trying to debug why a CID isn't retrievable from a gateway, the most useful thing to do is to narrow down the root cause.

It can be either a problem with **content routing**: finding provider records for the CID in the DHT, or a problem with **content retrieval**: connecting to the peer from the provider records in the DHT.


To determin follow the following steps to find out whether the problem is

https://ipfs-check.on.fleek.co/

Using [kubo (formerly known as go-ipfs)](https://github.com/ipfs/go-ipfs)

<!-- ### Tip: avoid hardcoding public gateway domains in your application -->

## Advertising provider records - accelerated DHT

## Tip: Pin your CIDs to multiple IPFS nodes

Drawing on the principles laid out above, it's sensible to pin your CIDs to multiple IPFS nodes to ensure reliable availability and resilience to failures of nodes and network partitions.

With IPFS, increasing redundancy is typically done by [pinning](https://docs.ipfs.io/concepts/persistence/#persistence-versus-permanence) your CIDs on multiple IPFS nodes or pinning services.

As a general rule of thumb, the more nodes pinning a CID in the IPFS network, the better the chances of it being retrievable.

To make pinning easier, there's a vendor-agnostic [Pinning Service OpenAPI Specification](https://ipfs.github.io/pinning-services-api-spec/) that is [already supported by many IPFS node implementations, client libraries, and existing pinning services](https://github.com/ipfs/pinning-services-api-spec#adoption).

Using this remote pinning API, you can [implement pinning to multiple services](https://docs.ipfs.io/how-to/work-with-pinning-services/#use-an-existing-pinning-service) as part of your workflow for uploading immutable data to IPFS.

If you're not running an IPFS node, you can start by uploading a file to one service and then using the returned CID to pin it to other services.

### Tip: Use a custom domain that you control as your IPFS gateway

Imagine the following scenario: you deploy your web app to IPFS which contains media with absolute URLs to a public gateway experiencing an outage. For example, your web app displays the image with an absolute path to the CID: https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.infura-ipfs.io.

You may be able to reach your media using a different gateway, but since the web app's content is immutable, the links to the IPFS gateway which is down will not load.

For these reasons, it's sensible to use a domain within your control to route HTTP traffic to a gateway. This approach potentially gives you the flexibility to implement additional performance optimizations.

Practically speaking, this can be implemented using several approaches depending on your willingness to run infrastructure:

- Point a domain you control, e.g., `*.ipfs.yourdomain.io` point to a reverse proxy like nginx which will proxy requests to a public gateway, allowing you to switch public gateways if there's downtime.
- Use [Cloudflare workers](https://workers.cloudflare.com/) to implement a light weight proxy to IPFS gateways.

## Summary

TODO
