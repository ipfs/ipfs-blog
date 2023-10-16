---
title: IPFS URI support in CURL
description: 'CURL 8.4.0 shipped with built-in support for ipfs:// and ipns:// addresses.'
author: Mark Gaiser
date: 2023-10-7
permalink: '/ipfs-uri-support-in-curl/'
header_image: '/curl.png'
tags:
  - 'community'
  - 'URI'
  - 'HTTP'
  - 'curl'
---

# `ipfs://` URI support in `curl`

[CURL 8.4.0](https://github.com/curl/curl/releases/tag/curl-8_4_0) shipped with built-in support for `ipfs://` and `ipns://` addresses.

This enables `curl` to seamlessly integrate with the user's preferred [IPFS gateway](https://docs.ipfs.tech/reference/http/gateway/) through the `IPFS_GATEWAY` environment variable or a `gateway` file. Best of all, these capabilities are available for immediate use today:

```bash
$ export IPFS_GATEWAY="http://127.0.0.1:8080" # local (trusted) gateway provided by ipfs daemon like Kubo
$ curl ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey
hello from IPFS
```

In this blog post, we will:
- explore the journey of implementing IPFS URI support in CURL,
- delve into the mechanics of [how CURL locates an IPFS gateway](#how-does-curl-find-an-ipfs-gateway),
- learn how to be immune to [malicious gateways](#malicious-gateways-and-data-integrity),
- and finally, provide [practical CURL examples](#curl-examples) for leveraging IPFS URIs for either deserialized or verifiable responses.

## A brief history

Supporting IPFS in CURL has been attempted [before](https://github.com/curl/curl/pull/8468) as a CURL library feature. Some discussions lead to a belief that this should be implemented in the CURL tool itself, not its library. A renewed [implementation attempt](https://github.com/curl/curl/pull/8805) took the tool-side approach which ultimately was accepted and is available right now in CURL 8.4.0!

The support of IPFS in CURL is effectively consisting of two implementation details.

1. CURL tries to find a locally installed or [configured gateway](#how-does-curl-find-an-ipfs-gateway).
2. It then rewrites an `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` to a gateway URL. This is how curl handles it internally, you see nothing of this URL rewriting.

If you have IPFS installed locally then running `curl ipfs://` will Just Work™. If not, CURL will return an error with details about how to set up the gateway preference. This ensures the user agency is respected, no third-party gateway is used as implicit default.

## Why `ipfs://` URI support is so important?

Why isn't `https://ipfs.io/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` equally acceptable?
Or why isn't a local URL `http://localhost:8080/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` fine?

Both addresses are tied to a specific _location_.

IPFS is a modular suite of protocols purpose built for the organization and transfer of [content-addressed](https://docs.ipfs.tech/concepts/content-addressing) data. It shouldn't matter where the content is. Content Identifier ([CID](https://docs.ipfs.tech/concepts/glossary/#cid)) is all that is required. The "where" part is implementation detail an IPFS system takes care of. Hardcoding a location in addition to a CID (like a specific HTTP gateway) limits end users to IPFS resources available through that one specific, centralized point of entry.

If we pull the URL apart we see:

![](https://hackmd.io/_uploads/Bk2MV-9ea.png)

Users of the IPFS system should not care about the _where_ part, nor be coerced to use a specific, hard-coded entry point into the system.

Public gateways like `ipfs.io` are always owned by some entity and could get censored or shut down at any time. Many gateways will not allow playback of deserialized videos or only respond to CIDs from allowlists to reduce costs. Other gateways will block specific CIDs from resolving in specific jurisdictions for legal reasons. Community-run public gateways will have limits and throttle usage.

These are not limitations of IPFS but purely a limitation a specific gateway has set through custom configuration. IPFS user should always have ability to avoid such limitations if they choose to self-host and [run their own IPFS node with a local gateway](https://docs.ipfs.tech/install/).

<!-- TODO: remove? feels like duplicate of we already say in this and "malicious" sections, but mentioning ffmpeg blogpost feels like something we should  keep somewhere

This is why running a local node (and therefore a local gateway, it's part of a node) is so important. Even though you still effectively use `http://localhost:8080` as gateway, it's hosted by you locally backed by the many peers your node is connected with. Your experience in using IPFS is going to be best and fastest with a local node. Even when your local gateway isn't working it's easy for you to restart your node and get that gateway back and running. You can't do that on public gateways that you don't control.

One of the many reasons why we're putting in the effort to make applications recognize IPFS URIs (like [ffmpeg](https://blog.ipfs.tech/2022-08-01-ipfs-and-ffmpeg/)) `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` is to let the application in the background find that gateway you're running and giving you the freedom of being truly distributed! This also allows url's to be shared as IPFS url's (like `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`) without any trace of a (central) gateway and bring us one step closer to a distributed world where it doesn't matter anymore where that data is located.

-->

## How does CURL find an IPFS Gateway?

Any IPFS implementation that has support for [IPIP-280](https://github.com/ipfs/specs/pull/280) exposes an IPFS gateway that CURL (and [ffmpeg](https://blog.ipfs.tech/2022-08-01-ipfs-and-ffmpeg/)) can use. At the moment of writing that's just [Kubo](https://github.com/ipfs/kubo/releases).

CURL 8.4.0 and greater looks for a gateway in the following order:

1. `IPFS_GATEWAY`, if set it's used.
2. The `--ipfs-gateway` CLI argument.
3. The `~/.ipfs/gateway` file, where it reads the first line.

If a gateway hint is found at any of those places, and if that is a valid HTTP URL, then CURL will use it. If not, then you'll be getting an error message pointing to the [CURL documentation related to IPFS](https://curl.se/docs/ipfs.html) to help you further.

One can specify any IPFS gateway that is in compliance with [Gateway Specifications](https://specs.ipfs.tech/http-gateways/). It is highly recommended to use a local gateway, as it provides the best security guarantees.

## Malicious gateways and data integrity?

Requesting deserialized responses and delegating hash verification to a third-party gateway comes with risks. It is possible that a public gateway is malicious. Or, that a well-known and respected gateway gets hacked and changed to return payload that does not match requested CID. How can one protect themselves against that?

If deserialized responses are necessary, one should run their own gateway in a local, controlled environment. Every block of data retrieved though self-hosted IPFS gateway is verified to match the hash from CID. For the maximum flexibility and security, find an implementation that provides the gateway endpoint (i.e. [Kubo](https://docs.ipfs.tech/install/command-line/)) and run it yourself!

When using a third-party gateway that one can't fully trust, the only secure option is to [request verifiable response types](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) such as [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) (a single block) or [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) (multiple blocks in CAR archive). Both allow to locally verify if the data returned by gateway match the requested CID, removing the surface for [Man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

## CURL Examples

### Deserialized responses

::: callout

By default, a trusted local gateway acts as a bridge between traditional HTTP clients and IPFS.

It performs necessary hash verification, UnixFS _deserialization_ and return reassembled files to the client, as if they were stored in a traditional HTTP server. This means all validation happens on the gateway, and clients trust that the gateway is correctly validating content-addressed data before returning it to them.

:::

#### Downloading a file from IPFS with CURL

```bash
$ curl ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey -o out.txt
```

If curl responds with `curl: IPFS automatic gateway detection failure`, make sure `IPFS_GATEWAY` is set (see examples below).

#### Explicitly specifying a gateway

To use local gateway on custom port 48080:

```bash
$ export IPFS_GATEWAY=http://127.0.0.1:48080
$ curl ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey
hello from IPFS
```

When setting environment variable is not feasible, one can use `--ipfs-gateway` instead:

```bash
$ curl --ipfs-gateway http://127.0.0.1:48080 ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey
hello from IPFS
```

#### Following subdomain redirects

::: callout

By default, the URI resolution in `curl` does not follow HTTP redirects and assumes the endpoint implements deserializing [path gateway](https://specs.ipfs.tech/http-gateways/path-gateway/), or at the very least, the [trustless gateway](https://specs.ipfs.tech/http-gateways/trustless-gateway/).
When pointing `curl` at a [subdomain gateway](https://specs.ipfs.tech/http-gateways/subdomain-gateway) (like `https://dweb.link` or the `http://localhost:8080` provided by a [local Kubo node](https://docs.ipfs.tech/how-to/command-line-quick-start/)) one has to pass `-L` in the curl command to follow the redirect.

:::

```bash
$ IPFS_GATEWAY=https://localhost:8080 curl -s -L ipfs://bafkreih3wifdszgljcae7eu2qtpbgaedfkcvgnh4liq7rturr2crqlsuey
hello from IPFS
```

#### Piping and streaming responses

Deserialized response returned by CURL can be piped directly to a video player:

```
$ curl ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi | ffplay -
```

### Verifiable responses

::: callout

By explicitly requesting [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) (a block) or [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) (a stream of blocks) responses, by means defined in [Trustless Gateway Specification](https://specs.ipfs.tech/http-gateways/trustless-gateway/), the user is able to fetch raw content-addressed data and [perform hash verification themselves](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval).

:::

#### Fetching and verifying a directory from an untrusted gateway

Requesting [trustless and verifiable](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) CAR response via `Accept` HTTP header:

```bash
$ export IPFS_GATEWAY="https://ipfs.io" # using untrusted public gateway
$ curl -H "Accept: application/vnd.ipld.car" "ipfs://bafybeiakou6e7hnx4ms2yangplzl6viapsoyo6phlee6bwrg4j2xt37m3q" > dag.car
```

Then, CAR can be moved around and imported into some other IPFS node:

```bash
$ ipfs dag import dag.car
```

or verified and unpacked locally, without having to run a full IPFS node, with tools like [go-car](https://github.com/ipld/go-car/tree/master/cmd/car#readme) or [ipfs-car](https://www.npmjs.com/package/ipfs-car):

```
$ npm i -g ipfs-car
$ ipfs-car unpack dag.car --output dag.out
$ ls dag.out
1007 - Sustainable - alt.txt
1007 - Sustainable - transcript.txt
1007 - Sustainable.png
```

## What's next?

More places supporting IPFS addresses. Everyone can integrate `ipfs://` and `ipns://` URI support into their application. See specifications proposed in [IPIP-280](https://github.com/ipfs/specs/pull/280) for technical details. We are [tracking potential project](https://github.com/ipfs/integrations/issues) where an integration makes sense! If you feel up to the challenge, don't hesitate to drop a comment in one of the [potential projects](https://github.com/ipfs/integrations/issues) for IPFS URI integration or find us on:

* [Matrix](https://matrix.to/#/#ipfs-space:ipfs.io), [Discord](https://discord.com/invite/ipfs) or [Slack](https://filecoin.io/slack)
* [Discussion Forum](https://discuss.ipfs.tech/)

Or one of the other many places where the [IPFS comunity](https://docs.ipfs.tech/community/) is active.

