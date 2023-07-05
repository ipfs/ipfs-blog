---
title: Welcome to IPFS News 195!
description: Featuring a deep-dive into the challenges of measuring decentralized networks + more!
author: ''
date: 2023-07-06
permalink: "/newsletter-195"
translationKey: ''
header_image: "/ipfsnews.png"
tags:
- newsletter
---

As we enter into the summer months, things are slowing down just a bit as people go on holiday or get some much needed R&R, but that doesn’t mean we don’t have plenty of things to share with you! From a deep-dive into [the challenges of measuring decentralized networks](https://pulse.internetsociety.org/blog/the-challenges-of-measuring-decentralized-networks-the-case-of-the-interplanetary-file-system) to news about Fission adding redirect support of IPFS, this month’s newsletter will keep you in the loop whether this email finds you in the office, at home, or on the beach. 🏖️

Let’s jump in!

## **Brand New on IPFS ✨**

[Kubo 0.21.0](https://github.com/ipfs/kubo/releases/tag/v0.21.0)

- Saving previously seen nodes for later bootstrapping
- Gateway: `DeserializedResponses` config flag
- `client/rpc` migration of `go-ipfs-http-client`
- Gateway: DAG-CBOR/-JSON previews and improved error pages
- Gateway: subdomain redirects are now `text/html`
- Gateway: support for partial CAR export parameters (IPIP-402)
- `ipfs dag stat` deduping statistics
- Accelerated DHT Client is no longer experimental

[The Challenges of Measuring Decentralized Networks: The Case of the InterPlanetary File System](https://pulse.internetsociety.org/blog/the-challenges-of-measuring-decentralized-networks-the-case-of-the-interplanetary-file-system)

- In this new blog post on the Internet Society, Yiannis Psaras of ProbeLab shares their experience measuring the stability, performance, and cartography of InterPlanetary File System (IPFS), one of the largest decentralized, P2P networks in operation. [Read it here!](https://pulse.internetsociety.org/blog/the-challenges-of-measuring-decentralized-networks-the-case-of-the-interplanetary-file-system)

[June Protocol Labs EngRes All Hands [Video]](https://www.youtube.com/watch?v=7fbhniQJjDw)

- The PL Engineering and Research (EngRes) Workgroup is formed by teams of core protocol developers, network researchers, and experienced contributors in the Protocol Labs Network. The PL EngRes WG mission is to scale and unlock new opportunities for IPFS, Filecoin, libp2p + IPLD, drive breakthroughs in protocol utility & capability, and scale network-native research & development across the PL Network. The PL EngRes WG hosts monthly all hands meetings to check in on progress, and showcase the growth and new capabilities being unlocked by these research & development teams. [Watch it here!](https://www.youtube.com/watch?v=7fbhniQJjDw)

[js-IPFS Deprecation Reminder: Move to Helia!](https://blog.ipfs.tech/202305-js-ipfs-deprecation-for-helia/)

- **js-IPFS is in the process of being deprecated** so you should port your apps to Helia to receive bug fixes, features, and performance improvements moving forwards. [Read more about it here!](https://blog.ipfs.tech/202305-js-ipfs-deprecation-for-helia/)

## **Around the Ecosystem 🌎**

[Fission adds redirect support for IPFS](https://fission.codes/blog/introducing-redirect-support-for-ipfs/)

- Fission is dedicated to building and improving on decentralized web protocols. Redirect support is an officially accepted improvement for IPFS that makes it easier to host modern web applications. [Learn more about it here!](https://fission.codes/blog/introducing-redirect-support-for-ipfs/)

[IPFS data integrated directly into a blockchain explorer](https://twitter.com/al_koii/status/1665817302279880706?s=20)

- Koii's distributed computing platform uses [web3.storage](https://t.co/KyqdyMsAQy) as a convenient integration for IPFS. Thanks to the lightning-fast w3link gateway and easy to use SDK, developers building on Koii have an extra edge as they implement P2P apps, distributed AI, and more. [Check it out in this Twitter thread!](https://twitter.com/al_koii/status/1665817302279880706?s=20)

[Elevate by Outlier Ventures](https://outlierventures.io/elevate/)

- Elevate is a virtual event series focused on spotlighting Outlier Ventures’ Base Camp Teams. Featuring talks from the very people driving Web3 forward, ELEVATE gives their partners, mentors, program experts and founders themselves an opportunity to showcase the progress they’ve made through their 12-week program. At the virtual event on July 6 (today!) you’ll be able to meet the builders onboarding the next billion users into the Open Metaverse, using IPFS. [Join the event here!](https://outlierventures.io/elevate/)

[ProbeLab Office Hours: IPFS Network Measurements](https://lu.ma/ipfs-network-measurements)

- These open office hours are for anyone interested in network measurements in the IPFS network. The session is hosted by the [ProbeLab](https://blog.ipfs.io/2022-06-15-probelab/) team. During this session, they will discuss issues related to ongoing projects and IPFS network measurement topics more generally with the community. If you're working or are interested in contributing, [make sure to join!](https://lu.ma/ipfs-network-measurements)

[IPFS Multi-Gateway Experiment in Chromium](https://blog.ipfs.tech/2023-05-multigateway-chromium-client/?utm_content=253765483&utm_medium=social&utm_source=twitter&hss_channel=tw-3030006159)

- Learn about a new approach to implementing ipfs:// and ipns:// support natively in the browser, using a client-only approach and fetching verifiable responses from multiple HTTP gateways. [Check out the blog post!](https://blog.ipfs.tech/2023-05-multigateway-chromium-client/?utm_content=253765483&utm_medium=social&utm_source=twitter&hss_channel=tw-3030006159)

[Secure Curves in the Web Cryptography API](https://blogs.igalia.com/jfernandez/2023/06/20/secure-curves-in-the-web-cryptography-api/)

- A new blog post about the collaboration between [@igalia](https://twitter.com/igalia) and [@protocollabs](https://twitter.com/protocollabs) on the implementation of secure curves based on Curve25519 for the Web Cryptography specification. [Read it now!](https://blogs.igalia.com/jfernandez/2023/06/20/secure-curves-in-the-web-cryptography-api/)

[Where to find the Filecoin Community at EthCC](https://fil-paris.io/)

- Looking for the Filecoin community during EthCC? Check out [Filecoin Unleashed](https://filecoinunleashed.io) and [Fil Paris](https://fil-paris.io).

[Accelerate your Web3 journey: Protocol Labs Launchpad Summit on July 16-21](https://protocol.ai/blog/launchpad-summit-paris-2023/)

- Launchpad is a blend of two key components: a dynamic four-week virtual learning cohort, where residents actively participate in remote learning seminars, and an unforgettable one-week in-person “colo” Summit. **[Learn more on the Protocol Labs blog](https://protocol.ai/blog/launchpad-summit-paris-2023/)**

## HackFS Winners 🏅

This year’s [HackFS hackathon](https://ethglobal.com/events/hackfs2023) has come to a close, and several projects were selected as winners for the IPFS category. If you missed it, [learn more about HackFS here](https://ethglobal.com/events/hackfs2023).

Introducing the HackFS 2023 winners for IPFS…

[Web3Stash](https://ethglobal.com/showcase/web3stash-mn6iu) by [@mbcse50](https://twitter.com/mbcse50)

- Web3Stash is a standard library to get a single API to connect to multiple decentralized storage service providers. [Check it out here!](https://ethglobal.com/showcase/web3stash-mn6iu)

[unid.store](https://t.co/xbh9zYbjm9) by [@_Difint_](https://twitter.com/_Difint_)and [@mr13tech](https://twitter.com/mr13tech)

- Super simple file sharing - decentralized, quick, and without registration. [Take a look here!](https://ethglobal.com/showcase/unid-store-2yukr)

[Fileblox](https://ethglobal.com/showcase/fileblox-y0rjm) by [@Lycaoncreatives](https://twitter.com/LycaonCreatives), [@raldblox](https://twitter.com/raldblox), and [@luckscientist](https://twitter.com/luckscientist)

- FileBlox enables the creation of encrypted NFTs. It solves the right-click-and-save problem for our content creators while letting them get all the benefits of tokenization. [Learn more here!](https://ethglobal.com/showcase/fileblox-y0rjm)

[Star Streamer](https://ethglobal.com/showcase/star-streamer-huakw) by [@msakiart](https://twitter.com/msakiart)

- P2P video streaming service for decentralized content sharing with libp2p, ipfs and hypercore. [Check it out here!](https://ethglobal.com/showcase/star-streamer-huakw)
