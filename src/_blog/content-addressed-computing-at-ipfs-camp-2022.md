---
title: Content Addressed Computing at IPFS Camp 2022
description: Check out this recap of the Content Addressed Computing at IPFS Camp
  2022.
author: Warpfork
date: 2022-12-01
permalink: "/2022-12-01-cod-at-ipfs-camp/"
translationKey: ''
header_image: "/ipfs-blog-header-cod-track-at-ipfs-camp.png"
tags: []

---
In the Compute-Over-Data track at the [2022 IPFS Camp](https://2022.ipfs.camp/), we heard from several projects and lots of people on how the landscape of computing is evolving, and how we believe computing can become refocused and more powerful by embracing content addressing and a “merkle-native” way of doing things. In this post, we’ll do a quick recap of what was covered.

[Content-addressing](https://proto.school/content-addressing/) and the use of [merkle datastructures](https://en.wikipedia.org/wiki/Merkle_tree) – identifying data by a cryptographic hash – is already a well-known revolution of how data structures can be designed for decentralization, bringing benefits like verifiability, naturally coordination-free data deduplication, and so forth. In examining content-addressed computing, and looking for ways to embrace computing over content-addressed data (sometimes referred to in this community as compute-over-data for short), we look at how we can bring those virtues of verifiability and decentralization to data _processing_ as well as data storage and transport (where content-addressing has already become near-ubitiquous in any modern protocol design), and we look for what new virtues we can discover that are unlocked by giving computations predictable coordination-free identifers.

A wide range of projects exist in this space! In the videos of the event, you’ll find presentations of projects that are ranging in focus from linux containers and how to unify them with content-addressed storage, all the way to new bytecode VMs which have direct integrations to content-addressed storage and content-addressed code execution primitives. You’ll find approaches to scaling and approaches to user adoption which range from developer-centric build tools, all the way to projects with a focus on massively scaled parallelized compute job scheduling. And you’ll find exploration of virtues of developing systems with computation-addressable primitives, ranging from software security and reproducible builds, to public verifiability, to sheer scaling.

All of the talks were recorded, and you can also find the full [Compute-Over-Data track playlist](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTU1u9TGOVviM234URBdEGa) on the IPFS YouTube channel.

Here’s a quick summary of all the talks and their topics:

* In the keynote: David Aronchik and Wes Floyd introduce us to the potential for revolution in the big data age, and what do we mean by “compute over data”:
  @[youtube](7XczBBxYTB4)
* In “Warpforge — Hashes go in, hashes come out, exec in the middle!”, Eric Evenchick and Eric Myhre introduce Warpforge, a tool for declarative computation and software build pipelines, as well as demonstrate new data structures (in IPLD!) to describe decentralized package management – emphasizing how to collaborate, without enforced central coordination.
  @[youtube](wcOjT580iaI)
* In “Bacalhau — Bringing the Compute to the Data!”, David Aronchick tells the story of the Bacalhau project, its origin, motivations, and progress so far, as well as demos of using it to run distributed compute jobs.
  @[youtube](Xj3n0uvQSCM)
* In “FVM – The (EVM-Compatible!) Filecoin Virtual Machine”, Matt Hamilton shows a new computing environment called the FEVM, which hosts Ethereum-compatible smart-contracts on-chain in Filecoin. This allows smart contracts that integrate with the state storage mechanisms of Filecoin. Applications of this could include automatic storage deal renegociation, among other ideas. Live demos are included!
  @[youtube](tLJ-ys2G8tU)
* In “Zapps — A new standard for go-anywhere linux executables”, Eric Myhre dives into how to ship software on linux, and demonstrates a new way to do it in a drag-and-drop way, with truly minimal system dependencies, and _without_ resorting to containers.
  @[youtube](Q33LgKAwpZU)

Tons of questions were asked and answered throughout these talks:

* Verification of compute in decentralized systems: how can we do it?
* Deterministic computation: how does it relate to verification? And is it prevalent in the wild?
* What are the interventions we can make if deterministic computation _isn’t_ prevalent in the wild, and we want to make it so, as a community?
* How do markets relate to these systems? Can we make decentralized markets for data as well as the _processing_ over that data?
* How can we make it easier for people to get started in building new decentralized software?
* How do we get software in the hands of end-users with less fuss? How do we make software packages easier to compose, so more people can join us more easily in building data pipelines?
* How can we label, annotate, and share references to data, without central coordination? Hash-based identifiers are a given – where do we go from there?

… and okay, some of these questions are just asked; not all of these questions are _answered_. ;) Some of them are hard questions; some have multiple answers! And for the hard problems remaining, if you want to contribute in some way, you can find more information on getting in touch below. All of these projects are looking for both users and contributors.

The summaries above hopefully pique your interest – if so, _watch the videos_! Almost every one of these presentations included _live demos_, which are very cool, and hard to summarize in text ;)

## Getting in touch

If you’re looking for followup contacts for these groups:

* There’s a CoD working group representing **lots** of different projects – not just these that spoke at IPFSCamp, but many more too (and it can be a place to represent yours, as well!) – check out [cod.cloud](https://www.cod.cloud/) and the [`#compute-over-data-wg` channel on Filecoin Slack](https://filecoinproject.slack.com/archives/C03MCV5U77C).
* More info about Bacalhau can be found [bacalhau.org](https://www.bacalhau.org/), and you can get in touch with them in the [`#bacalhau` channel on Filecoin Slack](https://filecoinproject.slack.com/archives/C02RLM3JHUY)!
* More info about Warpforge can be found at [warpforge.io](http://warpforge.io/), and you can get in touch with them in the [`#warpforge` channel in Matrix](https://matrix.to/#/#warpforge:matrix.org) or see the project’s [Community](https://warpforge.notion.site/Community-676332742afa4276be571f7d035d55db) page for more links.
* More info about the FVM Project can be found starting at [docs.filecoin.io/fvm](https://docs.filecoin.io/fvm/basics/introduction/), and you can get in touch with them in the [`#FVM` channel on Filecoin Slack](https://filecoinproject.slack.com/archives/C029MT4PQB1)!
* More info about the Zapp packaging format can be found at [https://zapps.app/](https://zapps.app/ "https://zapps.app/") .

For more information about the IPFS Camp 2022 overall, the event info can be found on the [IPFS Camp site](https://2022.ipfs.camp/). More information about the other tracks can be found grouped by [this tag](https://blog.ipfs.tech/?tags=ipfs-camp).