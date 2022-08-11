---
title: IPFS þing 2022 Recap
description: Check out the recap from the first ever IPFS þing 2022 event  for the
  IPFS implementers community.
author: Steve Loeppky
date: 2022-08-11
permalink: "/ipfs-ping-2022-recap/"
translationKey: ''
header_image: "/181806539-3c71476c-b247-4400-9778-5ccfce635f17.png"
tags: []

---
In mid-July, over 80 IPFS implementers and builders gathered in Iceland for the[ first-ever IPFS þing](https://2022.ipfs-thing.io/), a weeklong gathering for the IPFS implementers community. Pronounced “thing”, þing is an old Norse word and modern Icelandic word for “council” or “assembly”.

![](../assets/20220716-174634-mummilu.jpg)

The goals of this event were:

1. Advance IPFS implementations in the near and mid term through demos and discussions
2. Energize the community by distilling ideas into action plans
3. Build relationships through social activities like eating dinner among whales or experiencing sunset for hours on end
4. Get out of our comfort zone by thinking big and exploring new concepts such as privacy-preserving content routing and how to imbue IPFS with WASM magical powers.
5. Cultivate our community by welcoming newcomers, clarifying pathways for collaboration, and connecting people with shared interests.

![](../assets/20220712-200557-mummilu.jpg)

![](../assets/20220713-192247-mummilu.jpg)

### What we learned

The “choose your own adventure” format spanned 12 tracks, with over 60 presenters or facilitators and 120 sessions. Here are some highlights of what we shared and learned.

1. **We’re poised for a Cambrian explosion of IPFS implementations and innovation.**  
   Since its creation in 2014, IPFS has grown to over 250,000 distributed nodes worldwide. It’s the foundation of [Filecoin](https://filecoin.io/), [NFT.storage](https://nft.storage/), all of the existing IPFS HTTP [gateways](https://ipfs.github.io/public-gateway-checker/), hundreds of peer-to-peer applications from [Audius](https://audius.co/) to [WeatherXM](https://weatherxm.com/), and more. Nearly all of this was built with [Kubo](https://github.com/ipfs/kubo/) (formerly go-ipfs), the earliest IPFS implementation. However, the ubiquity of Kubo also exposed the downsides of a single reference implementation.
2. **Projects like Estuary, Elastic IPFS, and Capyloon in the past year have shown us the necessity for multiple IPFS implementations.  
   **Throughout 2021-2022, a handful of new IPFS variants emerged. Each was tailored to a specific set of deployment, platform, or user needs: [Estuary](https://estuary.tech/) for midsized data storage bundled with Filecoin, [Elastic IPFS](https://nft.storage/blog/post/2022-07-06-elastic-ipfs/) for NFT.Storage and Web3.Storage needs such as horizontal scalability and no DHT re-providing, and [Capyloon](https://capyloon.org/) for mobile, to name a few. Unlocking the next phase of IPFS adoption will require an explosion in availability of choice for businesses and developers. The several new directions we’ve recently seen now need to scale up and mature, and we need dozens more implementations beyond their early steps. Future implementations might design for unique operating environments, compatibility with cloud-native tooling or fast-growing technologies such as WASM.
3. **Building applications on IPFS requires a base set of capabilities  
   **These include access control, arbitrary metadata, versioning, and mutability. Many app developers face the challenge of re-inventing the wheel by implementing these capabilities on top of IPFS. While UnixFS is a powerful and easy-to-understand abstraction for cutting up your data into files and folders, extending UnixFS as explored by [WNFS](https://guide.fission.codes/developers/webnative/file-system-wnfs) with this base set of capabilities could help increase app developer productivity.
4. **Content routing is a key component of a highly-performant IPFS network.** ([Slides](https://docs.google.com/presentation/d/1FN7Qw4VG_vfHTN5sITnG4pWT7qHzsky4XuVX7ufdqFI/edit#slide=id.g10ce2c3bca9_0_0))  
   Network-wide targets such as content routing in under 10 ms, free advertising and discovery of data, and scalability to 10^15 CIDs and 10^9 devices will ensure a high baseline for performance. In parallel, we can introduce more nuanced options for peering and routing arrangements since performance requirements can vary drastically depending on the user and context. Some care about throughput, others prioritize overall time to download completion, and so on. 
5. **There are many different orgs far beyond Protocol Labs working together in a networked fashion.**  
   While IPFS was initially created at Protocol Labs, many organizations have been critical pillars of the network's evolution and success. Over 30 organizations were represented at this event, from gateway providers, pinning services, and new implementation teams. Sessions such as [Native Mobile Working Group](https://lu.ma/community/com-xWQuRfwV0kYlwko/join), [Content Addressing Alliance](https://discuss.ipfs.tech/c/ecosystem/caa-wg/33), [WebNative File System Working Group](https://github.com/wnfs-wg), and [Interplanetary Virtual Machine Working Group](https://github.com/wnfs-wg) established new ways of advancing our shared goals.
6. **The new specs improvement process is open for business**  
   The [Interplanetary Improvement Process (IPIP)](https://github.com/ipfs/specs/blob/main/IPIP/0001-lightweight-improvement-proposal-process.md) introduces a lightweight "request for comments/change" process for the [IPFS specs](https://github.com/ipfs/specs). This replaces our prior habit of holding IPFS protocol design discussion in the Kubo implementation repo.
7. **Our next gathering is for the entire IPFS community**  
   This event focused on the implementers community. Next, we want to bring together the entire IPFS community for the first time in several years: users, community members, collaborators – and you! Details will be announced on this blog and in the IPFS newsletter as soon as they’re confirmed.

We want to thank track leaders and event organizers Adin Schmahmann, Brendan O’Brien, Steve Loeppky, Boris Mann, Dietrich Ayala, Evgeny Ponomarev, Hannah Howard, Kacey Huizinga, Jared Hill, Juan Benet, Mikael Rogers, Michelle Lee, Saevar Sigurdsson, Will Scott, and Yuni Graham, as well as every single participant who brought demos, insights, critiques, ideas, and forward momentum to the gathering.

### Recap videos and ongoing discussions

Watch the [IPFS þing 2022 videos (full playlist)](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQhyXIhu2P6e-8WlYOf8wyH) to experience the event for yourself, or jump to any of the track-specific playlists below. You can also find ongoing discussions in the [IPFS Forum](https://discuss.ipfs.io/).

* [Opening](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTKhTit_RFZMzYBLYuX2qy-)
* [IPFS Implementations](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQ9ZFUDcm6f0tXJ6s27wyxd)
* [Aqua and IPFS](https://www.youtube.com/playlist?list=PLuhRWgmPaHtSPOa0_n2i70wQ0cJO6jWcU)
* [Browsers and the Web Platform](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTsL76nt_A6CPDe6lW7l6Sz)
* [Building Apps on IPFS](https://www.youtube.com/playlist?list=PLuhRWgmPaHtR9AbHcnR3XYsuSxXo5-UWc)
* [Connecting IPFS](https://www.youtube.com/playlist?list=PLuhRWgmPaHtRMeXvYoCReT1ri-nEEoVMJ)
* [Content Routing 1: Performance](https://www.youtube.com/playlist?list=PLuhRWgmPaHtSF3oIY3TzrM-Nq5IU_RTXb)
* [Content Routing 2: Privacy](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTegfLTVFYtTtqTKQEtDvxW)
* [Data and IPFS: Models](https://www.youtube.com/playlist?list=PLuhRWgmPaHtS1EUvLY5y-tomeAPGfve4f)
* [Data and IPFS: Transfer](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQGr0f6gT1ADwM7AXluztK8)
* [Data and IPFS: Unconf](https://www.youtube.com/playlist?list=PLuhRWgmPaHtTfDy_undxRyH0YR2DvD8Uv)
* [IPFS and WASM](https://www.youtube.com/playlist?list=PLuhRWgmPaHtSVgToYLfsj-gggF9vB1Hzy)
* [Measuring IPFS](https://www.youtube.com/playlist?list=PLuhRWgmPaHtSToZ3zPKYwCCWYbVBUzRkO)
* [Project & Community](https://www.youtube.com/playlist?list=PLuhRWgmPaHtS-sgx5KFVTEEdEhF8FIGNx)
* [Roadmapping Next Steps](https://www.youtube.com/playlist?list=PLuhRWgmPaHtQRfkbUzIOI6ZNe3gnnbrvQ)