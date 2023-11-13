---
title: 'Self-hosting /routing/v1 Endpoint for Delegated IPFS Routing Needs'
description: 'TODO'
author: Henrique Dias
date: 2023-11-03
permalink: '/self-hosting-routing-v1-endpoint/'
tags:
  - 'community'
  - 'HTTP'
---

This was initially planned as a talk for [IPFS Connect](https://istanbul2023.ipfsconnect.org/) in Istanbul. Unfortunately, I was not able to go, but that’s no reason to let this talk go to waste. In this blog post, we will dive a bit into the `/routing/v1` endpoint, what is, how it can be used, as well as which libraries are available.

## What is the Delegated Routing API?

First of all, what is this `/routing/v1` thing? The Delegated Routing API is a vendor-agnostic HTTP API for content and peer routing, as well as IPNS naming resolution. It is an open API and its specifications are [available](https://specs.ipfs.tech/routing/http-routing-v1/). By using HTTP, it maximizes the compatibility with standard tools, such as state of the art caching tools. Additionally, by decoupling routing from retrieval services, we enable smarter backend scaling, reducing costs. It also enables large routing providers to announce more data than the DHT could handle.

In addition, an HTTP Delegated Routing API is important for light IPFS implementations. These implementations can then offload the routing requirements to an external server that speaks a common language, HTTP. Moreover, it helps with dial limits and throttling present in web browsers, as well as redundancy.

## Delegated Routing and Kubo

[Kubo](https://github.com/ipfs/kubo) is the first implementation of IPFS, written in Go. At the moment, it is also the most widely used IPFS implementation. It can currently act both as a Delegated Routing V1 server, or client, taking both advantage of others exposing their APIs, as well as providing its API to others.

### Kubo as a `/routing/v1` client

Kubo can connect to other `/routing/v1` endpoints in order to discover content providers, other peers, as well as resolve IPNS names. It can be configured to use different endpoints for the different needs: content, peer, naming.

### Kubo as a `/routing/v1` server

Kubo can expose its own `/routing/v1` endpoint for others to use. For example, light clients can connect to this endpoint for any routing need without having to connect to the Amino DHT themselves. This allows these light clients to offload all this processing to another service. It can be quickly enabled with the following command:

```console
$ ipfs config --json Gateway.ExposeRoutingAPI true
```

****Bonus: reducing cost with HTTP caching****

https://github.com/protocol/bifrost-infra/issues/2758#issuecomment-1716761794 - @lidel

```nginx
location /routing/v1 {
  proxy_pass http://your_backend_server;
  proxy_cache my_cache;

  proxy_cache_valid 404 5s; 
  proxy_cache_valid 200 1m;

  proxy_connect_timeout 15s;
  proxy_cache_use_stale updating error timeout http_500 http_502 http_503 http_504;
  proxy_cache_background_update on;
  proxy_cache_lock on;
  ...
}
```

## Delegated Routing and Boxo

[Boxo](https://github.com/ipfs/boxo) is a set of reference libraries for building IPFS applications and implementations in Go. Kubo is one of its users. It includes the building blocks for writing your own `/routing/v1` endpoint, as well as a client to conncet to other endpoints.

### Boxo as a `/routing/v1` client

**Documentation:** [pkg.go.dev/github.com/ipfs/boxo/routing/http/client](https://pkg.go.dev/github.com/ipfs/boxo/routing/http/client)

**Example**: [github.com/ipfs/boxo/tree/main/examples/routing/delegated-routing-client](https://github.com/ipfs/boxo/tree/main/examples/routing/delegated-routing-client)

### Boxo as a `/routing/v1` server

**Documentation:** [pkg.go.dev/github.com/ipfs/boxo/routing/http/server](https://pkg.go.dev/github.com/ipfs/boxo/routing/http/server)

**Example**: [github.com/ipfs/kubo/blob/master/core/corehttp/routing.go](https://github.com/ipfs/kubo/blob/master/core/corehttp/routing.go)

## Meet `someguy`

- CLI tool built using Boxo: [github.com/ipfs-shipyard/someguy](https://github.com/ipfs-shipyard/someguy)
- As /routing/v1 server: proxies Amino DHT and cid.contact requests.
- As /routing/v1 client: ask for providers, peers, IPNS records.

## ****There’s also JavaScript-y things 🪩✨****

Server: @helia/routing-v1-http-api-server

Client: @helia/routing-v1-http-api-client