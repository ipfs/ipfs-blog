---
title: How to Store and Maintain NFT Metadata
description: What are the risks with NFT metadata and how does IPFS help NFT holders
  secure their digital assets?
author: IPFS Blog
date: 2021-10-06
permalink: "/how-to-store-and-maintain-nft-metadata/"
translationKey: ''
header_image: "/breaking-down-nft-metadata.jpg"
tags:
- security
- NFTs
- Filecoin
- CID

---
Why is everyone so preoccupied with NFT metadata? What does it mean, what are the risks affecting it, and how does IPFS help NFT holders secure their digital assets for the long term?

Non-fungible tokens (NFTs) are among the most exciting recent developments in the cryptoverse. For those unaware of these gems, NFTs are like digital collectibles, each unique in its own way and linked to a particular user.

Ownership aside, what also makes an NFT valuable is its metadata. If you're someone who spends a lot of time on the internet, you would probably recognize the term as data that exists about a particular digital signature or website. NFT metadata is similar but with some significant differences.

## What is NFT Metadata?

NFT metadata defines the NFT as an object, i.e., details about the digital asset. An NFT’s metadata may include details like the name of the file. Deeper in the metadata are details such as what comprises the file's content.

For example, metadata for a video NFT would be the length of the video and the images that make up its individual frames. Metadata for a profile picture (PFP) or digital art NFTs would be the specific generative properties that would define just how rare your NFT is.

However, for most NFTs, the metadata and the NFT are not one. Rather, your NFT — the digital asset itself — includes a link that points to the metadata, which lives elsewhere online. If you're a regular internet user, you know that sometimes, links die (cue the infamous “404 Page Not Found” web page). Hosting platforms don’t exist forever, and if your NFT exists on a regular website, you could potentially lose it along with all the associated value if that site shuts down for any reason.

If you do lose the connection to your NFT, you don’t necessarily lose the NFT itself, but you lose all the information that makes it look, sound, and describe the way it does. With some of these weighing in at several million dollars in some cases, this is a serious concern.

So, how does a person who owns an NFT ensure its safety and accessibility throughout their lifetime? Is it possible to secure NFT data so that it exists forever? Over the regular internet, you could probably store the digital asset details on a cloud drive which allows for access to anyone anywhere. On the decentralized web, the solution is somewhat different and involves a unique file system with perpetual accessibility.

## IPFS and Metadata Storage

What if there was a way to store data in perpetuity? When developers first came up with the idea of the cloud, they [aimed to create data persistence](https://blog.ipfs.io/2021-06-03-ipfs-filecoin-content-persistence/ "IPFS, Filecoin, and Content Persistence"). While it did succeed in this endeavor partially, it created a situation where the owner of the cloud servers had complete control over the data. To rectify this potential problem (and many others), the idea for a decentralized internet was born.

When it came to storing accessible data in perpetuity, the approach had to be markedly different. How would a decentralized system provide servers owned by individuals that could offer storage to millions of users worldwide? This approach would create a new paradigm where instead of companies owning user data, individuals would maintain ownership of their data. The solution came with developing the Interplanetary File System (IPFS) and the decentralized network that interacts with it, Filecoin.

IPFS is a unique file system because it doesn't operate in the same way we usually think about file storage. A file stored on the IPFS network generates a content ID (CID) which is distributed among several independent storage providers. Even with robust content addressing, how do you know which file storage providers are most trustworthy? Filecoin provides the framework for a [reputation system](https://filecoin.io/blog/posts/reputation-systems-in-filecoin/ "Reputation Systems in Filecoin") and a [way to interact](https://filecoin.io/blog/posts/how-storage-and-retrieval-deals-work-on-filecoin/ "How storage and retrieval deals work on Filecoin") with these storage providers.

The Filecoin network allows users to store their data as CIDs with redundant storage providers, ensuring persistence across the entire network. The user then gets a CID that directs them to their file, complete and intact, drawn from one of the redundant storage providers that hold their information. Even if one of the providers goes down or is inaccessible, the user still gets their data.

As mentioned before, if your NFT link dies (and it’s not stored on IPFS), you lose access to the data contained within the digital file. This loss is the same as if a piece of art disintegrated in front of your very eyes. The IPFS system allows a user to ensure the persistence of their NFT metadata. The timelessness of IPFS combined with providers' redundant storage and accessibility options make for a resilient system that ensures a user's NFT remains safe.

What's more, IPFS even offers a free method for users to store their NFTs.

## Free NFT Storage Through IPFS

To help users of NFTs out, IPFS launched [NFT.Storage](http://nft.storage "NFT.Storage") earlier this year. NFT.Storage is dedicated to the [storage of NFTs](https://filecoin.io/blog/posts/introducing-nft.storage-free-decentralized-storage-for-nfts/ "Introducing NFT.Storage: Free Decentralized Storage for NFTs"), entirely for free. If you've spent any money on an NFT, you can easily upload the data associated with it to IPFS and Filecoin via NFT.Storage and ensure that it's preserved across time.

## A Free, Safe Way To Maintain an NFT

Most crypto enthusiasts have hopped aboard the NFT train. Not all of them are worth several million dollars, after all. Even so, NFT content owners wouldn't want to see their investment go up in smoke. Free  storage exists to help those NFT holders that want to ensure they always have access to their digital assets.

If you develop or buy NFTs and haven't looked into persistent storage for them yet, the best time is now. Don't wait until your NFTs disappear.