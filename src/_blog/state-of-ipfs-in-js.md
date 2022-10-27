---
date: 2022-10-27
permalink: /state-of-ipfs-in-js/
title: State of IPFS in JS
description: An update on the state of IPFS development in JavaScript, the history of how we got here, and how we plan to improve the IPFS in JS story in the coming year.
author: Alex Potsides, Steve Loeppky, Marcin Rataj, Daniel Norman, Elliot Lee
header_image: /state-of-ipfs-in-js.png
tags:
  - ipfs
  - js-ipfs
---

- [🧘‍♀️ Purpose](#️purpose)
- [📇 Names and Terms](#names-and-terms)
- [⏳ IPFS JS Development History](#ipfs-js-development-history)
- [🔀 Historical IPFS JS Usage Patterns](#historical-ipfs-js-usage-patterns)
  - [Remote control of Kubo](#remote-control-of-kubo)
    - [👍 Pros](#-pros)
    - [👎 Cons](#-cons)
  - [js-ipfs in a Node.js context](#js-ipfs-in-a-nodejs-context)
    - [👍 Pros](#-pros-1)
    - [👎 Cons](#-cons-1)
  - [js-ipfs in a Browser context](#js-ipfs-in-a-browser-context)
    - [👍 Pros](#-pros-2)
    - [👎 Cons](#-cons-2)

## 🧘‍♀️ Purpose

JavaScript (and its typed variant TypeScript) is the most ubiquitous programming language with the largest community of developers. Our goal is to enable all those developers to reap the benefits of IPFS and do so productively.

This blog entry intends to give an update on what is happening with IPFS development in JS. It’s been a while since we’ve done this, so there’s a lot to cover. This is the first update of more to come. It isn’t a full roadmap, but we aim to give clarity to some of the history of IPFS development in JS, decisions by some maintainers on what to do going forward, and ways you can help.

## 📇 Names and Terms

To help with this update, the following names and terms will be used to aid with clarity:

- [Kubo](https://github.com/ipfs/kubo/) – This project was formerly known as _go-ipfs_. See [here](https://github.com/ipfs/kubo/issues/8959) for more info.
- js-ipfs - This is the long-standing IPFS implementation written in JS. As described below, we will be deprecating it after Pomegranate is released. We’re currently not planning to rename this implementation [like we did with Kubo](https://github.com/ipfs/ipfs/issues/470) given its limited lifespan.
- [Pomegranate](https://github.com/ipfs/pomegranate) - This is a [to-be-created IPFS implementation in JS](https://github.com/ipfs/pomegranate/issues/2) that is discussed below. The final name is TBD (to be determined), and you can track the naming effort [here](https://github.com/ipfs/pomegranate/issues/3). While it will use many of the underlying libraries of js-ipfs, e.g., [js-libp2p](https://github.com/libp2p/js-libp2p) and [js-ipfs-bitswap](https://github.com/ipfs/js-ipfs-bitswap)) it is a separate project with a different API.
- IPFS-in-JS - This refers broadly to the development of IPFS using the JavaScript and TypeScript languages. It doesn’t mean the “js-ipfs” project or “Pomegranate”.
- Delegates nodes - These are nodes that expose the `[/api/v0/dht/*` endpoints of the Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-dht-findpeer) for delegated routing. Because **js-ipfs** nodes don’t have the DHT enabled by default –and wouldn’t make good DHT servers in browsers anyways–, they need the help of **delegates** nodes to resolve DHT queries.
- Preload nodes - These are nodes that expose the `/api/v1/refs` [endpoint of the Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-refs) which can be called so that the remote node will fetch CIDs (but not pin). This is necessary to ensure that blocks that are added in the browser are *preloaded* onto a long-running IPFS node so that it’s made available to the rest of the network. Preload nodes garbage collect those blocks after a period.

## ⏳ IPFS JS Development History

The js-ipfs project started in 2014 and sought to mirror the functionality and API of Kubo (then called go-ipfs). This manifested in the concept of the JS [_Core API_](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api), which was effectively a conversion of the [Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/) into JavaScript. There were multiple implementations of this interface including:

- [ipfs-core](https://www.npmjs.com/package/ipfs-core): JavaScript native implementation of IPFS functionality.
- [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client): an implementation that delegates out with RPC HTTP calls, and thus could be used to control and interact with a Kubo daemon or js-ipfs daemon.

This effectively had Kubo and js-ipfs’ development awkwardly interlinked. You would find support for certain functionality in Kubo that wasn’t supported in js-ipfs, and js-ipfs would often be held back in experimenting on a feature because the change wouldn’t get added to the JS Core API without it also being implemented in Kubo.

In addition to interlinking with the API and design choices of Kubo, the top-level js-ipfs project followed a similar project structure to Kubo of being a kitchen sink of interaction options with:

1. Daemon to be able to run js-ipfs as a standalone process
2. A CLI to the core implementation
3. Two RPC client and server implementations:
   1. RPC-over-HTTP API that matched Kubo
   2. gRPC-over-websockets API for bidirectional streaming
4. [HTTP Gateway](https://docs.ipfs.tech/reference/http/gateway/) server (though it lagged behind Kubo and did not support the latest specs for things like subdomain isolation and [verifiable block/CAR responses](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval))

This “kitchen sink” aspect was also antithetical to the “JS way” of being lean and modular. For example, by importing js-ipfs, you always get MFS, IPNS, etc. even if they don’t use them, which leads to bigger bundles and more dependencies with more attack vectors.

> “… You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.“ — Joe Armstrong, creator of Erlang progamming language

This is unlike the more flexible js-libp2p model where you can extend the capabilities of the node by configuring additional modules.

## 🔀 Historical IPFS JS Usage Patterns

Given the flexible nature and multiple runtime support of JavaScript, several usage patterns emerged over the years. With the development history above, the IPFS network and protocols were accessed using JavaScript primarily with the following approaches.

### Remote control of Kubo

With this approach, a long-running Kubo node be controlled by [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client) via Kubo's RPC API.

Based on npm download metrics, this is by far the most popular approach with [~10x more npm downloads](https://npm-stat.com/charts.html?package=ipfs-core&package=ipfs-http-client&package=ipfs-grpc-client&from=2021-10-18&to=2022-10-18).

#### 👍 Pros

- Gives access to a full-featured IPFS implementation in Kubo with active maintenance and feature development.

#### 👎 Cons

- Requires bringing a long-running Kubo daemon into one’s architecture and potentially a reverse proxy like nginx for TLS termination. The Kubo daemon potentially becomes a black box to debug and tune for a JS development shop.
- Requires [proper security to protect which Kubo RPC API endpoints are exposed to the public internet](https://docs.ipfs.tech/reference/kubo/rpc/#getting-started).

### js-ipfs in a Node.js context

With this approach, you either embed [ipfs-core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core) directly in your application by importing and instantiating the IPFS object or accessing a shared js-ipfs daemon. With the former approach, the Node.js process of the application would also open IPFS peer-to-peer connections.

#### 👍 Pros

- Having the full application stack in JavaScript makes for a simpler architecture and easier debugging.

#### 👎 Cons

- Historically lacking in some functionality that was only more recently added like a working DHT client and server.
- The API is large and hard to grasp. It contains many methods translated directly from the Kubo CLI, designed to be quick to type but often redundant.

### js-ipfs in a Browser context

Because browsers impose constraints on the number of network connections opened and storage space used by each browser tab, they don’t make for reliable IPFS nodes. For this reason, many of the responsibilities of an IPFS node which include: routing, retrieval, and providing have all been handled in a delegated fashion in the browser.

Unfortunately, the default delegation setup in js-ipfs today is overly complicated and not well-engineered. Specifically, this happens via **preload and delegate nodes** hosted by Protocol Labs that support secure WebSockets (WSS) that browsers can safely and reliably connect to.

For delegated routing/retrieval, js-ipfs asks the **delegate nodes** to perform DHT operations on its behalf using the Kubo RPC API(`/v0/dht/*`). The delegate nodes query the DHT for peers and content providers, and then they fetch the content, which they provide for the browser nodes that are connected to them.

For delegated providing from the browser, js-ipfs contacts the preload node using Kubo RPC API (`/v0/refs`) to preload the entire dag from the browser. The preload node fetches the data from the browser over Bitswap and then advertises it on the DHT.

> **Note:** Preloading could be understood as ephemeral pinning. The CIDs' data is fetched by a preload node for a short period during which it is available to the IPFS network, and after which it is garbage collected.

js-ipfs nodes running in the browser can connect to other js-ipfs nodes via the WebRTC Star transport, but this requires a [centralized signaling server](https://github.com/libp2p/js-libp2p-webrtc-star) to do the initial handshake and cannot be used to connect to Kubo nodes as support for this transport has never materialized.

**TODO: in this section we should say something about browser-to-browser connections with WebRTC**

#### 👍 Pros

- It’s useful and works for multi-user apps with small amounts of ephemeral data transmitted in real time.

#### 👎 Cons

- Availability and performance are heavily dependent on non-trivial centralized infrastructure:
  - If PL shuts down the hardcoded HTTP endpoints at [`preload.ipfs.io`](http://preload.ipfs.io/), js-ipfs delegation is basically dead, unless someone also runs their own Kubo instance somewhere in the cloud with a TLS cert for HTTPS and sets it up as a preload in js-ipfs config. This is a non-trivial ask and a steep barrier to adoption.
  - This was designed as a temporary *"hack"* anticipating a proper libp2p protocol. Unfortunately, years later we’re still doing the original Kubo RPC `/v0/refs` hack.
- Inefficient design:
  - It doesn’t scale well because certain preload nodes get disproportionate traffic due to hardcoding in old js-ipfs versions.
  - Preload via `/v0/refs` is [very wasteful](https://github.com/ipfs/js-ipfs/issues/3510).
