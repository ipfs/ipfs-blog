---
title: "New Stewards for Public IPFS Network Services"
description: "As IPFS moves to direct peer-to-peer retrieval, meet the operators now stewarding the network's shared services and where the public network is headed next."
date: 2026-10-14
permalink: '/2026-10-new-stewards-public-network-services/'
header_image: '/2026-10-new-stewards-public-network-services-header.png'
tags:
  - ipfs
  - infrastructure
  - stewardship
---

# **New Stewards for Public IPFS Network Services**

*This is the first in a series on the IPFS Project's direction and the people stewarding it. We'll start with the network's shared services; future posts will cover protocol governance, implementations and libraries, evolving needs, and more.*

Earlier this year, [we announced](https://blog.ipfs.tech/2026-08-beyond-sponsored-gateways/) plans to gradually shift the public IPFS network away from centrally subsidized gateways and toward direct, verifiable peer-to-peer retrieval. Recently, we reached a significant milestone in that transition: 100% of in-browser gateway traffic is now served by direct peer-to-peer retrieval, through the [Service Worker Gateway](https://inbrowser.link/).

The public gateways now operate in a new role. Rather than serving content from a central origin, they redirect to the Service Worker Gateway, moving retrieval and verification into the user's own browser. This is an important architectural shift: IPFS retrieval increasingly happens at the edge, under the user's control, while shared services focus on helping clients discover content efficiently.

As the network shifts toward direct peer-to-peer retrieval, joining and using it needs to stay easy. The IPFS Project will keep supporting the low-friction on-ramps that make that possible, and operating the key services behind them: the bootstrappers that help new nodes find their first peers, and routing and indexing services like IPNI that help clients locate content across the network.

We also want to extend a thank you to the Shipyard team, who stewarded much of this infrastructure for years and laid the foundations for many of these transitions. Building on that work, we’ve confirmed ongoing stewards for these services, all experienced operators and maintainers who know these systems well and are committed to keeping them healthy for the long term. 

## **IPNI and Compass: Keeping Content Discoverable**

Content addressing only works at Internet scale if users can efficiently discover who has the content they are looking for. [Alex Firmani](https://github.com/nymd), [Bart Święcki](https://github.com/byo), [Takwa Gnenna](https://github.com/takgn), and the wider [IPNI](https://docs.ipfs.tech/concepts/ipni/) / Compass team have built and operated critical indexing and routing infrastructure used throughout the IPFS ecosystem for content discovery.

As the public gateway model evolves, this team is also helping steward infrastructure around gateway routing and the new browser-first retrieval path. They're stepping up as an infrastructure provider for the [Service Worker Gateway](https://inbrowser.link/), as well as other peer-to-peer retrieval tools like [delegated routing](https://delegated-ipfs.dev/routing/v1) and resilient bootstrapping. This stack is evolving toward a more federated model, where multiple independent operators could each run services, making content discovery more resilient and decentralized.

## **ProbeLab: Measuring and Understanding the Public Network**

[Yiannis Psaras](https://github.com/yiannisbot), [Dennis Trautwein](https://github.com/dennis-tra), and the [ProbeLab](https://probelab.io/) team have spent years studying how IPFS and other libp2p networks actually behave in the wild.

ProbeLab runs crawlers, probes, and long-running measurements across the IPFS public network, providing visibility into network size, topology, the DHT, Bitswap, IPNI, gateways, bootstrappers, security, and other core network components. Their research has also translated directly into protocol improvements – for example, [Optimistic Provide](https://probelab.io/blog/optimistic-provide/), which dramatically reduced DHT publication latency while lowering network overhead.

That work continues without interruption, and you can see current IPFS public network health at [probelab.io/ipfs](https://probelab.io/ipfs).

## **BadBits: Protecting the Commons**

Open networks also need mechanisms for operators to respond responsibly to abuse. The BadBits system provides shared signals that infrastructure operators can use when handling known malicious or abusive content. Skapa, a longtime IPFS infrastructure steward, has been stepping forward for this part of the ecosystem, helping ensure that BadBits continues to have clear ownership and the latest agent tools and automation.

## **More to Come**

The network's shared services are run by a range of operators today, some commercial, some funded as public goods, and we'd like to expand those collaborations. If you operate IPFS infrastructure, consume it at scale, or want to get involved, we'd especially like to hear from you:

* **Already operating IPFS infrastructure at scale?** Let's talk about how it could plug into the network's shared services.
* **Rely on these services heavily?** Tell us what's working and what isn't. We want the network's services shaped by the people who rely on them.
* **Operate production infrastructure in other domains?** If you're interested in bringing IPFS into your stack, we'd be glad to chat.

If any of this is you, reach out on the [IPFS Forum](https://discuss.ipfs.tech/) or directly via email ([infra@ipfs.io](mailto:infra@ipfs.io)).

*This is the first of several posts on how the IPFS Project is evolving. Next, we'll look at protocol governance, implementations and libraries, enterprise needs, and more.*
