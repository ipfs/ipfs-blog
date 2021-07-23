---
title: 'A Brave New Wallet: the Future of the Browser Wallet'
description: On the heels of Brave’s support of IPFS, learn about the team’s plan
  for the Brave Wallet, coming soon.
author: Emily Vaughan
date: 2021-07-23
permalink: brave-new-wallet
translationKey: ''
header_image: "/ipfs-blog-brave-2021-07-23.jpg"
tags:
- browsers
- API

---
[_Browsers 3000_](https://events.protocol.ai/2021/browsers3000/) _is a 5 week hackathon by Protocol Labs focused on decentralized solutions being built for the future of the Web3 browser. Below is a summary of a talk from Brave wallet engineer_ [_Anirudha Bose_](https://twitter.com/onybose)_._ [_Check out the talk here._](https://www.youtube.com/watch?v=-4ujo7q3LWw)

_The talk comes on the heels of January’s announcement of Brave’s in-browser support of IPFS. The integration is the first step in bringing secure, persistent storage to Web3. IPFS support allows Brave desktop users to download content by using a content hash, known as the Content identifier (CID). Unlike HTTP(S), there is no specified location for the content._

[_Learn more about the integration_](https://brave.com/ipfs-support/) _and_ [_watch the announcement video_](https://www.youtube.com/watch?v=hpwh_zLpnCE)_._

## A Brave New Wallet

_“Brave is a privacy-focused browser where you are not the product.”_

Brave provides its daily users with a range of features and benefits, including: private browsing, a [search engine](http://search.brave.com/) that doesn’t track you, and an opt-in ad economy that rewards you in BAT for browsing the internet.

Brave’s success has proven that people have an appetite for privacy-centric alternatives to browsing the internet today. Currently, Brave boasts 33.8m monthly active users and 11.7m daily active users. As far as browsers go, that may not seem like the largest numbers. However, the launch of Brave’s new crypto wallet will place a native crypto wallet in the hands of every Brave browser user. 11.7m daily active users will suddenly be delivered native crypto support in their everyday browser.

## A Deep Dive into Wallets

**The Mathematics of Wallets**

The foundation of a Web3 wallet is an _elliptic curve_, or elliptical. An elliptical is a set of points that satisfy some curve equation. A common elliptical equation is: y2=x3 + ax + b, where values _a_ and _b_ give an elliptic curve different cryptographic features.

Not all elliptic curves are useful, but the curve used in Bitcoin and Ethereum (known as secp256k1) has some interesting properties. Each point on an elliptic curve is a public point, or a public key, that has an _x_ and _y_ coordinate. When someone asks you to send them their public key, they are effectively asking you to send them your _x_ and _y_ coordinates, just expressed in a different manner.

A _public key_ is derived from a random private number that is generated through random repeated additions of a known point.

_G + G + G … (k times) = P_

_k = private key_

_p(x,y) = public key_

A Web3 address is just a representation of one’s public key. If you have an Ethereum address, you have a “spot” on the elliptic curve. To generate an Ethereum address, get what is known as the _Keccak-256 hash_ from the public key and take the last 20 bytes from the resulting string. Voila 一 your very own Ethereum address.

Now, as effective as that solution is for privacy and custody, if a person has 1,000 accounts, they would have to remember 1,000 keys 一 not a terribly scalable user experience. The Bitcoin network standardized the solution used across most blockchains still to this day: BIP32. BIP32 allowed Web3 users to interface with wallets in a way that is familiar today. BIP32 allows users to randomly generate a 12-word or 24-word mnemonic to obtain a seed phrase, followed by a master private key and as many child private keys as needed. This allowed for scalable wallet infrastructure with simpler user experience, and opened the doors to the wallet ecosystem we see today.

## Wallets in Action

**Dapps and the Web3 API**

The mathematics behind wallets is interesting, but not particularly useful without seeing wallets in action in Web3. Specifically, interacting with dapps. In order for dapps to be useful, they need to access account data, see balances, request signatures, and more. In order to interact with dapps, wallets must provide an API (in Ethereum, the Ethereum Provider API). Brave is built with this functionality; it natively exposes the Web3 API via window.ethereum Javascript.

**RLP and Wire Protocol**

Ethereum is a massive state machine that transitions from one state to another by executing transactions. These transactions must be serialized in a certain format so they can be transmitted and interpreted in the EVM. This format is known as Recursive Length Prefix (RLP), and any Web3 wallet must be able to speak RLP.

For Bitcoin, that format is known as the Wire Protocol. Wire Protocol 一 similar in intent to RLP but different in design 一 establishes a set of rules that Bitcoin wallets must adhere to in order to encode messages and transactions. Wire Protocol suits any UXTO-based currency.

## The Brave Wallet (a sneak peek)

So how do we take the mathematics, the API requirements, and the RLP/Wire formats of wallets and bring it into a UX and UI that works for browser users?

Introducing (a sneak peek of) the Brave Wallet. The Brave Wallet will launch with the following planned features:

**Hardware wallet support.** Users can verify and sign transactions from their Ledger/Trezor hardware wallets.

**Native permissions.** Dapp requests will use Brave’s native permissions manager, similar to geolocation requests.

**Desktop and mobile.** The Brave Wallet will be available on all platforms supported by Brave. “If you have a browser, you have a wallet.”

**NFT Support.** Users can view their complete NFT collections directly in the wallet.

Keep an eye out for more updates about the Brave Wallet, coming to the Brave browser this year!