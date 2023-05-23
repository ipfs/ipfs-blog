---
title: 'Recap: Community & Governance (þing 2023)'
description: 'Description'
author: Boris Mann & Robin Berjon
date: 2023-05-10
permalink: '/2023-ipfs-thing-web-track/'
header_image: '/ipfs-thing-2023-recap/header.jpg'
tags:
  - 'thing'
  - 'þing'
  - 'event'
  - 'recap'
  - 'track'
  - 'community'
  - 'governance'
---


# Recap: Community & Governance (þing 2023)

Governance and community are two ideas that vibe like they wouldn't live in the same part of
town if their lives dependended on it. Community is warm, fun, and fuzzy if probably chaotic 
and occasionally infuriating, whereas governance sounds a lot more like flossing, something 
dry and painful that you pretend your project does to make the Serious People go away. But
much like the predictable transition from misunderstanding to mutual respect in a buddy
movie, these two were destined to form just the dynamic duo we need to take on insuperable 
odds. Community is the for and by of governance, and, quite frankly, the exercize of 
governance is messy, chaotic, and a crucible from which new, more resilient communities 
emerge.

The full-day Community & Governance track that brought us together at IPFS Þhing 2023 
(which you can [watch in its entirety](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTIFbOVO5YfXkoFg6wIGbBN)) had all of that energy and then some.
We spent the time bouncing back and forth between how to prevent capture by lumbering 
megacorporations and how to gather friends for a nice community café, what's a data
protection officer and better ways to herd cats, ways of protecting people from some of the
worst content on the Internet while supporting censorship-resistance and how to support
commons and community ownership. It was a ride and a delightful one too.

Perhaps the core issue that brought us together across the diverse presentations was that 
we want to learn from the mistakes of the past and organize the community so that we can 
bring about a better world. It's not the worst plan.

## Memory in Uncertainty

"*Is that an elaborate way of saying everything's fucked?*" That might not be your
typical audience question but then this wasn't your typical presentation either (or
your typical audience, for that matter).

