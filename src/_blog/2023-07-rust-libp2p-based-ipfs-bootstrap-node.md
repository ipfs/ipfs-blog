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

Since 2023-07-13 one of the four IPFS bootstrap nodes is running [rust-libp2p-server](https://github.com/mxinden/rust-libp2p-server) instead of [Kubo](https://github.com/ipfs/kubo). rust-libp2p-server is a thin wrapper around [rust-libp2p](https://github.com/libp2p/rust-libp2p). We run both Kubo and rust-libp2p-server on IPFS bootstrap nodes to increase resilience against bugs and attacks. A bug or vulnerability is less likely to be in both Kubo and rust-libp2p-server than Kubo alone. Further we gain experience running large rust-libp2p based deployments on the IPFS network.

![rust-libp2p bootstrap node establishing its first connections](../assets/2023-07-rust-libp2p-based-ipfs-bootstrap-node-connections-established.png)

# IPFS Bootstrap nodes

_What is an IPFS bootstrap node?_

> A Bootstrap Node is a trusted peer on the IPFS network through which an IPFS node learns about other peers on the network. [...]

https://docs.ipfs.tech/concepts/glossary/#bootstrap-node

More specifically a new node trying to join the IPFS network, i.e. trying to bootstrap, will:

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
"dnsaddr=/dnsaddr/sv15.bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN"
"dnsaddr=/dnsaddr/sg1.bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt"
"dnsaddr=/dnsaddr/ny5.bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa"
```

```
dig +short -t txt _dnsaddr.am6.bootstrap.libp2p.io
"dnsaddr=/ip6/2604:1380:4602:5c00::3/udp/4001/quic-v1/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/ip6/2604:1380:4602:5c00::3/tcp/4001/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/ip4/147.75.87.27/udp/4001/quic/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/dns4/am6.bootstrap.libp2p.io/tcp/443/wss/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/ip4/147.75.87.27/tcp/4001/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/ip6/2604:1380:4602:5c00::3/udp/4001/quic/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/ip4/147.75.87.27/udp/4001/quic-v1/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
"dnsaddr=/dns6/am6.bootstrap.libp2p.io/tcp/443/wss/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb"
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

- Implementation diversity
  - More stability
  - Security i.e. attack resilience
  - Bug or vulnerability is less likely to occur in both Kubo and rust-libp2p
- Rust in the IPFS network
- large scale rust-libp2p deployment
  - Other large deployments are Polkadot and Ethereum

# rust-libp2p-server in action

_What exactly is rust-libp2p(-server) and how does it behave as an IPFS bootstrap node?_


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
