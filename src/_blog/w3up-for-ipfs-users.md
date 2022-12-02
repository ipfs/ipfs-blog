---
title: w3up for IPFS users
description: Build mobile and web apps with the latest IPFS developer tools.
author: Yusef Napora
date: 2022-12-02 
permalink: "/2022-12-02-w3up-for-ipfs-users/"
translationKey: ''
header_image: "/ipfs-blog-2022-12-02-w3up-for-ipfs-users.png"
tags: []
---


`w3up` is a new API for using [web3.storage](https://web3.storage) that makes IPFS more accessible than ever before, bringing the scalability and responsiveness of cloud-native architecture to the world of content-addressed, verifiable data that IPFS enables.

If you're already using IPFS, you can take advantage of `w3up` today to make your data stack more responsive and reliable. Because `w3up` builds on the Elastic IPFS stack, it's fully interoperable with traditional IPFS implmentations like `kubo` (formerly `go-ipfs`), `js-ipfs`, and `rust-ipfs`. This makes it easy to incrementally adopt `w3up` without needing to completely replace your existing IPFS code and processes.

This guide will cover a few key IPFS use cases that you might currently be using, along with the `w3up` equivalent. Hopefully this will give you some ideas about how `w3up` could fit into your current stack. If you have questions about things not covered here, please [reach out](https://web3.storage/docs/community/help-and-support/)!

## Sharing files

IPFS is often used to share files with others on the internet, and `w3up` makes it easier than ever.

Just replace `ipfs add <your-file>` with `w3up upload <your-file>`, and the w3up service will take care of making the data available to the IPFS network.

Unlike the `ipfs add` command, you don't need to keep an IPFS node running to make sure the file is available, and there's no need to remotely "pin" the content with another service. Once the w3up service has received your data, the Elastic IPFS stack will take care of the rest.

## Publishing web sites

IPFS is one of the cornerstones of the decentralized web and Web3 movements, and a key part of that is the ability to publish web content on IPFS. Browsers like Brave and Opera enable people to directly visit `ipfs://` URLs with content verification built in, and HTTP gateways bridge the gap and make IPFS content available to any browser.

Using `w3up` to publish your site is as simple as running `w3up upload <your-site-directory>`, where `<your-site-directory>` contains an `index.html` file and any other content you might need. Just make sure that you use relative URLs when you link from one page to another, since the root URL will depend on the content address of the entire site.

Once your site is uploaded, you can use [`w3name`](https://web3.storage/docs/how-tos/w3name/) to create a verfiable "pointer" to your site. Using `w3name` gives you a stable URL that only you control, without needing to depend on DNS or any other trusted third party. In fact, you don't even need to trust the `w3name` service, since it's not possible for the service to tamper with your `w3name` updates.

## Distributing public datasets

One of the guiding principles of IPFS is to enable and preserve access to vital public data, especially scientific research data. This domain is especially well-suited to IPFS because the built-in content verfication allows you to create stable links to the exact dataset used in your original research. This is huge for reproducability, and it gives peer reviewers the tools they need to properly evaluate your work.

`w3up` lets you leverage IPFS for research data without requiring you to maintain an IPFS node or contract with a pinning service. Once again, `w3up upload <your-dataset>` is all that you need.

Note that `w3up` currently supports up to 4 GiB in a single upload, so larger datasets may need to be partitioned before uploading. We expect this limitation to be lifted shortly, but in the meantime, see the guide to [working with Content Archives](https://web3.storage/docs/how-tos/work-with-car-files/) for examples of splitting large content bundles into smaller chunks for uploading. Packing your data into a Content Archive and splitting it will let you use a single Content Identifier (CID) to refer to the entire dataset, and people will be able to retrieve it as one large download instead of needing to re-assemble it manually.

## Getting started with w3up

This guide will use the `w3up` command line tool to interact with the w3up service. If you're writing a JavaScript application, check out our [guide to getting started with the w3up-client library](https://blog.web3.storage/posts/introducing-w3up).

You can install `w3up` using NPM, the package manager for NodeJS.

```shell
npm install -g w3up
```

Once it's installed, you should be able to run the `w3up` command to see the help text. Let's walk through the "Quickstart" section of the help text.

First, we need to create an "identity" using the `w3up id` command:

```shell
w3up id

✔ Generating id
✔ ID: did:key:z6MknWAmtEVoteNAMszWVS2CVKCA6ub6ieU9Hfjmp6369Ut7
```

Your ID should look similar to the one above, but with a different value after the `did:key:` part.

The identity you just created uniquely identifies your current device. In order to use it to authorize uploads, you first need to register the identity with the w3up service.

Using the `w3up register` command, we can associate the new identity with an email address:

```shell
w3up register you@your-email-provider.com

* Registering you@your-email-provider.com, check your email for the link.
```

The `w3up register` command will wait for you to check the activation email and click the registration link inside. Once you click the link, you should see a message like this:

```
✔ Registration succeeded: you@your-email-provider.com
```

That's it!

## Translating common IPFS commands to w3up

Once you've registered, you're ready to use `w3up` to manage your IPFS data. Let's take a look at the most common operations and see how they compare to `kubo` (formerly known as `go-ipfs`).

### Adding files and directories

To add files to IPFS using `kubo`, you would use the [`ipfs add`](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-add) command, passing in the path to a file or directory. This will add the data to your local IPFS repository and make it available on the network as long as your computer is online.

To switch to w3up, just replace `ipfs add` with `w3up upload`. Once the upload is complete, you can turn your computer off, and your files will still be available thanks to Elastic IPFS.

### Retrieve content by CID

Fetching data from the IPFS peer-to-peer network using kubo is most commonly done with the [`ipfs get`](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-get) command, which downloads the content for a given Content Identifier (CID).

If you've already got a workflow that uses `ipfs get`, you don't have to change anything to fetch data stored with `w3up`. Since Elastic IPFS is compatible with the peer-to-peer Bitswap protocol, anything you store with `w3up` is retrievable from any IPFS peer using the same `ipfs get` command you're familiar with.

As an alternative to Bitswap, you can download IPFS data from a web browser or other client applications using an HTTP gateway. Gateways translate between the HTTP protocol used by browsers and the peer-to-peer Bitswap protocol.

To fetch from a gateway, make a URL of the form `https://$GATEWAY_HOST/ipfs/$CID`, replacing `$GATEWAY_HOST` with the domain name of the gateway, and `$CID` with the root CID of your content. You can use any public IPFS gateway to fetch data stored using w3up, but we recommend using our own gateway at `w3s.link`, which can be faster for content served from Elastic IPFS.

You can also add filenames to the end of the URL to "drill down" into the directory structure of your uploads. For example, the following URL links directly to a file named `not-distributed.jpg`:

[https://w3s.link/ipfs/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu/not-distributed.jpg](https://w3s.link/ipfs/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu/not-distributed.jpg)

Removing the filename from the URL will take you to a directory listing page instead:

[https://w3s.link/ipfs/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu](https://w3s.link/ipfs/bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu)

![Screenshot of directory listing.](https://bafybeie3zmkeh4erfukeqbhv5tghogrlwcepgwiv6nq3rfeyswvnb32w6e.ipfs.nftstorage.link/)

### List your IPFS data

Adding files to your local IPFS repository with kubo causes them to be "pinned," which makes sure that they don't get removed if you're ever low on disk space. You can get a list of the content you've pinned using the [](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-pin-ls)[`ipfs pin ls`](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-pin-ls) command, which lists the CIDs of the files you've added, along with anything from other users that you might have pinned manually.

With w3up, you can get a list of all the content you've added using `w3up list`, which prints the CIDs for everything you've uploaded to your account.

```
% w3up list
✔ Listing Uploads...
Date         Data CID                                                     
--------     --------                                                     
10/12/2022   bafybeie3zmkeh4erfukeqbhv5tghogrlwcepgwiv6nq3rfeyswvnb32w6e  
9/28/2022    bafybeihrvb4fykzlj424mnnvi6xt6rcqtv34x4fefdpphusr6qvzhdhem4  
```

### Building apps, IPFS style

One of the reasons to use w3up, in addition to super-simple cloud storage workflows, is the ease of building mobile and web apps using the web3.storage UCAN based upload API. Get started writing apps with [w3ui, our front end component library](https://beta.ui.web3.storage), and [enable new ways for users to own their data with our UCAN account delegation capabilities.](https://blog.web3.storage/posts/intro-to-ucan)

[![w3ui website](https://bafybeiguzsobbgrnf7hdacx222wv3zac56iur5phbfpy6elmvjavnov6wa.ipfs.nftstorage.link/Screen%20Shot%202022-09-27%20at%202.58.38%20PM.png)](https://beta.ui.web3.storage)

You can try out the w3ui widget code samples live on the site's sandbox, to get a feel for how IPFS on web3.storage can work for your mobile and web apps.
