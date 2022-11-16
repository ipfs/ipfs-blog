---
title: '3S Studio: Bringing Unreal Engine to IPFS'
description: 3S Studio can free game developers from platform dependency via IPFS.
author: Adam Grodzki
date: 2022-11-15
permalink: "/2022-11-15-3s-studio/"
translationKey: ''
header_image: "/0000_v2.jpg"
tags: []

---
3S Studio is a game development team that has implemented an IPFS plugin for the popular and widely-used Unreal Engine for 3D computer graphics. The plugin was created with close cooperation with Filecoin Foundation and Protocol Labs and is available on the [official Unreal Engine marketplace](https://www.unrealengine.com/marketplace/en-US/product/ipfs). It can be used directly within C++ and is also fully exposed to Blueprints. The download includes full documentation, learning materials, as well as example content and projects.

After the September 2022 release for versions 4.27 and 5.0, the team plans to continue updates for all future versions and Unreal Engine 4 as long as new versions don’t rely on UE5-only features.

# .pak and Modular Gameplay Features

The most important feature in 3S Studio’s plugin is that, due to the nature of gameplay modular features — being loaded on demand at runtime — the team was able to package them as separate .pak files and load them dynamically into the game. As references are encapsulated within the feature, it requires almost no extra effort to register the newly created asset classes, as features have their own initialization process.

As Unreal Engine is under active development — tracking new features and plans — 3S Studios foresees that similar treatment will be given to Data Layers. This means that, in the future, it will be able to mount and load objects directly related to quests, events, and context of the gameplay.

In a demo project, 3S Studio was able to reduce the content size of a game from **2 gigabytes to 40 megabytes**, with the rest of the content being downloaded only on demand. This workflow can potentially decrease installation sizes of games in the future.

# Supported Platforms

The common gateways predefined at launch are:

* IPFS
* Cloudflare
* Pinata
* Infura
* Web3.Storage
* NFT.Storage
* Local desktop node

Developers can also configure access to any custom gateway such as a private one or a testing environment gateway.

# Why 3S Studio Uses IPFS

There are a number of subsystems, cloud storages, and service providers that allow you to store data in the cloud and directly access it from the game. Until now, all of those systems have been centralized and usually require predefinition and provide limited configuration using online proprietary service administration panels.

This is where IPFS is important for a project like 3S Studio. As a web3-based stack, IPFS brings a lot more to the table for game developers than traditional cloud storage providers thanks to [content-addressing](https://docs.ipfs.tech/concepts/content-addressing/).

It is also a step forward when compared to other web3 projects such as regular blockchain networks with limited storage functionalities. Many developers approach web3 in ways that feel "forced in" instead of being of actual utility to the end users. IPFS, however, solves many tangible problems for a web3 game developer by helping with:

* Storage of large quantities of big “save game” files on-chain, solving an issue that already [affects](https://www.gamesradar.com/red-dead-redemption-2-fan-with-nearly-6000-hours-on-stadia-begs-rockstar-for-character-transfer/) users when platforms shut down.
* Storage of user data (for example achievements, game progress, anonymous metrics) in a JSON format and track changes for such data using IPNS.
* Saving, storing, and sharing between players – schematics, blueprints and other user-created content.
* Loading data to disc, or parse directly into memory as usable parameters (string values, texture 2d from image, sound wave from a wave sound file).
* Patching games and distributing content, DLCs, cosmetic packs, battle pass content, and live service content.
* Allowing the core game to stay the same for everyone with unlimited customizations that are shippable to end-users.

IPFS even solves issues that modern life-sim and casual games have. It can be easily used for the distribution and storage of vast numbers of user created patterns, blueprints, and parameterized items. This allows developers to create a stack of incremental updates that can be applied in order to a physically shipped base game.

The biggest feature of using IPFS is that the game’s creators are running the service and no longer depend on third-party services. Centralization of usable features on platforms like Steam put game developers in a weak position where they are vendor-locked and have to give up a 30% cut of their revenue. With IPFS, developers are free from platform dependency.

# Future Plans

After the release, 3S Studio plans to continue the development of new IPFS features into the plugin as supplementary tools that will help utilizing the full potential of the distributed game builds.

By the end of the year, the team aims to implement versioning via IPNS, upload of entire folders and complex structures, and chunking via CAR containers. It will also work on a fully functional and easily configurable workflow for packaging and shipping content in multiple .pak files.

If you’d like to stay updated on 3S Studio’s plans follow the team on [Twitter](https://twitter.com/3SGameStudio) or visit the [3S Studio website](https://www.3studio.online/).