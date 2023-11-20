---
title: Introducing Major Improvements to Omnilingo
description: 'We’re happy to introduce some major improvements to Omnilingo, the decentralised language learning platform designed with special attention to small and marginalised language communities.'
date: 2023-11-20
header_image: "/omnilingo-x-ipfs.jpg"
tags:
- omnilingo
---

## Introduction

Nearly two years ago, the IPFS Dev Grants program funded the first grant for Omnilingo to explore how IPFS could meet the needs of their users - groups with limited bandwidth and applications which work offline-first, allowing full user control of data. You can read the [original post from 2021](https://blog.ipfs.tech/2021-12-17-omnilingo/), and several iterations of the grant later (generously provided by the Filecoin Foundation) we're happy to share an update.

The mission of Omnilingo is inspiring, and its authors are an incredible team who are pushing on a lot of hard problems all at once, including new approaches to consent-driven data access and revocation patterns. This is critical work and an extraordinarily important use of IPFS that we are happy to shine a light on. - Dietrich Ayala, technical grant advisor to Omnilingo

## Project Update: Omnilingo

We're happy to introduce some major improvements to Omnilingo, the decentralised language learning platform designed with special attention to small and marginalised language communities. We now have an experimental
contribution system, including an encryption-based consent model.

## Overview

We developed Omnilingo two years ago with the goal of making it possible for minority and marginalised language communities to create and curate language-learning data in their languages by developing and publishing formats for language source material hosted on the decentralised filesystem IPFS. Anyone can publish new source material on IPFS, and a compatible Omnilingo client can use this source material to generate language-learning exercises.

The source material is published in the form of Omnilingo data structures on IPFS; previously this had to be done by a knowledgeable web developer operating an IPFS node. We are happy to present now an interface for contributing samples from our demonstration web client!

As with any networked system, collecting and preserving data from our users can be done only with their consent. Managing that consent within the context of a decentralised filesystem comes with its own special challenges, and we designed what we think is as good of a privacy- and consent-respecting system as we can.

Here's a sample user story illustrating how this might be used:

A language activist encourages members of their endangered language community to contribute their voices, producing a large corpus of spoken audio clips; children of their community and in diaspora can now use Omnilingo to practise outside of the classroom, supporting revitalisation of the language. Decentralisation and the consent system allow the community as a whole as well as individuals to decide who has access to their voices.

As opposed to most current systems for data collection via crowd sourcing, in Omnilingo, contributors own their own data and can define their own terms and conditions for its use.

## Omnilingo privacy structures

Our contribution privacy initiative brings with it a handful of new structures. These are introduced bottom-up; read this section backwards if you prefer a top-down introduction.

### Omnilingo session keys

An Omnilingo session key is a [JSON Web Key]; our implementation uses the [SubtleCrypto WebAPI] to generate and encode these keys. Currently we recommend only 256-bit AES-GCM keys, and our Web client supports only this configuration.

[JSON Web Key]: https://datatracker.ietf.org/doc/html/rfc7517
[SubtleCrypto WebAPI]: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

Omnilingo session keys form the unit of "consent": for a given session key, users may have contributed several samples. If a user wishes to revoke their consent for a sample, they signal this by unpublishing the session key, thus revoking consent for all samples contributed with that key.

For a more positive user experience, we recommend the user-facing interface reference session keys by the [pgpfone wordlist] encoding of their fingerprint.

[pgpfone wordlist]: https://web.archive.org/web/20100326141145/http://web.mit.edu/network/pgpfone/manual/index.html#PGP000062

### Omnilingo encrypted object

An Omnilingo encrypted object is an object which has been encrypted by an Omnilingo session key; the structure is:

```
{ "alg": alg         // AesKeyGenParams
, "keyfpr": keyfpr   // key fingerprint: hexadecimal string encoding of the SHA-1 digest of the key
, "iv": iv           // initialisation vector used
, "encdata": encdata // Uint8Array of the encrypted data
}

```

See [MDN SubtleCrypto digest documentation] for details of how we generate the fingerprint.

[MDN SubtleCrypto digest documentation]: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

We wrap in encrypted objects the MP3 of the contribution as well as the list of Omnilingo clip structures.

Encrypted clip:
```
{ "chars_sec": chars_sec
, "clip_cid": CID(encrypt(clip_mp3))
, "length": length
, "meta_cid": meta_cid
, "sentence_cid": sentence_cid
}
```

### Omnilingo encrypted index

An Omnilingo encrypted index is similar to the classic Omnilingo root index: a JSON dictionary with language codes as keys and Omnilingo language indices as the values. The `cids` entry of the Omnilingo language index is a list of IPFS CIDs referencing the encrypted lists of Omnilingo clip structures.

An example:
```
{ "ab": { "cids": CID(encrypt(clip_list)) } }
```

### Omnilingo encrypted root

An Omnilingo encrypted root is a JSON dictionary; the keys are fingerprints of Omnilingo session keys, and each value is the CID of an Omnilingo encrypted index encrypted with the corresponding session key.

```
{ "ea6b0c9b2f697c3cbc16fb7978af16aae53bdeb8": "QmdzHipTQWgguLci211Cp3Eh8SWhEnsZA34mGJgGQXYcUV" }
```

Encrypted roots can optionally contain some of the referenced session keys, allowing decryption. In this example, the key `ea6b0c9b...` is included.

```
{ "keys": {
    "ea6b0c9b2f697c3cbc16fb7978af16aae53bdeb8": JWK(key)
  }
, "dab24db69f6856652275e06c5f092f68623a4041": "QmWug9ie3bpkzVvKDVfuLtksaWsa5Q1DZxsnwmCCAASYj8"
, "ea6b0c9b2f697c3cbc16fb7978af16aae53bdeb8": "QmdzHipTQWgguLci211Cp3Eh8SWhEnsZA34mGJgGQXYcUV"
}
```

### Omnilingo identity

An Omnilingo identity is a IPNS key (colloquially referred to as a `k5`). Published to this `k5` is an encrypted root, containing the session keys for which the user (the one controlling the private part of the `k5`). The Omnilingo client has been updated to accept Omnilingo identities, fetching and decrypting the contained encrypted indices.

In the example encrypted root:
```
{ "keys":{
    "ea6b0c9b2f697c3cbc16fb7978af16aae53bdeb8": JWK(key)
  }
, "dab24db69f6856652275e06c5f092f68623a4041": "QmWug9ie3bpkzVvKDVfuLtksaWsa5Q1DZxsnwmCCAASYj8"
, "ea6b0c9b2f697c3cbc16fb7978af16aae53bdeb8": "QmdzHipTQWgguLci211Cp3Eh8SWhEnsZA34mGJgGQXYcUV"
}
```

The material encrypted by session key `ea6b0c9b2` can be used with the controlling user's consent, whereas the material encrypted by session key `dab24db6` cannot be any longer, as the user has unpublished the key.

## Data flows

There are two new data flows introduced with this system: contributing data, and retrieving contributed data.

### Contribution

A contributor client will be drawing sentences from a (presumably classic) Omnilingo language index, and contributing new clips. They start by generating an Omnilingo identity (`k5`) and a session key. The session key is stored locally.

When the user makes their first contribution (an MP3 recording of them reading a sentence), a new Omnilingo encrypted root index is published to their `k5`:

```
{ "keys": {
    fpr(key): JWK(key)
  }
, fpr(key): CID({ // encrypted language index
    "XX": {
      "cids": [CID(encrypt([ // encrypted clip list
        encrypted_clip
      ]))]
    }
  })
}
```

As the user makes more contributions, the encrypted clip list grows in length, updating the encrypted language index and encrypted root index, each time republished to the `k5`, all under the same session key:

```
{ "keys": {
    fpr(key): JWK(key)
  }
, fpr(key): CID({ "XX": { "cids": [CID(encrypt(clip_list))] } })
}
```

At some point, the user decides to "roll" their session key, creating a new session. (A client might decide to do this automatically, e.g. each time it is opened, or each time the language is switched.) A new session key is generated, and everything propagates up to the user identity (`k5`):

```
{ "keys": {
    fpr(key1): JWK(key1)
  , fpr(key2): JWK(key2)
  }
, fpr(key1): CID({ "XX": { "cids": [CID(encrypt(clip_list1))] } })
, fpr(key2): CID({ "XX": { "cids": [CID(encrypt(clip_list2))] } })
}
```

At some later time, the user decides to revoke consent to use the material recorded under `key1`; the JSON Web Key encoded copy of `key1` is removed, only `fpr(key1)` remains published under their identity:

```
{ "keys": {
    fpr(key2): JWK(key2)
  }
, fpr(key1): CID({ "XX": { "cids": [CID(encrypt(clip_list1))] } }) // consent revoked
, fpr(key2): CID({ "XX": { "cids": [CID(encrypt(clip_list2))] } })
}
```

Consumers who have stored `key1` will retain access to this data, just as they would if they had stored the decrypted copies; however, use of it would constitute a violation of the user's consent.

### Consumption

Omnilingo consumers now have two types of root indices to deal with: classic root indices and encrypted root indices. An encrypted root index may be detected by the presence of the `keys` field; iterating over this dictionary then gives the consumer a list of fingerprints to look up in the encrypted root index, as well as the key needed to decode the resulting encrypted language index.

## Concluding remarks

Omnilingo now has support for user contributions with sovereignty protections, enabling marginalised language communities to produce and control their own data and integrate it into compatible Omnilingo clients in a user-respecting way. Due to the decentralisation allowed by IPFS, such clients can be hosted anywhere on anyone's infrastructure. We look forward to continuing to improve language learner and language activist access to decentralised and sovereignty-preserving language learning systems.

We invite everyone interested to get involved! Read our [technical paper](https://arxiv.org/abs/2310.06764), check out our [live demo](https://demo.omnilingo.cc), [fork us on GitHub](https://github.com/omnilingo/omnilingo), and join us on Matrix in `#OmniLingo:matrix.org` ([chat now](https://app.element.io/#/room/#OmniLingo:matrix.org)). Our near-term plans include:
* full p2p (dropping the required remote Kubo instance)
* experimenting with isolated networks (useful e.g. for rural communities)
* integration with FileCoin and/or pinning services

