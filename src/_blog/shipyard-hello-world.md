---
title: 'IPFS & libp2p Devs Go Independent: Meet Interplanetary Shipyard'

description: 'Meet the team behind Interplanetary Shipyard, the newly created entity of many core maintainers behind the most popular implementations of IPFS and libp2p.'
author: Adin Schmahmann

date: 2024-04-08
permalink: '/shipyard-hello-world/'
header_image: '/shipyard-hello-world.png'
tags:
  - 'ipfs'
  - 'libp2p'
  - 'shipyard'
  - 'interplanetary shipyard'
---

*Last November, Protocol Labs, where IPFS was invented and incubated, [announced its commitment to decentralizing project governance](https://protocol.ai/blog/advancing-ipfs-and-libp2p-governance/). In this post, you'll hear from Adin Schmahmann of Interplanetary Shipyard, introducing the new team, its roadmap, and what this means for the IPFS community.*

Since its release nearly ten years ago, IPFS has become the connective tissue that powers the infrastructure layer for the decentralized web and connects web2 to web3. Well over 50 million monthly active users access IPFS-based applications, from ENS addresses (~90% of content hashes) to NFTs to blockchains to IoT to enterprise applications. IPFS has always been an open, decentralized, censorship-resistant protocol, and now the project itself is increasingly decentralized too.


Now we’re delighted to announce our own "exit to community": [Interplanetary Shipyard](https://ipshipyard.com/), an **independent collective of people maintaining many of the most popular implementations in the IPFS and libp2p ecosystem**. 


Our founding team includes many longtime maintainers of widely-used IPFS and libp2p implementations and tools. Shipyard is laser-focused on supporting users of the open-source projects in the Interplanetary stack. We are committed to building bridges between web2 and web3 through open-source innovation. We work directly with teams building on IPFS and libp2p, both to troubleshoot and improve current implementations, and also to inform our public goods roadmap. We are registered as a Delaware nonstock corporation.


Our current set of implementations maintained by Shipyard include:

  <table style="width: 100%; border-collapse: collapse;">
  <tr style="border-width: thin; border-color: #888; text-align: center;">
    <td colspan="2" style="border-width: thin; border-color: #888;"><strong>IPFS</strong></td>
    <td style="border-width: thin; border-color: #888; text-align: center;"><strong>libp2p</strong></td>
  </tr>
  <tr>
    <td rowspan="2" style="border-width: thin; border-color: #888; padding: .5rem;">
      <p><a href="https://github.com/ipfs/boxo/#readme">Boxo</a> <small>(GO SDK)</small></p>
      <p><a href="https://github.com/ipfs/kubo/#readme">Kubo</a> <small>(Server, Desktop, Brave)</small></p>
      <p><a href="https://github.com/ipfs/rainbow/#readme">Rainbow</a> <small>(Gateway impl.)</small></p>
      <p><a href="https://github.com/ipfs/someguy#readme">Someguy</a> <small>(Router impl.)</small></p>
      <p><a href="https://github.com/ipfs/helia#readme">Helia</a> <small>(JS SDK)</small></p>
      <p><a href="https://github.com/ipfs/helia-verified-fetch#readme">verified-fetch</a> <small>(Web API for JS)</small></p>
      <p><a href="https://github.com/ipfs-shipyard/service-worker-gateway#readme">Service Worker Gateway</a> <small>(impl. WIP)</small></p>
      <p><a href="https://badbits.dwebops.pub/">Bad Bits Denylist</a> <s</p>
    </td>
    <td rowspan="2" style="border-width: thin; border-color: #888; padding: .5rem;">
      <p><a href="https://github.com/ipfs/ipfs-companion#readme">IPFS Companion</a> <small>(browser extension)</small></p>
      <p><a href="https://github.com/ipfs/ipfs-desktop#readme">IPFS Desktop</a> <small>(Windows/macOS/Linux)</small></p>
      <p><a href="https://ipfscluster.io/">IPFS Cluster</a> <small>(on hold)</small></p>
      <p><a href="https://docs.ipfs.tech/concepts/public-utilities/#public-ipfs-gateways">ipfs.io</a> <small>(public utility)</small></p>
      <p><a href="https://docs.ipfs.tech/concepts/public-utilities/#public-ipfs-gateways">dweb.link</a> <small>(public utility)</small></p>
      <p><a href="https://docs.ipfs.tech/concepts/public-utilities/#public-ipfs-gateways">trustless-gateway.link</a> <small>(public utility)</small></p>
      <p><a href="https://docs.ipfs.tech/concepts/public-utilities/#delegated-routing">delegated-ipfs.dev</a> <small>(public utility)</small></p>
      <p><a href="https://docs.ipfs.tech/concepts/public-utilities/#amino-dht-bootstrappers">Amino DHT</a> <small>(public utility)</small></p>
      <p><a href="https://stats.ipfs.network">IPFS Measurements</a></p>
    </td>
    <td rowspan="2" style="border-width: thin; border-color: #888; padding: .5rem;">
      <p><a href="https://github.com/libp2p/go-libp2p#readme">go-libp2p</a></p>
      <p><a href="https://github.com/libp2p/js-libp2p#readme">js-libp2p</a></p>
      <p><a href="https://github.com/libp2p/rust-libp2p#readme">rust-libp2p</a></p>
      <p>libp2p Measurements</p>
    </td>
  </tr>
  <tr></tr>
</table>

We have an extensive [initiative roadmap](https://ipshipyard.com/initiative-roadmap) and are eager to get more input from the developer community. To shout out just a few ideas we’re working on:

* [Reliable, decentralized, and verified retrieval of CIDs](https://ipshipyard.com/initiative-roadmap/reliable-decentralized-and-trustless-browser-fetching-of-ipfs-content) (content identifiers) in browsers. The idea is to allow web browsers to fetch CIDs in a verifiable and trustless manner without being vulnerable to centralized chokepoints. You can participate and follow along with this work in the [IPFS dApps Working Group](https://lu.ma/ipfs-dapps).
* [IPFS for pioneers](https://ipshipyard.com/initiative-roadmap/ipfs-for-pioneers-enable-building-interoperable-ipfs-systems-using-http-protocols). We aim to enable the building of interoperable IPFS systems using extremely minimal HTTP-based protocols so that building IPFS-compatible tooling in something like Python (that doesn’t have much IPFS or libp2p tooling today) is super easy and appealing.
* [Self-service tooling for debugging IPFS request handling](https://ipshipyard.com/initiative-roadmap/self-service-tooling-for-debugging-ipfs-request-handling). The idea here is that a user can hit a Boxo-based HTTP gateway and if they experience an error, get a link to download an IPFS request trace. They can then use easy tooling locally or centrally hosted to pinpoint the issue.

**About Shipyard**
IPFS is a big project with big ambitions of being the essential content addressing layer for the next generation of the internet. That ecosystem comes with a sprawling set of resources that IPFS users today depend on in some way, including:

* People and expertise
* Applications
* Libraries
* Networks
* Infrastructure

Think of Shipyard as the union of dockworkers who send ships (projects) out onto the ocean of the distributed web, well-built and equipped with all they need to sail. The next era of the internet is still in its infrastructure phase; IPFS has already positioned itself as one of the core infrastructure layers for the next generation of the internet, and these implementations will be working with the foundation to continue to steward the project.

We want the community to inform how we grow and sustain ourselves, and are eager for community input on our roadmap. We believe the builders growing IPFS, libp2p, and ProbeLab will thrive best together, under their own roof. 

So, a few questions might arise next.

**Why now?**

The set of projects leveraging IPFS and libp2p is now so broad and diverse that it exceeds the purview of one company. Open-source projects need to be managed and owned by their community. 

Consider the precariousness of core IPFS development being tied to a single company, and thus a single funding source. What if that company experiences a change in strategy? What if that funding source decides to prioritize something different from what the IPFS community believes is most important? In web2, the model for supporting and promoting open-source projects was to get the largest centralized players to pay their own employees to maintain the tooling. What does that model look like for the next generation of the internet? 


We want to let the community decide. We believe putting control of the IPFS stack in the hands of an independent collective will foster better resiliency, transparency, open-protocol governance, and long-term future health. By **operating independently while collaborating publicly**, we will build alongside other technical teams that rely on this essential infrastructure. 

**Who maintains and funds this work?**

We're grateful to Protocol Labs, our anchor financial partner for 2024-2025, for its continued support. We’re thankful as well to our early ecosystem supporters and patrons including Optimism's RetroPGF grants, Cloudflare, Pinata, Fission, and CoopHive.



We’re exploring multiple avenues for financial support, and in keeping with our new community collective approach, we’re thinking in public about what those avenues could be: public goods funding, community grants, commercial services, crypto-native funding, and more. 


**Our team is raising an additional $3 million in community contributions to sustain our work as technical stewards in 2024**. Here’s how you can support Shipyard: 

* **Support Public Goods Maintenance** \
If you or your project depends upon IPFS or libp2p, we invite you to consider contributing toward the ongoing maintenance of these important protocols as a public good. You can donate directly to IPFS or libp2p through the [Open Impact Foundation](https://openimpact.foundation/).
* **Hire Shipyard for Commercial Services** \
In addition to public good funding, we are also beginning to support commercial service agreements for our core users, including service tiers, contracted support, and other embedded engineering work. You can check out our [commercial services tiers](https://ipshipyard.gitwallet.co/) or reach out directly if you have a project you’d like to collaborate with us on.


We're excited for Shipyard's opportunity to strengthen the IPFS and libp2p ecosystems through community feedback and patronage. If you would like to get more involved we're in the [IPFS](https://docs.ipfs.tech/community/#get-involved) and [libp2p](https://discuss.libp2p.io/) forums, and you can reach us at contact@ipshipyard.com. 

