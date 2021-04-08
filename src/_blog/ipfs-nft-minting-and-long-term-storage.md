---
tags: []
title: IPFS NFT Minting and Long Term Storage
description: Here's a recap of NFTHack, a weekend long hackathon & summit to gather
  creatives & engineers focused on NFTs.
author: ''
date: 2021-04-08
permalink: "/2021-04-08-NFTHack-Recap"
translationKey: ''
header_image: "/111485037-90aa5d80-8736-11eb-9fbf-44e254214d1d.png"

---
Last month ETHGlobal hosted [NFTHack](https://nfthack.ethglobal.co/), a weekend long hackathon and summit to gather creatives and engineers focused on NFTs. Protocol Labs sponsored the event and showed up to talk with the community about creative, sustainable solutions to NFT storage.

And what a weekend! During the event alone, 1204 NFTs were stored on IPFS 🤯.

[nft.storage](http://nft.storage/) is a new service built specifically for storing off-chain NFT data on IPFS and Filecoin. Nft.storage was a tremendous asset during the NFTHack weekend. The service made it possible for participants to focus fully on their hacks knowing that their off-chain data was safely being stored by nft.storage on IPFS and Filecoin.

Between March 15-21 over 2,000 people visited nft.storage and a quarter of all NFTHack builders used it. Overall, 10% of all of the event participants used the JavaScript library powering nft.storage to store their NFTs.

From a NFTHack team about nft.storage:

"nft.storage really saved my butt, literally 2 lines of code”, they talked about how easy it was to integrate into their React and js build env, etc. Had many comments like that during the judging period - that basically it Just Worked ™️ and everyone appreciated how easy it made it for them to focus on building their thing. For 40% of the participants it was their first time doing anything with crypto, so having a non-crypto bridge like nft.storage was 💯"

The $5k bounty for the event was split into two $1.5k awards and one $2k award. The winner of “The 🤯 Prize” was [NNFT (The 🚫Not Not-a-🔥 Flamethrower Token)](https://hack.ethglobal.co/showcase/nnft-the-%F0%9F%9A%ABnot-not-a-%F0%9F%94%A5-flamethrower-token-recqk5Rp8OqYkCwqD). Yes, it’s a flamethrower; but a flamethrower that creates an NFT out of anything it burns. The runners-up were [GFT](https://hack.ethglobal.co/showcase/gft-pronounced-gift-recLgL3xQVu1T0l07), which connects creators and consumers through NFTS, and [Rodeo](https://hack.ethglobal.co/showcase/rodeo-recCnrDlmB6FWgPss), which lets people quickly spin up NFT galleries for their websites.

In case you didn’t join NFTHack, below are recaps, themes, and conclusions from different talks by IPFS and Filecoin contributors. Dive in, get familiar, and start (or continue!) your journey with NFTs.

You can browse the full event [agenda](https://nfthack.ethglobal.co/) and check out the [NFTHack YouTube playlist here](https://www.youtube.com/playlist?list=PLXzKMXK2aHh50g55xEroWasKorT1YkUKs).

## Minting Fresh NFTs with IPFS

_The following is a summary of a talk given by Yousef Napora, Researcher at Protocol Labs._ [_Watch the full recording here._](https://www.youtube.com/watch?v=WNukgBtlWeU)

In the last six months, NFTs have had an explosive boom, but there have been a number of storage issues. Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. Centralized marketplace storage is risky because creators and owners can lose access to their NFTs, and cloud storage is dangerous because it relies on https:// location-based addressing which can be altered to point to something that isn’t your NFT. Storing NFTs on the blockchain can be incredibly expensive because their state has to be replicated across every node and validated, plus there are gas fees.

For these reasons, it was important to look at how IPFS and NFTs can best work together to make storage safer for creators and owners. This is how Minty was born, a command-line application to automatically mint an NFT and pin it to IPFS using Pinata.

IPFS is decentralized, so this immediately removes the centralized marketplace risk. IPFS also offers an alternative to https:// location-addressing through content-based addressing, which identifies content by its cryptographic hash instead of its location.

A cryptographic hash is a short string of letters and numbers calculated by feeding content into a cryptographic hash function. The cryptographic hash for a piece of content never changes, which means content addressing guarantees that the links will always return the same content, regardless of the location it is retrieved from, who added the block to the network, or when the content was added.

The Minty Demo in this talk walks you through:

* Installing Minty
* Deploying a smart contract
* What to know about metadata schema
* Loadshare specs
* Minting an NFT with IPFS
* Pinning with Pinata

There are a lot of benefits to minting your NFTs with IPFS. If you’re curious about more of the tech specs of Minty or want to know more about minting best practices, check out [this guide](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#how-minty-works) from IPFS and Filecoin for more information. You can learn more about Minty [here](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#minty).

## Interplanetary Timelessness: IPFS & Filecoin for the NFT Long Haul

_The following is a summary of a talk given by Alan Shaw, Core Developer at IPFS._ [_Watch the full recording here._](https://www.youtube.com/watch?v=aNaj9xNF8OU)

If you import data to an IPFS node, you get what is called a content identifier, or CID. CIDs are what make IPFS unique when it comes to storage because CIDs address content instead of the typical https:// location-based addressing.

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

Along with nft.storage and Minty, IPFS and Filecoin have comprehensive [documentation on CIDs](https://docs.ipfs.io/concepts/content-addressing/#identifier-formats), an article detailing the differences between [content addressing and content integrity](https://blog.ipfs.io/2021-04-05-storing-nfts-on-ipfs/), a best practices guide to [long term NFT storage](https://docs.ipfs.io/how-to/best-practices-for-nft-data/), and how to mint NFTs on IPFS [with Minty](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/#how-minty-works).

Keep up with the latest by giving [Filecoin](https://twitter.com/filecoin?lang=en) and [IPFS](https://twitter.com/IPFS) a follow on Twitter.

_Disclaimers:_

* _Nothing in these presentations is investment advice._
* _Any models shown in presentations are based on many assumptions, and should not be relied upon as the source of truth. Any estimates should not be relied upon and are for illustrative purposes only. You should build your own models based on the code and the Filecoin spec._