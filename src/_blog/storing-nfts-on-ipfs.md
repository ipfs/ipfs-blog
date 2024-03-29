---
tags:
- NFTs
title: Storing NFTs on IPFS
description: Stand the test of time — learn best practices for IPFS addressing and
  storage for NFT data.
author: Yusef Napora, Mitch Wagner
date: 2021-04-05
permalink: "/2021-04-05-storing-nfts-on-ipfs/"
translationKey: ''
header_image: "/128-nft-header.png"

---
Permanence and immutability are part of the core value proposition of a non-fungible token (NFT). Unfortunately, many NFTs being targeted at consumers today offer neither of these properties due to fundamental design flaws. It is common to hear claims that NFTs “live on a blockchain forever”, but frequently, due to the cost and space limitations of storing data on a blockchain, only the ownership _record_ is actually stored, with metadata linking to the actual content of the NFT.

All too often, [these links are fragile](https://www.vice.com/en/article/pkdj79/peoples-expensive-nfts-keep-vanishing-this-is-why), and direct the user to a specific _location_ using the HTTP protocol, rather than a specific asset. This means that the content pointed to by the link could change or go offline at any point in the future, leaving the original asset lost forever (and the record of ownership worthless).

The InterPlanetary Filesystem (IPFS) can help address these concerns, and NFTs that leverage IPFS gain several advantages. However, adhering to established conventions is critical to ensure the permanence and accessibility of data stored on the network. With non-fungible tokens (NFTs) surging in popularity, it’s a good time to revisit best practices for linking and storing NFT data on IPFS. In this post, we’ll address two areas of recent concern in particular: content addressing and content integrity. You can find more details on the IPFS documentation site, in our new article [Best Practices for Storing NFT Data using IPFS](https://docs.ipfs.tech/how-to/best-practices-for-nft-data/). Also, check out [NFT School](https://nftschool.dev/ "NFT School") for a variety of tutorials, how-tos and concept guides on NFT best practices and NFTs in general.

## Content Addressing

IPFS [content identifiers](https://docs.ipfs.tech/guides/concepts/cid/) (CIDs) are an extremely robust and flexible way to uniquely identify any content, no matter where or how it is stored. To take maximum advantage of these strengths, developers should adhere to the following recommendations and conventions for linking to IPFS data.

### Linking Overview

This blog post is not intended to be a comprehensive explanation of CIDs (for that, see other [fantastic resources](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#dweb-addressing-in-brief)). However, readers should be aware of the following distinctions:

#### CID

A CID is a self-describing, unique identifier for a piece of content.

Example: `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

CIDs should be used inside your application code and in other contexts where it’s unambiguous whether you’re using IPFS or some other system.

We recommend converting CIDs to IPFS URIs whenever storing them on disk, especially in metadata and blockchain records that can’t be altered after creation. Including the `ipfs://` URI scheme adds important context to a CID that clearly shows users and automated tooling how to find the content.

#### IPFS URI

A [Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`. The URI can optionally include a path appended to the end.

Examples:

* `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
* `ipfs://bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta/nft.mp4`

IPFS URIs are the canonical representation for an IPFS link pointing at a file or a directory. When linking from a smart contract to IPFS data, use IPFS URIs to clearly indicate that the data should be retrieved using IPFS.

IPFS URIs should also be used inside the structured metadata for NFTs when linking to images and other media assets stored on IPFS.

#### HTTP Gateway URL

[HTTP gateways](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#http-gateways) provide interoperability for legacy browsers that cannot resolve IPFS URIs natively. Such links should only be used in an application’s presentation layer, and should not be stored on a blockchain or inside NFT metadata.

Example: `https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

Note that HTTP gateways _recentralize the distribution of content_, presenting both a man-in-the-middle vector and single point of failure — if the gateway operator goes offline or is unreachable, the link will break. However, browsers with built-in support for IPFS (either via the [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) browser extension, or via native support, such as [provided by Brave](https://brave.com/ipfs-support/)) are immune to these problems, as they can _automatically_ extract the CID from such links, and load the data from IPFS according to user preferences.

### Addressing in Various Contexts

Developers should format links differently, depending on context.

#### On-Chain

An NFT smart contract should return an IPFS URI to the assets and metadata associated with each token.

For example: `ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`

We recommend generating the IPFS URI before minting each token and storing the full URI on-chain. This is the simplest way to conform to smart contract interfaces that expect a URI, and the ipfs:// URI scheme makes it easy for any distributed app to see that the data is available using IPFS.

#### Metadata

In token metadata, IPFS URIs should be used as the most unambiguous and future-proof method of linking to IPFS resources in plain text.

Here’s an example of an IPFS URI that references an NFT media asset: `ipfs://bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta/nft.mp4`

Developers may optionally wish to include links to public [HTTP gateways](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#http-gateways) for legacy interoperability.

Other alternatives for linking to the content (e.g., non-gateway HTTP URLs) should ideally be avoided. As the content served over HTTP from a particular location is subject to change, such a link cannot be relied upon as anything other than a temporary content mirror. On a blockchain, where data is permanently and immutably stored, referencing content via HTTP is thus fragile and risky.

In contrast, IPFS URIs are valid forever, and as such, may safely be considered the canonical link for their data. By using an IPFS URI as the “source of truth” for links, an application can easily support multiple storage solutions or switch to different gateways over time, simply by generating new gateway links. This is more flexible than “hard-coding” a specific gateway into a permanent blockchain record.

#### Application

In user-facing applications, developers should link to IPFS content via both:

1. An IPFS URI
2. An HTTP gateway URL

until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of link can easily be generated from a raw CID or IPFS URI as needed.

Here is an example of an HTTP gateway URL targeting the public gateway at dweb.link:

https://dweb.link/ipfs/bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta/nft.mp4

The same link can be written with the CID as a subdomain, instead of in the URL path:

https://bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta.ipfs.dweb.link/nft.mp4

Both examples correspond to this canonical IPFS URI: `ipfs://bafybeigvafaks2bvivtv46n2z7uxszpvl25jhvzc6dbhnjjgjkbeia5jta/nft.mp4`

## Integrity

A major concern for NFTs is the integrity of the asset - this includes both the asset itself and any data associated with it. IPFS protects the integrity of NFT data by using CIDs to validate that nothing has changed since the link was created.

Developers should adhere to the following recommendations to gain the most benefit from IPFS's built-in data validation.

### Linking Metadata to its Asset

A token’s metadata should be considered integral to the value of an NFT. Thus, to preserve the asset’s value, metadata should be stored on IPFS with the asset, to ensure that both remain accessible.

The preferred method for achieving this is as follows:

1. Create two new directories (one for the asset, and one for the metadata)
2. Add the asset to its directory
3. Add the asset’s directory to IPFS, noting its CID
4. Create the metadata in its own directory, referencing the asset using the CID from (3) to create an IPFS URI. The URI should include the CID of the directory and the filename of the asset.
5. Add the metadata’s directory to IPFS, noting its CID
6. Use the CID from (5) to create an IPFS URI for the metadata and store the URI on-chain to form the record of ownership

This process both preserves the ability of developers to include filenames in their links (valuable for user interaction), while ensuring that the metadata and asset can be referenced independent of each other.

* The metadata will be accessible at: `ipfs://{metadata-directory-CID}/metadata-filename`
* The asset will be accessible at: `ipfs://{asset-directory-CID}/asset-filename`

Here’s an example of some JSON metadata that contains an IPFS URI linking to an image file:

```json
{
  "name": "No time to explain!",
  "description": "I said there was no time to explain, and I stand by that.",
  "image": "ipfs://bafybeidfjqmasnpu6z7gvn7l6wthdcyzxh5uystkky3xvutddbapchbopi/no-time-to-explain.jpeg"
}
```

The image can be fetched using the IPFS URI `ipfs://bafybeidfjqmasnpu6z7gvn7l6wthdcyzxh5uystkky3xvutddbapchbopi/no-time-to-explain.jpeg`. For presentation, your application can create a gateway URL to allow users to fetch the image using HTTP, for example, https://dweb.link/ipfs/bafybeidfjqmasnpu6z7gvn7l6wthdcyzxh5uystkky3xvutddbapchbopi/no-time-to-explain.jpeg

Once the metadata has been created, it is stored as a JSON file on IPFS, and the resulting CID is used to create a URI like `ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`, which can be stored in a smart contract.

To see a working example of this process in action, check out [How to Mint NFTs with IPFS](https://docs.ipfs.tech/how-to/mint-nfts-with-ipfs/#a-short-introduction-to-nfts) on the IPFS documentation site, which shows the whole process in detail using javascript.

### High Availability

One of the primary reasons for using a decentralized network like IPFS to serve content is to forestall [link rot](https://en.wikipedia.org/wiki/Link_rot). This is achieved by allowing other nodes in the network to mirror data via cohosting. However, developers wishing to ensure the availability of content should not rely on the altruism of other nodes. To ensure that linked content remains available, developers should host it themselves by [pinning](https://docs.ipfs.tech/concepts/persistence/) the CIDs of the content on IPFS nodes they manage, preserving and distributing the content alongside any others who wish to help. Should they prefer, developers can also delegate this responsibility via [pinning services](https://docs.ipfs.tech/how-to/work-with-pinning-services/).