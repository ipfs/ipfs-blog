---
title: IPFS in Opera Touch on iOS!
description: Opera has now added support for IPFS addressing to Opera Touch, their
  mobile browser for iOS.
date: 2021-02-08 17:00:00 +0000
permalink: "/2021-02-XX-opera-ios-and-ipfs/"
translationKey: ''
header_image: "/opera-ipfs-header.png"
tags: browsers, mobile
author: Dietrich Ayala

---
In 2020 we announced a big moment for IPFS: The first official support of IPFS protocol addressing in a major browser, when [Opera released IPFS support in their Android browser](ipns://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/ "Opera Android IPFS announcement"). This was an important step in IPFS browser support generally, by building interest and momentum. We didn’t stop there, and we’ve got not just one… BUT TWO releases to share with you today:

First, Opera has now added support for IPFS addressing to Opera Touch, their iOS browser.

![A screenshot of Wikipedia on IPFS in Opera Touch](/opera-ios-wikipedia-short.png "Wikipedia on IPFS in Opera Touch")

Second, support for IPFS addressing in Opera desktop browser for Windows, macOS and Linux will be coming in their next release, currently planned for March 2021.

With these releases, Opera will not support ipfs:// and ipns:// addressing across their browser product line on all major operating systems: Windows, macOS, Linux, iOS and Android.

## How Do I use it?

First, install Opera Touch on your iOS device. If you’re reading this on an iOS device, [click to install now](https://apps.apple.com/us/app/opera-touch-web-browser/id1411869974)

![](/opera-ios-app-store-short.png)

## How Does it Work?

Opera Touch supports navigating to addresses for ipfs:// and ipns:// protocol schemes, which are handled by a remote HTTP gateway. By default the gateway used is dweb.link, which is operated by Protocol Labs. TODO: Can select/change gateway?

Native representation of IPFS addresses in browsers even when the content is loaded from an HTTP gateway as 1) it communicates to users the integrity guarantees built into the IPFS protocol and 2) it lets developers use IPFS addresses even as local node support is not yet implemented in most browsers.

## What’s Next?

Opera desktop browser support for IPFS addressing will ship soon, and we’re discussing what additional features to add next to build on top of this foundation of universal addressing support across the Opera browser line.

[Install Opera Touch on iOS now!](https://apps.apple.com/us/app/opera-touch-web-browser/id1411869974)