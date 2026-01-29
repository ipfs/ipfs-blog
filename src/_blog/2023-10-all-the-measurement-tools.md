---
title: All the Measurement Tools
description: "Explore our and the Community's Network Measurement Tools: Discover, Analyze, and Collaborate with our Data Collectors, Measurement Setups, and More!"
author: Dennis Trautwein
date: 2023-09-21
permalink: '/2022-10-all-the-measurement-tools/'
header_image: '/ipfs-calendar/ipfs-calendar-cover.png'
tags:
  - 'tools'
  - 'probelab'
  - 'measurements'
---

At ProbeLab, we have made it our mission to measure networks and network protocols. However, measurements are not an end in itself but rather a means to an end. Measurements allow us to identify bottlenecks, quantify the available space for improvement, and eventually design and suggest protocol optimizations. Then the circle repeats.

Our work focuses on internal network protocol logic, cross-protocol interoperation and network architecture. Due to the decentralized nature of peer-to-peer networks, recording activities across all participants is challenging. Particularly, since independent node operators dominate, no complete record of network activities exists. To address this challenge, a significant component of our work consists of developing suitable measurement methodologies and corresponding tools.

However, many of the tools come from a vibrant community of collaborators. In this blog post, we want to 

- **improve the discoverability** of those tools to 
- **limit duplicate work**, 
- **highlight each tool's impact**, and 
- **give credit where credit is due**. 

