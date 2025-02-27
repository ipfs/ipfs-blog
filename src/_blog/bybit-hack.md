---
date: 2025-02-27
permalink: /2025-could-ipfs-prevent-bybit-hack/
title: 'Could IPFS have prevented the Bybit hack?'
description: 'IPFS is all about verification. In this blog post, we show '
author: Daniel Norman
header_image: /dapps-ipfs/header.png
tags:
  - ipfs
  - dapps
  - Helia
  - js-ipfs
  - ipns
  - ens
---

## The Bybit Hack and IPFS

Bybit's recent hack, which resulted in the loss of $1.4, is a reminder of the importance of verification for frontends, especially dapp frontends in the Web3 ecosystem.

Based on what we know at the time of writing, it's seems apparent that IPFS, through local verification, could have served as a preventive a line of defence in this sophisticated hack, potentially preventing this all together.

In this blog post, we will recap what we know about the hack and share our perspective on the role IPFS has to play, diving into some of the technical efforts we've been spearheading at [Interplanetary Shipyard](https://ipshipyard.com/) to improve the health of the ecosystem.

## So how did the hack happen

The TL;DR is that hackers managed to gain access to the AWS S3 bucket that hosted the Safe frontend served from `app.safe.global` and uploaded a malicious version of the frontend days before the hack. The frontend specifically targeted the Bybit cold wallet, causing owners of the multisig to sign a malicious transaction while obscuring the malicious transcation in the frontend.

It's not exactly clear how the hackers managed to gain access to the AWS S3 bucket. Some reports suggest that one of the developers' credentials was compromised through social engineering.

![conclusions about the Bybit hack](../assets/bybit-hack/conclusions.jpeg)

## Security is layered

Security in software systems is approached in layers, often referred to as "defense in depth." This strategy involves implementing multiple security measures rather than relying on a single protective mechanism. If one layer fails, additional layers provide backup protection.

In the context of this hack, there are three obviously failures:

1. The Safe frontend was unverified
2. The Safe multisig owners signed a malicious transaction
3. There were no additional approval layers in the Safe smart contract to prevent the malicious transaction from going through.

Since IPFS is mainly concerned with the first point, we'll focus on that. There's much to be said about the other two points, like the importance of clear signing (rather than blind signing as is the case with smart contract wallets like Safe), better UX, and tooling to verify transactions.

## IPFS and frontend verification

The IPFS project has long advocated for wider adoption of client verification. Over a year ago, we published a [blog post](https://blog.ipfs.tech/dapps-ipfs/) discussing the importance of client verification and how IPFS can help:

> End-to-end integrity: as long as a user of your Dapp has the CID you shared, they can be sure they are running the exact code that you published by verifying locally. Local verification is crucial since Dapps interact with a blockchain **and malicious code can lead to loss of user funds**. Integrity is adjacent to trustlessness — because verification eliminates the need to trust the source of data.
> From [The State of Dapps on IPFS: Trust vs. Verification](https://blog.ipfs.tech/dapps-ipfs/)

The important of end-to-end integrity through verification is not new to many of us in the Ethereum and IPFS ecosystem.

In fact, we feel vindicated seeing the Gnosis founder share the CID of an open-source fork of the Safe frontend called Eternal Safe shortly after the hack, while the Safe team conducted a forensic review of their services and frontend:

![Gnosis founder sharing the CID of the open-source fork of the Safe frontend](../assets/bybit-hack/eternal-tweet.png)

## So where are we today?

There's two sides to this story:
- How you deploy your frontend to IPFS and safely signal the CID to users
- How you retrieve the frontend from IPFS and verify it locally

- Local node is ideal, but not always possible, as it's resource intensive.
- Trusted gateways just shift the problem without solving it. No verification, not IPFS.
- In-browser verification with the Service worker IPFS gateway is getting better, however, it's still tied to an origin —an inherent constraint of the web platform— which could serve malicious client code if successfully exploited.
- Browser extensions, which get get distributed through extension stores are better because they require the extension to be signed by the author, ensuring that users are installing the extension from a trusted source. We are investigating how we could package the Service Worker IPFS gateway as a browser extension to improve the user experience.

## How we can improve?

- No blind signing

## Collaboration Proposal: Let's work together
