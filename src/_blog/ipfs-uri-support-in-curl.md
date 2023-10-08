---
title: IPFS URI support in CURL
description: 'CURL 8.4.0 shipped with built-in support for ipfs:// and ipns:// addresses.'
author: Mark Gaiser
date: 2023-10-7
permalink: '/ipfs-uri-support-in-curl/'
header_image: '/ipfs-calendar/ipfs-calendar-cover.png'
tags:
  - 'community'
---

# IPFS URI support in CURL

[CURL 8.4.0](https://github.com/curl/curl/releases/tag/curl-8_4_0) shipped with built-in support for `ipfs://` and `ipns://` addresses.

This enables `curl` to seamlessly integrate with the user's preferred [IPFS gateway](https://docs.ipfs.tech/reference/http/gateway/) through the `IPFS_GATEWAY` environment variable or a `gateway` file. Best of all, these capabilities are available for immediate use today:

```bash
$ export IPFS_GATEWAY="http://127.0.0.1:8080" # local gateway provided by ipfs daemon like Kubo
$ curl ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey -s -L
hello from IPFS
```

In this blog post, we will:
- explore the journey of implementing IPFS URI support in CURL,
- delve into the mechanics of [how CURL locates an IPFS gateway](#how-does-curl-find-an-ipfs-gateway),
- learn how to be immune to [malicious gateways](#malicious-gateways-and-data-integrity),
- and finally, provide [practical CURL examples](#curl-examples) for leveraging IPFS URIs for either deserialized or verifiable responses.

## A brief history

Supporting IPFS in CURL has been attempted [before](https://github.com/curl/curl/pull/8468) as a CURL library feature. Some discussions lead to a belief that this should be implemented in the CURL tool itself, not it's library. A renewed [implementation attempt](https://github.com/curl/curl/pull/8805) took the tool-side approach which ultimately was accepted and is available right now in CURL 8.4.0!

The support of IPFS in CURL is effectively consisting of two implementation details.

1. CURL tries to find a locally installed or [configured gateway](#how-does-curl-find-an-ipfs-gateway).
2. It then rewrites an `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` to a gateway URL. This is how curl handles it internally, you see nothing of this URL rewriting.

If you have IPFS installed locally then running:
`curl ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`
will just work.

## Why ipfs:// URI support is so important?

This question keeps coming up. Why-o-why do we find it so important to have IPFS support in CURL, even if it's just a fancy URL rewriter?
 
Why isn't `https://ipfs.io/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` equally acceptable? Or why isn't a local url like `http://localhost:8080/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` fine?

I'll have to repeat one of the core concepts of IPFS here. IPFS is a distributed network in which you access content. It shouldn't matter where that content is. The "where" part should not be provided. If you do proovide this where part (a gateway is a central point of entry, the where part) then you limit your access to IPFS through that one point of entry.

If we pull the URL apart we see:

![](https://hackmd.io/_uploads/Bk2MV-9ea.png)

As a user of IPFS you should not care about the **where** part because you're now limited to however available that central access point is.

An example of a direct limitation. There are gateways out there that don't allow playback of video through their gateway or that bandwidth-throttle such content. This isn't a limitation of IPFS but is purely a limitation a gateway has set through custom configuration. You have no such limitation if you were to be using your own local node with a local gateway.

Another example. Say you use `ipfs.io` as gateway. Now if that gateway starts throttling users, or gets sensored by ISPs then to you it looks like "IPFS isn't working" while the data might be well accessible, just not momentarily via that gateway. Even though gateways like `ipfs.io` and `dweb.link` are themselves connected to vast numbers of peers, it's worth nothing if the http gateway endpoint has a momentarily hiccup. Beyond the connectivity aspect, a gateway is hosted by someone. If you use a gateway you use their resources and bandwidth!

This is why running a local node (and therefore a local gateway, it's part of a node) is so important. Even though you still effectively use `http://localhost:8080` as gateway, it's hosted by you locally backed by the many peers your node is connected with. Your experience in using IPFS is going to be best and fastest with a local node. Even when your local gateway isn't working it's easy for you to restart your node and get that gateway back and running. You can't do that on public gateways that you don't control.

One of the many reasons why we're putting in the effort to make applications recognize IPFS URIs (like [ffmpeg](https://blog.ipfs.tech/2022-08-01-ipfs-and-ffmpeg/)) `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` is to let the application in the background find that gateway you're running and giving you the freedom of being truly distributed! This also allows url's to be shared as IPFS url's (like `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`) without any trace of a (central) gateway and bring us one step closer to a distributed world where it doesn't matter anymore where that data is located.

## How does CURL find an IPFS Gateway?

Any IPFS implementation that has support for [IPIP-280](https://github.com/ipfs/specs/pull/280) exposes an IPFS gateway that CURL (and [ffmpeg](https://blog.ipfs.tech/2022-08-01-ipfs-and-ffmpeg/)) can use. At the moment of writing that's just [Kubo](https://github.com/ipfs/kubo/releases).

CURL 8.4.0 and greater looks for a gateway in the following order:

1. `IPFS_GATEWAY`, if set it's used.
2. The `--ipfs-gateway` argument.
3. The `~/.ipfs/gateway` file where it reads the first line.

If a gateway is found at any of those places, and if that is a valid http(s) URL then CURL will use it. If not then you'll be getting an arror message pointing to the [CURL documentation related to IPFS](https://curl.se/docs/ipfs.html) to help you further.

Note that you can just specify any gateway in any of these places, it's highly recommended to use a local gateway!

## Malicious gateways and data integrity?

Requesting deserialized responses and delegating hash verification to a third-party gateway comes with risks. It is possible that a public gateway is malicious. Or, that a well-known and respected gateway gets hacked and changed to return payload that does not match requested CID. How can one protect themselves against that?

If deserialized responses are necessary, one should run own gateway in a local, controlled environment. Every block of data retrieved though self-hosted IPFS gateway is verified to match the hash from CID.  For the maximum flexibility and security, find implementation that provides the gateway endpoint (i.e. [Kubo](https://docs.ipfs.tech/install/command-line/)) and run it yourself!

When using a third-party gateway that one can't fully trust, the only secure option is to [request verifiable response types](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) such as [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) (a single block) or [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) (multiple blocks in CAR archive). Both allow to locally verify if the data returned by gateway match the requested CID, removing the surface for [Man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

## CURL Examples

::: callout

**NOTE on HTTP redirects**

The URI resolution in `curl` does not follow redirects by default and assumes the endpoint implements deserializing [path gateway](https://specs.ipfs.tech/http-gateways/path-gateway/) or at the very least, the [trustless gateway](https://specs.ipfs.tech/http-gateways/trustless-gateway/).
When pointing `curl` at a [subdomain gateway](https://specs.ipfs.tech/http-gateways/subdomain-gateway) (like `https://dweb.link` or the `http://localhost:8080` provided by a local Kubo node) one has to pass `-L` in the curl command to follow the redirect.

:::

### Playing Big Buck Bunny (CURL + ffplay)
```
curl ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi | ffplay -
```

### Downloading a file from IPFS with CURL
```bash
curl ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi -o bbb.webm
```

### Explicitly specifying a gateway
```bash
IPFS_GATEWAY=http://localhost:8080 curl ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi
```

### Handling redirects
You have to explicitly tell curl to handle redirects for security reasons.
```bash
curl -L ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi
```

### Piping data and follow redirect
In this case the data is piped to the `file` utility in linux. We need to tell curl to be silent `-s` and to follow the redirects `-L`:
```bash
IPFS_GATEWAY=https://dweb.link curl -s -L ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi | file -
```

Which tells us:
```
/dev/stdin: WebM
```

## What's next?

integration. Everyone can integrate `ipfs://` and `ipns://` URI support into their application. See [IPIP-280](https://github.com/ipfs/specs/pull/280) for details. We are [tracking potential project](https://github.com/ipfs/integrations/issues) where an integration makes sense! If you feel up to the challenge, don't hesitate to drop a comment in one of the [potential projects](https://github.com/ipfs/integrations/issues) for IPFS URI integration or find us on:

* [Slack](https://filecoin.io/slack)
* [Discord](https://discord.com/invite/ipfs)
* [Forum](https://discuss.ipfs.tech/)

Or one of the other many places where the [IPFS comunity](https://docs.ipfs.tech/community/) is active.

