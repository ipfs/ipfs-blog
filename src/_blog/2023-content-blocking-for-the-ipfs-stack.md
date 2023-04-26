---
title: Content Blocking for the IPFS stack is finally here!
description: 'We’re excited to share that content blocking can now be enabled in Kubo and other tools in the IPFS stack.'
author: The Bifrost Team
date: 2023-04-28
permalink: '/2023-content-blocking-for-the-ipfs-stack/'
header_image: '/release-notes-placeholder.png'
tags:
  - 'go-ipfs'
  - 'kubo'
  - 'badbits'
  - 'content-blocking'
  - 'content-moderation'
---

Bifrost (the NetOps team responsible for the IPFS.io HTTP gateways) is happy to announce that content blocking can now be enabled in Kubo and other tools in the IPFS stack.

Traditionally, content blocking has been performed only at the IPFS gateway level and directly in Nginx, using the original [Badbits denylist](https://badbits.dwebops.pub/denylist.json). This had a few issues: content on the denylist was not blocked on Kubo and was still available via Bitswap. Additionally, blocking affected concrete CID strings, but not equivalent ones (i.e. those with a different base encoding).

In order to resolve these issues and to make a long term commitment to improving how we do content moderation in IPFS, we have taken the following steps:
 - [Submitted IPIP-383](https://github.com/ipfs/specs/pull/383), which defines a much more flexible and efficient compact denylist format. This new format supports different block types and sets a foundation for future work on denylist transparency, sharing, and distribution. For example, every blocked item can now have tags attached to provide metadata such as the reason for the blocking. IPFS implementations can then choose whether to expose that information or not.
 - [Implemented NOpfs](https://github.com/ipfs-shipyard/nopfs), a Blocker that understands the new compact denylist format and decides whether any CID or IPFS Path should be blocked or not. This Blocker implementation also provides a Kubo plugin which gives Kubo the ability to never download blocked content. NOpfs can also be used separately from Kubo by setting a Web service that returns whether an IPFS path or URL should be blocked or not (upcoming work from our side). This can also be useful for Filecoin Storage providers and anyone who wants to make sure their CIDs have not been included in a denylist.

In the meantime, we have converted our existing denylist to the new format so that everyone can take advantage of these changes right away: https://badbits.dwebops.pub/badbits.deny

This work is the framing for a larger endeavour to improve content moderation on the IPFS public networks. If you have any questions, need help, or would like to collaborate, then please [reach out via GitHub on IPIP-383](https://github.com/ipfs/specs/pull/383) or [NOpfs](https://github.com/ipfs-shipyard/nopfs)! If you’d like to help further this initiative, you can start by sharing this news with your community and by letting the Kubo maintainers know that you’d like to see this functionality integrated into Kubo as a first class citizen.

And last of all, it would be remiss of us if we didn’t thank [Hector](https://twitter.com/hecturchi) for all the hard work he put into this. Thank you for all your efforts... they are greatly appreciated!

The Bifrost Team.
