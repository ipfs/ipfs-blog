---
title: Multi-Gateway Browser Client
description: A new approach to using ipfs:// and ipns:// links in a browser.
author: John Turpish
date: 2023-04-03
permalink: "/2023-04-03-multigateway-browser-client/"
translationKey: 2023-04-03-multigateway-browser-client
header_image: "/2023-04-03-multigateway-browser-client-header.png"
tags:
- browsers

---
[IPFS](https://ipfs.io) is the preeminent protocol suite for [content-addressed networking](https://en.wikipedia.org/wiki/Content-addressable_network). If you'd like to run a node and participate in the peer-to-peer network, by all means [give it a try](https://ipfs.tech/#install)!

But what about people who don't know about IPFS, and just run across a link? What if they'd like to be able to use that link in their browser? This is what we mean by clients - software that can talk to nodes to fetch the content they want, but without running one yourself.

## What?

Most IPFS clients talk to one particular node's HTTP gateway. [Multi-Gateway Clients](https://github.com/ipfs/specs/blob/e2e80a8d8de96f4ab931b0622100a644b13709f1/integrations/MULTI_GATEWAY_CLIENT.md) split your requests to multiple gateways.

Here we're talking about [IPFS-Chromium](https://github.com/little-bear-labs/ipfs-chromium), which is an experimental racing multi-gateway client, which means the same request might get sent to multiple gateways, and the first one to get the result verified wins. And it's built into a custom-patched build of Chromium.

## Why?

This is by no means the first time IPFS has been usable in a browser, or even Chromium-based browsers in particular. Javier Fernández at Igalia has written some good explanations of other approaches that have been taken over at [his blog](https://blogs.igalia.com/jfernandez/).

Most of them share in common the idea of translating IPFS and IPNS requests, 1:1, into HTTP requests. For example, something like  
ipfs://bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4  
might be fetched from  
http://localhost:8080/ipfs/bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4/  
if you have an HTTP gateway running locally. Or maybe from
[https://ipfs.io/ipfs/bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4/](https://ipfs.io/ipfs/bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4/ "https://ipfs.io/ipfs/bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4/")  
or preferably  
[https://bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4.ipfs.dweb.link/](https://bafybeihpy2n6vwt2jjq5gusv23ajtilzbao3ekfb2hiev2xvuxscdxqcp4.ipfs.dweb.link/)

In each case, you're delegating all the "IPFS stuff" to a particular node. This is quite effective and has the advantage that it makes it easy to integrate with the IPFS ecosystem with relatively limited effort, but it involves some trade-offs.

### Performance

If the gateway you've chosen happens to have the data you're seeking already on-hand, your performance will be great. Better, in fact, than the multi-gateway client likely would be since it would have wasted requests. However, if you chose poorly, you will have poor performance. The ideal choice may very well depend on what you happen to be doing at the moment - and may differ from one of your tabs to another. A multi-gateway client will have very bad performance more rarely.

It's also conceivable that for a sufficiently large file which exists on multiple gateways you're talking to, a verifying multi-gateway client might be able to beat a single-gateway client, since you might be pulling down parts of the file from different sources concurrently. [RAPIDE](https://pl-strflt.notion.site/RAPIDE-3c4fb9e159ae471bb426bb81855cee16) is a more advanced client which also makes use of this principle (along with other things).

### Installation (vs. local gateway)

If you're reading this, installing a local node might seem like no big deal to you. However, we want to be able to reach out to people who haven't heard of IPFS, and make it easy for them to click a link, without having to think about what protocol-handling software they have installed ahead of time.

One approach to this is to have the browser install and start its own node. This is a pretty reasonable approach, but it can raise questions about when to dedicate resources to installation or the node's daemon. The most notable example of this approach is [Brave](https://brave.com/ipfs-support/).

Including client-only IPFS capabilities in a Chromium-based browser doesn't change the installation experience in a noticeable way.

### Privacy (vs. 1 public gateway)

If all your IPFS and IPNS requests go to the same gateway over HTTP(S) - one you don't control - whoever is running that gateway can monitor everything you're looking at. Not just the things you might be requesting from that organization (as with a normal HTTP website), but anything for any website hosted on IPFS.

### Security (vs. 1 public gateway)

Content-addressed networking involves a validation step to make sure that the data you received matches the hash requested (it's a part of the CID). When you're requesting a file from an HTTP gateway, the verification of the content is delegated to the node running the gateway. Further, if you receive the entire file as a response to a single HTTP request, it's actually no longer possible to verify locally.

This is probably fine if the gateway you're talking to is one you're running locally. Presumably you trust that software as much as you trust your own browser.   Even if public IPFS gateways today are consistently and reliably returning the correct results, nonetheless the possibility exists, and it would be preferable if we didn't have to trust.

ipfs-chromium uses the [trustless gateway](https://github.com/ipfs/specs/blob/main/http-gateways/TRUSTLESS_GATEWAY.md) API and verifies the retrieved content locally.

## Where (is the code)?

In the repo you'll see separation between "component" and "library", where the former contains Chromium-specific code, and the latter contains code that helps with IPFS implementation details that can build without Chromium.

This distinction disappears when you switch over to the Chromium build. Both sets of source are dumped into a component (basically a submodule) called "ipfs", that implements the handling of ipfs:// and ipns:// URIs.

Those who embed Chromium into another application generally provide an implementation of a couple of interfaces, namely `ContentClient` and `ContentBrowserClient`. They would need to add a little code to their implementations to use the ipfs component. Our repo contains a patch file which alters Chrome's implementations of these two as a demonstration to show how usage might work. That patch file might be useful as-is to someone who uses a patching approach to make a Chromium-derived browser.

## How (in more detail)?

### Hooking into Chromium

* The ipfs and ipns schemes are registered in [`ContentClient::AddAdditionalSchemes`](https://source.chromium.org/chromium/chromium/src/+/main:content/public/common/content_client.h;l=156?q=AddAdditionalSchemes), so that the origin will be handled properly.
* An interceptor is created in [`ContentBrowserClient::WillCreateURLLoaderRequestInterceptors`](https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/content_browser_client.h;l=1733?q=WillCreateURLLoaderRequestInterceptors), which just checks the scheme, so that `ipfs://` and `ipns://` navigation requests will be handled by components/ipfs.
* URL loader factories created for ipfs and ipns schemes in [ContentBrowserClient::RegisterNonNetworkSubresourceURLLoaderFactories](https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/content_browser_client.h;l=1503?q=RegisterNonNetworkSubresourceURLLoaderFactories), so that in-page resources with ipfs/ipns URIs (or relative URLs on a page loaded as ipfs://), will also be handled by components/ipfs.

### Issuing HTTP(S) requests to gateways

The detailed steps of the algorithm are laid out in [the design doc](https://github.com/little-bear-labs/ipfs-chromium/blob/main/DESIGN.md), but here's the basic idea:

* An IPFS link will have a CID mentioned in the URI. This is the root of its DAG and will be the first block needed to access the file/resource.
* For any given block that is known to be needed, but not present in-memory, send requests to up to 10 gateways which haven't responded with an error for this CID yet and don't currently have pending requests to them. These requests have `?format=raw` so that we'll get just the one block, not the whole file.
* When a response comes from a gateway, hash it according to the algo specified in the CID's multihash. Right now, that has to be sha-256, and luckily it generally is. If the hashes don't match, the gateway's response gets treated much like an error - the gateway gets reduced in priority, and a new request goes out to a gateway that hasn't yet received this request.
* If the hashes are equal, store the block, process the block as described in Codecs (below). If the new node includes links to more blocks we also need, send requests for those blocks.
* When the browser has all the blocks needed, piece together the full file/resource and create an HTTP response and return it, as if it had been a single HTTP request all along.

### Codecs

If a CID is V0, we assume the codec is PB-DAG. Other CIDs specify the codec, and right now we support these 2:

#### RAW

A block of this type is a blob - a bunch of bytes. We'll populate the body of the response with it.

#### PB-DAG

That's ProtoBuf-encoded Directed Acyclic Graph. A block of this type is a node in a DAG, and contains some bytes to let you know what kind of node it is. There is one very special and important type of node ipfs-chromium deals with a lot:

##### UnixFS Node

The payload of these nodes have another ProtoBuf layer, and the DAG functions in a conceptually similar way to a read-only file system.

Not all kinds of UnixFS nodes are fully handled yet, but we cover these:

###### File (simple case)

These nodes each have a data byte array that is the contents of a file. We'll use those bytes as the body of a response.

###### File (multi-node)

In UnixFS a node can represent a file as the concatenation of other file nodes, to which it has links. The decision to use this kind of node generally has to do with the size of the file. A single node can't be much more than a megabyte, so files larger than that get cut into chunks and handled as a tree of nodes. There are a couple of reasons for that:

* Data deduplication (it's possible the same sequences of bytes, and thus same CID, appears in multiple files or even within the same file)
* In the case that a gateway were malicious, we wouldn't want to wait until a file of potentially unbounded size finishes downloading before we verify that it's correct. It is worth mentioning that as of today ipfs-chromium does not enforce this limit.
* It enables the possibility that one could concurrently fetch different parts of the file from different gateways.

If we have all the nodes linked-to already, we can concatenate their data together and make a response body out of it. If we don't, we'll convert the missing links to CIDs and request them from gateways.

###### Directory (normal)

In this case the 'data' isn't really important to us. The links, however, represent items in the directory.

* If your URI has a path, find the link matching the first element in the path, and repeat the whole process with that link's CID and the remainder of the path.
* If you don't have a path, we'll assume you want `index.html`
  * If there's no index.html we'll generate an directory listing HTML file for you.

###### [HAMT](https://en.wikipedia.org/wiki/Hash_array_mapped_trie) (sharded) Directory

This is for directories with just too many entries in them. The links from this directory node might be entries in the directory or they might be other HAMT nodes referring to the same directory (basically, the directory itself is getting split up over a tree of nodes).

* If you're coming in from another HAMT node, you might have some unused bits of the hash to select the next child.
* If you have a path, hash the name of the item you're looking for, pop the correct number of bits off the hash, and use it to select which element you're going to next.
* If you don't have a path, we'll assume you want `index.html`.
* We don't generate listings of sharded directories today, and this isn't a high-priority as it's an unreasonable use case.

### Dealing with ipns:// links

The first path element after ipns:// is the "name".

* If the name is formatted as a CIDv1, and has its codec set to "libp2p-key", ipfs-client will retrieve a signed record of what it points at from a gateway, and then load that content.
  * Today it does not verify the signature, this is planned for the near future.
  * Note: not all CID multibase encodings are supported yet.
* If the name is not formatted as a CIDv1, a DNS request is created for the appropriate TXT record to resolve it as a DNSLink.

IPNS names may point to other IPNS names, in which case this process recurses. More commonly they point at an IPFS DAG, in which case ipfs-chromium will then load that content as described above.

## Bottom Line

So, in the end, the user gets to treat `ipfs://` links to snapshotted data like any other link, gets the result in a reasonable timeframe, and can rely on the data they get back being the correct data.

ipns:// URIs of the DNSLink variety rely only on DNS being accurate.

Regular ipns:// URIs will be verified by the cryptographically signed [record](https://github.com/ipfs/kubo/pull/9399).

## Trying it out

If you want to try this yourself today, you need to [build it](https://github.com/little-bear-labs/ipfs-chromium/blob/main/BUILDING.md) from source.

If you'd just like to see it in action, here are the links I use in the video below:

* [ipfs://bafybeifufjbspyjxki5bv62caao4kz5uqlpd73pcfytfdhwsa63sobmqlm/](ipfs://bafybeifufjbspyjxki5bv62caao4kz5uqlpd73pcfytfdhwsa63sobmqlm/) - a snapshot of this blog post
* [ipns://bafzaajaiaejcaxykhmgsz2mhscluhm6bkliibattya2l2lld7scqr64c4ine2u7c/](ipns://bafzaajaiaejcaxykhmgsz2mhscluhm6bkliibattya2l2lld7scqr64c4ine2u7c/) - a mutable pointer to the current version of this blog
* [ipns://docs.ipfs.tech](ipns://docs.ipfs.tech) - The IPFS documentation.
* [ipns://en.wikipedia-on-ipfs.org/wiki/](ipns://en.wikipedia-on-ipfs.org/wiki/) - Wikipedia, as a DNS Link
* [ipns://ipfs.io/](ipns://ipfs.io/) - an unusual case: a DNSLink to another DNSLink
* [https://littlebearlabs.io](https://littlebearlabs.io) - an HTTPs URL for comparison.

<video style="width:70%" controls autoplay loop playsinline><source src="../assets/tryitout.webm" /><source src="../assets/tryitout.mkv" /><source src="../assets/tryitout.mp4" /></video>

## Who?

[Little Bear Labs](https://littlebearlabs.io) and [Protocol Labs](https://protocol.ai)
