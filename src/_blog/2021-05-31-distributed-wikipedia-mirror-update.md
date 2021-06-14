---
title: Distributed Wikipedia Mirror Update
description: Status update for 2021 Q2, usage instructions, current build process,
  and open problems.
author: Marcin Rataj
date: 2021-05-31
permalink: "/2021-05-31-distributed-wikipedia-mirror-update/"
translationKey: ''
header_image: "/wikipedia-mirrors-2021-q2-1.png"
tags:
- censorship

---
* [Distributed Wikipedia Mirror](https://github.com/ipfs/distributed-wikipedia-mirror#readme) and [Kiwix](https://kiwix.org/) projects are happy to the announce **general availability** of **updated** [English](https://en.wikipedia-on-ipfs.org/) and [Turkish](https://tr.wikipedia-on-ipfs.org) mirrors, along with **new languages**: [Myanmar](https://my.wikipedia-on-ipfs.org/), [Arabic](https://ar.wikipedia-on-ipfs.org), [Chinese](https://zh.wikipedia-on-ipfs.org) and [Russian](https://ru.wikipedia-on-ipfs.org).
* A handy, up-to-date list can be found at [ipfs.kiwix.org](https://ipfs.kiwix.org), and in the [`snapshot-hashes.yml`](https://github.com/ipfs/distributed-wikipedia-mirror/blob/main/snapshot-hashes.yml  "snapshot-hashes.yml") manifest.
* The idea of a distributed Wikipedia mirror goes back to 2017, when the IPFS Project created a snapshot of English and Turkish languages and put it on IPFS.  To learn why we did it, please read the original [Uncensorable Wikipedia on IPFS](https://blog.ipfs.io/24-uncensorable-wikipedia/) post.
* Below is a short status update with improved usage instructions, current build process, open problems, and future work that could be contributed to the project.

## Improved access to Wikipedia mirrors

### User-friendly `ipns://{dnslink}` and public gateways

Browsers with built-in support for IPFS addresses ([Brave](https://brave.com/brave-integrates-ipfs/), [Opera](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/), or a regular [Firefox](https://www.mozilla.org/en-US/firefox/new/), [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) with [IPFS Companion](https://github.com/ipfs/ipfs-companion#readme)) can now load the latest snapshot using [DNSLink](https://docs.ipfs.io/concepts/dnslink/):

* `ipns://{dnslink}`
* `ipns://en.wikipedia-on-ipfs.org`

To ensure true P2P transport, offline storage and content integrity, you can run your own IPFS node ([command-line](https://docs.ipfs.io/install/command-line/) or  [IPFS Desktop](https://docs.ipfs.io/install/ipfs-desktop/) app) combined with the [IPFS Companion](https://docs.ipfs.io/install/ipfs-companion/) browser extension. You can also use the [Brave browser, which has built-in support for IPFS](https://brave.com/brave-integrates-ipfs/):

@[youtube](jTDkTQiKzJA)

When it is not possible to run your own IPFS node, one of the [many public gateways](https://ipfs.github.io/public-gateway-checker/) can be used as a proxy for accessing the mirror. For example:

* [https://dweb.link/ipns/my.wikipedia-on-ipfs.org](https://dweb.link/ipns/my.wikipedia-on-ipfs.org)
* [https://cf-ipfs.com/ipns/my.wikipedia-on-ipfs.org](https://cf-ipfs.com/ipns/my.wikipedia-on-ipfs.org)

### Robust and immutable `ipfs://{cid}`

If DNS resolution is blocked, or a public gateway can't be trusted, accessing the immutable snapshot using underlying cryptographic content identifier ([CID](https://docs.ipfs.io/concepts/content-addressing/)) is advised:

* `ipfs://{cid}`

The `{cid}` of a specific mirror can be found in [`snapshot-hashes.yml`](https://github.com/ipfs/distributed-wikipedia-mirror/blob/main/snapshot-hashes.yml), or read from its DNSLink record with`ipfs resolve -r /ipns/en.wikipedia-on-ipfs.org`. At the time of writing this post, the English mirror points at    `ipfs://bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze`

Sharing CIDs via [sneakernet](https://en.wikipedia.org/wiki/Sneakernet) is a popular way of routing around DNS issues and censorship. Turkish citizens resorted to that in 2017 when [Turkey blocked Wikipedia](https://en.wikipedia.org/wiki/Block_of_Wikipedia_in_Turkey).  History does not repeat itself, but it rhymes: Myanmar started experiencing internet blackouts earlier this year:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Confirmed: <a href="https://twitter.com/hashtag/Myanmar">#Myanmar</a> has blocked all language editions of the Wikipedia online encyclopedia, part of a widening post-coup internet censorship regime imposed by the military junta 📚<br><br>Network data show restriction in effect on major providers.<br><br>📰 Report: <a href="https://t.co/Jgc20OBk27">https://t.co/Jgc20OBk27</a> <a href="https://t.co/qstGEefO4E">pic.twitter.com/qstGEefO4E</a></p>— NetBlocks (@netblocks) <a href="https://twitter.com/netblocks/status/1362814793502097409">February 19, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

To address this critical need, we [created a mirror of Myanmar Wikipedia](https://github.com/ipfs/distributed-wikipedia-mirror/pull/83) and [shared both DNSLink and CID](https://github.com/ipfs/distributed-wikipedia-mirror/pull/83#issuecomment-786021082).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">In response to ongoing internet restrictions / censorship in Myanmar, <a href="https://twitter.com/Wikipedia?ref_src=twsrc%5Etfw">@Wikipedia</a> in MY is now on <a href="https://twitter.com/IPFS?ref_src=twsrc%5Etfw">@IPFS</a>:<a href="https://t.co/trt0AbEMuW">https://t.co/trt0AbEMuW</a><br><br>Huge props to <a href="https://twitter.com/playingwithsid?ref_src=twsrc%5Etfw">@playingwithsid</a> who proposed it, & coordinated w/ native speakers.<br><br>Epic implementation effort by <a href="https://twitter.com/lidelOrg?ref_src=twsrc%5Etfw">@lidelOrg</a> & Kelson of <a href="https://twitter.com/KiwixOffline?ref_src=twsrc%5Etfw">@KiwixOffline</a>!</p>— dietrich (@dietrich) <a href="https://twitter.com/dietrich/status/1364978192075866115?ref_src=twsrc%5Etfw">February 25, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## How to help co-hosting this?

You can run your own IPFS node and co-host a subset of Wikipedia, store a full copy, or even follow collaborative cluster to pull in future updates automatically.

It is also possible to donate co-hosting costs by pinning specific CID to a remote service.

### Lazy co-hosting with your own IPFS node

It is possible to keep a lazy-loaded copy.  which does not fetch the entire Wikipedia, but keeps the browsed subset of pages around.

    $ ipfs files cp /ipfs/{cid} /my-wikipedia-snapshot

One can convert a lazy copy to full one by recursively pinning the [DAG](https://docs.ipfs.io/concepts/glossary/#dag) behind a CID:

    $ ipfs pin add --progress {cid}

A recursive pin will preload the entire mirror to the local datastore.
Be wary that the English one is far bigger than other ones, and pinning it requires hundreds of gigabytes and may take a very long time.

The size of a specific mirror can be read with `ipfs files stat /ipfs/{cid}`.

### Collaborative cluster

This is an advanced option aimed at server administrators and power users. The `wikipedia` cluster includes all language versions and its size only grows over time.

    $ ipfs-cluster-follow wikipedia run --init wikipedia.collab.ipfscluster.io

See _Instructions_ at [collab.ipfscluster.io](https://collab.ipfscluster.io#instructions).

### Donate remote pins

When co-hosting with your own IPFS node is not possible, one can still help by pinning snapshot CIDs to a remote pinning service.    
 [Learn how to _work with remote pinning services_](https://docs.ipfs.io/how-to/work-with-pinning-services/).

## How is a mirror built?

The current setup relies on [Wikipedia snapshots in the ZIM format](https://download.kiwix.org/zim/wikipedia/) produced by the [Kiwix](https://kiwix.org/) project.

We don't have a web-based reader of ZIM archives (yet – more in the next section), and the way we produce a mirror is an elaborate, time-consuming process:

1. Unpacking ZIM archive with [openzim/zim-tools](https://github.com/openzim/zim-tools)
2. Adjusting HTML/CSS/JS to fixup unpacked form
3. Import snapshot to IPFS
4. Include original ZIM inside of unpacked IPFS snapshot

While this works, the need for unpacking and customizing the snapshot makes it difficult to reliably produce updates. And including the original ZIM for use with [Kiwix offline reader](https://www.kiwix.org/en/kiwix-reader), partially duplicates the data.

We would love to mirror more languages, and increase the update cadence, but for that to happen we need to remove the need for unpacking ZIM archives. 

We will be looking into putting [all ZIMs from Kiwix](https://download.kiwix.org/zim/wikipedia/) on IPFS and archiving them for long term storage on [Filecoin](https://filecoin.io/) as part of [farm.openzim.org ](https://farm.openzim.org )pipeline.

## Help Wanted and Open Problems

If you are still reading this, there is a high chance you are interested in improving the way the distributed Wikipedia mirror works.

Below are areas that could use a helping hand, and ideas looking for someone to explore them.

* **Search.** There's no search function currently. Leveraging the index present in ZIM, or building a DAG-based search index optimized for use in web browsers would make existing mirrors more useful. See [distributed-wikipedia-mirror/issues/76](https://github.com/ipfs/distributed-wikipedia-mirror/issues/76).
* **Web-based ZIM reader.** The biggest impact for the project would be to create a web-based reader capable of browsing original ZIM archives without the need for unpacking them, nor installing any dedicated software. Want to help make it a reality? See [kiwix-js/issues/659](https://github.com/kiwix/kiwix-js/issues/659)
* **Improving the way ZIM is represented on IPFS.** When we store an original ZIM on IPFS, the DAG is produced by `ipfs add --cid-version 1`. This works fine, but with additional research on customizing DAG creation, we may improve  deduplication and speed when doing range requests for specific bytes. There are different stages to explore here: if any of them sounds interesting to you, please comment in [distributed-wikipedia-mirror/issues/42](https://github.com/ipfs/distributed-wikipedia-mirror/issues/42).
  * Stage 1: Invest some time to benchmark parameter space to see if low hanging fruits exists.
  * Stage 2: Create a DAG builder that understands ZIM format and maximizes deduplication of image assets by representing them as sub-DAGs with dag-pb files.
  * Stage 3: Research augmenting or replacing ZIM with [IPLD](https://ipld.io/). How can we maximize block deduplication across all snapshots and languages? How would an IPLD-based search index work?