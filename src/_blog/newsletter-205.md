---
title: "🌳 IPFS Newsletter 205: HTTP, P2P in browsers, Kubo speedup & more"
description: "The IPFS Newsletter is back, with many exciting updates to share: HTTP support across the IPFS stack, P2P in browsers, Kubo speedup, and more."
date: 2025-05-23
permalink: "/newsletter-205"
header_image: "/ipfsnews.png"
tags:
- newsletter
---

Welcome back to the IPFS Newsletter! After a hiatus, we have many exciting updates to share.

### More HTTP Support Across the IPFS Stack

Multiple IPFS libraries are embracing or adding support for HTTP (usually in addition to Bitswap). Benefits include lower data provision costs, easier integration with existing HTTP libraries and services, and seamless web compatibility.

- [Kubo](https://github.com/ipfs/kubo) added support for trustless HTTP retrieval on an opt-in basis in [v0.35](https://github.com/ipfs/kubo/releases/tag/v0.35.0).
- [Rainbow](https://github.com/ipfs/rainbow), the high performance HTTP Gateway implementation, added support for trustless HTTP retrieval in [v1.12](https://github.com/ipfs/rainbow/releases/tag/v1.12.0).
- Helia, [@helia/verified-fetch](https://github.com/ipfs/helia-verified-fetch) and the [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway) already support trustless HTTP retrieval.
- [RASL](https://dasl.ing/rasl.html) includes a simple HTTP-based retrieval method.

The next step is adding support for HTTP providing to the DHT ([issue #496](https://github.com/ipfs/specs/issues/496)). This would let nodes announce themselves as HTTP providers alongside or instead of Bitswap. 

### Service Worker Gateway Provides P2P Capabilities in the Browser

The [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway) is a browser-based IPFS gateway that uses Service Workers to handle p2p retrieval, hash verification, and other IPFS functionality. Try it out at [inbrowser.link](https://inbrowser.link). 

The Service Worker Gateway has been getting a lot of love recently: [v1.12](https://github.com/ipfs/service-worker-gateway/releases/tag/v1.12.0) includes configurable timeouts, better error pages, and a signed binary for local deployment. For a deep dive, check out the [Service Workers for IPFS on the Web](https://youtu.be/qtIJXRgxjVA?feature=shared) video. ([Shipyard](https://ipshipyard.com/)) 

### Drop-in Service Worker Example for App Developers

Here's a [drop-in service worker example](https://github.com/ipshipyard/drop-in-service-worker). It intercepts hardcoded requests to centralized gateways, using [@helia/verified-fetch](https://github.com/ipfs/helia-verified-fetch) to retrieve and verify content directly from peers. ([Shipyard](https://ipshipyard.com/)) 

### IPNI Service Update

The [IPNI](https://docs.ipfs.tech/concepts/ipni/), a content routing index for large content providers, suffered service degradation in April, disrupting the ability to find providers for CIDs. The IPNI team has made hardware and software improvements to avoid future disruptions, and service is improving as the newly-upgraded indexers catch up.

In the interim, a [new feature](https://github.com/ipfs/someguy/pull/110) in [Someguy](https://github.com/ipfs/someguy) allows large content providers to run a self-hosted [HTTP delegated routing](https://specs.ipfs.tech/routing/http-routing-v1) endpoint, providing an immediate remedy until IPNI service was restored. 

Join the `#ipni` channel on the [Filecoin Slack](https://filecoin.io/slack) to follow along. A Content Routing WG will be meeting biweekly. More: [background](https://hackmd.io/sRmr-vnPRH2THaPxMIoKjA) & [latest notes](https://hackmd.io/Zxem7bVBRB6ZVDnaqS_kmw).

### 20-40x Speedup for Data Onboarding in Kubo

In the past, adding data to Kubo with `ipfs add` while Kubo was running was slow due to inefficient provider queue handling. A [new optimization](https://github.com/ipfs/boxo/pull/888) in Boxo yields a 20-40x speedup (higher for larger datasets), making it easier to onboard large data sets while Kubo is running. Available in [Kubo v0.35](https://github.com/ipfs/kubo/blob/release-v0.35.0/docs/changelogs/v0.35.md). ([Shipyard](https://ipshipyard.com/))

## Protocol and Standards

### DASL and IETF Draft for CBOR/c-42

[DASL](https://dasl.ing) (Data-Addressed Structures & Links) is a small set of specs for working with content-addressed, linked data. First released in December 2024, DASL now includes sub-specs for encoding (CID and dCBOR42, which are strict subsets of IPFS CIDs and IPLD), metadata ([MASL](https://dasl.ing/masl.html)), and retrieval ([RASL](https://dasl.ing/rasl.html)) of content addressed data. 

[The tag-42 profile of CBOR Core](https://datatracker.ietf.org/doc/draft-caballero-cbor-cborc42/) was submitted as an IETF Draft on 22 May, paving the way for web-wide standardization of CBOR/c-42 and CIDs. (IPFS Foundation)

### Practical Interoperability for CIDs

The original [CID specification](https://github.com/multiformats/cid) was designed for flexibility and future-proofing, supporting various encodings, graph widths, and optimizations. In practice, this flexibility yields multiple CIDs for the same input, making it challenging to establish CID equivalency for the same data across implementations.

Efforts are underway to increase practical interop without losing futureproofing: [IPIP-499: CID Profiles](https://github.com/ipfs/specs/pull/499) proposes a set of standard profiles for UnixFS, and [Kubo v0.35](https://github.com/ipfs/kubo/releases/tag/v0.35.0) adds [new config options](https://github.com/ipfs/boxo/pull/906) towards this goal. For more context, see the lively [forum thread](https://discuss.ipfs.tech/t/should-we-profile-cids/18507).

### Amino DHT Spec

The Amino DHT is a distributed key-value store used for peer and content routing records within IPFS Mainnet. It extends the libp2p Kademlia DHT with IPFS-specific features, such as CIDs and IPNS records. Until recently, it had no formal spec beyond the [libp2p Kademlia DHT spec](https://github.com/libp2p/specs/blob/master/kad-dht/README.md).

[PR #497](https://github.com/ipfs/specs/pull/497) addresses this gap with the goal of improving interoperability, security, and clarity across implementations. ([Shipyard](https://ipshipyard.com/))

## Code and Tools

### 🚢 Releases

- [kubo 0.35](https://github.com/ipfs/kubo/blob/master/docs/changelogs/v0.35.md) & [0.34](https://github.com/ipfs/kubo/blob/master/docs/changelogs/v0.34.md) — Lots of new features, including opt-in HTTP retrieval, new data import options that help with CID equivalency, easi, [AutoTLS](https://blog.libp2p.io/autotls/), and performance improvements to bitswap, providing, and data onboarding commands. `ipfs add` is now 20-40x faster.
- [helia 5.4.1](https://www.npmjs.com/package/helia) — New usability improvements to the [`unixfs.stat` command](https://github.com/ipfs/helia/pull/760), and a [new option allowing finer control](https://github.com/ipfs/helia/pull/772) in how gateways are picked for block retrieval. Additionally, a bug fix in js-libp2p ensures abort signals passed to network operations are properly handled. 
- [IPFS Cluster v1.1.4](https://github.com/ipfs-cluster/ipfs-cluster/releases/tag/v1.1.4) — A maintenance release fixes the IPFS Cluster Docker image for arm64 architectures.
- [Rainbow v1.13](https://github.com/ipfs/rainbow/releases/tag/v1.13.0) & [v1.12](https://github.com/ipfs/rainbow/releases/tag/v1.13.0) — Support for HTTP retrieval and a new option to control http providers.
- [Boxo v0.30.0](https://github.com/ipfs/boxo/releases/tag/v0.30.0) — The reference library shared by Kubo and Rainbow adds support for custom UnixFS DAG width and the ability to enable/disable the bitswap server.
- [Someguy v0.9.1](https://github.com/ipfs/someguy/releases/tag/v0.9.0) — The Delegated Routing API server implementation adds support for probing HTTP gateway endpoints and returning those as providers. 
- [Service Worker Gateway v1.12](https://github.com/ipfs/service-worker-gateway/releases/tag/v1.12.0) — Configurable timeouts, useful debug info on error pages, and more.


### Ecosystem Spotlights

- [Helia 101 examples for Node.js](https://github.com/ipfs-examples/helia-examples/tree/main/examples/helia-101) is overhauled with many new examples: getting started with Helia, pinning, IPNS, and more.
- [iroh v0.35](https://www.iroh.computer/blog/iroh-0-35-prepping-for-1-0) — The last planned version before the 1.0 release candidate later this year.
- [Seed Hypermedia](https://seed.hyper.media), an open protocol and app for authorship and collaboration, published [a new blog post](https://seed.hyper.media/blog/collaborating-on-the-web-with-seed-hypermedia-protocol-and-ipfs) describing core principles and new features in the [Seed Hypermedia App](https://seed.hyper.media/hm/download), which features a clean, thoughtfully designed interface.
- [Peergos 1.3](https://github.com/Peergos/web-ui/releases/tag/v1.3.0) — the p2p, secure file storage, social network and application protocol releases a new sync gui and api for managing the sync client.
- Good news for WebTransport: `serverCertificateHashes`, a feature in the [WebTransport](https://blog.ipfs.tech/2024-shipyard-improving-ipfs-on-the-web/#webtransport) spec, necessary for browsers to connect to IPFS nodes over WebTransport without CA-signed TLS certs, was considered for removal. After a [lengthy discussion, the WebKit team agreed to implement it](https://github.com/w3c/webtransport/issues/623#issuecomment-2895955428), which means Safari users will also benefit from direct WebTransport connections to IPFS nodes.
- [TeaTime](https://github.com/bjesus/teatime) is a static distributed library system powered by IPFS, SQLite and GitHub. 
- [js-blockstore-opfs](https://github.com/dozyio/js-blockstore-opfs) is an [Origin Private File System (OSPF)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) TS/JS blockstore implementation for use with Helia and js-libp2p in the browser. ([@dozyio](https://github.com/dozyio))
- [Distributed Press](https://distributed.press/), a publishing tool for the distributed web, is [migrating to Helia](https://github.com/hyphacoop/api.distributed.press/pull/101).

## Services and Providers

- [Filebase launches IPFS RPC API Support](https://filebase.com/blog/introducing-support-for-the-ipfs-rpc-api) with Kubo-compatible endpoints to simplify integration with existing tools -- no node management required. ([Docs](https://docs.filebase.com/api-documentation/ipfs-rpc-api)).
- [Filebase launches Real-Time Gateway Activity Streams](https://filebase.com/blog/introducing-ipfs-gateway-activity-streams) (v0), providing real-time visibility into IPFS gateway traffic, including IPs and status codes.
- [Bluesky Backups by Storacha](https://bsky.storage/): This beta webapp [saves regular snapshots](https://www.youtube.com/watch?v=CIym-b-DA5s) of your ATProto data and installs a recovery key into your [DID PLC profile](https://github.com/did-method-plc/did-method-plc), bringing true credible exit to Bluesky. [Github repo](https://github.com/storacha/bluesky-backup-webapp-server).

### Articles and Tutorials

- 🎥 [Deploy Static Apps and Websites to IPFS with Github Actions](https://www.youtube.com/watch?v=ZRrPBqqFKFU). Whether you're using React, Vuepress, Astro, Next.js, or any other static site generator, the [IPFS Deploy Action](https://github.com/marketplace/actions/deploy-to-ipfs) will help you get your web application deployed on IPFS. Here's the [docs page](https://docs.ipfs.tech/how-to/websites-on-ipfs/deploy-github-action/#what-is-the-ipfs-deploy-action) and [video](https://www.youtube.com/watch?v=ZRrPBqqFKFU). (Daniel Norman, Shipyard)
- 🎥 [Service Workers for IPFS on the Web](https://youtu.be/qtIJXRgxjVA?feature=shared). Deep dive into Service Workers, how they help IPFS on the Web, and how to use Service Workers today for verified peer-to-peer retrieval on the Web. (Daniel Norman, Shipyard)
- 📘 [Setup a DNSLink Gateway to serve static sites on IPFS with Kubo and Caddy](https://docs.ipfs.tech/how-to/websites-on-ipfs/dnslink-gateway/).
- [Smaller Hash BTrees](https://piss.beauty/post/smaller-hash-btrees) — Insightful blog post delving into optimization techniques to reduce the size of BTree indices when storing CIDs (using a real dataset from [ATProto](https://atproto.com/guides/glossary#cid-content-id)) in a PostgreSQL database. ([Stellz](https://bsky.app/profile/piss.beauty))

## Community & Events

- [Grantees Announced for Spring 2025 IPFS Utility Grants](https://blog.ipfs.tech/2025-05-grants/) — 3 grantees were selected: `rsky-satnav` CAR Explorer (Rudy Fraser, Blacksky), CAR Indexing Tools (Ben Lau, Basile Simon, & Yurko Jaremko, Starling Lab), and DASL Interop Testing (Cole Anthony Capilongo, Hypha Co-op), who will be presenting their work at [CID Congress #3](https://lu.ma/ofjr7mgd).
- [USER * AGENTS * BERLIN](https://lu.ma/v457jxp2?tk=8UZBKL) (May 29-30, Berlin) — Chat or cowork with people interested in maximizing user agency in everyday software, and meet long-time contributors to the IPFS ecosystem.
- [Hashberg: A Content Addressing Architectures Summit](https://lu.ma/nbv106v5) (June 11, Berlin) — An intimate, 1-day event to collaborate on critical topics across the IPFS ecosystem. 
- [Protocol Berg v2](https://protocol.berlin/) (June 12-13, Berlin) — Several talks on IPFS.
- [JS Nation 2025](https://jsnation.com/#person-daniel-norman) (June 16, Virtual) — "Demystifying IPFS: A Web Developer's Guide to Content Distribution"
- [CID Congress #3](https://lu.ma/ofjr7mgd) (June 25, Virtual)

If you made it this far, thanks for reading!
