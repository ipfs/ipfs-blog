---
tags:
- Pin-Tweet-to-IPFS
title: "Announcing Pin Tweet to IPFS"
description: "Pin Tweet to IPFS is a web extension which enables users to archive Tweets in a verifiable way."
date: 2023-01-10
permalink: "/announcing-pin-tweet-to-ipfs/"
translationKey: ''
header_image: /2023-01-10-pin-tweet-to-ipfs-article-header.png
author: David Justice
---

Today we are announcing a [Web Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) from the Browsers & Platforms team to enable you to archive tweets in a verifiable way.

### Why?

Journalists and publishers rely on centralized social media sites and publications to cite sources and reference content for articles. What happens when these sites suffer financial trouble, change ownership, or face aquisition? When the original authors are censored or delete their posts? This can cause a domino effect of lost content, leaving us searching across the web for screenshots (which are easily manipulated), quoted text and archives.

If we take a look at some recent studies, this centralized content becomes harder to rely on.


> One study estimates that about two percent of the Web disappears from its current location every week
> [*source*](https://sites.harding.edu/fmccown/pubs/lost-website-survey-cacm-all-in-one.pdf)

> The 67.2M collected tweets consist of approximately 65.6M (97.6%) undeleted tweets and 1.6M (2.4%) deleted tweets.
> [*source*](https://www.heinz.cmu.edu/~acquisti/papers/Acquisti_Large-Scale_Quantitative_Analysis_of_Deleted_Tweets.pdf)

*Pin Tweet to IPFS* aims to help users archive these posts in a verifiable way, publishing to the IPFS network through a [pinning service](https://medium.com/pinata/what-is-an-ipfs-pinning-service-f6ed4cd7e475) so that the content can live on verbatim.

<iframe width="560" height="315" src="https://www.youtube.com/embed/P6q3lHFPN5o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Under the hood:
We are using tools from the [WebRecorder](https://webrecorder.net/) team to create verifiable [WebArChiveZip](https://specs.webrecorder.net/wacz/1.1.1/) files of tweets. We then assist the user in uploading these "WACZ" files to the IPFS network via [web3.storage](https://web3.storage). Here users can store all of their archived tweets in one place, and easily access them via their own IPFS node or other pinning services.

### Where is it available?

Pin Tweet to IPFS is currently available in the [Chrome web store](https://chrome.google.com/webstore/detail/pin-tweet-to-ipfs/bkbejdaeamaehgpodkjdbkhkofpijagn) and [Microsoft Edge Add-ons store](https://microsoftedge.microsoft.com/addons/detail/pintweettoipfs/gimajpahenimjjgobbjjidlljnapmfgf).

<br />
<a href="https://chrome.google.com/webstore/detail/pin-tweet-to-ipfs/bkbejdaeamaehgpodkjdbkhkofpijagn" class="cta-button">
  Get Pin Tweet to IPFS for Chrome
</a>
<a href="https://microsoftedge.microsoft.com/addons/detail/pintweettoipfs/gimajpahenimjjgobbjjidlljnapmfgf" class="cta-button">
  Get Pin Tweet to IPFS for Microsoft Edge
</a>

### What's next?

We're continuing to iterate on *Pin Tweet to IPFS* to make archiving faster and add more verification capabilities. Take a look at our [issue tracker](https://github.com/meandavejustice/pin-tweet-to-ipfs/issues) to stay up to date on upcoming changes, and [submit your feedback](https://github.com/meandavejustice/pin-tweet-to-ipfs/issues/new).