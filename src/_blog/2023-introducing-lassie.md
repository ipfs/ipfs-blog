---
title: Introducing Lassie - a retrieval client for IPFS and Filecoin
description: 'An overview of the content tracks that the community will convene around during IPFS Thing 2023.'
author: Brenda Lee
date: 2023-4-6
permalink: '/2023-introducing-lassie/'
header_image: '/Lassie.png'
tags:
- 'filecoin'
- 'retrieval'
---

We’re excited to share that you can now use a simple retrieval client, named [Lassie](https://github.com/filecoin-project/lassie), to get your data from IPFS and Filecoin. Lassie makes it easy to fetch your data from both the IPFS and Filecoin Network - it will find and fetch content over the best retrieval protocols available. 

For end users and clients, this means you can easily retrieve your content addressed data (using CIDs) from IPFS or Filecoin using the Lassie client, without having to run your own IPFS node or Filecoin node. Simply download the Lassie binary and start retrieving your data with the simple command -

```jsx
lassie fetch <your CID here>
```

In addition to using Lassie directly to retrieve end user content, application developers can leverage Lassie as a library to fetch content from IPFS and Filecoin directly from within an application. Currently, the Saturn Network (a Web3 CDN in Filecoin’s retrieval market) is using Lassie to retrieve data from IPFS and Filecoin. 

Learn more about Lassie with these resources: 

- Github: [https://github.com/filecoin-project/lassie](https://github.com/filecoin-project/lassie)
- Overview: [Basic Retrieval](https://docs.filecoin.io/basics/how-retrieval-works/basic-retrieval/)
- Technical documentation: [https://github.com/filecoin-project/lassie/tree/main/docs](https://github.com/filecoin-project/lassie/tree/main/docs)
- Ask questions: #retrieval-help in [Filecoin slack](https://www.notion.so/54fffa1b90ff4f6180586e79ff11ae17).

Special thanks to all who have paved the way building out prior retrieval clients ([w3rc](https://github.com/ipfs-shipyard/w3rc), [filclient](https://github.com/application-research/filclient)). 

We encourage you to try this out and share with others who want to retrieve content from Filecoin or IPFS, and look forward to hearing your feedback.  You can find us on [Github](https://github.com/filecoin-project/lassie) or #retrieval-help in [Filecoin slack](https://www.notion.so/54fffa1b90ff4f6180586e79ff11ae17).
