---
title: 'IPFS in 2021: The Backbone of Web3’s Mainstream Momentum'
description: Applications from music streaming to software distribution & more looked
  to IPFS for decentralized storage.
author: ''
date: 2022-01-11
permalink: "/2022-01-11-IPFS-in-2021/"
translationKey: ''
header_image: "/148262638-63588f04-cdfd-4476-ba67-912fd6bd3555.jpg"
tags: []

---
Web3 applications soared in popularity during 2021. The growth in use cases for the technology also brought greater demand for the infrastructure that supports them. IPFS became an integral part of the solutions used by developers and users alike across the budding Web3 ecosystem.

### Network Statistics

* NFTs stored on IPFS: 15M+
* Unique weekly active IPFS nodes: 230K+
* ipfs.io Gateway Users per week: 3.7M+
* ipfs.io Gateway Requests per week: 805M+

## **2021 Collaborations and Integrations**

Having IPFS and tools like [NFT.Storage](https://nft.storage/), [Web3.Storage](https://web3.storage/), and [Estuary](https://estuary.tech/) on the backend enabled projects to offer decentralized storage features as part of their products. Let’s take a look at some of the most notable applications:

### **Opensea integrated NFT.Storage for secure, platform-wide NFT persistence**

OpenSea is one of the largest marketplaces for NFTs on the decentralized web. It [partnered](https://blog.ipfs.io/2021-06-17-opensea-ipfs-filecoin/) with IPFS and FIlecoin to integrate NFT.Storage and allow users to "freeze" their NFT metadata. This process permitted creators to truly decentralize their NFTs, giving power back to the creators and not the hosters.

Today, OpenSea users can create immutable NFT data to be stored persistently on Filecoin's blockchain, with addressing for retrieving that data done through IPFS Content IDs. IPFS content-addressing provides the perfect solution for NFT hosting by eliminating the chance of a “rug pull” or a misplacement of the NFT's metadata.

### **Brave adds native support for IPFS as part of its ongoing Web3 integrations**

After the inclusion of its own cryptocurrency wallet, [Brave](https://www.zdnet.com/article/brave-becomes-first-browser-to-add-native-support-for-the-ipfs-protocol/) continued to add Web3 capabilities to its desktop web browser with its integration of IPFS. Users are now allowed to access content stored on the protocol by resolving IPFS addresses natively.

The integration was the result of a multi-year [collaboration](https://blog.ipfs.io/2021-01-21-how-we-put-ipfs-in-brave/) between both teams with the goal of making IPFS as accessible as possible to end users. It is a massive step towards turning IPFS into an accepted internet standard that all browsers may eventually support.

### **Opera extends its support of IPFS protocol addressing**

Opera first added support for IPFS to its Android browser in 2020. This year, it extended the same capabilities to its [Opera Touch ](https://blog.ipfs.io/2021-02-08-opera-ios-and-ipfs/)browser for iOS users, allowing them to navigate to ipfs:// and ipns:// addresses.

### **Pinata made it easy for anybody to leverage IPFS**

This pinning and file management service allows users to store content that is often referenced by blockchains in an easy and seamless manner. [Pinata](https://blog.ipfs.io/2021-07-15-building-web-3-pinata/) makes the most of the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) to publish content to the IPFS network, allowing for decentralized storage and efficient retrieval based on CIDs.

### **ScalaShare brought secure file sharing to Web3 with IPFS**

File sharing between users on the internet began with P2P sharing but[ ScalaShare brought](https://medium.com/scala-network/scala-share-decentralized-file-sharing-2df781738193) this functionality to Web3 with the help of IPFS. This simple open-source tool could become the go-to file storage system for those uncomfortable leaving their data in the hands of large corporations.

### **Audius relied on CIDs to stream music on demand**

Audius takes music streaming services on Web3 in a new direction. Using IPFS integrations to store and retrieve data,[ Audius](https://blog.ipfs.io/2021-05-05-audius-uses-ipfs-web3-video/) can ensure that there are no broken links to tracks and that all music is delivered to the user without reliance on centralized servers. IPFS's CIDs are the key to ensuring that this music streaming service works properly and continues to [use](https://www.youtube.com/watch?v=E3A0UJRVKnk&list=PL_0VrY55uV1_HE_bE-frkYUPGybjYHbNz&index=49) Web3 infrastructure on popular Web 2.0 applications like TikTok.

### **Palm uses IPFS for storage on its sustainable NFT platform**

This relatively new NFT studio recently partnered with IPFS.[ Palm](https://consensys.net/blog/press-release/palm-a-new-nft-ecosystem-and-studio-for-creators-announces-launch-of-first-project-with-damien-hirst/) features a sustainable architecture for generating NFTs. It uses a token-based economy to sustain an ecosystem with rapid transaction times and low gas fees, all based on energy-efficient technology. IPFS provides the solution it needs to ensure that users always have access to their work.

### **Valist trusts IPFS for secure Web3 software distribution**

Releasing software through a website or app store can sometimes introduce security concerns as those made evident by the 2020 SolarWinds attack. [Valist](https://blog.ipfs.io/2021-12-07-building-web3-valist/) tackles the issue by allowing development teams to distribute software in a Web3-native way. IPFS acts as a primary storage layer for Valist by providing a lot of security guarantees out of the box.

### **Snapshot ensured that DAO voting processes are decentralized with IPFS**

Popular DAO voting system [Snapshot](https://decrypt.co/resources/what-is-snapshot-the-decentralized-voting-system) relies on IPFS as a core part of its infrastructure. It allows DAO members to arrive at a consensus on a particular protocol proposal through a decentralized voting process. Snapshot is one of the most used tools in the growing space of community governance of everything from products to protocols

## **Technical Updates**

2021 also saw several technical updates to how IPFS works. Core among these are:

* [**Go IPFS 0.11.0**](https://github.com/ipfs/go-ipfs/releases/tag/v0.11.0): This is an implementation of IPFS for Go developers. Besides important fixes, the latest release came with improvements to the UnixFS Sharding and PubSub experiments as well as support for Circuit-Relay v2. Throughout the year, other improvements were made such as:
  * Changes to the IPLD internals of go-ipfs that make working with non-UnixFS DAGs easier
  * A variety of new commands and configuration options available
  * Gateway support for downloading arbitrary IPLD graphs via the DAG export endpoint
  * Custom DNS Resolvers
  * Support for non-ICANN DNSLink names
  * Individually packaged migrations
  * Builds for Apple M1 hardware
  * WebUI support for pinning services
  * Remote pinning services
  * Faster pinning and unpinning
* [**JS IPFS 0.60.0**](https://github.com/ipfs/js-ipfs/releases/tag/ipfs%400.60.0): JS IPFS is a similar implementation based on JavaScript. It eases the problems of linking IPFS data with JavaScript applications allowing developers to use it for native access to IPFS data. The latest version included important bug fixes and throughout the year there important improvements made, such as:
  * Dual publishing as ESM and CJS
  * An simpler globSource API
  * PubSub support to work around browser connection limitations
  * Tarball outputs on ipfs.get
  * Switch from RSA to Ed25519 as default
  * Dag import and export implementation
  * Better type definitions
  * Enabled NAT UPnP Hole Punching
  * Added support for support remote pinning services in ipfs-http-client
* [**IPFS Cluster 0.14.1**](https://github.com/ipfs/ipfs-cluster/releases/tag/v0.14.1): The source code for setting up and running an IPFS cluster. This open-source distribution opens up the world of IPFS to more users and developers. Throughout the year it received updates including:
  * Increase in the speed at which pinsets can be listed
  * More flexibility when migrating content to a new cluster
  * CAR import support
  * Batched pin-ingestion
  * Automatic garbage collection to the Badger datastore

To have a better understanding of why these improvements matter, be sure to check out this [technical guide](https://www.freecodecamp.org/news/technical-guide-to-ipfs-decentralized-storage-of-web3/) to IPFS.

## **The Next Step in Adoption**

While IPFS has made massive strides over the last year, there's still room to grow. New partnerships and advancements will be key towards broader Web3 usability. There will be an increasing demand for tools like IPFS as more mainstream users realize the need for a decentralized internet. We'll see what 2022 brings as they continue to enter the space.