---
title: IPFS on the Web - IPFS þing 2023
description: 'Track recap with links and serious analysis for the IPFS on the Web track at IPFS þing 2023
author:
date: 2023-05-09
permalink: '/2023-ipfs-thing-web-track/'
header_image: '/ipfs-thing-2023-recap/ipfs-2023-recap-featured-image.jpg'
tags:
  - 'thing'
  - 'þing'
  - 'event'
  - 'recap'
  - 'track'
  - 'web'
---

# IPFS on the Web (IPFS Thing 2023 Track Recap)

![](https://i.imgur.com/NKLh0BF.jpg)

The world wide web is both the biggest deployment vector and least controllable surface for IPFS. There are opportunities and challenges with bringing IPFS support to rendering engines, browsers, gateway-served content, web apps, and browser extensions. It is these unique dynamics that motivated us to organize a dedicated content track for them at the annual gathering of IPFS implementers known as IPFS Thing.

To catch you up to speed, the [*Browsers and the Web Platform* track at IPFS Thing 2022](https://2022.ipfs-thing.io/schedule/#Browsers-and-The-Web-Platform) was only a half day long with a small group of people. It had browser and gateway progress updates, some alternate visions of how a content-addressed web could work on desktop and mobile, and also some straight-up "stuff is hard still" talks. You can listen to [all of these talks](https://www.youtube.com/watch?v=_DGVa2CJjIc&list=PLuhRWgmPaHtTsL76nt_A6CPDe6lW7l6Sz) on YouTube.

A few months later at [IPFS *Camp* 2022](https://2022.ipfs.camp/#Browsers-Platforms) we had a similar track with many more people and the tone changed a bit — we saw more working code, and even features shipped in products that were represented, and we covered platforms outside of web, like native mobile and space. You can watch the [full playlist of videos](https://www.youtube.com/watch?v=HhCHvuP5IJo&list=PLuhRWgmPaHtQohNbRjFJDS70WoElZ8ep5) on YouTube as well.

This brings us to IPFS *Thing* 2023 that occurred last month. I had the privilege of broadening the lens even further than we experienced at the previous two gatherings. We examined the opportunities, challenges, products, protocols, and experiments in the intersection of these two distinct paradigms of HTTP and IPFS. This area of the IPFS ecosystem is changing so rapidly that [HTTP Gateways to the IPFS network](https://www.youtube.com/watch?v=p89i9_AskIw&list=PLuhRWgmPaHtTapMgLW7rRh92Tk8u7wip5) had a whole track to itself this year. This gave the Web track more room to move, so we were able to cover everything from naming systems to publishing pipelines and JS toolkits and more.

In the rest of this blog post you'll find highlights, links, and commentary from the track lead (that's me, Dietrich) on why these talks were selected and why I think they're helping make a better web for us all.

You can find the full video playlist for the IPFS on the Web track [here](https://www.youtube.com/watch?v=dn8PssXkRbY&list=PLuhRWgmPaHtQ-TO65P62tqfUM85HCIqSj), and I'll link each below as well.

## IPFS on the Web in 2023 (so far) - Dietrich Ayala

[Dietrich](https://metafluff.com/) gave a short overview of various initiatives and collaboration projects of the Browsers, Platforms & Standards team at Protocol Labs. It was a peek into the latest IPFS features in Brave Browser, early work into Chromium native support for IPFS, and various other work those weirdos are pushing forward.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dn8PssXkRbY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## What Is The Web? - Robin Berjon

Good morning. Have you had a coffee yet? Ok great because you're going to need it for this talk. [Robin](https://berjon.com/) sets the perspective for the day by asking us one of the most difficult questions: "What is the web, actually?" It's big. It's special. We complain about it. But we need to have language to describe what it is in order to talk about how it could grow and change. Warning: This talk begins at a point in history over 100 years ago!

<iframe width="560" height="315" src="https://www.youtube.com/embed/s878bm15mrk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## A better web: secure, private, p2p apps with user-owned data and identity - Ian Preston

[Peergos](https://peergos.org/) has been building *your* private space online for half a decade, and it shows: [Ian](https://peergos.org/about#ian_) and team have built a mostly exilfiltration-proof application platform on IPFS which works in the browsers of today. The idea of web content that can't phone home might make you say "hmmm", but it could just be the antidote to the surveillance-is-required-to-pay-the-bills version of the web we have today.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mSElk2jcFqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## WNFS: Versioned and Encrypted Data on IPFS - Philipp Krüger

It's the web. It's p2p. It's files. It's private. It's WNFS! [Philipp](https://irreactive.com/) walks us through how the WebNative Filesystem works, and how it works in browsers specifically. It's not easy, but none of us signed up for easy. That being said, you *can* sign up to join the [WNFS Working Group](https://github.com/wnfs-wg) today after watching this talk.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LBMyRp4Ywew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Content Based Addressing and the Web Security Model - Fabrice Desré

Speaking of hard... have you ever decided that the problem you'd like to fix in the world is Google and Apple's stranglehold on our daily digital lives? That's what [Fabrice](https://github.com/fabricedesre) does with [Capyloon](https://capyloon.org/), a complete web-based mobile operating system. When you control the OS, you ~~control the world~~ can do veeeerrrry interesting things. Fabrice gave us a deep dive into the [origin security model](https://www.rfc-editor.org/rfc/rfc6454) today and how radically different it can be in a content-addressed world.

<iframe width="560" height="315" src="https://www.youtube.com/embed/H_1JVGDnctI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Hello Helia - achingbrain

Bye Felicia. Hello Helia. Thanks [achingbrain](https://github.com/achingbrain). Welcome to a new way to IPFS in JavaScript, on the web, or on the server... finally with nice things like DHT support. It should've been called banana. But we like it anyway.

<iframe width="560" height="315" src="https://www.youtube.com/embed/T_FlhkLSgH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## JavaScript performance - how to wring the most out of your Helia deployment - achingbrain

Hey it's [achingbrain](https://github.com/achingbrain) again, this time with a deep dive into Helia performance and optimizing for the environment you're deploying to. JavaScript is the *fastest* language for the environments it lives in which other languages can't even exist, so take that.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zPeLYosZ3Ak" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Connecting everything, everywhere, all at once with libp2p - Prithvi Shahi

First, the person who gives this talk is not Prithvi, it's Max. Second, Prithvi is a genius for thinking up a talk like this. Please enjoy all the transports everywhere all of the time.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4v-iIB0C9_8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## The Incredible Benefits of libp2p + HTTP - Marten Seemann & Marco Munizaga

In the ageless words of Gandalf, the headmaster of Hogwarts: "be like water". Or something like that. Anyways, if you're familiar with the challenge of writing code for the web that has to pretend that it's not actually stuck in a web browser tab, but instead is actually connected to a global transport-agnostic peer-to-peer network, then you'll understand how important it is to make friends with your environment and use the *!#? out of what it gives you. This talk from Marten and Marco shows you how the changing landscape of the network layer of the web platform is allowing libp2p to operate unfettered while still stuck in a tab in a window in a browser on your computer on earth.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ixyo1G2tJZE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## The Name Name Service - Blaine Cook

NNS.. NNS.. NNS... goes the beat. Now that you're bouncing your head, follow along as Blaine Cook shares his vision of how we solve one of the three hardest problems in computer science: how to make the perfect Hollandaise. Er, no that wasn't it. NAMING! Yes, that was it. The Name Name Service is a breathtakingly simple approach to flexible, veriable, integrate-able, old-world-compatible, and human-readable names for our digital things. Thank you Blaine.

<iframe width="560" height="315" src="https://www.youtube.com/embed/CHiCEd36KtI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Building decentralized websites on IPFS - Ryan Shahine

Decentralization is cool but it's so hard and you have to be super technical to even... wait, what? I can just... drag and drop? What I see is what I get?! With Portrait, yes. Ryan Shahine shares Portrait's slick and simple site builder for publishing your sites to IPFS. No-code sites for non-technical creators is such a wonderful thing to behold.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TeFAHmzvIdg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## ODD.js, a technical overview - icidasset

Oddly enough, DID you know UCAN build decentralized applications with that WNFS stuff we heard about earlier? In this preview of the final emergent form of a bunch of Fission's tools coming together like Voltron, you'll meet Odd.js - a toolkit for building applications that has all of the core bits you need, from identity to naming to storage to security. The only odd thing is that we didn't have this yet.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ByQbY3lNAck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## IPFS native frontend development using Importmaps - Dilip Shukla

Imagine if your CDN was a massive cooperative global distributed network that 1) wasn't a single company, and 2) pushed alllll the way up into your client-side build tooling, making your pages immediately available. WHAT YOUR DOM WAS ACTUALLY A DAG... ok maybe that's too far, but what Lagom is doing is finding exactly what the right balance is. In the future we'll look back and wonder why we didn't do this from the begining...

<iframe width="560" height="315" src="https://www.youtube.com/embed/4HY_7DxScMo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Explorations into Decentralized Publishing - David Justice

The Browsers, Platforms and Standards team wants to share our thoughts early and often. And we want to do it on IPFS. There are all kinds of ways to do it, but each have their trade-offs... but it's not clear what those are until you go make a bunch of mistakes. So we're going to make them for you. David Justice is working on approaches for building our team blog with some friends at Trigram and shares what the first stab at it looks like.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fn5QNvRXMIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Thank you!

Thanks to all the speakers for the day and also to the rad people who joined and asked great questions.

IPFS Camp is already in planning for early November... in BANGALORE INDIA! So block your calendars and start thinking about the web you want to see exist, so you can submit a talk there. 😄

Until then, come hang out in our superbridged megachannel:

* #browsers-and-platforms on Filecoin Slack ([join](https://filecoin.io/slack))
* #browsers-and-standards on Element/Matrix ([join](https://matrix.to/#/#browsers-and-standards:ipfs.io))
* #browsers-and-standards on IPFS Discord ([join](https://discord.gg/ipfs))

