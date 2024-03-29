---
date: 2020-01-09
permalink: "/2020-01-09-collaborative-clusters/"
title: Announcing collaborative clusters
description: 
author: Hector Sanjuan
header_image: "/077-collaborative-clusters-header-image.png"
tags:
- IPFS Cluster
- collaborative cluster

---
We are very excited to announce the first set of public _collaborative clusters_ and the first iteration of the [collaborative clusters website](https://collab.ipfscluster.io).

_Collaborative clusters_ are an easy way to join and help improving distribution and data availability of specific datasets in the IPFS Network.

Using IPFS Cluster's [latest release (0.12.1)](https://ipfscluster.io/news/0.12.0_release/) we have set up the first of those archives:

* Filecoin cluster: which will be used to pin Filecoin parameters and Filecoin objects.
* Spanish books from the Gutenberg Project: a collection of Spanish literature from the [Gutenberg Project](http://www.gutenberg.org/).
* IPFS Websites: a list with a few of the IPFS-universe websites (such as ipfs.io, libp2p.io).

Users can join these clusters by running a single `ipfs-cluster-follow`  command. You will need to have enough space available in your IPFS repository (check the size row for each cluster on the [website](https://collab.ipfscluster.io)).

Instructions on how to setup and join these and, in the future, other collaborative clusters can be found at [https://collab.ipfscluster.io](https://collab.ipfscluster.io). You can stop and re-start replication whenever you want. Also, here's a quick video to show how easy it is:

<iframe src="https://asciinema.org/a/yV2Bk4nlrPAQ6MQ4w6z3ea0uZ/iframe" style="width: 737px; height: 509px; overflow: hidden;" scrolling="no"></iframe>
<p class="powered">asciicast powered by <a href="https://asciinema.org/" target="_top">asciinema</a></p>

We hope that collaborative clusters will allow the community to participate in the distribution and seeding of data they care about, enabling easy "mirroring" on the IPFS network, along with unlocking _Content-Distribution-Network (CDN)_ properties.

## Creating your own Clusters

Collaborative clusters are no different from normal IPFS Clusters, with the exception that they include a list of _trusted peers_ (peers that can modify the cluster pinset).

The process of setting up one of these and letting other peers easily join as followers is documented at [https://ipfscluster.io/documentation/collaborative/](https://ipfscluster.io/documentation/collaborative/).

## About the IPFS Cluster project

The [IPFS Cluster project](https://ipfscluster.io) provides data orchestration across a swarm of IPFS daemons by allocating, replicating and tracking a global pinset distributed among multiple peers.

For full documentation on how to setup and operate clusters, see [https://ipfscluster.io/documentation](https://ipfscluster.io/documentation).