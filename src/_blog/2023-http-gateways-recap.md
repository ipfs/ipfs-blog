---
title: 'Recap: HTTP Gateways (þing 2023)'
description: 'A recap of the new HTTP Gateways track including summaries, links, and videos.'
author: Will Scott
date: 2023-05-30
permalink: '/2023-http-gateways-recap/'
header_image: '/http-gateways-recap.jpg'
tags:
  - 'thing'
  - 'þing'
  - 'event'
  - 'recap'
  - 'track'
  - 'http'
  - 'gateways'
---

We had a new track at IPFS Thing last month: a forum focused on HTTP Gateways. As IPFS has scaled, the interactions between IFPS and the surrounding web has also increased. IPFS lives within the web, and as the [browser track](https://blog.ipfs.tech/2023-ipfs-thing-web-track/) noted, HTTP is deeply integrated with IPFS.

The Gateway track looked at the specific HTTP interface that IFPS as a server provides to web clients, and how the web clients make use of that interface. There are continuing pushes to evolve the interface `/ipfs/<cid>`, but we need to understand both how these primitives should be used by higher level APIs, and how to implement them.

A specific focus in this track was [Project Rhea](https://pl-strflt.notion.site/Project-Rhea-decentralized-IPFS-gateway-3d5906e7a0d84bea800d5920005dfea6), a cross-cutting project in Protocol Labs to decentralize the current gateways running at [ipfs.io](https://ipfs.io) to be hosted on decentralized infrastructure. This project has led to re-evaluation of the trust relationship between clients and gateways, and the hope that we can reduce the trust and increase the decentralization of gateways even further.

The talks in the track presented both different models for gateways, as well as implementation details for how components of Project Rhea are built.

In the rest of this post I'll provide links and brief color to the sessions in the track.

## What is Rhea?

[Will](https://wills.co.tt) kicked off the day with an overview of the architecture and goals of project Rhea.

@[youtube](0eJd2aqqSy8)

## IPFS Service Worker Gateways

[Adin](https://github.com/aschmahmann) demonstrated how web clients can reach origin IPFS hosts directly through protocols like webtransport and webRTC. The increasingly complete libp2p stack along with HTTP-compatible services like IPNI are bringing us to a reality where the HTTP gateways become less critical in bridging IPFS support directly to end web users.

@[youtube](MRIyWXy0ZRc)

## Web3 CDN Saturn accelerates IPFS & Filecoin retrievals

Alex Kinstler provided an overview of Saturn as a decentralized CDN and described the service it can provide as a basis for Rhea and as a platform that can host the ipfs.io IPFS gateway.

@[youtube](f9iUTLtPtKY)

## Self-hosting IPFS Gateway with bifrost-gateway

[Lidel](https://github.com/lidel) walked through the architecture of `bifrost-gateway`, a new IPFS implementation that acts as a 'trust gateway'. This component, built for Rhea, provides an HTTP gateway interface compatible with the current gateways which can fetch data from remote nodes via self-verifying car files.

@[youtube](xhJPz_efAQE)

## Introduction to Caboose

[Aarsh](https://github.com/aarshkshah1992/) dove into a 'thick client' for Saturn called Caboose that allows Saturn clients to make requests to close nodes in order to optimize performance of the CDN. In the Rhea use case, Caboose both allows for and improves fraud detection, as well as enabling faster switch-over in the case of a node going down.

@[youtube](z7a9E735l3Y)

## Testing Your IPFS Gateway Implementation: A Step-by-Step Guide

[Piotr](https://github.com/galargh) offered a framework for testing whether an IPFS gateway implementation works as expected. This conformance testing can improve our confidence that new implementations will be compatible with existing applications, and it is much less implementation-specific than previous testing frameworks.

@[youtube](PmIf77thO_c_)

## Live CDN Incentives and its Future

[Claudia](http://w.laudiacay.cool/) sent us off with a great dive into how incentives can be built for a retrieval market CDN. She described how existing primitives can be linked together to support a high performance decentralized CDN that is incentive-aligned with serving content well and quickly.

@[youtube](yrrAjR03TsU)

## Conclusion

I hope this overview of the HTTP Gateways track was helpful for those who couldn't attend IPFS Thing 2023 or for those who did attend but need a refresher. Next year we hope to take this new content track to the next level!
