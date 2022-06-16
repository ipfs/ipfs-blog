---
title: Introducing ProbeLab
description: 'ProbeLab: a mission to look deeper into decentralized, P2P networks.'
author: Yiannis Psaras
date: 2022-06-15
permalink: "/2022-06-15-probelab/"
translationKey: ''
header_image: "/172855109-3abff5c1-0b13-43d9-b2bb-8560a6b3b616.jpg"
tags:
- libp2p

---
ProbeLab is an effort to apply solid scientific measurement methodologies to benchmark and optimize network protocols that operate in decentralized P2P environments. ProbeLab was born out of the need for developing a deeper understanding of how permissionless, decentralized networks can be made more performant and comparable to their centralized counterparts.

ProbeLab’s mission is summarized in the following quote:

_“You can’t improve what you don’t measure, and you should measure what (you think) you’ve just improved.”_

As was highlighted very accurately in [Juan Benet's recent talk](https://youtu.be/jH9BkLTxhp8) at the Paris P2P Festival, the most successful systems in use today are those for which you can find a lot of benchmarking studies. We believe decentralized networks should have a place in this list and be successful in their mission to promote open platforms, free speech, resilient operations, and high performance.

_However, measurement and benchmarking of networks and network protocols is not an end, but a means to an end, which is to use the findings to: i) identify bottlenecks, ii) quantify the available space for improvement, and iii) design protocol optimizations._

With those goals in mind, ProbeLab is putting its focus on one of the most widely used decentralized networks, IPFS and its supporting networking library, libp2p. We are building the _IPFS Network Observatory_!

There isn’t a better time to start this exciting journey! Here are a few reasons why:

