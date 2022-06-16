---
title: A Practical Explainer for IPFS Gateways - Part 2
description: 'Learn tips and tricks for using IPFS gateways in real-world applications - debugging, performance and more'
author: Daniel Norman
date: 2022-06-09
permalink: '/2022-06-09-practical-explainer-ipfs-gateways-2/'
translationKey: ''
header_image: '/2022-ipfs-gateways-2.png'
tags:
  - gateways
---

The Interplanetary File System (IPFS) is a peer-to-peer protocol for storing and accessing **files and websites**. As a distributed **peer-to-peer** protocol, it's fundamentally different from the HTTP protocol. With the help of IPFS Gateways, it's possible to reap the benefits of IPFS using the HTTP protocol.

This blog post is the second of a two-part series about IPFS gateways.

[Part one](https://blog.ipfs.io/2022-06-09-practical-explainer-ipfs-gateways-1/) covers the principles behind IPFS, the challenges with the client-server model, how IPFS approaches these challenges with peer-to-peer networking and content addressing, the relationship between IPFS and HTTP(S), and finally an introduction to IPFS HTTP gateways and resolution styles.

In this second part, you will learn practical tips and tricks for using IPFS gateways in real-world applications:

- Common use-cases and trade-offs with IPFS gateways
- Debugging
- Improving CID access performance and reliability from the IPFS network
- Differences between IPFS gateways
- Caching and 
- Pinning, pinning services
- Integration with DNS
- Running IPFS nodes and gateways.

## Wait, but why IPFS Gateway?

To give this blog post some context, we'll start with a high-level summary of approaches for using IPFS in applications:

- Using IPFS gateways
- Running an IPFS node
- Embedding IPFS as part of an application (either in the browser or on the server)
- Some combination of the options above

IPFS gateways are especially useful when you want to leverage all the existing developer tooling and your experience with HTTP while abstracting much of the complexity of the distributed IPFS network.

Still, building applications on top of IPFS gateways comes with trade-offs. Just because IPFS gateways abstract the distributed aspect of IPFS, doesn't mean it's gone.

## Not all IPFS Gateways are equal



## How to use IPFS gateways

To use an IPFS gateway, you need to know two things:

- The CID (Content Identifier), e.g. `bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm`
- The address of the IPFS gateway

### Resolution style

The **resolution style** refers to how you construct a URL for a given CID.

Depending on your use case you can choose from one of two resolution styles.:

- **Path resolution** where the CID is in the path portion of the gateway URL, e.g. https://ipfs.io/ipfs/bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm
- **Subdomain resolution** where the CID is in the host portion of the URL, as a subdomain of the gateway host, e.g., https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.dweb.link

Subdomain resolution is the recommended style for serving content over HTTP gateways, especially if you're using IPFS to host websites and applications. This is because web browsers provide security isolation on a per-domain basis (See [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) for more).

With the subdomain style, every CID subdomain gets its own "namespace" for things like cookies and local storage, which isolates things from other web content stored on IPFS.

If a CID points to a directory listing as in the case of a website, you can use the path portion of the URL to specify the filename. For example, below is the URL for one of the images on the IPFS website:

https://bafybeih42hd2kjcr7o2f72jinvwotlfn24hppwnfl34lku3665cyp4gipe.ipfs.dweb.link/images/command-line-hex.png

If you remove the path, from the URL you will get the root of a recent version of the IPFS website (remember, CIDs are immutable so every change to the IPFS website creates a new CID)

### Public gateways

Public gateways as the name suggests are IPFS gateways that allow anyone to use HTTP to fetch CIDs from the IPFS network.

You can find public gateway operators in the [public gateway checker](https://ipfs.github.io/public-gateway-checker/) and check whether they are online and the latency from your location.

Beware that many of the public gateways are provided on a best-effort basis without any SLA. Follow along on how to ensure the reliable availability of your content.

To demonstrate using a public gateway, open one of the URLs below of an image of Astronaut Jessica Watkins from the first example, which was originally hosted on the NASA servers and has been uploaded to the IPFS network, the corresponding CID for the image is `bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm`.

- https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.infura-ipfs.io
- https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.dweb.link
- https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.cf-ipfs.com
<!-- removed as it races - https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.nftstorage.link -->

If you opened more than one of the gateway links, you may have noticed that they had different loading times. **This is because some gateways might not have the CID cached locally, so they have to ask the network and fetch the file from another IPFS node to serve your HTTP request.**

This means if your CID isn't well replicated in the IPFS network, fetching a CID from a gateway can take anywhere between milliseconds to the order of tens of seconds – obviously suboptimal if you're building an app that requires fast loading times.

In the next part, you will learn about some approaches to improve CID request latency and ensure reliable access to your CIDs when using IPFS gateways.

## Abuse & Dedicated gateways

https://medium.com/pinata/announcing-dedicated-ipfs-gateways-60f599949ce

https://blog.infura.io/post/introducing-ipfs-dedicated-gateways

## Improving performance and reliability when fetching CIDs from IPFS

Given the decentralized nature of IPFS, improving the reliability and request latency of your CIDs through an IPFS gateway depends on many factors:

- Whether the IPFS gateway has the CID cached.
- Which gateway you are requesting the CID from?
- The amount of traffic and load on the IPFS gateway
- The number of IPFS nodes **pinning** the CID.
- Is there a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) in front of the IPFS gateway?
- The network distance (round-trip time) between the requester and the IPFS gateway.
- [HTTP Cache](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) headers

Taking all these into consideration makes it hard to give generic advice. Nonetheless, understanding the factors influencing the performance can help you navigate the space of potential solutions.

Some are these factors are within your control. The section below will cover some concrete tips you can take to improve performance and reliability. But first, let's go into the subtle differences between pinning.

### Caching vs. pinning

As mentioned earlier, an IPFS gateway in its simplest form is an IPFS node with its HTTP gateway port open. When you request a CID, it will be returned quickly if the IPFS node has the CID cached or pinned. If not, it has to search the network.

Existing IPFS [implementations](https://ipfs.io/#install) have a fairly aggressive caching mechanism that will keep an object local for a short time after the node has fetched it from the network, but these objects may get garbage-collected regularly, especially when a public gateway is used.

Pinning is the mechanism that allows you to tell IPFS to **always** store a given CID — by the default on your local node. In addition to local pinning, you can also pin your CIDs to [remote pinning services](https://docs.ipfs.io/how-to/work-with-pinning-services/).

In other words, caching is the mechanism by which CID is kept around on the node for a short period until garbage-collected while pinning is a deliberate choice you make to keep the CID stored on the node.

This is why requesting a CID for the first time from a gateway can take time while subsequent requests are typically faster.

### Tip 1: Pin your CIDs to multiple IPFS nodes

Drawing on the principles laid out above, it's sensible to pin your CIDs to multiple IPFS nodes to ensure reliable availability and fast fetching. These can be either IPFS nodes that you are operating or pinning services like [Web3.storage](https://web3.storage/), [Pinata](https://www.pinata.cloud/), and [Infura](https://infura.io/product/ipfs).

To make pinning easier, there's a vendor-agnostic [Pinning Service OpenAPI Specification](https://ipfs.github.io/pinning-services-api-spec/) that is [already supported by many IPFS node implementations, client libraries, and existing pinning services](https://github.com/ipfs/pinning-services-api-spec#adoption). Using this remote pinning API, you can [implement pinning to multiple services](https://docs.ipfs.io/how-to/work-with-pinning-services/#use-an-existing-pinning-service) as part of your workflow for uploading immutable data to IPFS.

Note that pinning is not the same as adding the CID to the IPFS network. For pinning to work, the CID has to first be added to a reachable IPFS node connected to the network so that the pinning services can replicate the CID. As a convenience, most of the pinning services also offer an API for uploading a file that returns the CID.

If you're not running an IPFS node, you can start by uploading a file to one service and then using the returned CID to pin it to other services.

### Tip 2: Use a custom domain that you control as your IPFS gateway

Imagine the following scenario: you deploy your web app to IPFS which contains media with absolute URLs to a public gateway experiencing an outage. For example, your web app displays the image with an absolute path to the CID: https://bafybeibml5uieyxa5tufngvg7fgwbkwvlsuntwbxgtskoqynbt7wlchmfm.ipfs.infura-ipfs.io.

You may be able to reach your app using a different gateway, but since the web app's content is immutable, the image pointing to the Infura IPFS gateway which is down will not load.

Also, you may also want to only host specific CIDs, such as data uploaded by your users, deny serving HTML websites, or block fetching any third party content in general.

For these reasons, it's sensible to use a domain within your control to route HTTP traffic to a gateway. This approach potentially gives you the flexibility to implement additional performance optimizations.

Practically speaking, this can be implemented using several approaches depending on your willingness to run infrastructure:

- Point a domain you control, e.g., `*.ipfs.yourdomain.io` point to a reverse proxy like nginx which will proxy requests to a public gateway, allowing you to switch public gateways if there's downtime.
- Use [Cloudflare workers](https://workers.cloudflare.com/) to implement a smart proxy that races a request across multiple gateways. This is the approach taken by the [NFT.storage gateway](https://nft.storage/docs/concepts/gateways/#architecture) for which you can find the [source code on GitHub](https://github.com/nftstorage/nftstorage.link/tree/main/packages/edge-gateway#high-level-architecture).

<!-- ### Tip 3: Make use of the  and etag headers -->

### Tips if you're running your own HTTP gateway

- Set up [peering](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#peering) with the pinning services that store your data
- Ensure that you are correctly returning HTTP cache headers to the client if the node is behind a reverse-proxy
- Put a CDN like Cloudflare in front to reduce load on the IPFS node

### Debugging with ipfs-check - Checking retrievability of a CID

https://ipfs-check.on.fleek.co/

<!-- Caching plays a big role in gateway performance. I think some of the pinning service providers offer caching as a paid service, but I can’t recall the exact latest details.

Example: NFT.storage has a new gateway that improves retrieval performance: nftstorage.link. This gateway “races” 3 public gateways (Pinata, Cloudflare, and ipfs.io) and also caches the majority of NFTs (>70% of them).
Individually, each gateway takes ~500ms-1.5s. Combining the racing + caching, overall performance on the NFTStorage gateway ends up being ~200ms.
More info:
https://nft.storage/blog/post/2022-03-08-gateway-release/
https://nft.storage/docs/concepts/gateways/#the-nftstorage-gateway
This is not helpful for the specific pathway you’re investigating (local node > public gateway), alas. But it is probably helpful in thinking about overall tradeoffs. (edited)
 -->
<!--
### considerations for apps

- Loading time can vary depending on availability.

> Lidel: where performance matters, add logic that "prewarms" HTTP CDNs/cache, and make sure etag and cache-control headers returned by http gateway are not lost. when go-ipfs 0.13 or later is used, leverage `X-Ipfs-Roots` header for even smarter HTTP cache invalidation. -->

## Summary

TODO
