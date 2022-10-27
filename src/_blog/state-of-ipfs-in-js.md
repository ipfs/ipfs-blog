---
date: 2022-10-27
permalink: /state-of-ipfs-in-js/
title: State of IPFS in JS
description:
author:
header_image: /state-of-ipfs-in-js.png
tags:
  - ipfs
  - js-ipfs
---

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
