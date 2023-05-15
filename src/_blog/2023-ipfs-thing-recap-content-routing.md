---
title: 'Recap: Content Routing (þing 2023)'
description: 'A recap of the Content Routing track including summaries, links, and videos."
author: Masih Derkani
date: 2023-05-15
permalink: '/2023-ipfs-thing-content-routing-track/'
header_image: '/ipfs-thing-2023-recap/content-routing/content-routing-recap-slides.png'
tags:
  - 'thing'
  - 'þing'
  - 'event'
  - 'recap'
  - 'track'
  - 'content'
  - 'routing'
---

The term "content" is ubiquitous in discussions about knowledge sharing, regardless of the platform used. IPFS takes this term to a new level by defining content as an immutable piece of information, identified by a cryptographic hash that defines its identity. Any change in the information results in a different identity, making the content immutable. This property has a subtle yet powerful advantage: a receiver of a piece of information can verify its authenticity based on its identifier. This simple concept leads to an important question: how can one locate shared content using its identity? 🤔 This is where "Content Routing" comes in.

Content Routing is the crucial first step in exchanging content within the IPFS network. Once a Content Identifier (CID) is generated from a piece of information, Content Routing enables the information to be both discoverable and discovered. In other words, it involves telling the network, "Hey, I have content, and here is its CID," as well as answering peer questions such as "Who has this CID?".

This seemingly simple yet paramount functionality enables the network to share immutable and verifiable pieces of information. Since the inception of IPFS as a protocol, Content Routing has taken various forms and utilized several techniques to fulfill its promise of sharing knowledge. It remains an essential component of the IPFS ecosystem, as evidenced by its dedicated track at IPFS þing 2023 in Brussels, Belgium, last month. 

