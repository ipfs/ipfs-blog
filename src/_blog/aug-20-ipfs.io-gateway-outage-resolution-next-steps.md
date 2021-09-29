---
title: August 20 IPFS.io Gateway Outage Resolution & Next Steps
description: The ipfs.io gateway & website experienced an outage on 2021-08-20; here
  are more details & corrective actions.
author: IPFS Team
date: 2021-08-27
permalink: /2021-08-27-IPFS-io-gateway-outage-resolution/
translationKey: ''
header_image: "/ipfs-blog-gateway-5.jpg"
tags:
- gateways

---
# Customer Impact

On 2021-08-20 at 15:54 UTC, visitors started to get 404s across all HTTPS content served from the[ ipfs.io](http://ipfs.io/) domain. 404s were returned for both:

1. Web properties under the [ipfs.io](http://ipfs.io/) domain, including: the ipfs website ([ipfs.io](https://ipfs.io "https://ipfs.io")), ipfs docs ([docs.ipfs.io](https://docs.ipfs.io "https://docs.ipfs.io")), ipfs dist ([dist.ipfs.io](https://dist.ipfs.io "https://dist.ipfs.io")), ipfs blog ([blog.ipfs.io](https://blog.ipfs.io "https://blog.ipfs.io")), etc. AND
2. Content served over the IPFS over HTTP gateway at `https://ipfs.io/ipfs/<cid>`

Users across the internet fetch content from the IPFS network using the ipfs.io gateway over 300 **million** times per week, and were thus impacted until our mitigation was applied at 19:35 UTC. You can see the full incident report and history [on the status page](https://ipfsgateway.statuspage.io/).

However, you can instead fetch content directly from the IPFS network without hitting any of these gateways by using your own IPFS node with [IPFS Desktop](https://docs.ipfs.io/install/ipfs-desktop/), [IPFS CLI](https://docs.ipfs.io/how-to/command-line-quick-start), [IPFS Companion](https://docs.ipfs.io/install/ipfs-companion/) in your browser, and/or an [IPFS-enabled browser like Brave](https://brave.com/ipfs-support/). **If you were using IPFS directly, you probably never even noticed this outage! 💪**

# Background

As a reminder, IPFS and Filecoin are peer-to-peer applications to store and provide content in a distributed fashion. In such architecture, every peer (person or company) controls what it contributes to the network, how it does it, and how it interacts with other peers and their content. The architecture of Filecoin and IPFS is designed to embody the principle of **user agency**.

IPFS HTTP gateways (like the one at [https://ipfs.io/ipfs](https://ipfs.io/ipfs "https://ipfs.io/ipfs")) allow browsers and tools that speak HTTP to access content from the IPFS network. They don’t represent all of IPFS, but rather the HTTP resolution; they provide the canonical way to address IPFS content via http scheme URLs. The ipfs.io gateway is a community resource run by Protocol Labs to help developers build on IPFS, but it is just one of many gateways hosted by many groups (see [a list of 100+ gateways and their statuses](https://ipfs.github.io/public-gateway-checker/)).

Gateway operators do not store or host the data that is viewable through the gateway. Rather, the gateway allows users to view content hosted by the thousands of independent node operators across the IPFS Network. While the best practice for reporting apparently illegal or otherwise objectionable content is to directly contact the node operator hosting the data, gateway operators can also block the ability of users to view a particular piece of content via their gateway in appropriate circumstances. Protocol Labs operates the ipfs.io gateway and regularly receives and complies with reports of this nature through the [abuse@protocol.ai](abuse@protocol.ai) and [abuse@ipfs.io](abuse@ipfs.io) addresses.

# What Happened

On Friday, ipfs.io’s domain registrar received complaints about objectionable content being served through the ipfs.io gateway. In response, the domain registrar took down the _entire_ ipfs.io domain by setting the records for the domain to point to a “black hole” address. Our automated monitoring detected the issue within minutes, and internal & external users started posting observations of 404s within 30 minutes as the DNS record update propogated, which triggered a full incident response. Per above, the blast radius of this domain takedown affected both the ipfs-related websites and the ipfs gateways because they were housed together.

# How we resolved it

Our first priority thread was to remove the objectionable content and get the domain registrar to restore the ipfs.io DNS records. After a few escalation hops, our legal team was able to speak with the domain registrar, which eventually reinstated our domain.

While our legal team engaged with the domain registrar, we also:

1. Initiated the domain migration to Cloudflare (big thanks to the Cloudflare team on getting our transfer expedited!), where we have existing relationships and a support contract. Not to mention, they’re [already pretty familiar with IPFS](https://developers.cloudflare.com/distributed-web/ipfs-gateway).
2. Because all of the IPFS web content is static and stored in IPFS, we created/updated [ipfs.eth.link](http://ipfs.eth.link/) records to reference the latest content of our sites and various subdomains like [docs.ipfs.ens.link](http://docs.ipfs.ens.link/), [blog.ipfs.ens.link](http://blog.ipfs.ens.link/), and [dist.ipfs.eth.link](http://dist.ipfs.eth.link/). We publicized the availability of that content on social media and status pages. This brought all the main IPFS site content back online immediately using the distributed web! 🎉
3. We also reminded gateway users of the [100+ other gateways](https://ipfs.github.io/public-gateway-checker/) that could be used besides ipfs.io, including [dweb.link](https://dweb.link).

Once the domain registrar restored our domain at 19:35 UTC, there were propagation delays for the remedied DNS records to populate DNS caches. ipfs.io gateway access was restored within minutes, however the ipfs.io websites (e.g., docs, blog, dist) weren’t all fully back online until 23:58 UTC. These sites are all served by the ipfs.io gateway, which behind the scenes is performing its own DNS resolution of [DNSLinks](https://dnslink.io/). Custom DNS resolvers on the ipfs.io gateway were getting in the way of DNSLink resolution until we flushed our caches and manually overrode the DNSLink resolution for ipfs.io domains.

# Next Steps to make the Gateway more Resilient

Protocol Labs is taking many steps in response to this event to prevent it from happening again, including:

1. Reduce the blast radius by separating the IPFS website from the ipfs.io gateway onto different domains.
2. Reduce the time to respond by paging engineers on sustained gateway inaccessibility.
3. Reduce time to mitigation by establishing and documenting direct human lines of communication for the registrars of domains of gateways operated by Protocol Labs.
4. Reduce the likelihood of a complete domain takedown by making it even easier for a concerned party to contact us directly about objectionable content (beyond our pre-existing abuse takedown email and resources on the [Gateway FAQ](https://docs.ipfs.io/concepts/ipfs-gateway/#frequently-asked-questions-faqs) and [ipfs.io/legal](https://ipfs.io/legal)).
5. Reduce recovery time by simplifying and better documenting the custom DNS resolution on our gateways.

You can follow along with the status of these corrective actions [here](https://github.com/ipfs/ipfs/issues/469).

# Content Policy on the DWeb

Taking a step back, the root cause of our \~4-hour outage wasn’t about infrastructure, but rather content policy. One help-desk person at a domain registrar took down a service used by millions of people (and NFTs!) per week with no advance notice, discussion, or oversight. 😔 As a gateway operator, we would have expeditiously taken down the specific objectionable content if the concerned party had contacted us directly; however, instead, that party contacted our domain registrar, which then took down **all of ipfs.io** instead of the specific objectionable content. This is an example of the dangers of content moderation occurring [deeper in the technology stack](https://www.eff.org/deeplinks/2021/01/beyond-platforms-private-censorship-parler-and-stack).

We believe that no one person or company should have unilateral control over available content on the Internet, and that moderation decisions must be carefully made, based on moderation frameworks that are consistent with human rights, clear takedown rules, fair and transparent removal processes, and mechanisms for users to appeal takedown decisions. We support the work of distributed content moderation protocols like [Songbird](https://github.com/Murmuration-Labs/songbird-decentralized-moderation/) from [Murmuration Labs](https://murmuration.ai/), which embodies these principles.

As we work across web3 to build these tools and services, it’s also critical that we make core community resources like the gateway more resilient to these sorts of centralized points of failure. If you have ideas about how we can make the ipfs.io gateway (and other IPFS gateways) more resilient - please share them here: [https://github.com/ipfs/ipfs/issues/469](https://github.com/ipfs/ipfs/issues/469 "https://github.com/ipfs/ipfs/issues/469") !