Cade Diehm is one of the brains behind [*The New Design Congress*](https://newdesigncongress.org/) (NDC),
a research organization that practices "*ethical red teaming*" to identify issues with
sociotechnical systems. [WebRecorder](https://webrecorder.net/) and [the Filecoin Foundation](https://fil.org/) hired NDC to take an
in-depth look at web archiving (on IPFS) to help identify problems. Cade came to IPFS
þing to udpate the community on his findings, which are captured in the
[Memory in Uncertainty: Web Preservation in the Polycrisis](https://members.newdesigncongress.org/memory-in-uncertainty-web-preservation-in-the-polycrisis/) report.

"*The answer,*" Cade told us, "*is: 'kind of.'*" He gave a wide-ranging presentation
ranging over the dangers of decentralized technology, the complexity of archives,
the challenges presented by the potential weaponization of data, and much more.
It provided a powerful call to take the impact of our tech seriously and to keep in mind that
tech can only be ethical if it is governed by the people it impacts. Cade concluded
with a set of tools to help avoid bad outcomes, because "*not everything is screwed.*"

@[youtube](TdiQGXSZmCk)

## Community Organizing

For all that remote work and online collaboration have improved, it's hard to have a
strong and durable sense of community without meeting people in the flesh now and then.
Thankfully, we have many gatherings to look forward to this year!

[Vukasin Vukoje](https://twitter.com/wukoje) made a surprise
announcement of a new event series: Compute Camp. Details will be released more fully
soon, but the first edition of this series dedicated specifically to distributed
compute will take place later this year in Belgrade, Serbia. If you care more about 
doing things to data and less about where it's stored, this might just be the place for
you.

Yuni Graham and Niki Gokani walked us through the organization of IPFS Camp, which 
will take place in November in Bangalore. We worked together to figure out what the
best structure and content for the event would be. They're looking for volunteers
to be part of the content planning work — please consider reaching out if you're
interted!

@[youtube](U5u54jwOg6k)

And if what you're looking for is a more local IPFS-focused event, why not run your
own? Yuni Graham and Nicole Schafer presented IPFS + Friends Café, a collection of local
community gatherings to help develop an IPFS community on the ground, around the
world. If you're iunterested, they might be able to sponsor such an event as well as
assist with logistics and finding some speakers. It would be wonderful to see more
local evangelism!

@[youtube](FII_9VTgDy8)

## Cat Herding

A growing community is a blessing, but keeping up with everything that is happening
can become overwhelming. Several sessions provided us with both updates and tools to
stay on top of future updates.

Henrique Dias (aka [@hacdias](https://twitter.com/hacdias)) walked us through [specs.ipfs.tech](https://specs.ipfs.tech/),
the hot new place to get IPFS specifications. Not all of the IFPS specs have been moved 
there yet, but they're in the process of being ported over and everything new will be
on the specs site from the get-go. This site is intended to grow into the one-stop-shop
reference for IPFS implementations, ideally reaching the point at which one could produce
an IPFS implementation from scratch using those documents alone (along with the emerging
test suite, of course).

@[youtube](vQVnjEIPuCE)

At last year's þing in Iceland, the IPIP (IPFS Improvement Process) process was announced.
The indefatigable @lidel walked us through all of the IPIP work that has happened since,
and it's a lot! Initially announced as a lightning talk, this was more of a twenty minute
presentation at lightning speed.

Keep in mind that this process is open to anyone in the community (and if you're reading
this that means *you*). There is an 
[IPIP Pipeline GitHub project](https://github.com/orgs/ipfs/projects/19) that maintains an
up-to-date status of all IPIPs, and the IPIPs get discussed on the 
[IPFS Implementers Working Group](https://lu.ma/ipfs-implementers). More generally,
the [IPFS Community Calendar](https://lu.ma/ipfs) keeps track of the various meetings and
events in which the evolution of the IPFS stack gets discussed.

@[youtube](WcHlV6sQuDI)

But then again, specs are only one corner of IPFS, and IPFS one corner of a bigger family
of technologies. Staying on top of everything that is happening in *\[gestures vaguely around]* 
this space remains daunting. One novel tool that is already helping people get a clearer
sense of what's happening (and that you can use as well) is [Starmap](https://starmap.site/).
The core principle of Starmap is very simple: by structuring your GitHub issues according to
very simple conventions, you can create a nested tree of issues that spans any arbitrary set
of repositories and see all of those organized in a single Starmap.

The idea is that people should be organizing and coordinating code whichever way they see
fit, but it should be possible to obtain an overview of the status of a progress across all
of its components nevertheless. One example is the 
[Kubo/Boxo 2023Q2/Q3 items](https://starmap.site/roadmap/github.com/ipfs/kubo/issues/9817#list).

Bastien Dehaynin from Fission provided us with a clear and exciting overview and demo of the 
system. Several people in the room were already users, and there was definite interest in 
getting a Starmap for specs.

@[youtube](_HoLDQreF28)

## Governance

In order to keep IPFS and its broader ecosystem pushing in a direction that benefits 
all people, to support impactful collective action and ownership, and to avoid it 
being captured by larger players, we need to deploy matching governance capabilities. 
Your friendly here authors, Boris Mann and Robin Berjon, ran a workshop on "What 
Should We Governance?" with the goal of surfacing risks and pain points regarding 
governance of the IPFS ecosystem. This produced a lot of very valuable input, yet
we feel like we have barely scratched the surface.

@[youtube](svqlHO3K_RQ)

Our dynamic duo then split their color-coordinated purple outfits, first with Boris
discussing the allocation of funding for code and other community work, and
suggesting that it would be great to use Starmap to find which parts of a project
are most in need of funding.

@[youtube](PysiACKo1dI)

And then Robin talked about the ongoing work in the 
[Decent Data Compliance WG](https://github.com/DDC-WG) where parties from across the
decentralized world are working together to figure out how to manage 
"[bad bits](https://badbits.dwebops.pub/)", how to protect operators from serving some
of the worst content on the Internet (or simply things they don't want to host), and how
to make sure that people's privacy rights are respected. There's a lot of work to be
done, but it's heartening to see that people are taking these issues seriously.

@[youtube](bIlji91KEFQ)

## Where Next?

The day made it clear that there is strong interest in community and governance
in the IPFS universe, and you can expect to hear a lot more on this side of things.

While different aspects of these concerns have places where people can gather to 
discuss them (as seen in the links sprinkled above), overall coordination and 
cooperation around governance in the decent(ralized) world remains limited.
We joked that we might need a "Working Group Working Group" to provide lightweight
support for all the community working groups that keep emerging and help them work
together. But the feedback was that it might not actually be such a joke of an idea.
Stay tuned!
