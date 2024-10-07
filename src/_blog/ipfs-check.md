---
date: 2024-10-07
permalink: /ipfs-check/
title: 'Improved debugging with IPFS Check'
description: 'IPFS Check is a debugging tool for IPFS Mainnet. It helps you check if data is routable and retrievable by CID on IPFS Mainnet.'
author: Daniel Norman
header_image: /ipfs-check-cover.jpg
tags:
  - ipfs
  - cid
  - debugging
  - ipni
  - dht
---

## 🎉 Improved retrievability debugging with IPFS Check

The [Shipyard team](https://ipshipyard.com/) is thrilled to share an overhauled version of [IPFS Check](https://check.ipfs.network), a debugging tool for the [IPFS Mainnet](https://docs.ipfs.tech/concepts/glossary/#mainnet) public network. This new version is both simpler to use and more powerful.

Try it out at [check.ipfs.network](https://check.ipfs.network/?cid=bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi)

@[youtube](XeNOQDOrdC0)

## 🧰 Debugging retrievability on IPFS can be tricky

[Content Identifiers (CIDs)]((https://docs.ipfs.tech/concepts/glossary/#cid)), which lie at the heart of IPFS, free you from reliance on any single data provider. This is pretty magical, because as long as there is at least one provider for that data, you can always retrieve it via CID without needing to know the provider in advance. As a result, data retrieval on IPFS remains resilient even if individual providers become unavailable.

However, decoupling data from a single provider comes with a tradeoff: failure modes are more nuanced than in the client-server model.

In IPFS, when you try to fetch a CID, some providers may be online, while others may be offline, use other non-compatible network protocols, be slow, overloaded, or behind NAT and require hole punching to be reached.

Moreover, with the advent of [Delegated Routing](https://docs.ipfs.tech/concepts/how-ipfs-works/#how-content-routing-works-in-ipfs) and the [Network Indexer](https://docs.ipfs.tech/concepts/ipni/), CIDs may be routed by either the DHT or the Network Indexer, or both.

As a result, the likelihood of encountering an error when retrieving data is dependent on several dynamic factors:

1. Provider availability, which can constantly change
2. Network conditions of both client and providers
3. Successful announcement of CIDs to the DHT or Network Indexer.

![diagram illustrating multiple providers for cids](../assets/ipfs-check-network.png)

As a user looking to retrieve data by CID, you may experience different things, depending on the CID you are looking for, and the network conditions when you try to retrieve it.

Up until now, there was no easy way to get a detailed overview of whether a given CID is retrievable, and if not, why.

## 🔍 IPFS Check helps you debug retrievability of data

[IPFS Check](https://check.ipfs.network/) fills a gap for users and developers working with the IPFS Mainnet public network: the ability to easily check if data is routable and retrievable by CID.

IPFS Check provides insights into accessibility and routing for any data on the IPFS Mainnet public network. It is a web app and doesn't require any setup or installation.

You can use IPFS Check to:

1. Verify if data is routable and retrievable by CID on IPFS Mainnet (and if not, get a detailed explanation of why for each provider).
2. View the multiaddresses and network transports used to connect to providers.
3. Determine if NAT hole punching was necessary.

It's especially useful to get an _outside perspective_ of your IPFS node's network setup, and whether it is correctly configured.

## Recent updates to IPFS Check

As part of the recent overhaul, we've made several improvements to IPFS Check:

- **Support for CID-only checks**: you can now check whether a CID is available from _any_ provider, without needing to pass a specific provider's multiaddr.
- **IPNI support**: By default, IPFS Check will search for providers both in the IPNI and the DHT.
- **NAT traversal**: you can now in the results whether retrieval requires NAT traversal (if there are two successful sonnection multiaddrs and one of them contains `p2p-circuit`).
- **Network Protocol**: you can now see in the results which specific multiaddr was used for the connection, which tells you which network protocol was used, e.g. QUIC.

Give it a try at [check.ipfs.network](https://check.ipfs.network/). We hope you find it useful!

If you have any questions or feedback, open an issue or a discussion in the [GitHub repo](https://github.com/ipfs/ipfs-check/).
