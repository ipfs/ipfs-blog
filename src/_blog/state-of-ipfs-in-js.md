---
date: 2022-10-27
permalink: /state-of-ipfs-in-js/
title: State of IPFS in JS
description: An update on the state of IPFS development in JavaScript, the history of how we got here, and how we plan to improve the IPFS in JS story in the coming year.
author: Alex Potsides, Marcin Rataj, Steve Loeppky, Daniel Norman, Elliot Lee
header_image: /state-of-ipfs-in-js.png
tags:
  - ipfs
  - js-ipfs
  - libp2p
  - js-libp2p
---

## 🧘‍♀️ Purpose <!-- omit from toc -->

JavaScript (and its typed variant TypeScript) is the most ubiquitous programming language with the largest community of developers. Our goal is to enable all those developers to reap the benefits of IPFS and do so productively.

This blog entry intends to give an update on what is happening with IPFS development in JS. It’s been a while since we’ve done this, so there’s a lot to cover. This is the first update of more to come. It isn’t a full roadmap, but we aim to give clarity to some of the history of IPFS development in JS, decisions by some maintainers on what to do going forward, and ways you can help.

- [📇 Names and Terms](#%F0%9F%93%87-names-and-terms)
- [⏳ IPFS JS Development History](#%E2%8F%B3-ipfs-js-development-history)
- [🔀 Historical IPFS JS Usage Patterns](#%F0%9F%94%80-historical-ipfs-js-usage-patterns)
  - [Remote Control of Kubo](#remote-control-of-kubo)
  - [js-ipfs in a Node.js Context](#js-ipfs-in-a-nodejs-context)
  - [js-ipfs in a Browser Context](#js-ipfs-in-a-browser-context)
- [🧑‍💻 IPFS-in-JS Development the Last 18 Months](#%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB-ipfs-in-js-development-the-last-18-months)
- [💡 The Future of IPFS-in-JS in 2022 and 2023](#%F0%9F%92%A1-the-future-of-ipfs-in-js-in-2022-and-2023)
  - [Go and JS Development are Decoupling](#go-and-js-development-are-decoupling)
  - [Seize and Leverage New Browser-Friendly P2P Transports](#seize-and-leverage-new-browser-friendly-p2p-transports)
  - [Support Fully Speced Delegated Routing Protocols and Endpoints](#support-fully-speced-delegated-routing-protocols-and-endpoints)
  - [PL Delegate and Preload Nodes Will Be Shutting Down](#pl-delegate-and-preload-nodes-will-be-shutting-down)
  - [Release Helia in 2023](#release-helia-in-2023)
  - [Pause js-ipfs Maintenance Once Helia Is Released](#pause-js-ipfs-maintenance-once-helia-is-released)
  - [A New Name Is Coming](#a-new-name-is-coming)
  - [Doc Updates Galore](#doc-updates-galore)
- [🗺 Timeline](#%F0%9F%97%BA-timeline)
- [🤝 Ways You Can Help](#%F0%9F%A4%9D-ways-you-can-help)

## 📇 Names and Terms

To help with this update, the following names and terms will be used to aid with clarity:

- [Kubo](https://github.com/ipfs/kubo) – This project was formerly known as _go-ipfs_. See [here](https://github.com/ipfs/kubo/issues/8959) for more info.
- [js-ipfs](https://github.com/ipfs/js-ipfs) - This is the long-standing IPFS implementation written in JS. As described below, we will be deprecating it after Helia is released. We’re currently not planning to rename this implementation [like we did with Kubo](https://github.com/ipfs/ipfs/issues/470) given its limited lifespan.
- [Helia](https://github.com/ipfs/Helia) - This is a [to-be-created IPFS implementation in JS](https://github.com/ipfs/helia/issues/2) that is discussed below. The final name is TBD (to be determined), and you can track the naming effort [here](https://github.com/ipfs/helia/issues/3). While it will use many of the underlying libraries of js-ipfs (e.g., [js-libp2p](https://github.com/libp2p/js-libp2p), [js-ipfs-bitswap](https://github.com/ipfs/js-ipfs-bitswap)), it is a separate project with a different API.
- IPFS-in-JS - This refers broadly to the development of IPFS using the JavaScript and TypeScript languages. It doesn’t mean the “js-ipfs” project or “Helia”.
- Delegate nodes - These are nodes that expose the [`/api/v0/dht/*` endpoints of the Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-dht-findpeer) for delegated routing. Because **js-ipfs** nodes don’t have the DHT enabled by default and wouldn’t make good DHT servers in browsers anyways, they need the help of **delegate** nodes to resolve DHT queries.
- Preload nodes - These are nodes that expose the `/api/v0/refs` [endpoint of the Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-refs) which can be called so that the remote node will fetch CIDs (but not pin). This is necessary to ensure that blocks that are added in the browser are *preloaded* onto a long-running IPFS node so that it’s made available to the rest of the network. Preload nodes garbage collect those blocks after a period.

## ⏳ IPFS-in-JS Development History

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

### Remote Control of Kubo

With this approach, a long-running Kubo node be controlled by [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client) via Kubo's RPC API.

Based on npm download metrics, this is by far the most popular approach with [~10x more npm downloads](https://npm-stat.com/charts.html?package=ipfs-core&package=ipfs-http-client&package=ipfs-grpc-client&from=2021-10-18&to=2022-10-18).

#### 👍 Pros

- Gives access to a full-featured IPFS implementation in Kubo with active maintenance and feature development.

#### 👎 Cons

- Requires bringing a long-running Kubo daemon into one’s architecture and potentially a reverse proxy like nginx for TLS termination. The Kubo daemon potentially becomes a black box to debug and tune for a JS development shop.
- Requires [proper security to protect which Kubo RPC API endpoints are exposed to the public internet](https://docs.ipfs.tech/reference/kubo/rpc/#getting-started).

### js-ipfs in a Node.js Context

With this approach, you either embed [ipfs-core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core) directly in your application by importing and instantiating the IPFS object or accessing a shared js-ipfs daemon. With the former approach, the Node.js process of the application would also open IPFS peer-to-peer connections.

#### 👍 Pros

- Having the full application stack in JavaScript makes for a simpler architecture and easier debugging.

#### 👎 Cons

- Historically lacking in some functionality that was only more recently added like a working DHT client and server.
- The API is large and hard to grasp. It contains many methods translated directly from the Kubo CLI, designed to be quick to type but often redundant.

### js-ipfs in a Browser Context

Because browsers impose constraints on the number of network connections opened and storage space used by each browser tab, they don’t make for reliable IPFS nodes. For this reason, many of the responsibilities of an IPFS node which include: routing, retrieval, and providing have all been handled in a delegated fashion in the browser.

Unfortunately, the default delegation setup in js-ipfs today is overly complicated and not well-engineered. Specifically, this happens via preload and delegate nodes hosted by Protocol Labs that support secure WebSockets (WSS) that browsers can safely and reliably connect to.

For delegated routing/retrieval, js-ipfs asks the delegate nodes to perform DHT operations on its behalf using the Kubo RPC API (`/v0/dht/*`). The delegate nodes query the DHT for peers and content providers, and then they fetch the content, which they provide for the browser nodes that are connected to them.

For delegated providing from the browser, js-ipfs contacts the preload node using Kubo RPC API (`/v0/refs`) to preload the entire dag from the browser. The preload node fetches the data from the browser over Bitswap and then advertises it on the DHT.

> **Note:** Preloading could be understood as ephemeral pinning. The CIDs' data is fetched by a preload node for a short period during which it is available to the IPFS network, and after which it is garbage collected.

js-ipfs nodes running in the browser can connect to other js-ipfs nodes via the WebRTC Star transport, but this requires a [centralized signaling server](https://github.com/libp2p/js-libp2p-webrtc-star) to do the initial handshake and cannot be used to connect to Kubo nodes as support for this transport has never materialized.

#### 👍 Pros

- It’s useful and works for multi-user apps with small amounts of ephemeral data transmitted in real-time.
- Even though js-ipfs with WebRTC requires a centralized signaling server and is not the [ideal long-term solution](https://github.com/libp2p/js-libp2p/issues/385), it enables direct browser-to-browser communication (after the initial [SDP manifest](https://webrtchacks.com/sdp-anatomy/) is exchanged over signaling server).



#### 👎 Cons

- Availability and performance are heavily dependent on non-trivial centralized infrastructure:
  - If PL shuts down the hardcoded HTTP endpoints at [`preload.ipfs.io`](http://preload.ipfs.io/), js-ipfs delegation is dead, unless someone also runs their own Kubo instance somewhere in the cloud with a TLS cert for HTTPS and sets it up as a preload in js-ipfs config. This is a non-trivial ask and a steep barrier to adoption.
  - This was designed as a temporary _"hack"_ anticipating a proper libp2p protocol. Unfortunately, years later we’re still doing the original Kubo RPC `/v0/refs` hack.
- Inefficient design:
  - It doesn’t scale well because certain preload nodes get disproportionate traffic due to hardcoding in old js-ipfs versions.
  - Preload via `/v0/refs` is [very wasteful](https://github.com/ipfs/js-ipfs/issues/3510).
- Not specified or adopted by other implementations: the WebRTC Star transport is only implemented in js-libp2p and neither WebRTC Star nor the delegate/preload APIs are specified.

## 🧑‍💻 IPFS-in-JS Development the Last 18 Months

The last 18 months on the JS front have been spent on:

1. General maintenance of the project including mostly maintaining parity between the JS Core API with Kubo.
2. Modernizing js-ipfs and js-libp2p to TypeScript and ESM only. 😅
3. Improving security and performance of js-libp2p given its criticality for other projects outside of IPFS such as Ethereum Lodestar. For example, a set of [DoS and eclipse attack mitigations](https://docs.libp2p.io/reference/dos-mitigation/) were added.
4. Adding a working DHT client/server implementation to js-libp2p. (Yes, in a NodeJS context you can read from and write to the public IPFS DHT.)
5. Expanding connectivity options of IPFS-in-JS implementations. Notably, we [introduced a WebTransport transport](https://github.com/libp2p/specs/tree/master/webtransport) and are adding a [new WebRTC transport](https://github.com/libp2p/specs/pull/412) that does not require a centralized signaling server to enable both browser-based IPFS nodes to dial Kubo nodes directly and browser-to-browser connectivity. (This is discussed more below.)

At this point, we have a solid peer-to-peer library in js-libp2p that can be built upon, and many lessons learned for how to better progress with Javascript/Typescript in a world of [multiple IPFS implementations](https://docs.ipfs.tech/basics/ipfs-implementations/).

## 💡 The Future of IPFS-in-JS in 2022 and 2023

With all the background of IPFS-in-JS over the past covered, this section will transition into our practical plans for 2022 and 2023.

### Go and JS Development are Decoupling

We never had full compatibility between Kubo and js-ipfs, we don’t think we can, and we don’t think it’s worth investing more down this path. At least for the implementations maintained by [Protocol Labs’ EngRes (Engineering & Research) group](https://pl-strflt.notion.site/PL-EngRes-Public-b5086aea86ed4f81bc7d0721c6935e1e), the Go and JS implementations will diverge and develop the APIs that are best for their respective user bases.

In practical terms, this translates to:

1. ipfs-http-client will remain the RPC-over-HTTP API for controlling js-ipfs (you can also use ipfs-grpc-client over WebSockets). The current js-ipfs RPC APIs will be maintained until js-ipfs support ceases (discussed below).
2. With investment in Helia, a new RPC API for Helia will emerge.
3. We won’t test that ipfs-http-client has compatibility with recent versions of Kubo.
4. If you want to control a Kubo node via JS, use the Kubo-specific library [js-kubo-rpc-client](https://github.com/ipfs/js-kubo-rpc-client) (api).

### Seize and Leverage New Browser-Friendly P2P Transports

We are transitioning to a world where browsers can connect to other libp2p nodes (including other browsers) without Central Authority TLS certs thanks to new transports like **WebTransport** and **WebRTC**. See [connectivity.libp2p.io](http://connectivity.libp2p.io) for more details.

This means browser nodes have more optionality to which long-running IPFS nodes they delegate routing, retrieval, and providing. For example, making DHT or Bitswap requests to other nodes on the network is now viable.

> **Note:** browser nodes will still want to delegate providing content to a node with more longevity since the new transports won’t stop browser nodes from disappearing from the network when the user closes a tab or puts their laptop to sleep.

We’ll lean into realizing these breakthroughs and remove the more convoluted mechanisms from the past that relied on the Kubo RPC API and preload nodes discussed in [js-ipfs in a Browser context](#js-ipfs-in-a-browser-context).

### Support Fully Speced Delegated Routing Protocols and Endpoints

While it will be possible from a connectivity perspective to make DHT queries from a browser, we expect various applications will want to still delegate out routing. <del>[Reframe](https://blog.ipfs.tech/2022-09-02-introducing-reframe/)</del> [HTTP Routing V1](https://specs.ipfs.tech/routing/http-routing-v1/) is a protocol for delegated routing that other IPFS implementations like Kubo have implemented. While it currently uses HTTP as a transport, it is [speced](https://specs.ipfs.tech/routing/http-routing-v1/) and not tied to the Kubo RPC API. If/when there is a speced protocol for ambient discovery of “Limited Delegated Routers” provided by libp2p, we will support that as well.

### PL Delegate and Preload Nodes Will Be Shutting Down

Given the new browser-friendly p2p transports discussed above, we’ll shut down the complicated “song-and-dance” with the legacy delegate/preload nodes and the Kubo RPC API described in [js-ipfs in a Browser context](#js-ipfs-in-a-browser-context). This yields a simpler setup for one’s application and removes centralized infrastructure.

For delegated routing, one can configure [`/routing/v1`](https://specs.ipfs.tech/routing/http-routing-v1/) endpoints. When it comes to providing content from a browser node, it will be up to developers to account for user behavior like closing tabs or laptop lids. The general recommendation is to either run your own preload node or upload content explicitly to a pinning service for providing.

### Release Helia in 2023

Helia is the to-be-developed IPFS implementation with all that we’ve learned over the last 8 years while leveraging what is available to us in JS runtime.

Some defining attributes include:

1. Web-first isomorphic API - run in browsers, electron, node, deno, bun, etc - no node.js APIs, only standard JavaScript (e.g. web streams, not node streams, Uint8Arrays not Buffers). Node APIs will only be considered for special cases like mDNS.
2. Leaner API not tied to the legacy “core API” concept - Helia will not have API compatibility with js-ipfs. It will expose a more ergonomic JS-developer-first API than what we have with the js-ipfs “core API” that was heavily influenced by Kubo. (One can also create an adapter from the “core API” to Helia’s API if they want to drop Helia to their existing application using js-ipfs’ ipfs-core.)
3. ESM and TypeScript only - There’s no more debate on the utility of these for JS development. We’ll adopt them from day one.
4. Leverage existing interplanetary libraries - While we’re moving away from the interface and composition in js-ipfs, we’re not abandoning the underlying layers like js-libp2p, js-bitswap, etc. Those libraries have received a lot of maintenance attention in the last 18 months (including TypeScript and ESM updates) and are battle-tested in production. We will depend on them in Helia as well.
5. Unified file API - high-level commands that act like a filesystem and return CIDs. For example:

   ```jsx
   const dirCid = await ipfs.mkdir('/foo')
   const dirCid2 = await ipfs.touch(dirCid, 'file.txt')
   const dirCid3 = await ipfs.pipe([
     'file content',
     ipfs.open(dirCid2, 'file.txt'),
   ]) // or something
   const content = await ipfs.cat(dirCid3, 'file.txt') // could be a network request
   ```

6. Expose a block API for low-level IPLD operations.
7. Focus on the browser use case - We won’t do anything that precludes operating in NodeJS or a cloud service worker, but by default, we will prioritize delivery paths that deliver browser functionality sooner. This is because the browser runtime is the unique runtime the Helia IPFS implementation can enable that other implementations can’t. As a result, it means there aren’t plans to invest in things like a JS implementation of the HTTP Gateway spec. We’ll let other implementations like Kubo, Iroh, etc. pursue that use case.
8. Enable configurable levels of delegation. With routing, retrieval, and providing there will be varying levels of delegating from none (all handled by the local Helia node) to full (all handled by [HTTP Gateways](https://docs.ipfs.tech/reference/http/gateway/) and [Pinning Services](https://docs.ipfs.tech/how-to/work-with-pinning-services)).

### Pause js-ipfs Maintenance Once Helia Is Released

Shortly after you can add and cat files across the network with Helia, [PL EngRes](https://pl-strflt.notion.site/PL-EngRes-Public-b5086aea86ed4f81bc7d0721c6935e1e) will cease maintenance on js-ipfs. In the absence of an established group with a credible track record to take js-ipfs over, the community is welcome to fork js-ipfs and maintain the fork. (We want to avoid issues that can occur with casually giving away publishing rights.)

As discussed before, **we are not** ceasing support and development of many of the libraries that js-ipfs depends on like js-libp2p and js-bitswap. These projects will be actively maintained as core dependencies to Helia and other projects.

### A New Name Is Coming

As outlined [here](https://github.com/ipfs/ipfs/issues/470), Protocol Labs wants to make space for additional IPFS implementations to be made, including in JS. We want to make it clear that js-ipfs is not IPFS and that js-ipfs is not **_the_** IPFS implementation in JS. go-ipfs successfully made this transition earlier in 2022 with its [minimal rename to Kubo](https://github.com/ipfs/kubo/issues/8959). We will certainly not make the same name-squatting mistake with a new implementation like Helia. Details and plans will be shared [here](https://github.com/ipfs/ipfs/issues/470) and in the [IPFS forums](https://discuss.ipfs.tech).

### Doc Updates Galore

From [dedicated websites](https://js.ipfs.tech/), [examples](https://github.com/ipfs-examples/js-ipfs-examples), to [official docs](https://docs.ipfs.tech/reference/js/api/), and [courses](https://proto.school/course/ipfs), many places will need updating in light of new names and implementations. This is going to be a sizable undertaking that hasn’t been scoped out yet. This will be tracked [here](https://github.com/ipfs/Helia/issues/4).

## 🗺 Timeline

The timeline for enacting all of the above is still actively being figured out. We’ll be updating the [proposed roadmap](https://github.com/ipfs/Helia/blob/main/ROADMAP.md).

## 🤝 Ways You Can Help

1. 🗳 Propose a [name for the new “Helia” JS library](https://github.com/ipfs/Helia/issues/3) and cast your votes.
2. 🗣 Give feedback on the [Helia roadmap](https://github.com/ipfs/Helia/issues/5). Let us know how you’re using js-ipfs now so we can see if/how your use case would be supported with Helia in the future.
3. 🫂 Join the team - we’re hiring and need more JavaScript and TypeScript developers who are eager to make the vision above a reality. It’s ideal if you have experience working at the protocol/bytes/streams level. Please learn more [here](https://github.com/ipfs/Helia/issues/6).
4. ✋ Contribute - Open source contributors welcome. Have a great idea and need some funding? Consider a [grant request](https://github.com/ipfs/devgrants).

Thank you for reading and being on this journey to make IPFS exceptional in JS runtimes!

> Note: An earlier version of this blog post referred to Helia as Pomegranate. The blog post has been updated to reflect the name [chosen by the community.](https://github.com/ipfs/Helia/issues/3#issuecomment-1344434531)
