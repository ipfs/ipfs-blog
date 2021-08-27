---
title: August 20 IPFS.io Gateway Outage Resolution & Next Steps
description: The ipfs.io gateway & website experienced an outage on 2021-08-20; here
  are more details & corrective actions.
author: IPFS Team
date: 2021-08-27
permalink: 2021-08-27-IPFS.io-gateway-outage-resolution
translationKey: ''
header_image: "/ipfs-blog-gateway-2.jpg"
tags:
- gateways

---
# Customer Impact

On 2021-08-20 at 15:54 UTC, visitors started to get 404s across all HTTPS content served from the[ ipfs.io](http://ipfs.io/) domain. 404s were returned for both:

1. Web properties under the[ ipfs.io](http://ipfs.io/) domain: the[ ](http://ipfs.io/)ipfs website ([https://ipfs.io](https://ipfs.io "https://ipfs.io")), ipfs docs ([https://docs.ipfs.io](https://docs.ipfs.io "https://docs.ipfs.io")), ipfs dist ([https://dist.ipfs.io](https://dist.ipfs.io "https://dist.ipfs.io")), ipfs blog ([https://blog.ipfs.io](https://blog.ipfs.io "https://blog.ipfs.io")), etc. AND
2. Content served over the IPFS over HTTP gateway at[ ](https://ipfs.io/ipfs)[https://ipfs.io/ipfs](https://ipfs.io/ipfs "https://ipfs.io/ipfs")

Users across the internet fetch content from the IPFS network using the ipfs.io gateway over 300 **million** times per week, and were thus impacted until our mitigation was applied at 19:35 UTC.

However, you can instead fetch content directly from the IPFS network without hitting any of these gateways by using your own IPFS node with [IPFS Desktop](https://docs.ipfs.io/install/ipfs-desktop/), [IPFS CLI](https://docs.ipfs.io/how-to/command-line-quick-start), [IPFS Companion](https://docs.ipfs.io/install/ipfs-companion/) in your browser, and/or an [IPFS-enabled browser like Brave](https://brave.com/ipfs-support/). **If you were using IPFS directly, you probably never even noticed this outage! 💪**

# Background

As a reminder, IPFS and Filecoin are peer-to-peer applications to store and provide content in a distributed fashion. In such architecture, every peer (person or company) controls what it contributes to the network, how it does it, and how it interacts with other peers and their content. The architecture of Filecoin and IPFS is designed to embody the principle of **user agency**.

IPFS HTTP gateways (like the one at [https://ipfs.io/ipfs](https://ipfs.io/ipfs "https://ipfs.io/ipfs")) allow browsers and tools that speak HTTP to access content from the IPFS network. They don’t represent all of IPFS, but rather the HTTP resolution; they provide the canonical way to address IPFS content via http scheme URLs. The ipfs.io gateway is a community resource run by Protocol Labs to help developers build on IPFS, but it is just one of many gateways hosted by many groups (see [a list of 100+ gateways and their statuses](https://ipfs.github.io/public-gateway-checker/)).

Gateway operators do not store or host the data that is viewable through the gateway. Rather, the gateway allows users to view content hosted by the thousands of independent node operators across the IPFS Network. While the best practice for reporting apparently illegal or otherwise objectionable content is to directly contact the node operator hosting the data, gateway operators can also block the ability of users to view a particular piece of content via their gateway in appropriate circumstances. Protocol Labs operates the ipfs.io gateway and regularly receives and complies with reports of this nature through the [abuse@protocol.ai](abuse@protocol.ai) and [abuse@ipfs.io](abuse@ipfs.io) addresses.

# What Happened

On Friday, ipfs.io’s domain registrar received complaints about objectionable content being served through the ipfs.io gateway. In response, the domain registrar took down the _entire_ ipfs.io domain by setting the records for the domain to point to a “black hole” address. Our automated monitoring detected the issue within minutes, and internal & external users started posting observations of 404s within 30 minutes as the DNS record update propogated, which triggered a full incident response. Per above, the blast radius of this domain takedown affected both the ipfs-related websites and the ipfs gateways because they were housed together.

# Content Policy on the DWeb

Taking a step back, the root cause of our \~4-hour outage wasn’t about infrastructure, but rather content policy. One help-desk person at a domain registrar took down a service used by millions of people (and NFTs!) per week with no advance notice, discussion, or oversight. 😔 As a gateway operator, we would have expeditiously taken down the specific objectionable content if the concerned party had contacted us directly; however, instead, that party contacted our domain registrar, which then took down all of ipfs.io instead of the specific objectionable content. This is an example of the dangers of content moderation occurring [deeper in the technology stack](https://www.eff.org/deeplinks/2021/01/beyond-platforms-private-censorship-parler-and-stack).

We believe that no one person or company should have unilateral control over available content on the Internet, and that moderation decisions must be carefully made, based on moderation frameworks that are consistent with human rights, clear takedown rules, fair and transparent removal processes, and mechanisms for users to appeal takedown decisions. We support the work of distributed content moderation protocols like [Songbird](https://github.com/Murmuration-Labs/songbird-decentralized-moderation/) from [Murmuration Labs](https://murmuration.ai/), which embodies these principles.

As we work across web3 to build the tools and services that embody these principles, it’s also critical that we make core community resources like the gateway more resilient to these sorts of centralized points of failure. If you have ideas about how we can make the ipfs.io gateway (and other IPFS gateways) more resilient - please share them here: [https://github.com/ipfs/ipfs/issues/469](https://github.com/ipfs/ipfs/issues/469 "https://github.com/ipfs/ipfs/issues/469")!