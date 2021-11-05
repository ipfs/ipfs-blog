---
title: Understanding the Three Fundamental Principles of How IPFS Works
description: In getting to understand how IPFS works, we will take a deep dive into
  the underlying principles behind IPFS.
author: Charles Freeborn
date: 2021-11-03
permalink: "/2021-11-03-understanding-fundamentals-of-ipfs/"
translationKey: ''
header_image: "/139685527-a385f6d4-908a-4420-993a-73e3dafba7c3-1.jpg"
tags:
- DHT
- DAG
- CID

---
# Introduction - What is IPFS?

The InterPlantery File System - IPFS - is a peer-to-peer distributed system for storing and accessing files, websites, applications, and data. IPFS is designed to power the Distributed Web - DWeb.

As a peer-to-peer protocol, IPFS asks lots of connected computers on the network to share information that a user requests for, via the file’s (website, app, or data) content. In the ecosystem, using the content of a file to serve user’s requests is known as content addressing - which we will discuss in this article.

But before we get to IPFS and content, perhaps we first take a look at the centralized web - its limitations and challenges, and how IPFS is at the forefront of powering the Distributed Web and solving the challenges of the centralized web.

It is worth noting that by using IPFS to download files from another system, your computer also becomes a distributor. And herein is one of the strengths of using IPFS as a protocol - your system becomes a part of a decentralized network, helping to spread and distribute information.

## Challenges and limitations of the centralized web

The web today as we know it is highly centralized.

“Power” is held in the hands of a few powerful corporations. This implies that most of the things we do on the web, for example making a post or even sharing something online is owned by someone else - the powerful corporation.

To a very large extent, a centralized web is driven by a data economy - the utilization of the content created by users and using it against these users.

A centralized web leads to the absolute control of information, how we see information and exploitation via the taking of advantage of how we now perceive things.

## How does IPFS works? A look at the underlying concepts

From a high level perspective, IPFS works by finding the information you are looking for by its content. This is known as content addressing and is achievable, through the Content Identifier - CID. We will discuss CID in the next section.

In better understanding how IPFS works, we will take a deep dive into the underlying principles behind IPFS.

## The three fundamental principles of understanding how IPFS works

1. Unique identification via content addressing:

   One of the key differences between the centralized web and the decentralized web is the identification and retrieval of data/information on each. On the centralized web, location addressing via a URL (or URI) is used to identify and“locate” data.

   On the flip side, the decentralized web uses content addressing through a unique content identifier - CID - to retrieve data from various sources (peers and/or nodes).

   A content identifier - CID is a particular form of content addressing developed for IPFS. It is a single identifier that contains both a [cryptographic hash](https://docs.ipfs.io/concepts/hashing/) and a codec, holding information about how to interpret data. And with cryptographic hash, anyone using the same algorithm on the same data will get the same hash. For context, most content in IPFS is hashed using the sha2-256 algorithm.

   The content identifier doesn’t indicate where the data is stored. It however, forms a kind of address based on the underlying content of the data.
2. Content linking via Directed Acyclic Graphs (DAGs):

   Data is accessed from peers in decentralized web, and not from a central authority. From a high level overview, a graph is a mathematical abstraction that is used to represent relationships among a collection of objects. We use node to refer to an object in a graph and edge to refer to a relation among objects.

   DAG is a compound word apparently and so it seems appropriate to lay the foundation for what it means by breaking them down.
   * Directed Graphs: A graph is said to be directed if each edge has some sense of direction. The connections between nodes only correctly associate in one direction, and a single-head arrow indicates this direction. We use genealogical terms like ancestor, descendent, parent, and child to refer to nodes in a directed graph.
   * Acyclic Graphs: An acyclic graph has no loops in the graph. This means there is no way to navigate from that node back to itself along the graph’s edges.
   * Directed Acyclic Graphs - DAGs: A graph that is both directed and acyclic is called, you guessed it right? A directed acyclic graph - DAG.
3. Content discovery via distributed hash tables (DHTs)

   A distributed hash table - DHT is a distributed system for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system and acts like a cross between a catalog and a navigation system.

   DHT maps what the user is looking for - a CID - to the peer that is actually storing the matching content.

   There are three types of key-value pairings that are mapped using DHT:
   * Provide records - map a data identifier to a peer that has advertised that they have that content and are willing to provide it for you. Used by IPFS to find content, IPNS over PubSub to find other members of the pubsub topic.
   * IPNS records - Map an IPNS key - the hash of a public key - to an IPNS record.
   * Peer records - map a peerID to a set of multi addresses at which the peer may be reached. Used by IPFS when we know of a peer with content, but do not know its address and manual connections for example: ipfs swarm connect/p2p/Qmxyz…

**Further Learning Resources**

Thanks for reading. Here’s are some learning resources to help you get into some deep dive into IPFS.

* [ProtoSchool](https://proto.school/)
* [IPFS YouTube Channel](https://www.youtube.com/c/IPFSbot)
* [IPFS docs](https://docs.ipfs.io/)