---
date: 2020-06-25
permalink: /2020-06-25-IPFS-mobile-design-guidelines/
header_image: /100-mobile-design-guidelines-header-image.png
title: IPFS Mobile Design Guidelines
description:
author: Jim Kosem, Dietrich Ayala
tags:
  - 'mobile'
  - 'research'
---

As IPFS adoption continues to grow, the next thousands of designers and developers using it will increasingly be doing so for _mobile_ apps and services.

However, radically changing the underlying network and storage architecture of those apps and services means different application behavior, different capabilities, and changes in how to manage user expectations. These guidelines seek to answer some of the following questions:

How can someone building on IPFS ensure...

- A user understands that their application will work offline?
- A user can post a photo over the local network even though there’s no internet access?
- The app will still work even after the company who made it goes out of business or gets aquired?
- Their users know they can read uncensored news despite their government trying to block access?

To design for these new capabilities, we need to understand the many different and very specific use cases and usage patterns on mobile devices today, and apply them to distributed architectures. We also need to look at those who’ve forged ahead and are already shipping decentralized mobile apps and services today, and learn from their work. This will help us lay the groundwork for IPFS-based mobile apps and services that _work_ for users, and that’s what we’re sharing with you today.

The [IPFS Mobile Design Guidelines](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/) are intended for designers and developers using IPFS and other P2P systems for mobile applications. They’re a prompt and grounding in who and what we are designing and building for. They are guides, not instructions, and give just enough flexible direction to support different classes of applications.

The guidelines are not yet comprehensive, but are a first take at identifying common user needs, patterns, and challenges for P2P on mobile, and turning those into early recommendations and best practices.

This research area is still nascent and the learning is very much ongoing, but please read on to see what we’ve discovered so far about building IPFS apps on mobile devices that truly work for users and feel great to use.

## Research

The first phase of research explored different contexts with typical P2P operations. We researched the P2P app landscape, and then looked at mobile user patterns in typical P2P activities and how browsers influence these.

In our user interviews, we found ample opportunity to address frustrations in file management and file sharing. We also found an increasing, although nuanced, interest in privacy and security issues across the board.

We identified core areas that current mobile P2P apps all share:

- Identity management
- Connection notification
- Confirmations of completed actions and transfers
- User education

A summary of our research findings is available in [this earlier post](https://blog.ipfs.tech/2020-04-24-ipfs-mobile-design-research-findings/).

## Design

As IPFS grows and matures, we need to look at how to keep growing the base of people using it. To do this, we developed and published design recommendations for designers and developers of apps using IPFS. This includes design and usability principles and scenarios, each featuring use cases, interaction design patterns, and interface components. This is all published for the community to use and improve upon. They are there to bridge user needs with development in making widespread adoption a reality.

### Strategy and Workshop

We began with extensive questions to frame the design and where to start. These questions informed a collaborative workshop with active IPFS developers. This was to understand the developer perspective and how to reconcile them with user needs. The workshop was the first step in creating a common understanding between designers and developers through clear guidelines.

Read more about the [Mobile Design Strategy](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/design/design-strategy) and [workshop](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/design/design-workshop) in the guidelines.

### Principles

From the research, we developed an initial set of principles to address issues and concerns designers and developers might encounter when building apps and services on IPFS.

- Mobile apps and services on IPFS are not reformatted desktop apps. They need to take into account a host of different issues, from battery life to signal.
- They vary greatly in the ways they can provide unique and key benefits like privacy and speed.
- Onboarding and educating the user should be subtle and avoid deep technical explanations.
- Users want assurance they have some level of security with their data and files as much as they need help managing them.
- Apps built on IPFS need to be seamless in managing connections and how the app works with their established pattern
  Read about the [Principles](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/design/principles) in the guidelines.

We’ve also created a handy cheat sheet for the design principles which you can download below.

![Design principles cheat sheet](../assets/100-IPFS-mobile-design-guidelines-cheat-sheet-preview.png)

_Download full size in [PDF](/100-IPFS-mobile-design-guidelines-cheat-sheet.pdf) or [PNG](/100-IPFS-mobile-design-guidelines-cheat-sheet.png)_

### Scenarios

With the design principles developed, we then created use case scenarios to illustrate and validate them.

- When a user starts with an app, they only need to know IPFS works and provides a better way of handling data.
- Things need to be simple, so we should utilise users’ existing methods of getting things done.
- Going beyond file transfer to managing file access.
- IPFS’s unique ability to transfer files without centralised servers can help offline users in particular.
- A safe means for helping users connect with and contact one another.

![Illustrations of the Scenarios](../assets/100-IPFS-mobile-design-guidelines-scenarios.png)

_Illustrations of the Scenarios_

Read more about [Scenarios](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/design/scenarios) in the guidelines.

### Findings

Design is as much a part of research as research feeds design. This reflexive relationship reveals what we found out by exploring user needs, behaviours, and patterns in the Principles and Scenarios. It’s only by investigating and creating interactions and interfaces that we uncover these richer details, hidden user needs, and possible solutions.

Read the full conclusion of [these findings](https://protocol-labs.gitbook.io/ipfs-mobile-design-guide/design/findings) in the guidelines.

## Next steps

While we refined our understanding of IPFS and P2P mobile design with this project, we need more research to realise the full value of the network to users. This is especially true for emerging markets and under-served and marginalised users. Their need for data privacy, portability, and stability is as great, if not greater, than for those where the internet works most of the time. These users also serve as a way to understand not only under-explored markets, but also more resilient methods of computing that helps everyone.

![Illustrations of the design principles](../assets/100-IPFS-mobile-design-guidelines-principles.png)

_Illustrations of the design principles_

While we spoke to users from many different countries and contexts in the research, more questions arose. Addressing user needs in rural and emerging markets presents challenges and questions not fully answered in the work thus far. While not typically considered by Silicon Valley, these unanswered questions are the daily experience for much of the world’s population.

Researching and designing for rural, remote, and politically unsafe contexts creates edges to push against and explore. It is only by pushing and exploring those edges that we come to better understand and serve users best.
