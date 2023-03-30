---
title: Introducing DScan Extension
description: 'DScan is a web extension that uploads the content to IPFS and generates decentralized QR codes.'
author: Akhilesh Thite
date: 2023-03-30
permalink: '/introducing-dscan-extension/'
header_image: '/2023-03-30-introducing-dscan-extension.png'
tags:
  - 'dscan'
---

Hii all!
Today, we are absolutely thrilled to introduce DScan, a web extension that uploads the content to IPFS and generates decentralized QR codes, powering decentralized, user-owned, and permanent storage.

## Why?

In today's digital world, sharing files and content with one another is an essential part of our daily lives. However, many popular file sharing services are centralized, which means they can be subject to censorship, data breaches, and third-party control. DScan extension aims to change that by providing a decentralized alternative that puts you in control of your data.

With the constant need for data sharing and storage, traditional centralized platforms have their limitations, like storage limits, data security, and privacy concerns. For instance, Gmail has a limit of 25 MB per email, and WhatsApp allows a maximum of 100 MB file size for sharing. This often results in fragmentation of data, leading to confusion and data loss. DScan solves this problem by providing a user-owned decentralized storage system that is not only private but also permanent.

DScan is the the quickest way to upload and share data over IPFS on the web!

## How it works?

DScan allows you to quickly upload files as well as folders to IPFS by using [web3.storage](https://web3.storage/) and receive a "decentralized QR code" with IPFS [CID](https://docs.ipfs.tech/concepts/content-addressing/). Later you can customize and share the QR code or hosted [gateway](https://docs.ipfs.tech/concepts/ipfs-gateway/) link with everyone for easy and decentralized file sharing.

DScan stores user's web3.storage API keys/tokens locally using Chrome APIs. This allows users to easily delete/unpin their content by logging into their web3.storage account. Because of web3.storage, the content can be accessed over IPFS without the user installing and setting up a local instance of [Kubo](https://github.com/ipfs/kubo).

<iframe width="560" height="315" src="https://www.youtube.com/embed/CcQqr790dwg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

> In November of 2021, DScan was launched as a project developed during the Mars Asia Hackathon, where it earned second place for the Filecoin & IPFS Decentralization track.

## Add extension to browser

The extension is available in the [Chrome web store](https://chrome.google.com/webstore/detail/dscan-decentralized-qr-co/idpfgkgogjjgklefnkjdpghkifbjenap).

<br />
<a href="https://chrome.google.com/webstore/detail/dscan-decentralized-qr-co/idpfgkgogjjgklefnkjdpghkifbjenap" target="_blank" rel="noopener noreferrer"class="cta-button">
  Get DScan for Chrome
</a>

## Roadmap

- "Add to ipfs" [context menu](https://developer.chrome.com/docs/extensions/reference/contextMenus/).
- Options to [customize](https://github.com/kozakdenys/qr-code-styling) QR Code styles and add logos to QR Code.
- [w3up](https://github.com/web3-storage/w3up-client) integration for self-sovereign identity and user-controllable keys.
- Build for Firefox.

Contributions are always welcome!

## Links

- GitHub: [https://github.com/p2plabsxyz/dscan](https://github.com/p2plabsxyz/dscan)
- Website: [https://p2plabs.xyz/](https://p2plabs.xyz/)
- Email: [contact@p2plabs.xyz](mailto:contact@p2plabs.xyz)

Made with 💙 by [p2plabs.xyz](https://p2plabs.xyz/)

Happy decentralizing!