**DINPS Workshop:** We are organizing the second edition of the DINPS workshop on _“Decentralized Internet, Networks, Protocols, and Systems”_, which takes place on the 10th of July in Bologna, Italy. There’s a great line up of papers, demos, tutorials and keynotes, which you can find here: [https://research.protocol.ai/sites/dinps/](https://research.protocol.ai/sites/dinps/ "https://research.protocol.ai/sites/dinps/")

DINPS is taking place alongside a top conference in networks and distributed systems, ICDCS’22, so there’s even more to it in the days following the workshop.

The workshop is open to everyone - make sure to [register](https://icdcs2022.icdcs.org/registration/) to secure your spot.

**ProbeLab @ Sigcomm’22:** Our measurement work has already started a few quarters ago, and there isn’t a better recognition of the significance of the work than having a paper accepted at ACM SIGCOMM! Our measurement campaign covers a wide range of results: the lookup and delivery latency of content in the IPFS network, the geo-distribution of IPFS peers, the churn rate of peers in the network and a lot more!

The paper will be presented in August 2022 at the conference. A pre-print will be made available earlier, so stay tuned!

**An exciting list of things to work on:** The IPFS Network Observatory is composed of a lot of items. We split our work in “Requests for Measurements” (RFMs) and we have collected more than 15 distinct items we considered important parts of the observatory.

Check out the list at: [https://github.com/protocol/network-measurements](https://github.com/protocol/network-measurements "https://github.com/protocol/network-measurements") - you are more than welcome to propose more topics that are important for your project by starting an Issue or submitting a PR.

**Funding for RFMs:** The RFMs are open to the community to get involved and contribute their previous knowledge and priceless experience to our mission. For this, there is funding available through the \[Radius platform\]([https://app.radius.space/](https://app.radius.space/ "https://app.radius.space/")) and most RFMs will be published there and rewarded. We currently have the following seven grants published, two of which have already received applications.

* \[Effectiveness of Bitswap Discovery Process\]([https://app.radius.space/grants/MQS2icjXKGJ8jy2bqS8W](https://app.radius.space/grants/MQS2icjXKGJ8jy2bqS8W "https://app.radius.space/grants/MQS2icjXKGJ8jy2bqS8W"))
* \[IPFS Provider Record Liveness\]([https://](https://www.dgm.xyz/grants/KUBoJvi8Byos9nt3s2Lt)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/KUBoJvi8Byos9nt3s2Lt](https://www.dgm.xyz/grants/KUBoJvi8Byos9nt3s2Lt))
* \[Location of IPFS end users and requested content\]([https://](https://www.dgm.xyz/grants/t7p9MzZNxCkWV171uBzm)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/t7p9MzZNxCkWV171uBzm](https://www.dgm.xyz/grants/t7p9MzZNxCkWV171uBzm))
* \[​​IP address Churn (Roaming) & PeerID distribution for nodes in the IPFS Network\]([https://](https://www.dgm.xyz/grants/bs6rbWLGJRnICtgjU0LS)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/bs6rbWLGJRnICtgjU0LS](https://www.dgm.xyz/grants/bs6rbWLGJRnICtgjU0LS))
* \[TTFB through different architecture components\]([https://](https://www.dgm.xyz/grants/g5riWRq4BkhDvl9vsjda)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/g5riWRq4BkhDvl9vsjda](https://www.dgm.xyz/grants/g5riWRq4BkhDvl9vsjda))
* \[Distribution of DHT lookup times and Breakdown of Content Routing Latency\]([https://](https://www.dgm.xyz/grants/cieOsJkIqWSQkk9obsrO)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/cieOsJkIqWSQkk9obsrO](https://www.dgm.xyz/grants/cieOsJkIqWSQkk9obsrO))
* \[Uptime and churn of IPFS network nodes\]([https://](https://www.dgm.xyz/grants/9ZiplsZZEJvOm1yFgWJ0)[app.radius.space](https://www.dgm.xyz/grants/MQS2icjXKGJ8jy2bqS8W)[/grants/9ZiplsZZEJvOm1yFgWJ0](https://www.dgm.xyz/grants/9ZiplsZZEJvOm1yFgWJ0))

**A thriving community!** We are collaborating with more than 40 of the brightest academic and industry researchers in more than 10 institutions, including Barcelona Supercomputing Center (ES), HKUST (CH), NOVA ULisbon (PT), QMUL (UK), Stanford (US), Telefonica (ES), Tokyo University of Technology (JP), TUBerlin (DE), TUDarmstadt (DE), TUMunich (DE), UWuppertal (DE), and more! We are meeting virtually on a weekly basis and physically on a quarterly basis.

You are more than welcome to get involved and come work with us!

**Open Positions:** The team is currently small but growing quickly. We are looking for exceptional \[Research Engineers\]([https://boards.greenhouse.io/protocollabs/jobs/4283928004](https://boards.greenhouse.io/protocollabs/jobs/4283928004 "https://boards.greenhouse.io/protocollabs/jobs/4283928004")) and \[Research Scientists\]([https://boards.greenhouse.io/protocollabs/jobs/4283974004](https://boards.greenhouse.io/protocollabs/jobs/4283974004 "https://boards.greenhouse.io/protocollabs/jobs/4283974004")) with a passion for decentralized networks and extensive hands-on experience. We are seeking people who are able to hit the right balance between scientific exploration, and prototype development.

There’s also lots of passion and a great spirit around here :)

**Call Outs**

* Watch this \[intro video\]([https://www.youtube.com/watch?v=75ewjnT6B9Y&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO](https://www.youtube.com/watch?v=75ewjnT6B9Y&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO "https://www.youtube.com/watch?v=75ewjnT6B9Y&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO")) to ProbeLab’s activities at the Paris P2P Festival.
* Watch some of our collaborators talking about their ongoing work at the Paris P2P Festival:
  * \[Optimizing the IPFS Provide Process\]([https://www.youtube.com/watch?v=wbY-MueAfXg&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO](https://www.youtube.com/watch?v=wbY-MueAfXg&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO "https://www.youtube.com/watch?v=wbY-MueAfXg&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO"))
  * \[Tools for developing distributed applications and protocols\]([https://www.youtube.com/watch?v=MvyyuMxsKqk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO](https://www.youtube.com/watch?v=MvyyuMxsKqk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO "https://www.youtube.com/watch?v=MvyyuMxsKqk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO"))
  * \[Libp2p DHT: performance, workloads and future directions\]([https://www.youtube.com/watch?v=RPO1zCqsxY0&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO](https://www.youtube.com/watch?v=RPO1zCqsxY0&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO "https://www.youtube.com/watch?v=RPO1zCqsxY0&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO"))
* Check out all of our ongoing projects and follow announcements at our \[Notion page\]([https://www.notion.so/pl-strflt/ProbeLab-Protocol-Benchmarking-Optimization-a63238fd1b184d6f8fea4bb38d975208](https://www.notion.so/pl-strflt/ProbeLab-Protocol-Benchmarking-Optimization-a63238fd1b184d6f8fea4bb38d975208 "https://www.notion.so/pl-strflt/ProbeLab-Protocol-Benchmarking-Optimization-a63238fd1b184d6f8fea4bb38d975208"))
* Apply for our grants at: [https://dgm.xyz](https://dgm.xyz "https://dgm.xyz") and come work with us!
* Join the discussion at the \[IPFS Discord server\]([https://discord.gg](https://discord.gg "https://discord.gg")/ipfs) at the #probe-lab channel.
* We’re meeting virtually every week and physically once a quarter (at least) - you’re welcome to join! Join the Discord server to find out more.
* Contribute your ideas for network measurements on our Github repository: [https://github.com/protocol/network-measurements](https://github.com/protocol/network-measurements "https://github.com/protocol/network-measurements").
* Tell your friends! :)

See you soon! We’ll be announcing the findings of our work here, so stay tuned!