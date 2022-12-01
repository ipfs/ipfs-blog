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
In the Compute-Over-Data track at the 2022 IPFS Camp, we heard from several projects and lots of people on how the landscape of computing is evolving, and how we believe computing can become refocused and more powerful by embracing content addressing and a "merkle-native" way of doing things.  In this blog, we'll do a quick recap of what was covered.

Many different approaches to "computing" exist, and we heard from all corners of the space!  In the videos of the event, you'll find presentations from projects that are ranging in focus from linux containers and how to use them, all the way to new bytecode VMs which have direct integrations to content-addressed storage and content-addressed code execution primitives; and approaches to scaling which range from developer-centric build tools for creating new software and data pipelines in "the merkle universe", all the way to decentralization strategies for massively scaled parallelized compute job scheduling.

All of the talks were recorded, and you can find the whole playlist here: https://www.youtube.com/playlist?list=PLuhRWgmPaHtTU1u9TGOVviM234URBdEGa

Here's a quick summary of all the talks and their topics, to help you find which content you might be interested in:

* In the keynote: David Aronchik and Wes Floyd introduce us to the potential for revolution in the big data age, and what do we mean by "compute over data":
@[youtube](7XczBBxYTB4)
 
* In "Warpforge — Hashes go in, hashes come out, exec in the middle!", Eric Evenchick and Eric Myhre introduce Warpforge, a tool for declarative computation and software build pipelines, as well as demonstrate new data structures (in IPLD!) to describe decentralized package management -- emphasizing how to collaborate, without enforced central coordination.
 @[youtube](wcOjT580iaI)
 
* In "Bacalhau — Bringing the Compute to the Data!", David Aronchick tells the story of the Bacalhau project, its origin, motivations, and progress so far, as well as demos of using it to run distributed compute jobs.
 @[youtube](Xj3n0uvQSCM)

* In "FVM -- The (EVM-Compatible!) Filecoin Virtual Machine", Matt Hamilton shows a new computing environment called the FEVM, which hosts Ethereum-compatible smart-contracts on-chain in Filecoin.  This allows smart contracts that integrate with the state storage mechanisms of Filecoin. Applications of this could include automatic storage deal renegociation, among other ideas.  Live demos are included!
@[youtube](tLJ-ys2G8tU)
 
* In "Zapps — A new standard for go-anywhere linux executables", Eric Myhre dives into how to ship software on linux, and demonstrates a new way to do it in a drag-and-drop way, with truly minimal system dependencies, and _without_ resorting to containers.
@[youtube](Q33LgKAwpZU)


Tons of questions were asked and answered throughout these talks:

* Verification of compute in decentralized systems: how can we do it?
* Deterministic computation: how does it relate to verification?  And is it prevalent in the wild?
* What are the interventions we can make if deterministic computation _isn't_ prevalent in the wild, and we want to make it so, as a community?
* How do markets relate to these systems?  Can we make decentralized markets for data as well as the _processing_ over that data?
* How can we make it easier for people to get started in building new decentralized software?
* How do we get software in the hands of end-users with less fuss?  How do we make software packages easier to compose, so more people can join us more easily in building data pipelines?
* How can we label, annotate, and share references to data, without central coordination?  Hash-based identifiers are a given -- where do we go from there?

... and okay, some of these questions are just asked; not all of these questions are _answered_.  ;)  Some of them are hard questions; some have multiple answers!  And for the hard problems remaining, it you want to contribute in some way, please find ways to get in touch!  All of these projects are looking for both users and contributors.

The summaries above hopefully pique your interest -- if so, _watch the videos_!  Almost every one of these presentations included _live demos_, which are very cool, and hard to summarize in text ;)

## Getting in touch

If you're looking for followup contacts for these groups:

* There's a CoD working group representing **lots** of different projects -- not just these that spoke at IPFSCamp, but many more too (and it can be a place to represent yours, as well!) -- see the chat channel invites [HERE](TODO LINK), and the recurring meeting [HERE](TODO LINK).
* More info about Bacalhau can be found [HERE](TODO LINK), and you can get in touch with them [HERE](TODO LINK)!
* More info about Warpforge can be found at [warpforge.io](http://warpforge.io/), and you can get in touch with them in the [#warpforge channel in Matrix](https://matrix.to/#/#warpforge:matrix.org) or see the project's [Community](https://warpforge.notion.site/Community-676332742afa4276be571f7d035d55db) page for more links.
* More info about the FVM Project can be found starting the [docs.filecoin.io/fvm](https://docs.filecoin.io/fvm/basics/introduction/), and you can get in touch with them in the `#FVM` channel on Filecoin Slack!
* More info about the Zapp packaging format can be found at https://zapps.app/ .

For more information about the IPFS Camp 2022 overall, links to the content in all the other tracks, as well as info about how to stay informed about future events, follow [HERE](TODO LINK).