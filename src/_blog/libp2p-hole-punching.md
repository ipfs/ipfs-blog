---
tags:
- libp2p
title: Hole punching in libp2p - Overcoming Firewalls
description: 
date: 2022-01-20
permalink: "/2022-01-20-libp2p-hole-punching/"
translationKey: ''
header_image:
author: Max Inden
---

In case you haven't yet heard the great news, [libp2p](https://docs.ipfs.io/concepts/glossary/#libp2p) can now punch holes.

The below explains why we want to punch holes, into what we are punching those holes and most interestingly how we punch those holes.




# The Problem with Firewalls

Computers in today's Internet can be divided into two groups, public and non-public computers, i.e. those that you can dial and those that you can not. Public computers can dial public computers. Non-public computers can dial public computers. But public computers can not dial non-public computers, nor can non-public computers dial other non-public computers.

Let's look at an example. Two computers, *A* and *B*, each in their own network, connected to the internet via a separate home router each, with those home routers acting as firewalls.

Note that we are focusing on overcoming firewalls today and ignore NATs for now. The process described below (hole punching in libp2p) enables overcoming both. For the sake of simplicity we will concentrate on firewalls in this blog post.

![img](../assets/libp2p-hole-punching-network.svg)

The sequence diagram below depicts the scenario where computer *A* emitts a packet destined for *B*. Said packet is first send to A's router, which in turn forwards it to *B*'s router.

(We will be using the term "computer" and "node" as synonyms from now on.)

Small detour on the matter of firewalls. Firewalls control the bytes flowing in and out of a network, e.g. in this case in and out of A's and *B*'s home network. They usually do so using a state table of 5-tuples. A 5-tuple is used to identify a connection between two endpoints. It consists of the IP source address, the IP destination address, the transport protocol e.g. TCP or UDP, the source port number and the destination port number of a connection.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-right" />

<col  class="org-right" />

<col  class="org-left" />

<col  class="org-right" />

<col  class="org-right" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-right">Source IP</th>
<th scope="col" class="org-right">Destination IP</th>
<th scope="col" class="org-left">Transport Protocol</th>
<th scope="col" class="org-right">Source Port</th>
<th scope="col" class="org-right">Destination Port</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-right">192.168.0.2</td>
<td class="org-right">198.51.100.0</td>
<td class="org-left">TCP</td>
<td class="org-right">12345</td>
<td class="org-right">443</td>
</tr>


<tr>
<td class="org-right">192.168.0.2</td>
<td class="org-right">198.51.100.1</td>
<td class="org-left">UDP</td>
<td class="org-right">12345</td>
<td class="org-right">53</td>
</tr>


<tr>
<td class="org-right">&#x2026;</td>
<td class="org-right">&#x2026;</td>
<td class="org-left">&#x2026;</td>
<td class="org-right">&#x2026;</td>
<td class="org-right">&#x2026;</td>
</tr>
</tbody>
</table>

The simplest security measure all major consumer firewalls enforce to protect their network is the following:

1.  When forwarding an outgoing packet, add a 5-tuple for said connection to the state table.
2.  When receiving an incoming packet, check whether there is a 5-tuple for an outgoing connection matching the incoming packet.
    1.  If there is, it is a response to a previous outgoing packet and thus the packet is forwarded to the destined machine within the network.
    2.  If there is not, drop the packet.

Back to our sequence diagram below. A's router forwards the packet to *B*'s router. *B*'s router checks its state table, can not find a matching 5-tuple (IP<sub>A</sub>, IP<sub>B</sub>, TCP, Port<sub>A</sub>, Port<sub>B</sub>) and thus drops the packet. In a nutshell, this is why the Internet is divided into two, public and non-public computers.

Same applies to packets send from *B* to *A*, see second half of the sequence diagram.

![img](../assets/libp2p-hole-punching-firewall.svg)

Now this should not suggest to go ahead and disable all firewalls across the world. Please no. They do serve their purpose. Afterall *A* and *B* most likely don't want random strangers connecting to them. Though they do still want to connect to each other.




# Hole Punching

Hole punching is one mechanism to overcome the problem described above. Let's see how it works.

Imagine that we have some mysterious mechanism to synchronize *A* and *B*. Mysterious as synchronizing clocks is hard, &#x2026; really hard. For those that don't believe me, I recommend reading Lamport's "Time, Clocks, and the Ordering of Events in a Distributed System" and Mills' "A Brief History of NTP Time: Memoirs of an Internet Timekeeper".

Anyways, back to assuming the existence of a mysterious synchronization mechanism. Such mechanism would allow *A* and *B* to dial each other "at the same time".

1.  A's packet would pass through router *A* and thus add a 5-tuple to router A's state table. Same on the other side, where the packet send by *B* would trigger a 5-tuple being added to *B*'s router's state table. Packet *A* and packet *B* "punch holes" into their router's firewalls.
2.  Both packets, each then forwarded to the opposite router, would cross paths somewhere in this crazy thing called Internet. (Whether they really cross paths is something for another blog post, but still an amusing image to have in mind.)
3.  Onces A's packet arrives at router *B*, router *B* checks its state table, finds a 5-tuple previously added through the packet sent by *B*, and forwards the packet to computer *B*. Same with *B*'s packet, arriving at router *A*, matching a 5-tuple in router A's state table and thus forwarded to computer *A*.

