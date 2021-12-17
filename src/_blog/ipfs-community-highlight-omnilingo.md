---
title: 'Project Showcase: OmniLingo'
description: Introducing OmniLingo, an open project that builds language learning
  protocols, software, and infrastructure.
author: Francis Tyers
date: 2021-12-17
permalink: "/2021-12-17-omnilingo/"
translationKey: ''
header_image: "/omnilingo-x-ipfs.jpg"
tags:
- js-ipfs
- CID

---
![Animated gif showing Omnilingo in use](https://i.imgur.com/rdwCnDd.gif)

Language learning apps can give a fun, convenient way to learn a new language. Like many uses of the internet, though, there is an opportunity for dark patterns to sneak in: user data hoarding, targeted presentation, and majority-cultural filter bubbles can have negative social impacts, and properietary or closed-source software and always-connected centralised backends can create unstable infrastructure and restrict user freedom.

We present here [Omnilingo](https://omnilingo.xyz) - an open project to build language learning protocols, software, and infrastructure that avoids these problems, prioritizing minority language communities and user data sovereignty. Let’s start with a few example stories about Omnilingo’s users.

### Language Activist

A language activist in a minority community wants to add their language to their favourite language learning app. The activist gathers audio samples and transcriptions and designs a curriculum. They contact the company producing the app, which controls what material can be used. The company responds that the language has too few speakers to be worth their time, saying one of:

1. Their lawyers don’t have time to evaluate whether they can use this material legally.
2. Their developers don’t have time to add the language to their app.
3. Their servers don’t have space or bandwidth to host the material for use in the app.
4. They can’t evaluate the quality of the material, and would rather not allow anyone to use it.

With OmniLingo, the activist can host the material they’ve collected and, through the IPFS decentralised storage network, and users can add the material to their app using the material’s Content ID hash.

### Language Learner

A privacy-conscious language learner wants an app that doesn’t track their abilities or habits; apps with registration and partnerships with advertising surveillance networks are hard to find, and many of them have disappeared along with their data. With OmniLingo, as long as their are users the data remains on the network; the open protocol allows developing clients which store no information on the network, or which allow users to choose who gets access to their data.

### Language Instructor

A language instructor is tired of having to adapt their course to the subscription plastic-wrapped curriculum their school purchased: the curriculum dictates the topics that are covered, the order, the vocabulary, and the variety of voices (gender, dialect, accent) that are used. With OmniLingo, the instructor can create, share and mix their own material.

## Who we are

We’re a pair of computational linguistics researchers and language activists. [Fran Tyers]() is an assistant professor of computational linguistics at Indiana University and Nick Howell is a language technology consultant. We work at all layers of the stack to bring the latest advancements in language technology to minority and under-resourced language communities in ways that support their right to self-determination.

## What is OmniLingo

OmniLingo is a protocol and sample implementation for language-learning applications with a focus on decentralised and self-determined storage, user rights and privacy, and minority and under-represented languages.

                      distributed
                        system
                      developers
                          |
      language -----      |   
      curators      \     |      --------- marginalised language
                     \    |     /          learners
                               /
      language ------   IPFS   ----------- language learning
      instructors              \           researchers
                     /   | |    \
                    /    | |     --------- privacy-concious language
      activists ----     | |               learners
                        /   \ 
                       /     \
      language  -------       ------------ experimental language
      community                            task designers
      supporters

## Architecture

    language community  ----------
       authors                    \ collection    OmniLingo      publish on IPFS             fetched by any     language
                                    --------->  node operators  ----------------->   IPFS   ---------------->    learner
    language community            /               (anyone!)       with toolkit                 conformant       
       speakers         ----------                                                               client

OmniLingo language data is stored on IPFS in a hierarchy of JSON and MP3 files. The _root index_of a language data store is a JSON dictionary mapping [ISO-639](https://en.wikipedia.org/wiki/ISO_639) language codes to _language index_ and _language metadata_.

    {
      ⋮
      "or": {
        "cids": [
          "QmXYXMPyCREZCLao7k462rKNAFznxszeshdXqauh63Tet4"
        ],
        "meta": "QmV2SJHieJP1P6RDsSRchTwpWjAMho7ci7HXbkvN4ULuoR"
      },
      "pa-IN": {
        "cids": [
          "QmSKHQJdznnaNSNxDw9MXZxNzVNiJC9Fyi5pV1eXD9dWmU"
        ],
        "meta": "QmNT6VGydPEJvcqmMPpp1g3qCqWtBn1WHAmzswL3NqAHMU"
      },
      "pl": {
        "cids": [
          "QmSP7E9MFGphEodZuxf73yinGMaKvg8nx3V98bs5HQ4gfT"
        ],
        "meta": "QmQjPam8Nxwu2GckmSfp73iq1BauNm7mNXmKu8odGyRzZN"
      },
      ⋮
    }

Language metadata consists of a “display name” for the language and a set of character rewrite rules to make typing easier; an example from Turkish:

    {
      "alternatives": {
        "İ": [
          "I"
        ]
      },
      "display": "Türkçe"
    }

Language indices are JSON lists of audio sample and difficulty metadata, used to generate an appropriate exercise for the learner’s level.

    [
      ⋮
      {
        "chars_sec": 15.211640211640212,
        "clip_cid": "QmVDBB3qAujxuesvmhKZajxgYZnms3dUb24bBx6rr5hJvg",
        "length": 6.048,
        "meta_cid": "QmZNucpVvYxGiWhyqte9izfoaW79uQHuE7w4fWagWv1LLh",
        "sentence_cid": "QmR1uoBwNJRHhcPhD2utiNji1J3e4Q2t1nmUie9cJxccYt"
      },
      {
        "chars_sec": 15.972222222222223,
        "clip_cid": "QmcjJwcPF5oUX3WPtkAqFU9iCr9NvQAwVQabgBQSuVFMaG",
        "length": 5.76,
        "meta_cid": "QmZNucpVvYxGiWhyqte9izfoaW79uQHuE7w4fWagWv1LLh",
        "sentence_cid": "QmR1uoBwNJRHhcPhD2utiNji1J3e4Q2t1nmUie9cJxccYt"
      },
      ⋮
    ]

The `sentence_cid` field refers to a JSON dictionary of the original transcript, license, and language:

    {
      "content": "Tavaliselt ongi nii, et mesinik jääb oma surnud mesilastega ja mitte mingit lahendust ei tule.",
      "copyright": "CC0-1.0",
      "language": "et"
    }

The `clip_cid` field is the CID of the MP3 file; `meta_cid` is a link to more detailed sentence metadata, including a tokenised transcript and punctation tags for each token:

    {
      "sentence_cid": "QmR1uoBwNJRHhcPhD2utiNji1J3e4Q2t1nmUie9cJxccYt",
      "tags": [ "X", "X", "X", "PUNCT", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "PUNCT" ],
      "tokens": [ "Tavaliselt", "ongi", "nii", ", ", "et", "mesinik", "jääb", "oma", "surnud", "mesilastega", "ja", "mitte", "mingit", "lahendust", "ei", "tule", "." ]
    }

In summary, the OmniLingo language store looks like this:

    root-index
        ├── lang1
        │             ├── lang1-index
        │             │             ├── sent1
        │             │             │             ├── audioclip
        │             │             │             ├── metadata
        │             │             │             └── transcript
        │             │             └── …
        │             └── lang1-metadata
        ├── lang2
        └── …

Root indexes are encouraged to be published to IPNS, so that clients can receive updates.

## Implementation

We have implemented:

* a Python toolkit for publishing language data
* a Python command-line client demo
* a HTML+JS web demo

### Language data publishing toolkit

There are three main steps in adding your data to OmniLingo. The first step is importing the data into IPFS, the second is indexing the data and the final step is publishing the data.

### Import

Import data into your local IPFS node and generate an index:

    $ importer.py dataset_dir index_path

e.g.

    $ importer.py ./cv-corpus-7.0-2021-07-21/tr/ tr.json

where the `dataset_dir` is in [Common Voice format]().

### Index

Index the data, extracting a balanced subset of clips by a complexity metric:

    $ indexer.py locale index_path

e.g.

    $ indexer.py tr tr.json

This will return a CID that looks like `QmXpgcavH2shpBbfnFoymPxEw2zpr4MdAgi1aaoZT4Yeho`

### Publish

Publish data to the global index in OmniLingo on IPFS:

    $ publisher.py locale cid

e.g.

    $ publisher.py tr QmXpgcavH2shpBbfnFoymPxEw2zpr4MdAgi1aaoZT4Yeho

This will return a CID which looks something like `QmWAmrGNGkL8N6LfsfAKueYGYLqJ2gqn9EZR2a11fxRos6`, which you can  
then publish to an IPFS name using the local node ID:

    ipfs name publish cid 

e.g.

    ipfs name publish QmWAmrGNGkL8N6LfsfAKueYGYLqJ2gqn9EZR2a11fxRos6

### Command-line client demo

The Python command-line client demonstrates how you can build your own local OmniLingo client; users are presented with fill-in-the-blank exercises, but there isn’t any difficulty analysis.

## HTML+JS web demo

[Try it out!](https://demo.omnilingo.cc/) We wrote a HTML+JS web demo using a browserified copy of [js-ipfs](https://github.com/ipfs/js-ipfs). It stores a list of root indexes in local storage, and merges their trees.

Users are presented with fill-in-the-blank exercises in order of increasing difficulty, as measured by characters-per-second in the audio. We look forward to developing other measures of difficulty!

One remaining point of centralisation is the IPNS resolution: IPNS names will be resolved through the gateway at [ipfs.io]().

## What’s next

Omnilingo’s design encourages experimentation; we hope to see expansion along several axes:

* New client experiences:
  * bringing native OmniLingo experiences to platforms
  * new algorithms for choosing exercises
  * choosing and customising exercises
* New data:
  * bring more languages to OmniLingo
  * bring more connections to OmniLingo (e.g., Wikidata for vocabulary learning)
* Both:
  * bring pronunciation assistence to OmniLingo
  * bring distributed identities to OmniLingo, multi-device or multi-client usage

We have specific plans for pronunciation assistence and distributed identities in the next phase of our OmniLingo development work. Want to help out? Share your ideas and collaborate with us in [`#OmniLingo:matrix.org`](https://matrix.to/#/#OmniLingo:matrix.org).