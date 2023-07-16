---
title: A Rusty Bootstrapper
description: 'Running rust-libp2p-server on one out of four IPFS bootstrap node.'
author: Max Inden (@mxinden)
date: 2023-07-14
permalink: '/2023-rust-libp2p-based-ipfs-bootstrap-node/'
header_image: ''
tags:
  - 'Kademlia'
  - 'Rust'
---

# Summary

Since 2023-07-13 one of the four IPFS bootstrap nodes is running [rust-libp2p-server](https://github.com/mxinden/rust-libp2p-server) instead of [Kubo](https://github.com/ipfs/kubo). rust-libp2p-server is a thin wrapper around [rust-libp2p](https://github.com/libp2p/rust-libp2p). We run both Kubo and rust-libp2p-server on IPFS bootstrap nodes to increase resilience. A bug or vulnerability is less likely to be in both Kubo and rust-libp2p-server than Kubo alone. In addition to increasing resilience we gain experience running large rust-libp2p based deployments on the IPFS network.

![rust-libp2p bootstrap node establishing its first connections](../assets/2023-07-rust-libp2p-based-ipfs-bootstrap-node-connections-established.png)

# IPFS Bootstrap nodes

_What is an IPFS bootstrap node?_

> A Bootstrap Node is a trusted peer on the IPFS network through which an IPFS node learns about other peers on the network. [...]

See [IPFS Glossary](https://docs.ipfs.tech/concepts/glossary/#bootstrap-node).

A new node trying to join the IPFS network, i.e. trying to bootstrap, will:

1. Connect to its (pre-) configured bootstrap nodes.
2. Run some variation of the [Kademlia bootstrap process](https://github.com/libp2p/specs/tree/master/kad-dht#bootstrap-process) which boils down to iteratively:
  1. Generating random IDs.
  2. Asking already discovered nodes whether they know anyone closer to those IDs.

Thus the only thing that an IPFS bootstrap node needs to do is:

- Allow incoming connections.
- Maintain a healthy Kademlia routing table.
- Reply to Kademlia `FIND_NODE` requests based on nodes in its routing table.

Let's dive a bit deeper. In the case of Kubo the addresses of the IPFS bootstrap nodes are shipped within the release binary.

``` go
// DefaultBootstrapAddresses are the hardcoded bootstrap addresses
// for IPFS. they are nodes run by the IPFS team. docs on these later.
// As with all p2p networks, bootstrap is an important security concern.
var DefaultBootstrapAddresses = []string{
	"/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
	"/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
	"/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
	"/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    // ...
}
```

See [`bootstrap_peers.go` on github.com/ipfs/kubo](https://github.com/ipfs/kubo/blob/4a5e99d7eaeada5596a0686fe93d4fa2da212452/config/bootstrap_peers.go#L11C1-L24C2).

One can translate those `/dnsaddr/...` through iterative DNS queries. For example below for the node with the peer ID `QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb`. This IPFS bootstrap node is running Kubo.

```
dig +short -t txt _dnsaddr.bootstrap.libp2p.io
"dnsaddr=/dnsaddr/am6.bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
[...]
```

```
dig +short -t txt _dnsaddr.am6.bootstrap.libp2p.io
"dnsaddr=/ip6/2604:1380:4602:5c00::3/udp/4001/quic-v1/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
[...]
```

Finally connecting to the bootrap node shows us the protocols it supports.


```
libp2p-lookup direct --address /ip6/2604:1380:4602:5c00::3/udp/4001/quic-v1/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb

Lookup for peer with id PeerId("QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb") succeeded.

Protocol version: "ipfs/0.1.0"
Agent version: "kubo/0.20.0/b8c4725"
Listen addresses:
        - "/ip6/2604:1380:4602:5c00::3/udp/4001/quic-v1"
        - [...]
Protocols:
        - /ipfs/kad/1.0.0
        - [...]
```

Note the `Agent version: "kubo/0.20.0/b8c4725"` and the supported protocols `Protocols: - /ipfs/kad/1.0.0`.

# Motivation

_Why run both Kubo and rust-libp2p2-server bootstrap nodes?_

This choice is influenced by three main areas: the benefit of diverse implementation, the opportunity to test rust-libp2p at large scale, and the presence of Rust in the IPFS network.

## Implementation Diversity

Operating both Kubo and rust-libp2p-server bootstrap nodes contributes to the network's overall resilience and security. It's like having a second line of defense; if one system encounters an issue, the other is there to continue functioning. For instance, a recent bug impacted Kubo IPFS bootstrap nodes ([GitHub issue #2601](https://github.com/protocol/bifrost-infra/issues/2601)). By using both Kubo and rust-libp2p-server, we ensure that nodes can still join the network in the face of difficulties.

## Testing Rust-Libp2p at Large Scale

Our use of rust-libp2p-server also provides a valuable opportunity to examine how it behaves at a larger scale. Software performance can vary depending on scale, and these differences are hard to predict without actual real-world deployments. Now we can gain insights similar to those we acquired from other large deployments such as Polkadot and Ethereum.

## Encouraging Rust in the IPFS Network

Lastly, by operating a rust-libp2p bootstrap node, we hope to motivate other developers to build IPFS-based applications using rust-libp2p. This could lead to an increase in the use of Rust, fostering a more diverse and vibrant ecosystem.

# rust-libp2p-server in action

_What exactly is rust-libp2p(-server) and how does it behave as an IPFS bootstrap node?_

- Explain rust-libp2p
  - Implementation of the libp2p specification in Rust
  - since ~2018
  - Powers eth2 lighthouse and Polkadot and its ecosystem
  - See also https://github.com/libp2p/rust-libp2p#notable-users
- Show rust-libp2p-server repository
  - Thin wrapper around rust-libp2p
  - Stress that rust-libp2p-server is a stripped down IPFS only, i.e. that it only does Kademlia.
- link to tracking issue https://github.com/protocol/bifrost-infra/issues/2622

Now deployed on IPFS bootstrap node `ny5`.


```
libp2p-lookup direct --address /dnsaddr/ny5.bootstrap.libp2p.io

Lookup for peer with id PeerId("QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa") succeeded.

Protocol version: "ipfs/0.1.0"
Agent version: "rust-libp2p-server/0.12.0"
Listen addresses:
        - [...]
Protocols:
        - /ipfs/kad/1.0.0
        - [...]
```

Note the `Agent version: "rust-libp2p-server/0.12.0"`.

Show graphs
- Connection establishment
- Memory usage
- Mention bytes per connection
- Incoming Kademlia requests

- Publish Grafana dashboard
  - Stress number of connections and memory usage
- Majority is QUIC connections

Thanks to [@mcamou](https://github.com/mcamou) from the Protocol Labs Bifrost team.

FAQ:

- Do we plan to run rust-libp2p-server on all IPFS bootstrap nodes?

  No.
