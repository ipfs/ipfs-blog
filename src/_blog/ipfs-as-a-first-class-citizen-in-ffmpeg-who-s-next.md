---
title: IPFS as a first-class citizen in FFmpeg, who’s next?
description: The first steps in enabling IPFS support in the wider open source ecosystem.
author: Mark Gaiser
date: 2022-08-01
permalink: /2022-08-01-ipfs-and-ffmpeg/
translationKey: ''
header_image: "/ffmpeg-ipfs.png"
tags: []

---
[FFmpeg](https://ffmpeg.org/) is the leading media framework that allows you to watch videos in almost any format. This framework is at the very core of many applications (think, for example, of [OBS Studio](https://obsproject.com/), [KODI](https://kodi.tv/), [VLC](https://www.videolan.org/vlc/), and even some game engines rely on it). Allowing FFmpeg to handle the IPFS protocol enables IPFS usage in many more applications than previously possible.

This post will explain how native IPFS support in FFmpeg came to be, how it can be used, how it might affect you and what the future could potentially hold!

## IPFS in FFmpeg. How did that happen?

In late 2021 I had an issue on my home server. A relatively simple setup with just one large-capacity HDD running on a ODROID-XU4 running KODI. Many people likely use this as their typical “home server” setup. I happily used it to consume my media until, one day, an OS update broke my network access to the server. Days of debugging couldn’t resolve the issue, which sparked a simple idea: “I already use IPFS; why can’t I use that to play my media?”

### Play media from a gateway

This idea seemed so logical and straightforward to me that I set out to figure out how to play my media via IPFS instead of KODI. It turns out KODI has so-called [STRM files](https://kodi.wiki/view/Internet_video_and_audio_streams). You can dump the URL to your media, and it works. While this worked, my URLs now looked like: `http://10.0.3.3/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`. IPFS, being a distributed protocol, felt centralized in this case, as I’d have to ask for my video through 1 specific [gateway](https://docs.ipfs.tech/concepts/glossary/#gateway). Instead, I wanted the STRM file to look like this: `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`. In this ideal case, a gateway URL would be handled by “something” else internally. In any case, I should not have to specify a gateway. In my mind having this made it possible that a video - any resource really - only has to be found on the IPFS network for it to work. For me, my server could be online, but my data could also be served from anywhere else! A powerful concept; native to IPFS.

But this did not work, KODI is not aware of the IPFS protocol. So this again got me wandering through the KODI codebase to figure out how it handles STRM files and where I might need to make a change to add IPFS support?

### Enter FFmpeg

STRM files aside, it turns out that whatever is in there is eventually handled in [FFmpeg](https://ffmpeg.org/). Of course, there is more to it than this, but it became clear that getting my ideal way to play video in KODI was diving into the FFmpeg codebase.

In FFmpeg you also have the ffplay utility, which is used to play anything that FFmpeg supports. In this tool, my video would happily play when provided as an HTTP URL:  
`ffplay http://10.0.3.3/ipfs/bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`  
but not as:  
`ffplay ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`

To me, the most straightforward approach was twofold.

1. Let FFmpeg detect which gateway you use.
2. Rewrite that `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` internally to a http URL for that detected gateway and play the media.

As a proof of concept, I mainly cared about rewriting the URL so that it looks like FFmpeg has native IPFS support from the users’ point of view. However, it turns out that FFmpeg already had quite a few protocols where stacking (or piping) was supported. For example, the [crypto](https://github.com/FFmpeg/FFmpeg/blob/master/libavformat/crypto.c) protocol (ffplay `crypto+file://…`) first gets your file and pulls it through the crypto protocol to decrypt it before playing. This piping mechanism verified to me that the IPFS solution was technically feasible. And as FFmpeg already had quite advanced support for HTTP, it seemed conceptually simple enough.

### Hacked together prototype leads to Open Grant

After a mere evening of hacking I already had a very rough prototype working `ffplay ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`

While I made rapid progress here, it became clear that further work would potentially require a lot of time. Also, FFmpeg would only be the bottom layer in the media stack - I would still not have IPFS support in at least a couple of media players out there that use FFmpeg under the hood.

I eventually settled in wanting to support IPFS in [VLC](https://www.videolan.org/vlc/), [MPV](https://mpv.io/) and [KODI](https://kodi.tv/) and created [this open grant](https://github.com/ipfs/devgrants/pull/102) for that.

After the Open Grant was approved, I set out to implement IPFS support in FFmpeg properly this time.

Note that anyone can apply for an Open Grant! If you have a great idea you’re passionate about you should consider applying for one. You can find more information on an Open Grants works [here](https://github.com/ipfs/devgrants).

### FFmpeg support leads to gateway detection spec

While implementing IPFS support in FFmpeg it became clear that detecting a potentially running gateway was not trivial. The idea here is that FFmpeg will detect a locally running gateway if it’s run in it’s default settings. This issue on it’s own ended up in drafting a spec for go-ipfs to expose a running gateway in a manner that can be detected by external applications. If you’re interested, this spec can be found [here](https://github.com/ipfs/kubo/issues/8847).

A visual representation of this spec looks like this:  
![](https://i.imgur.com/g3P4vEy.png)

FFmpeg does follow the spec, but [Kubo](https://github.com/ipfs/kubo) (go-ipfs), the tried and true reference implementation, does not support it yet; it is scheduled to [ship in the next release](https://github.com/ipfs/kubo/pull/9156).

### Open Grant leads to working for Protocol Labs

I wanted to do much more in the IPFS ecosystem, specifically to enable broad ecosystem support for IPFS. My desire to contribute aligned with Protocol Labs’ interests, making this the ideal match for me. Starting at the end of March 2022, I began working as a contractor for Protocol Labs to do precisely this.

## How and when can you use IPFS with FFmpeg?

Starting in [FFmpeg 5.1](https://github.com/FFmpeg/FFmpeg/blob/master/Changelog) you’ll enjoy “native feeling” IPFS support. The support is implemented through rewriting your `ipfs url` to a url that your gateway will handle.

<span style="color:darkorange">ipfs</span><span>:</span>//<span style="color:green">QmbGtJg23skhvFmu9mJiePVByhfzu5rwo74MEkVDYAmF5T</span>

to:

<span style="color:red">http<span>:</span>//&lt;gateway&gt;</span>/<span style="color:darkorange">ipfs</span>/<span style="color:green">QmbGtJg23skhvFmu9mJiePVByhfzu5rwo74MEkVDYAmF5T</span>

* The <span style="color:red">red</span> color is the auto-detected gateway to use.
* The <span style="color:darkorange">orange</span> color is the protocol to use (can be either _ipfs_ or _ipns_).
* The <span style="color:green">green</span> color is the [CID](https://docs.ipfs.io/concepts/content-addressing/) to use.

FFmpeg tries to detect the gateway according to this [IPFS Integration](https://github.com/ipfs/specs/pull/280) specification proposal. If you don’t have a gateway running, the current logic will fall back to calling `dweb.link` behind the scenes. It will therefore give the end user an experience of IPFS just working.

With FFmpeg you can (starting in version 5.1) use it as follows:  
`ffplay ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`

Version 5.1 is released just just a couple days ago! You can [download](https://ffmpeg.org/download.html) it in binary form or, if you are on linux, wait till your package manager has 5.1.

## MPV also has IPFS support in it’s next release

[MPV](https://mpv.io/) already has support for the `ipfs://` protocol. To MPV it’s merely accepting the `ipfs` and `ipns` protocols. Support for that is merged into the codebase, which means that the next version of MPV, released after FFmpeg 5.1, will also automatically support the IPFS protocol. Using it in MPV looks like this:  
`mpv ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi`

## What the future holds?

The keen-eyed reader might have spotted that the current implementations are only for FFmpeg and MPV. The remaining ones from my Open Grant (VLC and KODI) are also on the implementation schedule, though there is currently no set timeframe or priority.

In an ideal case, when KODI understands IPFS (thereby fixing the initial use case that brought me here), you could get a STRM file in KODI that just contains an `ipfs://bafybeigagd5nmnn2iys2f3doro7ydrevyr2mzarwidgadawmamiteydbzi` line. Opening that file will play the file provided FFmpeg found a gateway to handle this request! So the video could come from your local IPFS node but also from someone on the other side of the planet. The beauty is that it doesn’t matter anymore!

KODI and media aside, you can expect more broad ecosystem support for IPFS to become available gradually. For example, IPFS support is finding its way into popular tools like [cURL](https://curl.se/), among many others, as it moves into more mainstream usage.

## Where do you want to see IPFS support?

We are specifically keen on implementing IPFS in the lowest layers of the architecture to enable broad, transparent ecosystem support. Now that we have IPFS in FFmpeg, it is relatively easy to integrate it into anything that relies on FFmpeg.

There are more tools that we are considering integrating with IPFS, but we are also reliant on your input! We have set up an IPFS integration repository [here](https://github.com/ipfs/integrations). If you have a tool or application where you think IPFS support would be of value, please drop us a note!

<style>article code { word-break: normal !important;}</style>
