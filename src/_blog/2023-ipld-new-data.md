---
title: 'IPLD: The Data Layer of the Decentralized Web'
description: 'How IPLD and content addressing provide the foundation for the decentralized web'
author: Mikeal Rogers
date: 2023-02-09
canonicalUrl: https://medium.com/@mikeal/the-new-data-d6b5e392da43
permalink: '/ipld-the-new-data/'
header_image: '/ipld-new-data.png'
tags:
  - 'ipld'
---

## The New Data

What is data? The question is more philosophical than practical, but the definition we seem to be able to agree on is that data is a medium for expression.

You can express a lot with data, almost anything, but like a painting, the meaning of that expression is subjective and depends on the context you have around it. A pollster publishes data they believe accurately captures the state of mind of a people, but to Nate Silver this data is only one point in a more complex answer to the same question.

We add meaning to data by altering its context. We link to and from pieces of data to accumulate greater context and therefore greater meaning. We have many means of linking data. A social network captures the expressions of many individuals and connects those expressions with others in a large relational database. The Web connects pages by way of URL links, either within the same site or between any sites on the Web. Nate Silver collects data and links it into a complex model that weights different data points into probabilistic metrics.

## Content Addressing

For decades now, researchers and engineers have been building on top of hash-linked data structures. These are structures in which the link from one piece of data to the next is a cryptograph hash of the content being linked to. The first widely adopted use of these data structures was git and in the proceeding decade, we’ve seen an explosion in blockchains and applications built on blockchains all relying on these same hash-linked structures.

Hash linking has an interesting property, it allows you to create links between pieces of data without actually locating all of that data in a consistent _location_. Databases typically can’t do this, they capture the relationships between pieces of data using their locations on disc. URLs on the Web can link between sites, but those links contain the **location** of that site. With hash linking, you can define a relationship to data you don’t even store, and anyone in the world can provide that data securely.

Since the link to a piece of data is the hash itself you can always compute the hash again to validate it’s a match. This is what allows trustless p2p networks to exchange hash-linked data, which is how BitTorrent works. This means of addressing data is called “Content Addressing” as opposed to the traditional approach of “Location Addressing.”

## Limits of Open Source

People, including me, have become accustomed to saying “Open Source won.” On one level this is true, most of the code in the applications you rely on every day is Open Source. But for many of us Open Source is about values and freedoms as much as it is about code.

A freedom can’t be measured by the lines of code that fall under a particular license, a freedom is rendered unusable if it is not guaranteed by the final product. Open Source _code_ may have won, but Open Source _applications_ are marginal at best. Most applications are still proprietary and assembled by combining a lot of Open Source code with a little bit of proprietary product code.

Open Source communities are capable of building products. I’ve been amazed at what Open Source communities can achieve given the right circumstance, the only thing I haven’t been able to see them do well is manage a bank account, which is what you need to build a modern application.

So much of the application toolchain is Open Source that it’s easy to forget that multi-user applications effectively **require** a recurring data bill. The value of most modern applications isn’t in the user data they capture but in the relationships, they build between the data produced by different users. These relationships have not been realistic to build without a large relational database which means a recurring monthly bill.

If you think about it, there’s nothing other than the database keeping us from building a Twitter or Facebook competitor in a GitHub repo published to [GitHub Pages](https://pages.github.com/) which is already automatically fronted by Cloudflare. That’s a phenomenal deployment stack, it’s a significantly better environment to develop and scale than what Facebook and Twitter had when they launched. **But that damn database!**

## BYOS (Bring Your Own Storage)

Right now there’s a wide gulf between traditional centralized applications and “DApps” (decentralized applications) built on blockchains. Blockchains provide transactions that allow applications to manipulate shared and even global state without centralization. Since database transactions do something quite similar it may seem like these transactions are what should replace traditional database transactions, but most of applications have very little shared state between users other than the relationships built by way of indexing.

If you think about how people use Twitter or Facebook they are effectively publishing into their own namespace, there’s no other users you need to reconcile those transactions with. The relationships that are built between one user’s data and another’s is done secondarily, it’s a view that is generated over what individuals are publishing more or less independently. None of this actually requires a decentralized transaction, it requires decentralized linking.

It’s not difficult to imagine a workflow in which a user “Signs In with” their data provider, the same way people login to third party applications with Google, GitHub, or any other large application. Except instead of just validating the authentication the application now stores that user’s data in that provider. This has been possible for some time it just hasn’t been very practical because we lacked a means for the application to create relationships between data hosted in different providers but content addressing provides us this opportunity.

The mistake I feel IndieWeb and others have made is to frame the solution to application centralization as a personal application silo or “personal cloud.” This approach makes multi-user applications very difficult and ignores the fact that most users would still prefer to hire a provider than run something themselves. Disambiguating the application centralization from the data centralization exposes a better model where applications can be hosted and maintained by one party and the user can choose their own data provider to be used by that application. This approach also forces an application federation model since any new application can be authenticated to a user’s chosen data provider.

## IPLD

For the last few years, the [IPLD](https://ipld.io/) project has provided tooling in a number of languages to address the challenge of working with **content addressed data structures** and exploring the vast universe of new data structures that can be built on these primitives.

**The IPLD project (InterPlanetary Linked Data) is the foundational data layer of both [IPFS](https://ipfs.tech/) and [Filecoin](https://filecoin.io/).** Data you create in IPLD can be stored anywhere (local, S3, numerous storage backends) and of course, it can also be persisted and distributed with IPFS and stored in Filecoin. For example, [CAR files](https://ipld.io/specs/transport/car/carv1/) provide a uniform format for moving IPLD content-addressed data in a transport-agnostic way with libraries for [Go](https://github.com/ipld/go-car), [Rust](https://crates.io/crates/iroh-car), and [JavaScript](https://github.com/ipld/js-car).

IPLD isn’t just a means of **representing** data, it’s means of **linking** data together. You can even link between encoding formats using different hashing methods. The project has substantially matured and it’s time to start building databases and thinking about how everyday applications can be adapted to these new patterns.

> **Note:** IPLD can be thought of as a generalization of [UnixFS](https://docs.ipfs.tech/concepts/file-systems/#unix-file-system-unixfs), the default Protocol Buffers based format for representing files and directories in IPFS.

## The Web of Data

What makes IPLD the data layer of a decentralized web is that it does more than provide a transport-agnostic and universal way to move data to where users want, it enables all future applications to be built on top of every prior application’s data (an approach explored by [Ceramic](https://ceramic.network/)).

In the same way that a website has the opportunity to link to every other website on the internet when you build a data structure in IPLD you can link to the data that has been produced by every application that has ever been built. It doesn’t replace a centralized database with a decentralized database, it replaces the nature of data itself.

Data in IPLD is not captured and controlled by a provider, it’s accessible to the world and can be distributed by anyone in the world. We don’t need to replace Twitter with another Twitter, we can replace Twitter with hundreds or even thousands of applications that all provide a different experience than Twitter but share common notions of a “feed” or “timeline” that build on top of and continue to link to each other's data.

This opens the door to a world in which Open Source communities really can develop and maintain important everyday applications that persist Open Source freedoms all the way to the user in a way that we’ve failed to do with licensing as our only weapon.

There’s a real future here, but one that many people need to participate in for it to be realized and I hope to see all your faces as this community continues to grow.

> Note: This blog post was originally published on [Medium](https://medium.com/@mikeal/the-new-data-d6b5e392da43) and adapted for the IPFS Blog.