In case you haven't noticed, we just fixed our problem. *A* and *B* can now happily exchange packets. Take a look at the sequence diagram below, depicting the same process.

![img](../assets/libp2p-hole-punching-hole-punch.svg)




# Project Flare

So the above sounds easy from a birds-eye view, but is a lot more complex than one would think. In addition, we didn't even cover the "mysterious mechanism to synchronize *A* and *B*". 

Introducing **Project Flare**, libp2p's way of decentralized hole punching. Those familiar with [IETF's ICE](https://datatracker.ietf.org/doc/html/rfc8445) will spot many similarities. Project Flare is heavily inspired by ICE.

One can partition libp2p's way of hole punching in roughly 2 phases, a preparation phase and a hole punching phase. We will go into each of them in more detail further below.




## Overview

Here is a sequence diagram of the whole process. Don't worry, we will go into each step separately. Maybe the sole purpose of this huge diagram is to prove the point above that holepunching "is a lot more complex than one would think".

![img](../assets/libp2p-hole-punching-overview.svg)




## Phase 1 - Preparation




### 1.1 Determine whether one is dialable (AutoNAT)

In step 1 of phase 1 a computer determines whether it is dialable, in other words it determines whether computers outside of its own network can connect to it. The main protocol involved here is the [libp2p *AutoNAT* protocol](https://github.com/libp2p/specs/blob/master/autonat/README.md). (Worth drawing the connection to the corresponding ICE protocol [STUN](https://datatracker.ietf.org/doc/html/rfc5389) here.)

In our case computer B from above determines whether it is dialable. It does so with the help of random public nodes, e.g. bootnodes of its peer-to-peer network.

![img](../assets/libp2p-hole-punching-autonat.svg)

*B* reaches out to a subset of public nodes of its peer-to-peer network, asking each node to try to dial it (*B*). *B* sends along a set of addresses that it assumes to be reachable under. Each of the contacted node goes ahead and attempts to dial each of *B*'s addresses. They report the outcome back to *B*, i.e. whether they succeeded to dial *B*, including the address that succeeded, or whether they didn't succeed with any of the provided addressses. Based on a set of reports, *B* can gauge whether it is publicly dialable or not. In the case where *B* is publicly dialable no hole punching is needed. In the case where *B* is not dialable, *B* proceeds to the next step of the first phase of Project Flare.




### 1.2 Find closest public Relay nodes (e.g. through Kademlia)

*B* knows that nodes outside its own home network can not dial it. Well, they "can not dial it **directly**". Though they could do so **indirectly** through some public relay node. We will go into what *indirect* dialing looks like in the next step.

For now let's find a couple of public nodes in our peer-to-peer network that can serve as relay nodes. This step is not defined by Project Flare nor libp2p, as it heavily depends on the peer-to-peer network. In the case of [IPFS](https://ipfs.io/) each public nodes in the IPFS network serves as a relay node. *B* would either do a lookup on the [Kademlia DHT](https://github.com/libp2p/specs/blob/master/kad-dht/README.md) for the closest peers to its own peer ID, or just choose a subset of the public nodes it is already connected to. (Just a note: Latency matters in the choice of one's public relay node, though that is for another blog post.)

![img](../assets/libp2p-hole-punching-autorelay.svg)




### 1.3 Listen for connections via Relay (Circuit Relay v2)

Back to the previous question. How can a node be **indirectly** dialable through a relay node? This is enabled through the [libp2p Circuit Relay protocol](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md). Drawing the connection to IETF's ICE once more, this would be the equivalent to the [TURN protocol](https://datatracker.ietf.org/doc/html/rfc5766).

For each of the public relay nodes discovered in the previous step, *B* would do the following: First *B* connects to the remote node. Next is requests a so called "Reservation", basically saying: "Hey, I am not dialable. Given that you are dialable, would you mind listening for incoming connections on my behalf, forwarding each of them to me over this connection?".

![img](../assets/libp2p-hole-punching-relay-v2-register.svg)

Once the remote accepted the reservation request, *B* can advertise itself as being reachable through the remote Relay node. In other words, instead of advertising its own IP address, which is useless given that *B* is not publicly dialable, *B* advertises a "relayed" address which contains the IP address of the remote relay node plus its own peer ID.

    /<RELAY_ADDR>/p2p-circuit/<B_PEER_ID>

(The above is a so-called [multiaddr](https://github.com/multiformats/multiaddr). It is a composable network addressing schema. The address above reads as: "You can reach peer *B* with the peer ID /B/<sub>PEER</sub><sub>ID</sub> via the relay at the address RELAY<sub>ADDR</sub>".)

Note: It is very important that *B* keeps the outgoing connection to the relay node alive. *B* is not publicly dialable, thus the relay can never establish a connection to *B*. In case a connection request for *B* comes in through the relay, the relay depends on the initial connection from *B* to the relay in order to notify *B*.




## Phase 2 - Hole punching

Entering the next phase. Now that everything is prepared (phase 1), we can punch some holes (into firewalls).

For that, let's imagine computer *A* got a hold of *B*'s relayed address through some mechanism. *A* possible scenario could in the IPFS world could e.g. be that *B* is providing some data and *A* discovered the data provider *B* on the Kademlia DHT. Given the relayed address *A* would now like to establish a direct connection to *B*. *B* is advertising a relayed address and not a direct address, *A* can thus assume that *B* is not directly dialable, but only dialable through a relay node.




### 2.1 Establish relayed connection (Circuit Relay v2)

Before establishing a direct connection using hole punching, *A* first has to establish a relayed connection to *B* via the public relay node. *A* extracts the address of the relay node from *B*'s advertised relayed address and establishes a direct connection to the relay node. Once established *A* can request a relayed connection to *B* from the relay. The relay forwards said request to *B* which accepts the request. The relay once more forwards the acceptance to *A*. From now on, *A* and *B* can use the bi-directional channel over the relay to communicate.

![img](../assets/libp2p-hole-punching-relay-v2-connect.svg)




### 2.2. Coordinate simultaneous dial (DCUtR)

Over the relayed connection established in the previous step, *A* and *B* can now coordinate the hole punch ultimately leading to a direct connection between *A* and *B*. This coordination is happening via the [libp2p DCUtR protocol](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md) which stands for "Direct Connection Upgrade through Relay" protocol. In case you still remember the introduction to this blog post, this is the magical synchronization mechanism, or rather a pretty good synchronization mechanism, referred to earlier.

There are two stages to do a *direct connection upgrade through a relay*, exchanging *Connect* messages and sending a single *Sync* message.

First off, *A* sends a *Connect* message to *B*. That *Connect* message contains the addresses of *A*. libp2p offers multiple mechanism to discover ones addresses, e.g. via the [libp2p identify protocol.](https://github.com/libp2p/specs/blob/master/identify/README.md) Once sent out, *A* starts a timer. *B* receives the *Connect* message through the relayed connection via the relay and replies with a *Connect* message containing its relayed addresses. *B*'s *Connect* message eventually arrives at *A* which stops the timer and thus knows the round trip time between *A* and *B* via the relay. 

Next *A* sends a *Sync* message to *B*. Once sent out, *A* does a countdown of half the round trip time between *A* and *B* via the relay. Once the countdown fires, *A* dials *B* via the addresses received in *B*'s *Connect*. On the other end, *B* eventually receives A's *Sync* and directly on receival dials *A* with the addresses provided in A's *Connect* message.

![img](../assets/libp2p-hole-punching-dcutr.svg)

Now if you do the math, *A* starts after half the round trip time between *A* and *B* via the relay and *B* starts once it receives the *Sync*, this should roughly account to the same point in time.




# Hole Punching

So you can already guess what happens once both *A* and *B* dial each other simultaneously, &#x2026; a **hole punch**. Let's play through this one more time, using the sequence diagram on generic hole punching from the beginning of this blog post:

> 1.  A's packet would pass through router *A* and thus add a 5-tuple to router A's state table. Same on the other side, where the packet send by *B* would trigger a 5-tuple being added to *B*'s router's state table. Packet *A* and packet *B* "punch holes" into their router's firewalls.
> 2.  Both packets, each then forwarded to the opposite router, would cross paths somewhere in this crazy thing called Internet. (Whether they really cross paths is something for another blog post, but still an amusing image to have in mind.)
> 3.  Onces A's packet arrives at router *B*, router *B* checks its state table, finds a 5-tuple previously added through the packet sent by *B*, and forwards the packet to computer *B*. Same with *B*'s packet, arriving at router *A*, matching a 5-tuple in router A's state table and thus forwarded to computer *A*.

![img](../assets/libp2p-hole-punching-hole-punch.svg)

Quite a process, huh?!




# Closing

Project Flare, libp2p's way of doing hole punching, is fully specified in the [libp2p specification](https://github.com/libp2p/specs/). It is implemented in [go-libp2p](https://github.com/libp2p/go-libp2p) and [rust-libp2p](https://github.com/libp2p/rust-libp2p/), though in the latter it is not yet released (see [tracking issue](https://github.com/libp2p/rust-libp2p/issues/2052)).

If you want to:

-   **Learn** more, check out the libp2p [documentation](https://docs.libp2p.io/) and [specification](https://github.com/libp2p/specs/).
-   **Get involved**, check out the repository of your favorite libp2p implementation. Look out for "help wanted" labeled issues.
-   **Work** on things like the above fullt-time, [we are hiring](https://jobs.lever.co/protocol/8c03a123-4890-4265-96e1-0427bd7ec193).

