---
title: Free-to-use Blockchain Koinos Introduces Plugin Architecture for Developers
  That Relies on libp2p
description: Read this ecosystem highlight to learn about Koinos' p2p microservice
  which relies primarily on libp2p.
author: Andrew Levine, CEO of Koinos Group
date: 2022-09-16
permalink: "/2022-09-16-koinos/"
translationKey: ''
header_image: "/untitled-6.png"
tags: []

---
Koinos is already known as the first truly free-to-use general purpose blockchain, but did you know that it’s also one of the first blockchains built on a microservice architecture? By breaking up the blockchain node into a set of loosely coupled services, Koinos becomes highly maintainable and easily verifiable while providing a great degree of deployment flexibility. Within that microservice architecture lies a p2p microservice which relies primarily on libp2p. One of the Koinos community developers did some [**incredible work on the p2p microservice **](https://github.com/koinos/koinos-p2p/pull/212)that could have interesting implications for Koinos developers.

# Blockchains = Expensive Storage

Blockchains can be really great for incentivizing people to run nodes in a network, but they are also an expensive way to store information. Wouldn’t it be great if there was an easy way to tap into the decentralized network of nodes to share information without having to bear the cost of storing that information on a blockchain?

This probably sounds pretty useless. Isn’t the whole point of a blockchain network to use … _the blockchain_? Imagine a dApp developer wants to add p2p encrypted messaging to their application or give their users the ability to share human readable content with one another (articles, posts, comments, etc.) but doesn’t want that information stored forever on an immutable ledger. Perhaps that’s because it will cost them Mana (the Koinos equivalent to Ethereum’s gas) or maybe they simply don’t want it immortalized on a publicly accessible database.

On other blockchains, adding these features to the dApp would require developing a totally separate node and then getting people to run that node. Of course, the way we get people to run nodes is by using blockchains and tokens to incentivize them to do so. However, now we’re right back to where we started: using a blockchain network to do something that does not require a blockchain!

# Building Bridges

Enter Roamin’s solution! Roamin initially reached out to our team with some questions about building an Ethereum-to-Koinos bridge. Because Ethereum lives outside of Koinos, we would need some kind of intermediary network of people running custom nodes that were capable of both observing behaviors on Ethereum and then interacting with Koinos. Koinos blockchain architect, Michael Vandeberg, informed Roamin of an observation he had made about the p2p code running on Koinos.

The p2p microservice in Koinos leverages the same modular, peer-to-peer network stack used in the Interplanetary File System (IPFS): [**libp2p (opens new window)**](https://libp2p.io/). While working with libp2p, Michael had noticed that it enabled peers to connect to other peers without mandating which protocol they use.

Instead, you could basically propose any protocol to that node and they could choose to accept or reject your proposal. However, the critical component for our use case is that even if a peer does not want to use the protocol being proposed by another node, it won’t disconnect from that peer.

# Plugin Architecture

Michael observed that this created the opportunity to add a “plugin architecture” to the p2p microservice powered by libp2p. Adding this architecture would mean that other developers could add their own communication protocols to a Koinos node and enable users to transmit whatever kind of information they want over the p2p network! In the case of an Ethereum bridge, that would mean information about what was happening on the Ethereum blockchain. But a p2p plugin could be created for an encrypted messaging service, content sharing application, or anything else! Since people have to opt into running a particular plugin, and because none of this information is stored in the blockchain, it has no impact on the overall functioning of the Koinos network while giving developers yet another tool for delivering amazing decentralized applications.

Right now the plugin architecture is very much a proof-of-concept. It works, but it hasn’t been tested since Koinos is still on testnet. However, now that the most important parts of the mainnet have been completed, I expect more Koinos applications to come online and I hope that some of them will take advantage of this underutilized capability of libp2p!

You can view the draft PR of the plugin architecture here: [**https://github.com/koinos/koinos-p2p/pull/212**](https://github.com/koinos/koinos-p2p/pull/212 "https://github.com/koinos/koinos-p2p/pull/212")