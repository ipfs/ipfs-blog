---
title: What is IPLD?
description: Breaking down Interplanetary Linked Data and its relationship to IPFS.
author: ''
date: 2021-10-29
permalink: "/what-is-ipld/"
translationKey: ''
header_image: "/139291100-68c5680f-573f-4adc-9352-60e2999c8aee.jpg"
tags:
- DAG
- CID
- IPLD

---
# **What is IPLD?**

Most people would already know what IPFS is and what it offers to the average developer in terms of distributed data. However, IPFS isn't the only thing that one should understand about this revolutionary system. Underneath IPFS is a system known as [IPLD](https://docs.ipfs.io/concepts/glossary/#ipld) that deals with all the heavy lifting that IPFS does to represent data as [Merkle-DAGs](https://docs.ipfs.io/concepts/glossary/#merkle-dag) with roots identified by content IDs ([CIDs](https://docs.ipfs.io/concepts/glossary/#cid)). But what is IPLD, and why is it important in the grander scheme of things? Learning about IPLD will allow a unique insight into how IPFS works and the methods necessary to extend the data structures currently available to users through IPFS.

## **Interplanetary Linked Data (IPLD) and IPFS**

At its most basic form, IPLD is the data layer that IPFS is built on top of. It creates a series of links to data but also allows users to create those links themselves through simple data structures that can be stored on IPFS. You could think of IPFS as the block store of IPLD - data sent to IPFS through IPLD is kept as linked [blocks](https://docs.ipfs.io/concepts/glossary/#block) and DAGs, and the user receives a CID to access that data.

When someone stores a file on IPFS, that file is separated into several chunks, stored into different blocks. To reconstruct the whole file, a graph (DAG) connects each bit of content together, with directories pointing to individual data pieces, not unlike pointers in older coding languages like C++. Content IDs are hashes generated to allow the user to interact with IPFS in a trustless manner and recover their data. IPLD deals with decoding these hashes so that users can access their data. In many ways, IPLD functions a lot like the developer's old friend, Git, since it uses a similar method for constructing those linked hashes known as a Merkle DAG.

## **Git and the Merkle DAG**

Typically, when one creates a hash, it only refers to one direction of data movement. One cannot move forward in time to where the hash doesn't exist, for example. Git uses Merkle DAGs to create a "snapshot" of a particular point in time, allowing users to roll their data back if they need to. The Merkle DAG is an essential component of Git, but it's also a valuable tool in a linked system like IPLD. Git is an entirely self-contained system - a hash generated in it can only be decoded within it. IPLD is more ambitious, aiming to decode any hash it comes in contact with. However, for this to be a viable system, there must be a way to tell IPLD how to interpret that hash to get to the underlying data. That's where multihashes and multicodecs come in. What's the best way for the system to figure out what each hash means? Let the hash inform the system of what it needs to decode it, of course.

## **A Complex Data Representation System**

Most developers are familiar with simple data representation systems like JSON or CBOR. In both cases, several data structures can be represented and retrieved using these systems. However, none of these simple data representation systems have support for links. Immediately, it's obvious that IPLD can't possibly use these simple systems since links are the core of the IPLD system.

So, how does IPLD deal with this lack of complexity? Users can actually store data using extended versions of these simple systems. [DAG-JSON](https://ipld.io/docs/codecs/known/dag-json/) allows for storing typical JSON serialized data but also supports links that can be used alongside IPLD. [DAG-CBOR](https://ipld.io/docs/codecs/known/dag-cbor/) allows for even more flexibility. CBOR is a binary storage system making it fast and efficient. Filecoin uses CBOR for its chain because of its efficiency and because CBOR can handle more data types than JSON.

## **Coding and Decoding with IPLD**

Storing a CID on the chain seems like a breeze, but how does the system decode the hashes that it gets into the component data structures?
IPLD uses an underlying data model that contains forms that most developers will recognize immediately, such as strings, booleans, ints, floats, etc.
To get there from CIDs, we use [codecs](https://ipld.io/docs/codecs/).
And the CID includes an indicator called a [multicodec](https://docs.ipfs.io/concepts/glossary/#multicodec) to tell us which codec to use!

Sometimes systems build additional tiers of structure above this.
For example, IPFS uses a two-tier methodology for encoding filesystem data.
First, the UnixFS convention describes files and directories and their metadata.
Then, UnixFS is in turn usually encoded in ([DAG-PB](https://ipld.io/docs/codecs/known/dag-pb/)), which is an IPLD codec (comparable to DAG-CBOR and DAG-JSON) that is specialized to UnixFS.

Because the CID can describe different codecs relating to different systems, all sorts of systems can interoperate using CIDs, and IPLD and process and cross-link data from any of them.

## **Extending Technology Into New Frontiers**

IPLD is simply the latest iteration of data structures. Data structures have existed and have been in use for quite some time. Looking at systems such as Haskell, and Scala, the similarities between how they handle data structures and how IPLD does is immediately apparent. IPLD takes what those systems pioneered and translates them for use in a distributed format.

The difference between those isolated systems and IPLD is that IPLD allows for distributed storage with its underlying link to IPFS. These data structure management paradigms have persisted and evolved to become scalable - a trait that is core to IPLD's value proposition. With IPLD backing up IPFS, developers can access a powerful distributed data storage system that can handle multiple self-describing formats. The flexibility and extensibility make for a potent combination, giving developers a tool that they can use to spur the development of cutting wedge Web3.0 systems.
