---
title: 'Functionland: Using IPFS to Enable Free-to-Use Cloud Applications'
description: The Fula Network provides an alternative to photo storage, file syncing,
  password management & collab tools.
author: ''
date: 2022-02-22
permalink: "/2022-02-22-functionland/"
translationKey: ''
header_image: "/155012542-5a78dea3-07fe-4b3f-a608-d6f87e1f0116.png"
tags: []

---
There are countless free-to-use, well-maintained packages and dev tools available to the open-source development community. In contrast, there is almost a complete lack of free-to-use cloud applications and services available to end-users. They are always required to pay upfront, subscribe, or give away their data and attention.

The difference is hardware. While developers own the machines that run their applications (dev tools), end-users don’t. When users go to online services such as social media and streaming platforms, they have to rely on the hardware resources that are owned by these companies in order to run the applications. In this sense, they have to ‘rent’ the hardware. This creates a ‘paying problem’ that prohibits truly free-to-use applications for end-users.

[Functionland](https://fx.land/)’s Fula Network is a privacy-focused, user-powered platform that presents an alternative model. It enables free-to-use applications and services by rewarding users for sharing storage and computer resources. At the same time, it compensates open-source developers for providing applications and services.

### The Story of Functionland

CEO Keyvan Sadeghi and CTO Ehsan Shariati come from backgrounds in open-source development and AI research. While they presented their first proof-of-concept for the ‘Fula Network’ when they won first place at the [DoraHacks Filecoin hackathon](https://filecoin.io/blog/posts/249k-for-17-projects-from-dorahacks-filecoin-grant-hackathon/), the project really gained momentum the day Google announced they would switch their “forever free-to-use” Photos app to a monthly subscription.

Keyvan and Ehsan felt it was wrong that a cloud service provider would promise users a free-forever service, spend years training AI models on their private data, then break their promise and start to charge.

In response, they announced a free, open-source Photos alternative, which received a lot of interest on Github. However, they quickly encountered the limitations for a free, open-source alternative to cloud services: Because end-users don’t own the hardware that runs the apps, someone has to pay to rent the servers, making it impossible to offer truly free apps.

### What is the Fula Network?

The [Fula Network](https://fx.land/mine/) is a people-owned alternative to the cloud. Founded upon dedicated, user-owned hardware using IPFS, it enables free-to-use, open-source services such as photo storage, file syncing, password management, collaboration tools, among others.

Eliminating hardware rental enables a re-distribution of value among network users and developers. Users own the computing and storage hardware that runs the network and they earn for sharing those resources with other users. Likewise, developers who build free-to-use applications get compensated for providing value to the network. Open-source packages and dependencies also earn for enabling other projects.

### Hardware

One of Functionland’s primary aims is to create a network that is accessible to everyone. While virtually any IPFS-capable device can connect to the Fula Network, it requires technical knowledge to set up. That’s why the team is launching a plug-and-play device called Box. Box is a personal server that easily connects to a user’s home internet and syncs with their computer, mobile devices, and other Box devices on the network.

The device is modular and open-source, with standardized dimensions enabling anyone to add functionality to the hardware and the Fula Network. Each Box connects with other Boxes in geographical proximity. They provide one another with responsive resources such as backups, storage, and computation.

Box earns FULA tokens for contributing resources to other devices on the Fula Network. These FULA tokens ensure the Box user receives free apps and services — without harvesting their personal data or attention.

### IPFS and Filecoin Implementation

Functionland chose IPFS for its widespread adoption and truly open protocols. The Fula Network adds dedicated, user-owned hardware to IPFS. This enables a high level of data availability and security for the majority of use-cases. And for the most important data, Functionland will provide an SDK for developers to implement Filecoin for high data availability and security. The project also plans to build a bridge to Filecoin so that transactions can be verified on Filecoin.

### Bridging the Client-Server Model with IPFS

Functionland wants users to have an equivalent experience using the Fula Network as they have with traditional cloud services without adding power consumption or storage requirements to their mobile devices. It also wants to make development on the Fula Network easy for front-end developers familiar with existing Web 2.0 technologies.

For these reasons, the team decided to utilize IPFS under a client-server paradigm that still remains loyal to the principles of decentralization. Fula Network repurposes Libp2p so that it replaces HTTP, and it differentiates the client (e.g., mobile device) from the server (i.e., a cluster of Fula Nodes such as Boxes in a neighborhood). This way, it can offset storage requirements from an end user's mobile device to their dedicated Box hardware.

Front-end dev tools such as CoreJS and React Frameworks are also built entirely upon client-server architecture. Functionland is creating an abstraction layer called the Fula Protocol Suite to allow front-end developers to build on the Fula Network using their existing knowledge.

### What’s Next for Functionland

* The project’s goal is to create a people-owned, open-source platform. To maximize accessibility, the team is bringing ‘Box’ to life, an open-source plug-and-play hardware device. You can read more on the project’s [Kickstarter Launch](https://fx.land/crowdfunding/?utm_source=PL&utm_medium=blog&utm_campaign=filecoincommunity).
* Functionland is working on the Fula Protocol Suite (File, Graph, and AI). These create a compatibility layer between Web3 technologies like IPFS with dev tools such as React, enabling front-end developers to build Web3 apps within a Web2 paradigm.
* The [Photos app](https://github.com/functionland/photos) will launch with Box, and the team is working to provide a free File Management app and a Password manager.
* The team is in the early stages of developing an incentive layer which ensures fair usage, rewards users for creating the network, and funds open-source developers and contributors for building applications.

  
Functionland welcomes other open-source contributors to the [Fula Network Github](https://github.com/functionland/Fula). It is a fully open-source project built on open-source hardware and software.