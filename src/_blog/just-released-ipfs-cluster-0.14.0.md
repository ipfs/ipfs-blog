---
title: 'Just released: IPFS Cluster 0.14.0!'
description: ''
author: Héctor Sanjuán
date: 2021-07-12
permalink: "/2021-07-12-ipfs-cluster-0-14-0/"
translationKey: ''
header_image: "/077-collaborative-clusters-header-image.png"
tags:
- IPFS Cluster

---
We're happy to announce the release of IPFS Cluster 0.14.0! Since it's been a little while since the last release, it's worth making a small recap on the project and what it has to offer.

### A quick recap

[IPFS Cluster](https://cluster.ipfs.io) provides an overlay layer to control and orchestrate pinsets in multiple IPFS daemons. It adds content, distributes pins, tracks them, and ensures content is replicated while providing streamlined API(s) for IPFS storage management. It does this in lots of cool ways, utilizing CRDTs, pubsub, IPLD and libp2p services — you can dig into all the details in the official [IPFS Cluster documentation](https://cluster.ipfs.io/documentation/).

IPFS Cluster has been running in production internally at Protocol Labs since 2018. We use clusters to store all the stuff we want to store on IPFS, a few of them as [public collaborative clusters](https://collab.ipfscluster.io/) that can be followed by anyone. Our internal operational team (known as [Bifrost](https://en.wikipedia.org/wiki/Bifr%C3%B6st)) has developed the ability to set up large-storage gateways-coupled-to-cluster setups with little effort. 

### Release highlights

As a result of feedback and scaling requirements for our own use of IPFS Cluster, we have been addressing some issues in the last few months, and you'll see these in this latest 0.14.0 release:

* We added **CAR-import support**, unlocking arbitrary IPLD-graph content ingestion, which greatly simplified the storage process for NFT.storage.
* We added **batched-pin ingestion**, which means a cluster peer can usually absorb and track at least **100 pin requests per second**. This allowed to import some 400k NFTs to the cluster very quickly, which then were queued and progressively pinned on IPFS. Currently that pinset stands at **2.7M items** (>10x our previous largest pinset).
* We added **auto-GC to the badger datastore** backend that cluster uses, and an alternative option to run with LevelDB. This addressed an issue raised by users rightly complaining that the cluster peers were taking unusually large storage amounts.
* We have optimized some operations like checking queued pins, so that they are fast with very large pinsets.
* We have added some groundwork to eventually provide an IPFS-Pinning-Services API, like supporting pin origins.
* We kept things up to date with the rest of the libp2p, ipfs stacks.
* Bugfixes here and there.

### Changelog

Want a full list of updates included in the IPFS Cluster 0.14.0 release? Check the details in the [changelog here](https://github.com/ipfs/ipfs-cluster/blob/master/CHANGELOG.md).