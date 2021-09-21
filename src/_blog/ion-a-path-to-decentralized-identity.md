---
title: 'ION: A Path To Decentralized Identity'
description: ION is building a solution on top of Bitcoin and IPFS to fix our fractured
  online identities.
author: ''
date: 2021-09-13
permalink: "/ion-a-path-to-decentralized-identity/"
translationKey: ''
header_image: "/ion-decentralized-identity.jpg"
tags:
- identity
- browsers
---

_[Browsers 3000](https://events.protocol.ai/2021/browsers3000/) is a five-week hackathon by Protocol Labs focused on decentralized solutions being built for the future of the Web3 browser. Below is a summary of a talk from Daniel Buchner, a member of the team developing ION. [View the full talk here](https://www.youtube.com/watch?v=3UbUzA0lW9w&list=PLuhRWgmPaHtR2MDeMaiUcsBmBqpIBqFEP&index=14)._

Most individuals don't think about identity in the digital world until they've had theirs stolen. However, digital IDs don’t work the way you might think they do. Identity on the internet is split into two distinct types of data.

_Identity data_ is anything you create and your credentials for a particular site. They link your content to your username and build a digital persona for yourself. The other half of the equation are _identifiers_. Identifiers are personally verifiable information such as your phone number or email address linked directly to who you are as a person.

Immediately, the problem surfaces that companies own all of this data relating to your digital presence. This creates an uneasy situation where you must play by these companies' rules or risk losing your online platform.

Many people link their identifiers to other sites through interfaces. These make life easier for individuals who just want to log into a particular location without creating a new account. Again, if you lose access to these third-party identifiers controlled by mega-corporations, you may also lose your data on those sites.

So how do we get around this problem? ION is a system designed to keep identifiers under the control of users through decentralized technology such as the Bitcoin blockchain and IPFS, for storing verification data. How does ION manage this? It all starts with something known as the Decentralized Identifier (DID).

## W3C Decentralized Identifiers

Decentralized identifiers, or DIDs as they're termed, are a standard [developed by the World Wide Web Consortium (W3C)](https://www.w3.org/TR/did-core/) for decentralized identifiers and public key infrastructure. DIDs are a method of giving users complete control over their online data — and thus their online identities — in a cryptographically secure form.

Just like other cryptographic processes, the user gets a public key and a private key. A user's public key will form the basis for verifying their information using the ION network. Because DIDs are entirely controlled by the user, there's no need to worry about being locked out of one's accounts. Additionally, DIDs provide secure ID verification that's immune to tampering and censorship.

The core struggle for modern ID systems is to keep track of how a person's appearance and their digital "footprint" changes with time. ION's system was initially developed to figure out how to record a chronologic series of records that would adapt to changes over time. With immutable records anchored to the Bitcoin blockchain, anyone can follow those changes over time to ensure a DID belongs to the person holding the identifier. All of this is possible through ION.

## What is ION? A Closer Look

ION is a DID solution built on top of the Bitcoin blockchain, utilizing its immutability and flexibility. It's a public, open, permissionless, layer 2 network dedicated to producing and verifying DIDs. Unlike other DID solutions, ION doesn't rely on additional consensus schemes, unique utility tokens, central authorities, or validators. Instead, it aims to offer a service to users over which they have control.

### ION and IPFS

ION's work system is a bit different from the typical Bitcoin blockchain work cycle. Initially, an ION node will collect batches of DID operations and anchor them to the Bitcoin network. All nodes observe the network for ION-embedded transactions. When that happens, the node fetches the files linked to the embedded CID, processes them, and retains them for resolution of the DID operations they contain.

ION uses data such as a core index file, a core proof file, a provisional index file, a provisional proof file, and chunk files. These files are stored on IPFS, so the only things delivered to ION are the content IDs (CIDs) from IPFS. ION can then retrieve the data using those CIDs using a public gateway to the IPFS network.

The IPFS system provides redundant storage so that user information is never lost, since several nodes host the same data redundantly on the network. Retrieval using CIDs is many times faster than feeding the data directly into ION for verification.

ION creates a scalable system where thousands of users can utilize the infrastructure for fast verification of data. Built off the Bitcoin network and leveraging CIDs from the IPFS network, ION’s identity system is fully decentralized.

Users may have concerns with typical BTC transactions costing around $100. Since these are batch processes, they can combine multiple processes into a single batch. This batching solution can reduce cost to cents per transaction, making it an affordable solution. The immutability in the Bitcoin blockchain makes it resilient and traceable, making it ideal for keeping ID data easily accessible from anywhere in the world.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/3UbUzA0lW9w" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="BBrowsers 3000: ION, Decentralized Identifiers Using Bitcoin & IPFS - Daniel Buchner"></iframe>
</div>

## How Can ION be Used?

ION can see a lot of use in many cases. The most obvious use case is for verifiable credentials. A business can credential employees, who can then be verified via blockchain on arrival at their destination. This functionality also raises its use as a means of supplying and verifying international travel documents.

In addition to its use for transmitting secure data, ION could also act as a store for personal data. Non-specialists can think about it as a digital business card, but with other perks. If a user shares their public key with someone, the parties can engage in secured, end-to-end encrypted communications that no third party can access.

Furthermore, this data logic makes it easier to connect apps. Instead of worrying about data stored on an app's server, they would use your identifiers. The use of this methodology would force all apps to operate from the same base data to ensure there isn't any room for mistakes.

Travel planning using apps would become more straightforward since all the apps would be using the same source data. Another use case could come from accreditation for organizations. Using an organization's public key, users can verify their accreditation status and trace their accreditation history over time.

## A New Way to Manage Personal Data

ION is one of those technologies that can result in intrinsic change in how we do things. Most people don't think twice about their identifiers or digital identity. However, as digital lifestyles become the standard, digital identities will take on a whole new meaning. ION could become the basis of everything from personal messaging to blogging.