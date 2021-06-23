---
title: 'Interplanetary Timelessness: IPFS & Filecoin for the NFT Long Haul'
description: Breaking down CIDs, NFT storage, and IPFS’ solution to get devs started.
author: Alan Shaw
date: 2021-06-11
permalink: 2021-06-11-interplanetary-timelessness
translationKey: ''
header_image: "/ipfs-blog-nft-hack-2.png"
tags:
- API
- CID
- Filecoin
- NFTs

---
_The following is a summary of a talk given by Alan Shaw, Core Developer at IPFS._ _Watch the full recording here:_

@[youtube](aNaj9xNF8OU)

If you import data to an IPFS node, you get what is called a _content identifier_, or CID. CIDs are what make IPFS unique when it comes to storage because CIDs address content instead of the typical `https://` location-based addressing.

It’s important to note that CIDs are a cryptographic hash of the content. This means that:

* Any change to the content will produce a different CID.
* The same content added to two different IPFS nodes using the same settings will produce the same CID.

CIDs are very important to NFT storage because they help prevent “rug pull”, or the issue when NFT addresses are changed to lead to something else than the original NFT content. CIDs allow for safer NFT storage long term.

To help NFT creators and owners more easily store their NFTs with CIDs, IPFS and Filecoin offer [https://nft.storage/](https://nft.storage/), a brand new service built specifically for storing off-chain NFT data. Data is stored decentralized on IPFS and Filecoin.

The nft.storage demo in this talk walks you through:

* Uploading data to nft.storage using the JS client in **Node.js** and the **browser**
* Managing API keys
* Data retrieval via IPFS gateways
* Querying for information about stored data: file size, IPFS pinning status and Filecoin deal status

Along with nft.storage and Minty, IPFS and Filecoin have comprehensive [documentation on CIDs](https://docs.ipfs.io/concepts/content-addressing/#identifier-formats), an article detailing the differences between [content addressing and content integrity](https://blog.ipfs.io/2021-04-05-storing-nfts-on-ipfs/), a best practices guide to [long term NFT storage](https://docs.ipfs.io/how-to/best-practices-for-nft-data/), and how to mint NFTs on IPFS [with Minty](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#how-minty-works). Also, check out [NFT School](https://nftschool.dev/ "NFT School") for a collection of tutorials, how-tos, and concept guides on NFT best practices and NFTs in general.

Keep up with the latest by giving [Filecoin](https://twitter.com/filecoin?lang=en) and [IPFS](https://twitter.com/IPFS) a follow on Twitter.

_Disclaimers:_

* _Nothing in these presentations is investment advice._
* _Any models shown in presentations are based on many assumptions, and should not be relied upon as the source of truth. Any estimates should not be relied upon and are for illustrative purposes only. You should build your own models based on the code and the Filecoin spec._