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
IPFS Cluster 0.14.0 was released today. Since I haven't sent shipped updates on this project since Dec-2019, it is worth making a small recap.

IPFS Cluster provides an overlay-layer to control and orchestrate pinsets in multiple IPFS daemons. It add content, distributes pins, tracks them and ensures content is replicated while providing streamlined API(s) for IPFS-storage management. It also does this in cool ways, with CRDTs, pubsub, IPLD and libp2p services.

IPFS Cluster has been running in production at PL since 2018. We use clusters to store all the stuff we want to store on IPFS, a few of them as [public collaborative clusters](https://collab.ipfscluster.io/) that can be followed by anyone. The operational responsibility falls within the scope of the Bifrost team which have developed the ability to setup large-storage gateways-coupled-to-cluster setups with little effort. There is no development team assigned to cluster, but I'm happy to take on low-effort/high-value items if I can make time, and I do user support.

As a result of feedback and scaling requirements, we have been addressing some issues in the last few months:

* We added **CAR-import support**, unlocking arbitrary IPLD-graph content ingestion, which greatly simplified the storage process for NFT.storage.
* We added **batched-pin ingestion**, which means a cluster peer can usually absorb and track at least **100 pin requests per second**. This allowed to import some 400k NFTs to the cluster very quickly, which then were queued and progressively pinned on IPFS. Currently that pinset stands at **2.7M items** (>10x our previous largest pinset).
* We added **auto-GC to the badger datastore** backend that cluster uses, and an alternative option to run with LevelDB. This addressed an issue raised by users rightly complaining that the cluster peers were taking unusually large storage amounts.
* We have optimized some operations like checking queued pins, so that they are fast with very large pinsets.
* We have added some groundwork to eventually provide an IPFS-Pinning-Services API, like supporting pin origins.
* We kept things up to date with the rest of the libp2p, ipfs stacks.
* Bugfixes here and there.

[The changelogs with all the details are here](https://github.com/ipfs/ipfs-cluster/blob/master/CHANGELOG.md).