At IPFS þing 2022 a year ago, Content Routing was divided into two tracks: [Privacy](https://www.youtube.com/watch?v=VLU44qtXypE&list=PLuhRWgmPaHtTegfLTVFYtTtqTKQEtDvxW) and [Performance](https://www.youtube.com/watch?v=AWbobt9oHZ0&list=PLuhRWgmPaHtSF3oIY3TzrM-Nq5IU_RTXb). This year, both tracks were combined into one glorious Content Routing track that covered both areas. We had the privilege of hosting talks from community leaders who discussed the impressive improvements in performance and scalability of content routing systems, the privacy preservation techniques that cut across different systems, as well as community call-outs and discussions on how to get involved and build a better decentralized web together.

The track offered a comprehensive view of the content routing evolution since the inception of IPFS and showcased the latest advancements in the IPFS ecosystem. It provided an overview of the [InterPlanetary Network Indexer (IPNI)](https://github.com/ipni) and explained how it enables the mass publication and lookup of content across hundreds of billions of CIDs. The latest developments in reader privacy preservation, a mechanism that allows private lookups of content on both the IPFS DHT and IPNI, were also presented.

The rest of this blog post offers highlights, links, and a brief commentary on the talks.

The full playlist of talks at the IPFS þing 2023 Content Routing track can be found [here](https://www.youtube.com/watch?v=oe7fjOl-q0s&list=PLuhRWgmPaHtRBWV3SvInC5ATS8aKV3lsW). To learn more about Content Routing, check out the previous tracks at [IPFS Camp 2022](https://www.youtube.com/watch?v=7nb5oEpURCU&list=PLuhRWgmPaHtRqhFZ-CAstJ0RIq7Vs-4eO) and the [IPFS YouTube channel](https://www.youtube.com/@IPFSbot/playlists).

## Content Routing Track Introduction by Masih Derkani

[Masih](https://derkani.org/) presented an overview of Content Routing as a concept, its evolution over time, along with the evolutionary trends of content routing in the IPFS ecosystem. The talk illustrated what routing content in the IPFS network looks like today and explained how the mesh of content providers of different sizes interconnects. It also showcased the sub-systems that enable content routing to "just work", regardless of where the data resides.

@[youtube](oe7fjOl-q0s)

## Opening the DHT to large content providers by Guillaume Michel

How does a 1M x reduction in opened connections sound? That's right, providing data via the DHT is becoming much more efficient for large content providers thanks to "regions". [Gui](https://github.com/guillaumemichel) presented the latest research on how the DHT key space can be divided across regions to reduce the number of connections as well as messages sent to make content discoverable via the IPFS DHT.

@[youtube](bXaL64fp55c)

## IPNI: the InterPlanetary Network Indexer by Masih Derkani

Talking of large content providers, IPNI, the InterPlanetary Network Indexer, is an alternative routing system designed from scratch to provide content by the bucket load. [Masih](https://derkani.org/) presented how IPNI achieves this by betting on storage becoming cheaper and using replicas to reduce the need for trust to provide single hop lookup for trillions of CIDs. He explained how IPNI handles changes in the subset of CIDs advertised by content providers in a super-efficient protocol. IPNI as a concept has been around for about a year; it is the same protocol that makes FileCoin content discoverable over the IPFS network. As a protocol, it has now grown large enough to deserve its own "InterPlanetary" acronym and a growing set of [specifications](https://github.com/ipni/specs).

@[youtube](_EDJXeDtcX4)

## cid.contact: one year on by Masih Derkani

Having made the distinction between "protocol" and "implementation", [Masih](https://derkani.org/) presented a second talk on [`cid.contact`](https://cid.contact), the largest most mature IPNI cluster. `cid.contact` is built into [Kubo](https://github.com/ipfs/kubo) as a default routing system since version [`0.18.0`](https://github.com/ipfs/kubo/releases/tag/v0.18.0) and is the content router of choice for [Lassie](https://youtu.be/d5SzSm8NkUU) used by [Rhea](https://youtu.be/p89i9_AskIw). The talk covered the latest architecture of `cid.contact` and the newest features, such as cascading lookup over IPFS DHT and BitSwap, that make it a one-stop content router, tuned to find content no matter where it might be. `cid.contact` has ingested over 1.3 trillion CIDs from hundreds of providers, and just turned one this April. Happy 1st birthday! 🎂

@[youtube](CPlOdNqJ8og)

## IPFS Content Routing Workgroup, an introduction by Torfinn Olsen

Ever wondered where the content routers meet? 🧙 Look no further; the Content Routing Workgroup is it! [Torfinn](https://github.com/TorfinnOlsen) provided an overview of what the workgroup aims for, how community decisions are made, and how things get prioritized in the pipeline. He presented the roadmap ahead for the workgroup and invited the community to join. The workgroup meetings are public and open to all. You can find recordings of the previous meetups [here](https://www.youtube.com/watch?v=LsCH8xw3__c&list=PLuhRWgmPaHtRP5lVouK_eqhC98xaej6Px). Whether it's the next big idea you'd like to propose or just to observe what content routers get up to all day, you are most welcome.

@[youtube](MagS8ly_YXE)

## DHT ~~Double Hashing~~ Reader Privacy Updates & Migration Plan by Yiannis Psaras

It was at the first IPFS þing in Reykjavík where [Gui](https://github.com/guillaumemichel) presented the idea of [Double Hashing](https://www.youtube.com/watch?v=ZPIDU1-JnVc) in the context of Content Routing. Yep; we love hashes so much we're gonna do it twice! In this technique, rather than looking up a CID straight up, it is hashed again and its "double-hashed" value is the key that's used for lookup. In turn, the lookup results are then returned in encrypted form using the original CID as the encryption key. Pretty nifty, right?! Gui presented two follow-up talks on this at IPFS Camp 2022 further [explaining the core idea](https://youtu.be/VBlx-VvIZqU) and what [transitioning to it would mean for content routing](https://youtu.be/m-6_VZ8e1tk). At Brussels, [Yiannis](https://github.com/yiannisbot) walked us through the latest updates in the rollout of ~~Double Hashing~~ Reader Privacy to the IPFS DHT, one of the routing systems in use today. The initial phase of privacy preservation focuses on the "reader" side, where an external observer cannot know what a user is looking up without knowing the original CID. Later work will build on this to expand the privacy benefits to the "writer" side, i.e., content providers.

@[youtube](FP4kKemco4w)

## Double Hashing in IPNI: Reader Privacy at scale by Ivan Schasny

Privacy preservation is a quality that cuts right across routing systems. ✂️ This means no matter how the content is advertised or found we _want to_ preserve the user's privacy. In this talk [Ivan](https://github.com/ischasny) walked us through what this means for IPNI and how it is changing the architecture of `cid.contact` to incorporate reader privacy at its very core: `cid.contact` is moving to _only_ store encrypted provider records which means even the servers do not know what CIDs are being looked up. He expanded on how this big change is being rolled out garcefully, in stages and what's to come in the near future. Watch the [`#ipni` channel on FileCoin Slack](https://filecoinproject.slack.com/archives/C02T827T9N0) for the latest updates.

@[youtube](Q46zJ_mai2c)

## Private data: state of the art by Ian Preston

Taking things one step further on the privacy front, [Ian](https://peergos.org/about#ian_) and his team have been busy building privacy deep at the heart of [Peergos](https://peergos.org/). How does it work? The talk takes a deep dive into the Peergos architecture and how it utilizes `cryptree+`, BATs, and Capabilities to enable post-quantum ciphertext-level access control with improved metadata preservation and better performance. Ian walked us through the challenges they faced, such as garbage collection, and how the team overcame them to make application sandboxing a piece of cake. 🍰 As for the icing, check out Ian's slides shared right from Peergos [here](https://peergos.net/public/demo/talks/2023/ipfs-thing/private-data/web/index.html?open=true).

@[youtube](HVyrVUI2-RA)

## Content Advertisement Mirroring by Andrew Gillis

As the adoption of IPNI as an alternative content routing protocol continues to grow, so does the need for scaling. 🚀 At IPFS Camp 2022, [Andrew](https://github.com/gammazero) presented how IPNI is [scaling the content routing](https://youtu.be/qaCB0UKqwAk). Building on top of previous work, this talk covered how the replication of content advertisements from providers is making ingestion (and re-ingestion) 5X faster. This means new IPNI instances can use alternative sources to build up their index records with much higher velocity, moving us closer to a federated mesh of IPNI instances that continue to maintain lookup latency in orders of a few milliseconds at 10^15 scale!

The talk was followed by a discussion on a set of open questions as we scale the IPNI network. Take a look and get involved right from where we left off at the next Content Routing Workgroup meeting!

@[youtube](6l0i8DjhpLg)

## A Massive Shout-out

It's great to see the IPFS community coming together and celebrating the latest advancements in the field. A big thank you to all who attended the track at Brussels and to the speakers who presented and helped generate questions. Last but not least, a massive shout-out to the community that tirelessly drives the vision (a better web for all) forward. 🙇

And there's more to look forward to! The dates for [IPFS Camp 2023](https://lu.ma/ipfscamp23-prereg) in Bangalore, India have already been announced for early November. It's never too early to start preparing your talks and presentations. 😊

See you on the decentralised web! ✊
