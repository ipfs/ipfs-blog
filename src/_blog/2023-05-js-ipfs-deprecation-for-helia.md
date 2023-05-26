---
title: ⛔️ js-IPFS deprecation / replaced by Helia 🌞
description: 'js-IPFS is being deprecated, and has been superseded by Helia.'
author: Alex Potsides (@achingbrain)
date: 2023-05-26
permalink: '/202305-js-ipfs-deprecation-for-helia/'
header_image: '/2023-05-js-ipfs-deprecation-for-helia-header-image.png'
tags:
  - 'helia'
  - 'js-ipfs'
---

**TL;DR: [js-IPFS](https://github.com/ipfs/js-ipfs) is being deprecated, and has been superseded by [Helia](https://github.com/ipfs/helia).**

There are exciting times ahead for IPFS in JS. Some of you may have already heard of [Helia](https://github.com/ipfs/helia), the new implementation that's designed as a composable, lightweight, and modern replacement for js-IPFS.

It has a [simplified API](https://ipfs.github.io/helia/interfaces/_helia_interface.Helia.html) which can be extended by other modules depending on the requirements of your application such as [@helia/unixfs](https://github.com/ipfs/helia-unixfs), [@helia/ipns](https://github.com/ipfs/helia-ipns), [@helia/dag-cbor](https://github.com/ipfs/helia-dag-cbor) and [others](https://github.com/ipfs/helia#-code-structure).

It ships with the latest and greatest libp2p, which means it has the best connectivity options, including the new [WebTransport](https://github.com/libp2p/js-libp2p-webtransport) and [WebRTC](https://github.com/libp2p/js-libp2p-webrtc) transports that dramatically improve the connectivity options for browser environments.

[js-IPFS is in the process of being deprecated](https://github.com/ipfs/js-ipfs/issues/4336) so you should port your apps to Helia to receive bug fixes, features, and performance improvements moving forwards.

📚 [Learn more about this deprecation](https://github.com/ipfs/js-ipfs/issues/4336) or [how to migrate](https://github.com/ipfs/helia/wiki/Migrating-from-js-IPFS).

More new blog content discussing Helia coming soon!