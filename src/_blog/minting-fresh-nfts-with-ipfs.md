---
title: Minting Fresh NFTs with IPFS
description: Breaking down the storage issues with NFTs, and the solution through
  IPFS and Minty.
author: PL Hackathon Team
date: 2021-05-13
permalink: 2021-05-14-minting-fresh-nfts-with-ipfs
translationKey: ''
header_image: "/128-nft-header.png"
tags:
- hackathon
- NFTs

---
_The following is a summary of a talk given by Yusef Napora, Researcher at Protocol Labs._ [_Watch the full recording here._](https://www.youtube.com/watch?v=WNukgBtlWeU)

@[youtube](WNukgBtlWeU)

In the last six months, NFTs have had an explosive boom, but there have been a number of storage issues. Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. Centralized marketplace storage is risky because creators and owners can lose access to their NFTs, and cloud storage is dangerous because it relies on `https://` location-based addressing which can be altered to point to something that isn’t your NFT. Storing NFTs on the blockchain can be incredibly expensive because their state has to be replicated across every node and validated, plus there are gas fees.

For these reasons, it was important to look at how IPFS and NFTs can best work together to make storage safer for creators and owners. This is how Minty was born, a command-line application to automatically mint an NFT and pin it to IPFS using Pinata.

IPFS is decentralized, so this immediately removes the centralized marketplace risk. IPFS also offers an alternative to `https://` location-addressing through content-based addressing, which identifies content by its cryptographic hash instead of its location.

A cryptographic hash is a short string of letters and numbers calculated by feeding content into a cryptographic hash function. The cryptographic hash for a piece of content never changes, which means content addressing guarantees that the links will always return the same content, regardless of the location it is retrieved from, who added the block to the network, or when the content was added.

The Minty Demo in this talk walks you through:

* Installing Minty
* Deploying a smart contract
* What to know about metadata schema
* Loadshare specs
* Minting an NFT with IPFS
* Pinning with Pinata

There are a lot of benefits to minting your NFTs with IPFS. If you’re curious about more of the tech specs of Minty or want to know more about minting best practices, check out [this guide](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#how-minty-works) from IPFS and Filecoin for more information. [Learn more about Minty.](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#minty)

Want to learn more about NFT best practices, or just NFTs in general? Check out [NFT School](https://nftschool.dev/ "NFT School").