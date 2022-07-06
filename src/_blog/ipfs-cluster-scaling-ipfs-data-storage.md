---
title: 'IPFS Cluster: scaling IPFS data storage'
description: Learn about IPFS Cluster, an app to coordinate how data is pinned across
  a set of IPFS daemons.
author: Hector Sanjuan
date: 2022-07-01
permalink: "/2022-07-01-ipfs-cluster/"
translationKey: ''
header_image: "/ipfs-cluster.jpg"
tags:
- IPFS Cluster
- DAG
- API
- pinning
- CID
- IPFS Cluster

---
Today marks the 6th anniversary of [IPFS Cluster](https://ipfscluster.io/), an application to coordinate how data is stored (or, in ipfs-slang, "pinned") across a set of IPFS daemons. IPFS cluster-peers run as sidecars to go-ipfs nodes, deciding which nodes pin what, managing pinning queues and making sure data is correctly written and replicated in multiple locations. The IPFS daemons will in turn store the blocks that form the [IPFS DAGs](https://docs.ipfs.io/concepts/merkle-dag/) and provide them to other nodes in the IPFS network or make the content available over HTTP through IPFS gateways.

IPFS Cluster solves many of the problems that operators face when storing IPFS data at scale. For example, IPFS Cluster can orchestrate several nodes to pin and replicate a CID. In order to select those nodes from those in the cluster, a Cluster-peer can automatically select IPFS nodes on different regions that are not too busy pinning other content and that report the most free space. Downloads that fail to reach a fully pinned state are regularly retried, but also deprioritized once they fail repeatedly. Every cluster-peer keeps a copy of the full cluster pinset and can be used to pin, unpin or add content directly, making the setup resilient to common failures. Every pin in the pinset can be configured individually (i.e. replication factor) and store additional metadata (names, user tags etc.). New peers can be added at any time to increase the cluster's capacity.

The largest known IPFS Cluster (powering NFT.storage) has 24 peers and stores 80 million pins, 285 TiB of IPFS data replicated three times (855 TiB in total). Every Cluster-peer provides an HTTP API that can be used to add new pins –to be fetched from the network– or to import content directly (i.e. via CAR file upload) which is automatically replicated and pinned. The API can be used to check the current status of pins and operators have an additional Prometheus endpoint to collect and display metrics like the total number of pins, the number of items queued to pin or the rate of errors.

Internally, Cluster peers form their own libp2p private network, which they use to coordinate, share metrics and broadcast updates to the cluster-pinset. This cluster-pinset which every node can modify is powered by a CRDT datastore, which ensures no conflicts ever happen and provides scalability features such as batched updates and gossip broadcasting. These not only allow the cluster to grow with many peers, but also augment the capacity to ingest large amounts of new pins and to automatically recover and catch up after downtimes.

IPFS Cluster version 1.0 was released in April 2022 and represented a milestone in maturity of the project, which is deemed fully ready for production workloads. Since then, IPFS Cluster keeps evolving to respond to scalability demands and provide additional tooling for large-scale IPFS storage. The roadmap for the next few months includes options to let Cluster-peers embed the IPFS daemon directly and providing a canonical and officially supported way to run elastic IPFS and IPFS Cluster deployments on Kubernetes. If you are interested in trying out IPFS Cluster, the best place to start is the [documentation](https://cluster.ipfs.io/documentation/). For any questions or issues, we are ready to help on our forums at [https://discuss.ipfs.io/.](https://discuss.ipfs.io/. "https://discuss.ipfs.io/.")