Below, you can find a [Registry](#registry) of all the tools we have used in the past or are even running continuously today. Each entry comprises a brief paragraph describing the features, functionality and purpose of the tool. Where applicable each entry also has subsection highlighting the impact by point to reports, publications or issues where the tool was instrumental.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Highlights](#highlights)
  - [CID-Hoarder](#cid-hoarder)
  - [Nebula](#nebula)
  - [Thunderdome](#thunderdome)
- [Registry](#registry)
  - [Thunderdome](#thunderdome-1)
  - [Nebula](#nebula-1)
  - [Parsec](#parsec)
  - [Tiros](#tiros)
  - [Boomo](#boomo)
  - [Antares](#antares)
  - [Kademlia Exporter](#kademlia-exporter)
  - [CID-Hoarder](#cid-hoarder-1)
  - [IPFS Telemetry](#ipfs-telemetry)
  - [IPFS Metrics Exporter](#ipfs-metrics-exporter)
  - [IPFS Tools](#ipfs-tools)
  - [Geolocation of IPFS Users/Content](#geolocation-of-ipfs-userscontent)
  - [Testground](#testground)
  - [Binary Trie Library](#binary-trie-library)

## Highlights

Next to the registry we want to highlight three tools that have proven immensly valuable in the past.

### CID-Hoarder

### Nebula

<img alt="Nebula Logo" width="300" style="margin: inherit" src="https://github.com/dennis-tra/nebula/blob/main/docs/nebula-logo.png?raw=true" >

### Thunderdome

[Thunderdome](https://github.com/ipfs-shipyard/thunderdome) is a system to compare the performance of different versions of IPFS gateways by using real HTTP traffic streamed from the public gateways operated by Protocol Labs.

A user can define an experiment that details what software they want to put under test, with any special configuration and test conditions. Each combination of software and configuration is called a target. Thunderdome deploys each target, connects them to the IPFS network and begins sending real-world requests at the chosen rate. Each target in the experiment receives exactly the same request at the same time.

Thunderdome collects metrics from each target and sends them to Grafana where they can be graphed and analysed. Once the experiment is done the deployed target are shut down to save resources, but they can be started once again if the experiment, or a variant, needs to be repeated. We use it to compare different implementations of the gateway spec, the impact of changing configuration settings or look for performance changes between releases.

Thunderdome differs from other tooling such as [testground](https://github.com/testground/testground) because it aims to simulate realistic load conditions using close to real time requests.

## Registry

### Thunderdome

Author: [@ProbeLab](https://github.com/plprobelab) | GitHub: [dennis-tra/nebula](https://github.com/dennis-tra/nebula) | Languages: [Go](https://golang.org/)

[Thunderdome](https://github.com/ipfs-shipyard/thunderdome) is a system to compare the performance of different versions of IPFS gateways by using real HTTP traffic streamed from the public gateways operated by Protocol Labs.

A user can define an experiment that details what software they want to put under test, with any special configuration and test conditions. Each combination of software and configuration is called a target. Thunderdome deploys each target, connects them to the IPFS network and begins sending real-world requests at the chosen rate. Each target in the experiment receives exactly the same request at the same time.

Thunderdome differs from other tooling such as [testground](https://github.com/testground/testground) because it aims to simulate realistic load conditions using close to real time requests.

**Impact**

- Thunderdome is run since Kubo v0.19 prior every release cycle to detect regressions before they get released

### Nebula

<!-- <img alt="Nebula Logo" width="300" style="margin: inherit" src="https://github.com/dennis-tra/nebula/blob/main/docs/nebula-logo.png?raw=true" > -->
<!-- ![Nebula Logo](https://github.com/dennis-tra/nebula/blob/main/docs/nebula-logo.png?raw=true =300x) -->

Author: [@ProbeLab](https://github.com/plprobelab) | GitHub: [dennis-tra/nebula](https://github.com/dennis-tra/nebula) | Languages: [Go](https://golang.org/)

**Nebula** is a libp2p DHT crawler and monitor that is designed to track the liveliness and availability of peers. ProbeLab is running Nebula every 30m for various libp2p-based DHT networks. We gather information about peer uptime which translates to peer churn. These measurements guide informed decisions about certain network-wide DHT parameters like the replication factor of records. Nebula supports the [Amino DHT](https://blog.ipfs.tech/2023-09-amino-refactoring/), Filecoin, Polkadot, Kusama, and [more](https://github.com/dennis-tra/nebula).

**Impact**

- Powers weekly [IPFS network measurement reports](https://github.com/plprobelab/network-measurements/tree/master/reports)
- [RFM-2](https://github.com/protocol/network-measurements/blob/master/results/rfm2-uptime-and-churn.md) - Uptime and Churn
- [ACM SigCOMM 2022](https://dl.acm.org/doi/abs/10.1145/3544216.3544232) - Design and Evaluation of IPFS: A Storage Layer for the Decentralized Web

### Parsec

Author: [@ProbeLab](https://github.com/plprobelab) | GitHub: [plprobelab/parsec](https://github.com/plprobelab/parsec) | Languages: [Go](https://golang.org/)

**parsec** is a DHT and [IPNI](https://github.com/ipni) performance measurement tool that is used to gather accurate data on the performance of DHT and IPNI lookups and publications. parsec-based experiments are aimed at improving the efficiency and speed of distributed systems by developing better algorithms for routing and data retrieval.

We at ProbeLab use it to continuously monitor the lookup and publication performance to spot degradations early as has [happened earlier in 2023](https://blog.ipfs.tech/2023-ipfs-unresponsive-nodes/).

**Impact**

- Powers [lookup](https://probelab.io/ipfsdht/#dht-lookup-performance-overall-plot) and [publication](https://probelab.io/ipfsdht/#dht-publish-performance-overall-plot) graphs on [probelab.io](https://probelab.io)
- Powers cid.contact [IPNI](https://probelab.io/ipni/cid.contact/) performance metrics on [probelab.io](https://probelab.io)

### Tiros

Author: [@ProbeLab](https://github.com/plprobelab) | GitHub: [plprobelab/tiros](https://github.com/plprobelab/tiros) | Languages: [Go](https://golang.org/)

ProbeLab has built a website performance measurement tool, called **tiros** for websites hosted on IPFS. Tiros is designed to help developers monitor and optimize the performance of their IPFS-hosted websites. Tiros-based experiments measure retrieval and rendering metrics of websites loaded over IPFS. It also measures and compares the IPFS metrics with their HTTPS counterparts.

**Impact**

- Uncovered issue with many stale provider records in the Amino DHT ([discussion](https://github.com/plprobelab/network-measurements/issues/49), [kubo/issue#9982](https://github.com/ipfs/kubo/issues/9982), [kubo/issue#9984](https://github.com/ipfs/kubo/issues/9984))
- Powers [website performance metrics](https://probelab.io/websites/) on [probelab.io](https://probelab.io)

### Boomo

Author: [@ProbeLab](https://github.com/plprobelab) | GitHub: [plprobelab/boomo](https://github.com/plprobelab/boomo) | Languages: [Go](https://golang.org/)

`boomo` is a **boo**trapper **mo**nitor and will probe a list of preconfigured
peers at a constant frequency with different transports. It was developed to alert on issues
with network bootstrappers.

**Impact**

- Uncovered issue with websocket address resolution (TODO: link issue)

### Antares

<!-- ![Antares Logo](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edfd53d7-3365-484d-8b6a-7c96d16034cd/Untitled.png) -->

Author: [@dennis-tra](https://github.com/dennis-tra) | GitHub: [dennis-tra/antares](https://github.com/dennis-tra/antares) | Languages: [Go](https://golang.org/)

A gateway and pinning service probing tool. It allows to track information about the peers that are powering those services. This includes but is not limited to PeerIDs, agent versions, supported protocols, and geo-locations. Antares will generate random CIDs, write provide records to [Amino](https://blog.ipfs.tech/2023-09-amino-refactoring), and then request them through gateways or pin them with pinning services. That way we can identify the IP addresses and peer IDs of these services.

This methodology is inspired by "Mapping the interplanetary Filesystem". // TODO

### Kademlia Exporter

Author: [@mxinden](https://github.com/mxinden) | GitHub: [mxinden/ipfs-cid-hoarder](https://github.com/cortze/ipfs-cid-hoarder) | Languages: [Rust](https://rust-lang.org)


### CID-Hoarder

Author: [@cortze](https://github.com/cortze) | GitHub: [cortze/ipfs-cid-hoarder](https://github.com/cortze/ipfs-cid-hoarder) | Languages: [Go](https://golang.org/) (Python/Jupyter)

The CID-Hoarder is a client designed for monitoring Content IDs (CIDs) within the [Amino](https://blog.ipfs.tech/2023-09-amino-refactoring) network. It accomplishes this by randomly generating Content+CID pairs and storing them in the network. It then periodically checks the accessibility of these CIDs by pinging the provider record holders, requesting the CIDs they should store, and conducting DHT lookups to determine if the content can be retrieved from the network. Additionally, the CID-Hoarder identifies the closest peers to the CIDs in question, providing comprehensive tracking and monitoring capabilities within the IPFS ecosystem.

**Impact**

- [RFM-17](https://github.com/protocol/network-measurements/blob/master/results/rfm17-provider-record-liveness.md) - Provider Record Liveness
<!-- - ACM SIGMETRICS submission --> // TODO link

### IPFS Telemetry

Author: [@diogo464](https://github.com/diogo464) | GitHub: [diogo464/ipfs_telemetry](https://github.com/diogo464/ipfs_telemetry) | Languages: [Go](https://golang.org/)


This tool is a modified instance of Kubo and has been developed to provide telemetry information through a newly implemented protocol. This instance collects various metrics from Bitswap, Kademlia, the host system, and Go. Instead of transmitting this data to a central source, it exposes telemetry information using the newly established protocol. Additionally, it includes a network crawler that can retrieve telemetry data from nodes that communicate using this protocol.

**Impact**

- [Telemetry Dashboards](https://telemetry-ipfs.joaoleitao.org/d/8Yp3dt8nz/ipfs-telemetry-crawler?orgId=1&refresh=1m)

### IPFS Metrics Exporter

Author: [@trudi-group](https://github.com/trudi-group) | GitHub: [trudi-group/ipfs-metric-exporter](https://github.com/trudi-group/ipfs-metric-exporter) | Languages: [Go](https://golang.org/)

This tool is a [Kubo plugin](https://github.com/ipfs/kubo/blob/master/docs/plugins.md) that starts a TCP server over which it exposes protocol information like exchanged Bitswap messages. The plugin also expses an HTTP server that extends the existing Prometheus metrics and has an endpoint to manually trigger certain Bitswap operations.

**Impact**

- [IEEE ICDCS 2022](https://arxiv.org/pdf/2104.09202.pdf) - Monitoring Data Requests in Decentralized Data Storage Systems: A Case Study of IPFS
- [Real-time Bitswap metrics Dashboard](https://grafana.monitoring.ipfs.trudi.group/d/E0amoF3nk/ipfs?orgId=2&refresh=5m)

### IPFS Tools

Author: [@trudi-group](https://github.com/trudi-group) | GitHub: [trudi-group/ipfs-tools](https://github.com/trudi-group/ipfs-tools) | Languages: [Rust](https://rust-lang.org/)

The same group that developed the "IPFS Metrics Exporter" provide a treasure chest of analysis related tools. Most importantly, it contains a client for the above TCP server to consume and analyse Bitswap messages in real-time. Further packages include `cid-decode`, `ipfs-gateway-finder`, `ipfs-json-to-csv`, `bitswap-monitoring-client`, `unify-bitswap-traces`. [Antares](#antares) was inspired by the methodology pioneered in `ipfs-gateway-finder`.

**Impact**

- [IEEE ICDCS 2022](https://arxiv.org/pdf/2104.09202.pdf) - Monitoring Data Requests in Decentralized Data Storage Systems: A Case Study of IPFS
- [Real-time Bitswap metrics Dashboard](https://grafana.monitoring.ipfs.trudi.group/d/E0amoF3nk/ipfs?orgId=2&refresh=5m)

### Geolocation of IPFS Users/Content

Author: [@pedroAkos](https://github.com/pedroAkos) | GitHub: [pedroAkos/IPFS-location-requested-content](https://github.com/pedroAkos/IPFS-location-requested-content) | Languages: [Go](https://golang.org/) (Python)

This repository contains analysis code for Bitswap and gateway request logs like they were published in [Design and Evaluation of IPFS](TODO) to correlate requestor to content provider location. The contained tool takes the gateway request logs, looks up their provider record in the DHT, and maps the provider peer IDs to their network addresses by also looking up their peer records in the DHT. That way the provider geo location can be determined based on their IP address. This information in combination with the client's IP from the gateway request paints a comprehensive view of the request patterns in the IPFS network.

**Impact**

- [RFM-3](https://www.notion.so/pl-strflt/Location-of-IPFS-end-users-and-requested-content-7668e98a725d4eea9f36fcafaabe7120) - Location of IPFS end users and requested content
- Paper submitted to DADS 2023 - SAC 2023 // TODO: ask pedro

### Testground

Author: [@protocol](https://protocol.ai) | GitHub: [testground/testground](https://github.com/testground/testground) | Languages: [Go](https://golang.org/)

Testground is a platform for testing, benchmarking, and simulating distributed and peer-to-peer systems at scale. It's designed to be multi-lingual and runtime-agnostic, scaling gracefully from 2 to 10k instances, only when needed.

### Binary Trie Library

Author: [@guillaumemichel](https://github.com/guillaumemichel/) | GitHub: [guillaumemichel/py-binary-trie](https://github.com/guillaumemichel/py-binary-trie) | Languages: Python | Pypi: [binary-trie](https://pypi.org/project/binary-trie/)

Pythin implementation of a binary trie to experiment with binary trie structures used in the XOR keyspace of the Kademlia DHT. It builds binary tries for arbitrary sized keys and can efficiently compute the `N`` closest keys to a specific key in the trie. It supports the standard trie operations: contain, find, prefix, etc. This is a handy tool when simulating DHT interactions.

**Impact**

- Intensively used in [RFM19](https://github.com/protocol/network-measurements/blob/master/results/rfm19-dht-routing-table-health.md) to make N closest keys computations efficient

