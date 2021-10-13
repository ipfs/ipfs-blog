---
title: Developing Consumer Decentralized Applications with Slate
description: Together, Slate and Textile provide the foundation for consumer applications
  built on IPFS.
author: ''
date: 2021-10-13
permalink: "/developing-consumer-decentralized-applications-with-textile-slate/"
translationKey: ''
header_image: "/slate-textile.jpg"
tags:
- hackathon
- gateways
- browsers
- API

---
[_Browsers 3000_](https://events.protocol.ai/2021/browsers3000/ "Browsers 3000") _was a five-week hackathon by Protocol Labs focused on decentralized solutions being built for the future of the web3 browser. Below is a dive into the decentralized storage solution known as Slate, from lead developer_ [_Martina Long_](https://twitter.com/martunalong?lang=en "Martina Long")_._

[Slate](https://slate.host/ "Slate") is an open-source version of file storage that allows users to upload their files to the Filecoin network, download other users' files, and ensure accessibility from anywhere on the web. It runs on Textile buckets to interact with IPFS so it can leverage content addressing and other features of that network. Thanks to Textile, Slate can offer 30GB of free storage to each user. But what can Slate be used for in consumer-based applications?

Developers have always had a problem when it comes to online file management. It could be something as simple as having resources we want to use in a sequestered location that's inaccessible to their code. It could be more complicated, like having cloud-stored files that they can't really see in their native formats.

The internet has gotten more complex over time, but file storage systems available remain simplistic in comparison. Large companies offer free storage to users but don't have very good preview functionality or robust ways to access content if those users are developers.

Slate seeks to solve several problems at once as a collaborative platform, starting with an IPFS interface to store files and offering an easy way to see what those files are without downloading them to the machine's desktop.

## **Slate and IPFS**

Slate offers users up to 30GB of free space on the IPFS peer-to-peer network that they can use for any of their development projects. While it's exciting to see "free" and IPFS in the same sentence, it's important to remember that [Textile](https://www.textile.io/ "Textile") is the reason this happens. Through Textile's bucket system, users can upload data directly from their data stores into the IPFS network and get content IDs (CIDs) referring to those files online.

What Slate offers that's unique from other IPFS gateway systems is a way to manipulate the files through code directly. Slate's high performance API gives developers flexibility in managing files and retrieving data directly from Filecoin in an easily understandable format. Through the API, users can access metadata such as file names and content in JSON format.

One of the revolutionary things that Slate offers is the ability to preview certain types of files. Markup files, for example, can be previewed as pages, complete with working links and image links loaded into the preview. Images can similarly be previewed in their native format right in the convenience of a browser.

Other resource file types like font files have traditionally been difficult for file-hosting sites to deal with. In Slate's case, a user can preview those files just like any others. While the system is currently limited to previewing a few resource files, the Slate team does think that they could expand the functionality to more commonly used file types if necessary.

## **Current Consumer Applications**

Slate has a lot of depth as an application. Its interface makes it an excellent solution for regular users looking to upload data to the Filecoin network that anyone can access. Because of the collections system that Slate uses, consumers can separate their data into areas that they can allow or deny access to as they like.

It's immediately apparent that Slate could be useful in the same way that cloud storage systems are. The difference is that the files stored on the Filecoin global network remain persistent. For example, if the consumer makes or collects NFTs, they can set up collections for those NFTs and keep them on-chain.

This perpetual, decentralized cloud storage ensures that they don't lose access to the NFTs. Aside from its regular consumer applications, however, Slate's API interface makes it a dream to work with for developers.

Loading resource files onto a server can be tedious. Filename errors and accessibility can be a drag. If the server dies, the file is lost and needs to be reuploaded (provided you kept the original). Slate offers a solution that deals with all of these issues through its API interface.

Devs can access the API tab, which allows them to access file metadata, including the filename and content ID through code. Slate uses Textile as its gateway, but any Filecoin gateway can grant access to the file's contents once the customer has the CID. Using this data, devs can integrate their font files, image files, and even markup directly into their pages.

Forgotten what the filename is, or want to change it on the fly? Slate gives you the ability to do just that using another API call. If a developer already has collections in their Slate profile, they can upload directly to the collection by appending the collection ID alongside their upload request.

## **Next Steps**

Slate is still undergoing development, but there are some things to look forward to. The team has already started putting together a way of pulling a file stored directly on IPFS into a specific collection.

Slate's interface already allows for users to store multiple content types together to make aboard, but the team wants to build out this system into a proper gallery-type arrangement. Users who store NFTs on Slate can then arrange their page how they see fit, allowing them to show off their acquisitions with their own style.

Slate's team is also looking at implementing collaborative collections in the future. The hope is that public boards can become places where consumers can collaborate on tasks, like Trello, but completely decentralized.

Slate has a lot of potential as far as storage network systems. It's approachable enough to be used by the everyman but complex enough to be helpful for developers. It gives users a way to interact with their content in unique and exciting ways.

In the future, we might see Slate becoming more valuable as consumers take to the decentralized web. Someone's got to provide a place for people to store their data. Slate offers one of the best and most economical methods for consumers to date.