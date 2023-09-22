---
title: Amino (the Public IPFS DHT) is getting a facelift and a lightning fast Reprovide strategy
description: 'The ProbeLab team is working on a major refactoring of the Public IPFS DHT (henceforth called Amino) and a new feature which will accellerate the provide operation by several orders of magnitude. Read through to find out the details and how to get involved.'
author: ProbeLab
date: 2023-09-22
permalink: '/2023-09-amino-refactoring/'
header_image: '/2023-09-amino-refactoring.png'
tags:
  - 'Amino'
  - 'IPFS DHT'
  - 'Reprovide Sweep'
---

Two major items are being announced in this blogpost, both of which are equally exciting and relate to “the Public IPFS DHT” (the [public Kademlia-based DHT](https://docs.ipfs.tech/concepts/dht/#dual-dht) that [Kubo (and other implementations) default to bootstrapping into](https://docs.ipfs.tech/how-to/modify-bootstrap-list/) with the libp2p protocol `/ipfs/kad/1.0.0`), which is henceforth going to be called **“Amino”**. The first relates to a major refactoring of the Amino codebase and the second is an optimization of the publish operation of the protocol, so that providing content to Amino is made much faster and resource-efficient.

## Why Amino?

The “Public IPFS DHT” is henceforth going to be called **“Amino”**. This follows along with the trend from 2022 in the IPFS ecosystem to use more precise language to create space for alternative options (i.e., other DHTs). Just as there isn’t one IPFS implementation, there isn’t one content routing system or DHT. “Amino” was chosen from Amino acids - the building block for larger, stronger structures, which is what we believe will happen with this network. There can be several IPFS DHT networks, and they can choose to borrow functionality from the “Amino” network. More context on the naming can be found [here](https://github.com/ipfs/ipfs/discussions/473).

## Refactoring of `go-libp2p-kad-dht` codebase

It has long been realized that the current go implementation of libp2p’s Distributed Hash Table (DHT), which is used by IPFS implementations like Kubo and other projects/platforms, is in need of a major revision. The problems that have been identified by core maintainers and community contributors alike can be summarised in the following:

1. Several years of adding extra features to the codebase and iterations of core functionality have made the DHT faster and more efficient, but have also added substantially to its complexity. It has now become more **difficult to understand and make changes to the code**, which indirectly is pushing developers away from contributing to it.
2. **Flaky tests due to concurrency issues**. Unit tests, which evaluate if the implementation is working as expected, are difficult to implement due to extensive parallelization of several parts of the code.
3. Lack of unit tests in turn make it **hard to carry out performance evaluation tests**. This has recently resulted in performance evaluation results that are hard to understand or act upon - Bitswap’s `Provider Search` delay is a good example here [[link](https://github.com/ipfs/kubo/pull/9530)].
4. The current implementation is carrying a **non-negligible amount of technical debt** that was acquired over the years. For instance, Kademlia should only handle Kademlia identifiers (256-bits bitstrings) internally, but it is currently using strings [[source](https://github.com/libp2p/go-libp2p-kad-dht/blob/b63ad6096833d36b365f1361edab871f6cdc283c/query.go#L83)].

The [PL EngRes IPFS Stewards team](https://www.notion.so/IPFS-f3c309cecfd844e788d8b9e13472a97b?pvs=21) has been working on a **major refactoring of `go-libp2p-kad-dht`**. In this context, a new library, `go-libdht` defines the basic building blocks for implementing DHTs, and will be used by the refactored `go-libp2p-kad-dht`. The goal of the refactoring project is to address the above challenges. In particular,

- make the code base easy to modify and improve by making it single-threaded.
- allow for sequential, deterministic code execution, making debugging easier, testing more reliable and simulation/reproducibility possible and,
- get rid of unnecessary code and complexity.

### Expected Changes & Timeline

The refactored codebase is being worked on in the [v2-develop branch of go-libp2p-kad-dht](https://github.com/libp2p/go-libp2p-kad-dht/tree/v2-develop). The current progress, next tasks and open issues can be found at this project board: [https://github.com/orgs/plprobelab/projects/1](https://github.com/orgs/plprobelab/projects/1). The refactored code is expected to be completed, tested and ready for integration into Kubo for further testing during the first half of October.

Where possible, we aim to remain compatible with version 1. There are no breaking protocol changes planned, and we expect to be able to adhere to the standard Routing interface used by Kubo. The libp2p Kademlia implementation has been battle tested through many years of use, and we want to take advantage of the learnings from that real-world usage while improving the ergonomics and clarity of the code. However, we will be taking this opportunity to look closely at the current code interfaces and to propose improved or new ones.

Most of the changes being made are internal to the operation of the DHT. We’re creating a new state machine oriented execution model that is very different to the existing implementation. This allows us to bound work and resources more cleanly and prioritize work performed more appropriately. Performance will also be different and, for the initial release, our goal is for this to be similar to the current codebase. However, we expect the new execution model will give us more scope for optimization in the future. Having better control over the scheduling of work will also allow the new implementation to continue to perform well under resource pressure and high load.

## Making Reprovides to Amino lightning fast

Content providers with a large number of CIDs to provide to the DHT have traditionally been facing difficulties. The current PUT operation in `go-libp2p-kad-dht` lacks resource efficiency. For every CID being reprovided, the provider performs a lookup and initiates a connection with the top 20 nearest peers *sequentially*. In practice, this means that if a peer needs to be contacted twice for two CIDs, the providing peer needs to open two connections to the same peer at different points in time within the same reprovide task.

In turn, this results in significant bandwidth requirements and deters large content providers from advertising their content on Amino (the IPFS DHT) due to cost constraints. The sequential manner in which reprovides take place can result in content providers failing to refresh all content within the 48h provider record expiration interval [[link to source](https://github.com/libp2p/go-libp2p-kad-dht/blob/b63ad6096833d36b365f1361edab871f6cdc283c/providers/providers_manager.go#L38)][[link to spec](https://github.com/libp2p/specs/tree/master/kad-dht#content-provider-advertisement-and-discovery)], rendering the content inaccessible.

Our approach is to optimize the provide process, making it much less resource intensive. This will pave the way for a significantly larger throughput in the number of "provides". 

### High level design of `ReprovideSweep`

The base premise of `ReprovideSweep` is that **all keys located in the *same keyspace region* are reprovided *all at once,** instead of sequentially,* which is currently the case. This is in contrast to the status quo of re-providing in the current IPFS DHT, where the provider record of each CID is sent out separately, though a new connection.

Given that some large Content Providers are publishing way more CIDs than there are DHT Servers, by the [pigeonhole principle](https://en.wikipedia.org/wiki/Pigeonhole_principle) there must be DHT Servers that are allocated more than one Provider Record, by a particular Content Provider. The primary rationale is to send/re-provide all Provider Records allocated to the same DHT Server *******at once, instead of having to revisit the same server later on, re-establish a connection, and store the provider record*******.

However, because sending multiple Provider Records requires a new RPC causing a breaking change, it isn’t trivial to send all Provider Records exactly *at once.* That said, the most expensive part in a (Re)Provide operation is the DHT walk to discover the right DHT Servers to store the Provider Records on, as well as opening new connections to these peers. Once these peers are known, and a connection is already open, the Content Provider can simply reuse the same connection to send multiple individual `Provide` requests.

The `go-libp2p-kad-dht` DHT implementation must keep track of the CIDs that must be republished every `Interval` (let’s assume that all Provider Records are republished at the same frequency). The Kademlia identifiers of the CIDs to republish must be arranged in a [binary trie](https://github.com/guillaumemichel/py-binary-trie) to allow for faster access. As each Provider Record is replicated on 20 different DHT Servers, 20 DHT Servers in a close locality are expected to store the same Provider Records (this is not 100% accurate, but suffices for our high-level description here - we’ll publish all the details in a subsequent post, when the solution is in production).

In a nutshell, the Content Provider will continuously lookup keys across the entire keyspace, hence “sweeping” the keyspace. For each key that is to be published, the Content Provider will find the 20 closest peers, and lookup in its “CIDs Republish Binary Trie” all Provider Records that would belong to those specific 20 remote peers. Doing this match-making exercise, content providers will be able to reprovide all provider records that correspond to a particular peer at once. Based on this logic, Content Providers are only limited by network throughput.

You can watch a recording from [IPFS Thing 2023](https://2023.ipfs-thing.io/) explaining the concept in more detail [here](https://youtu.be/bXaL64fp55c?si=1LuukjErCG_bz02N).

### `ReprovideSweep` Performance

`ReprovideSweep` is not implemented yet, hence, we can only approximate its performance analytically. In the tables below we see that `ReprovideSweep` is improving performance significantly on all fronts and important metrics, assuming that the number of CIDs (`#CIDs`) that a provider wishes to publish is much larger than the number of DHT Server nodes in the network (`#DHT_SERVERs`), i.e. `#CIDs >> #DHT_SERVERs`:

- The number of DHT Lookups is reduced from being equal to the number of CIDs to be published, down to 1/20th of the number of DHT Server nodes in the network.
- The number of connections that need to be opened is also reduced and is equal to the number of DHT Server nodes (if the number of CIDs to be provided is much larger than the number of server nodes in the network).
- As we see in the second table, assuming a network size of ~25k DHT Server nodes, the overall improvement in terms of ‘number of connections open’ and ‘number of DHT Lookups’ is significant reaching an improvement of ~800x for 1M CIDs.

|  | Current Reprovide | Reprovide Sweep |
| --- | --- | --- |
| Number of DHT lookups | #CIDs | ~1/20 * #DHT_SERVERs |
| Number of connections to open | 20 * #CIDs | #DHT_SERVERs |

| #CIDs published | Improvement (#connections, #DHT Lookups) |
| --- | --- |
| > 1K | - |
| 25K | 20x |
| 100K | 80x |
| 500K | 400x |
| 1M | 800x |
| 10M | 8’000x |

### Expected Changes & Timeline

We are very excited about this change because it will enable large content providers to start using the most resilient and decentralized component of the IPFS network.

**This change is a client side optmization and doesn’t involve any protocol alteration.** As such, it allows users to immediately benefit from the feature. The interface between `go-libp2p-kad-dht` and `[boxo](https://github.com/ipfs/boxo)`, which Kubo uses, must be updated in order to enable the DHT client to take on the responsibility of managing the reprovide operation.

The PL EngRes IPFS Stewards team is currently working to define the spec for `ReprovideSweep`, which we hope to have ready in the beginning of October, and we anticipate rolling out this enhancement during Q4’23. We will update the community with a new blogpost or discussion forum post closer to the time. Until then, you can follow developments on this front through this GH issue: [https://github.com/libp2p/go-libp2p-kad-dht/issues/824](https://github.com/libp2p/go-libp2p-kad-dht/issues/824).

## What’s next

We believe the above lays the groundwork for more exciting DHT innovation ahead. We have some ideas that we’d love to be talking about and working with the community. We’re still figuring out the best place to this conversation, but subscribe [here](https://discuss.ipfs.tech/t/dht-discussion-and-contribution-opportunities-in-2023q4/16937) if you’re interested in learning about upcoming DHT discussion areas (e.g., at [LabWeek](https://labweek.plnetwork.io/)/[DevConnect](https://devconnect.org/), DHT working group).

## How to get involved

As always, help is more than welcome to accelerate development and make the design more robust through feedback. Here are ways you can get involved:

- Github repository:
    - DHT Refactoring: [https://github.com/plprobelab/go-kademlia/](https://github.com/plprobelab/go-kademlia/)
    - Reprovide Sweep: [https://github.com/libp2p/go-libp2p-kad-dht/issues/824](https://github.com/libp2p/go-libp2p-kad-dht/issues/824)
- Slack channel:
    - `#probe-lab` in FIL Slack or IPFS Discord (bridged channel), or
    - `#kubo-boxo-dev` in FIL Slack
- IPFS Discussion forum:
    - DHT Refactoring and future planning: [https://discuss.ipfs.tech/t/dht-discussion-and-contribution-opportunities-in-2023q4/16937](https://discuss.ipfs.tech/t/dht-discussion-and-contribution-opportunities-in-2023q4/16937)
