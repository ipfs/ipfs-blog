---
title: Rarible adds extra resiliency to NFTs with IPFS and Filecoin via NFT.Storage
description: Rarible & NFT.Storage have a partnership enabling Rarible.com NFT content
  to be preserved on IPFS & Filecoin
author: ''
date: 2022-07-20
permalink: "/2022-07-21-rarible-and-nftstorage/"
translationKey: ''
header_image: "/179247191-919bb92e-4306-4ed2-abcb-0ac12a2d95d9.jpg"
tags:
- NFTs

---
[Rarible](https://rarible.com/) has always made NFT content available through public IPFS nodes for its marketplace users. Today, Rarible and NFT.Storage are excited to announce a partnership - enabling all Rarible.com NFT content to be preserved and made available on both IPFS and Filecoin.

## Why IPFS?

On Ethereum (and many other chains) while the NFT itself is stored on-chain, the _metadata_ (all the files, images, videos, etc) associated with the NFT are typically linked elsewhere. There are a few reasons why this can be useful:

1. For cases in which the assets of the NFT are too large to store directly on the chain (e.g. large images, videos, etc)
2. When planning for interoperability: storing the metadata of an NFT directly in one chain can make planning for moving that NFT across chains more difficult!

In both these cases, resilient links to off-chain content are needed. ”Normal” URLs (like HTTP) can introduce a point of centralization accidentally coupling an NFT to a specific server, rather than the content sitting on that server. This can lead to issues over time - including broken links, 404 errors, or the mutation of content.

IPFS is an ideal solution to this problem - rather than linking to content based on _where_ the content lives, content can be linked to by a _unique fingerprint_ of the content itself. With IPFS, anyone can ask for a piece of content by its unique fingerprint - and anyone who has that content can serve it back. This is powerful because it means so long as someone on the network is serving this content - the link should resolve.   
  
On top of this, because IPFS doesn’t specify a storage layer, the content can live and be served from anywhere - a local computer, a hosted node like Pinata, your personal Brave [browser](https://brave.com/ipfs-support/), or even [decentralized storage networks](https://nft.storage/blog/post/2021-12-14-storage-layer-maximalism/).

## Why Filecoin?

IPFS neatly solves the problem of resilient linking - allowing us to request and receive data based solely on the content, rather than a specific location. But in order to truly secure our NFTs, we need to also ensure that someone is offering that content into the IPFS network. This is where [Filecoin can help](https://blog.ipfs.tech/2021-06-03-ipfs-filecoin-content-persistence/).

Filecoin offers verifiable storage on the largest decentralized storage network. Unlike other networks, Filecoin uses both carrots and sticks to make sure that content stays on the network as long as its users require. Filecoin storage providers are required to prove to the network that they’ve kept user data safe. In the event they can, they become eligible for block rewards. In the event they can’t, the storage provider is slashed. In this way, not only is there an incentive to keep data around - but a penalty for letting data drop.

In this way, NFT data can be securely stored with the ability for anyone to verify that this content is still intact and resiliently available.

## Path Forward

NFT.Storage’s mission is to be the [“Internet Archive” for NFTs](https://nft.storage/blog/post/2022-01-20-decentralizing-nft-storage/) - making the storage and access of NFTs (from all ecosystems) a public commons. Rarible has long shared a similar ethos and mission - leading to highly aligned work such as their open source [Rarible Protocol](https://rarible.org/).

Together, both ecosystems are excited to continue to accelerate the growth and adoption of public infrastructure.

To keep up-to-date with both teams, follow @nft_storage and @rarible on Twitter.