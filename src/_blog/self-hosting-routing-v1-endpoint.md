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

This was initially planned as a talk for [IPFS Connect](https://istanbul2023.ipfsconnect.org/) in Istanbul. Unfortunately, I did not go for a few reasons, but that’s no reason to let this talk go to waste. In this blog post, we will dive a bit into the `/routing/v1` endpoint, what is, how it can be used, as well as which libraries are available.

## ****What is the Delegated Routing API?****

- Vendor-agnostic HTTP API for content routing, peer routing, naming
- HTTP = maximized compatibility with standard tools
- Enables large routing providers
- Enables offloading for light IPFS implementations

## ****Have you got standards?****

🔥[xkcd.com/927](https://xkcd.com/927/) 🔥

🪩 [specs.ipfs.tech/routing/http-routing-v1](https://specs.ipfs.tech/routing/http-routing-v1/) 🪩

## What is Kubo?

- The first and most widely used IPFS implementation, written in Go.
- Can act both as a Delegated Routing V1 server, or client, taking both advantage of others exposing their APIs, and providing their API to others.

🔥[github.com/ipfs/kubo](https://github.com/ipfs/kubo) 🔥

### ****Kubo as a `/routing/v1` client**

- Connects to other /routing/v1 endpoints to help discover content providers, peers, and resolve IPNS names.
- Can use different endpoints for different needs (content, peer, naming).

## ****Kubo as a `/routing/v1` server**

- Exposes its own /routing/v1 endpoint for others to use.
- Light clients can connect to this endpoint for any routing needs without having to connect to the Amino DHT themselves.

**Can be enabled via:**

```
$ ipfs config --json Gateway.ExposeRoutingAPI true
```

****Bonus: reducing cost with HTTP caching****

https://github.com/protocol/bifrost-infra/issues/2758#issuecomment-1716761794 - @lidel

## What is Boxo?

- Set of reference libraries for building IPFS applications and implementations in Go.
- Includes building blocks for writing your own /routing/v1 endpoint.
- Includes client to connect to other /routing/v1 endpoints.

### ****Boxo as a `/routing/v1` client**

**Documentation:** [pkg.go.dev/github.com/ipfs/boxo/routing/http/client](https://pkg.go.dev/github.com/ipfs/boxo/routing/http/client)

**Example**: [github.com/ipfs/boxo/tree/main/examples/routing/delegated-routing-client](https://github.com/ipfs/boxo/tree/main/examples/routing/delegated-routing-client)

### ****Boxo as a `/routing/v1` server**

**Documentation:** [pkg.go.dev/github.com/ipfs/boxo/routing/http/server](https://pkg.go.dev/github.com/ipfs/boxo/routing/http/server)

**Example**: [github.com/ipfs/kubo/blob/master/core/corehttp/routing.go](https://github.com/ipfs/kubo/blob/master/core/corehttp/routing.go)

## Meet `someguy`

- CLI tool built using Boxo: [github.com/ipfs-shipyard/someguy](https://github.com/ipfs-shipyard/someguy)
- As /routing/v1 server: proxies Amino DHT and cid.contact requests.
- As /routing/v1 client: ask for providers, peers, IPNS records.

## ****There’s also JavaScript-y things 🪩✨****

Server: @helia/routing-v1-http-api-server

Client: @helia/routing-v1-http-api-client