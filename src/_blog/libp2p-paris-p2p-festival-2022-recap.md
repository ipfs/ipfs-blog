---
title: libp2p @ Paris P2P Festival 2022 Recap
description: 'If you missed Paris P2P Festival, catch up with 10 talks on libp2p that
  are worth watching from the event! '
author: Yiannis Psaras
date: 2022-06-02
permalink: "/2022-06-02-libp2p-at-paris-p2p/"
translationKey: ''
header_image: "/171434584-f53b2b7b-16f8-4a4f-99aa-867a50b9b48a.png"
tags:
- libp2p

---
There is a very strong P2P community in Paris, led among others by our friends at [Berty](https://berty.tech/). The community organizes a yearly in-person event to present new products, the latest updates in P2P technology and protocols, as well as meet newcomers in the space and brainstorm on the next big challenge. After a 2-year break, the festival took place physically again from the 27th of April to the 1st of May 2022. And it was a great event with more than 100 people, plenty of side discussions, and great presentations across the spectrum of P2P technologies. Well done to the organizers that made this happen!

This year, the [Protocol Labs EngRes](https://www.notion.so/PL-EngRes-Public-b5086aea86ed4f81bc7d0721c6935e1e) libp2p team joined in and had strong presence in the event - thank you! Almost two full days were allocated to libp2p’s latest updates, current and future work streams, as well as new findings on the research domain. The second day concluded with a very inspiring talk from PL’s founder and IPFS’s and libp2p’s inventor Juan Benet.

Here is the list of all libp2p talks delivered at the Paris P2P Festival, together with a brief outline and links to their recordings on YouTube.

[**Introduction to and State of libp2p**](https://www.youtube.com/watch?v=Sbd7odDFT1w&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO&index=3)**, Max Inden, core maintainer of libp2p**

Max discussed the current state of the project, went briefly through the state of the various language implementations, and took a look at the many live networks running on top of libp2p today. Finally Max covered the project roadmap for the years to come.

[**IPFS Network Measurements and Improvements Opportunities**](https://www.youtube.com/watch?v=75ewjnT6B9Y&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Yiannis Psaras, research scientist at Protocol Labs**

Yiannis introduced a set of measurement methodologies that allow the team to uncover the characteristics and interactions that take place in the public IPFS network between peers. After a big measurement campaign, we revealed presence of IPFS peers in more than 2700 Autonomous Systems and 152 countries, the majority of which operate outside large central cloud providers like Amazon or Azure. The team evaluated the performance of IPFS, showing that both publication and retrieval delays are acceptable for a wide range of use cases.

[**Optimistic Provide: Making the IPFS DHT Provide process an order of magnitude faster**](https://www.youtube.com/watch?v=wbY-MueAfXg&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Dennis Trautwein, PhD student at the University of Wuppertal**

The Provide process in the IPFS network, or in other words, publishing content in the network is very slow (in Internet terms). Through measurements we’ve found that it can be improved by an order of magnitude. In this talk, Dennis presented the team’s improvement proposals together with initial results as well as next steps.

[**Hole punching with libp2p**](https://www.youtube.com/watch?v=MCEEMrIRks8&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Max Inden, core maintainer of libp2p**

Max took a closer look at the recently added decentralized hole punching feature, allowing NAT and firewall traversal without the need for any central coordination servers (STUN and TURN). This is clearly a giant step for a P2P networking protocol and one that has not seen a decentralized solution.

[**Tools for developing distributed protocols and applications**](https://www.youtube.com/watch?v=MvyyuMxsKqk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Pedro Akos Costa, PhD student at NOVA University of Lisbon**

Pedro addressed questions such as which tools should we build and develop to research and improve distributed networking protocols?

[**libp2p DHT: performance, workloads, and possible directions to evolve**](https://www.youtube.com/watch?v=RPO1zCqsxY0&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Joao Leitao, Assistant Professor at NOVA University of Lisbon**

Joao explained briefly the Distributed Hash Table structure of libp2p, and addressed issues such as what performance can we observe? Which improvement tracks are being studied currently? In which direction are we going and is it the right one?

[**Challenges in Browser Connectivity. An Outlook onto libp2p’s Future: WebRTC, WebTransport, WebSockets**](https://www.youtube.com/watch?v=aXYUw9tikaQ&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Marten Seeman, one of the core maintainers of libp2p**

Marten discussed what is the future of libp2p within the Browser? What about WebRTC, WebTransport, WebSockets in the future and what do we need to do to get there?

[**Storetheindex: A distributed and eventually consistent database**](https://www.youtube.com/watch?v=rsmP7888ruk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Marco Munizaga, member of libp2p maintainers team**

Marco presented the “storetheindex” project and latest updates. `storetheindex` is a distributed and eventually consistent database. Marco explained what that means, what properties it holds, and how it enables IPFS < - > Filecoin interoperability.

[**Architectural Collisions - Short Stories of Hard Problems Putting IPFS in Strange Places**](https://www.youtube.com/watch?v=pfX8S7yKSCE&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Dietrich Ayala, ecosystem lead for Browsers & Platforms, Protocol Labs**

The Browsers & Platforms team at Protocol Labs works on IPFS integration across many deployment environments, with many different collaborators, on various architectures, including even the final frontier… SPACE! Dietrich shared a series of scenarios with examples of what worked, what didn’t, and what’s still in progress to give you a peek into the P2P future.

Gossipsub is the primary pubsub protocol of libp2p and is being the protocol of choice for the Filecoin blockchain, as well as other prominent blockchains, such as ETH2.0. But what is Gossipsub? What can it be used for? And what are its security properties given the highly-critical environments it operates in?

[**QUIC Deep Dive**](https://www.youtube.com/watch?v=6SyDP7xKqZk&list=PLNeNFYqVeWnNy8KdZOdOTlzSkKoBWyfqO)**, Marten Seeman, core maintainer of quic-go**

After quickly covering the history and basics of QUIC, Marten speaks to some of the interesting corners of the protocol as someone who has watched it evolve from the IETF and implemented it in Go. He also provided an outlook on how its properties are leveraged in future protocols (MASQUE, WebTransport).

And last but certainly not least:

[**libp2p project - long term view**](https://www.youtube.com/watch?v=jH9BkLTxhp8&list=PLX9e-uG608s9IC5avTGGkF-c7XJ7IUO_X&index=3)**, Juan Benet, the inventor of IPFS, libp2p and Filecoin and the founder of Protocol Labs**

The IPFS Project has grown into a large open source movement to re-decentralize the web, safeguard our data, and improve our applications. And libp2p is a very central component of IPFS, which, at the same time can be used (and is being used) independently and already powers several Web3.0 platforms. In this talk Juan walked us through the history of libp2p, its current use cases and its future potential. He also highlighted where extra effort is needed, the current challenges and pointed to ways to achieve its full potential.