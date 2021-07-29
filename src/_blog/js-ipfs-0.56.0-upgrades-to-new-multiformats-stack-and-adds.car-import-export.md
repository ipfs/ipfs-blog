---
title: js-IPFS 0.56.0 upgrades to new multiformats stack and adds `.car` import/export
description: An all-new data layer has been integrated with js-ipfs.
author: Alex Potsides
date: 2021-07-29
permalink: "/2021-07-29-js-ipfs-0-56/"
translationKey: ''
header_image: "/header-image-js-ipfs-placeholder.png"
tags:
- js-ipfs
- IPLD
- release notes

---
# 🔦 Highlights

> upgrades to new multiformats stack and adds `.car` import/export

`js-IPFS@0.56.0` is on its way to the moon with a new data layer and import/export for [Content Addressable aRchive](https://ipld.io/specs/transport/car/)s along with many small bug fixes and performance improvements!

## 📚 Multiformats

Underneath the Interplanetary Filesystem is a multitude of [Merkle Directed Acyclic Graphs](https://docs.ipfs.io/concepts/merkle-dag/).  When you add a file to your IPFS node, you are converting it into a DAG representation of that file.  This DAG may be made up of one or more nodes of the [dag-pb](https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md) or [raw](https://github.com/ipld/specs/issues/223) format in various [UnixFS layouts](https://github.com/ipfs/specs/blob/master/UNIXFS.md#layout).

DAG node formats are not limited to `dag-pb` or `raw`, however, we also have [dag-cbor](https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-cbor.md), [dag-json](https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-json.md) and the newcomer [dag-jose](https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-jose.md).

The interfaces that these formats implement was previously defined by the [ipld/interface-ipld-format](https://github.com/ipld/interface-ipld-format) module, but there is an all-new implementation in the form of [BlockCodec](https://github.com/multiformats/js-multiformats/blob/076290c2103eadc031f1a8069c5a296522eb9678/src/codecs/interface.ts#L21)s from the [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats) module.

`js-IPFS@0.56.0` ships with this new implementation which is much more lightweight and easier to work with and has seen the gzipped size of the [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client) bundle drop by amost 26%.

The most common formats are supported out of the box - [dag-pb](https://www.npmjs.com/package/@ipld/dag-pb), [dag-cbor](https://www.npmjs.com/package/@ipld/dag-cbor), [raw](https://github.com/multiformats/js-multiformats/blob/076290c2103eadc031f1a8069c5a296522eb9678/src/codecs/raw.js), and [json](https://github.com/multiformats/js-multiformats/blob/076290c2103eadc031f1a8069c5a296522eb9678/src/codecs/json.js).  Older formats that haven't been refactored into `BlockCodec`s yet such as [ipld-ethereum](https://www.npmjs.com/package/ipld-ethereum) and [ipld-git](https://www.npmjs.com/package/ipld-git) can be converted at runtime using the [ipld-format-to-blockcodec](https://www.npmjs.com/package/ipld-format-to-blockcodec) module, and you can configure your node to use them - see the [traverse-ipld-graphs](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs) example for how to do this.

Multiformats also covers multihashing and multibase encoding of data.  Out of the box `js-IPFS@0.56.0` supports common hashes and bases such as `sha2-256`, `base58btc` and `base32` but more esoteric hashes/bases will need to be configured in a similar way - see [the docs](https://github.com/ipfs/js-ipfs/blob/master/docs/IPLD.md) for more information and howtos.

If you want to learn more about Merkle DAGs, there's a whole [tutorial](https://proto.school/merkle-dags) on the ProtoSchool website!

## `.car` import/export

The low-level `ipfs.block.put` and `ipfs.block.get` commands allow you to get and put invidiual blocks into your blockstore, but this can be tedious when dealing with large [DAG](https://docs.ipfs.io/concepts/merkle-dag/)s since you will invoke these operations multiple times and without interpreting the blocks as you read them, there's no way to follow [links](https://docs.ipfs.io/concepts/content-addressing/) to other blocks.

Enter the [Content Addressable aRchive](https://ipld.io/specs/transport/car/) or `.car` file.  This file functions as storage for the blocks that make up one or more DAGs, consisting of a root [CID](https://docs.ipfs.io/concepts/content-addressing/) then some or all of the blocks that are children of that `CID`.

`.car` files can be exported from `js-IPFS@0.56.0` and later with:

```console
$ jsipfs dag export ${CID} | archive.car
```

and imported with:

```console
$ jsipfs dag import ./archive.car
```

or

```console
$ cat ./archive.car | jsipfs dag import
```

Equivalent API methods exist to perform the same operations against an in-process node or over HTTP to a remote js-IPFS or go-IPFS node - see the docs for [ipfs.dag.export](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md#ipfsdagexportcid-options) and [ipfs.dag.import](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md#ipfsdagimportsource-options) for more information.

# ✨New features

- feat: Implement dag import/export ([#3728](https://github.com/ipfs/js-ipfs/pull/3728)) ([700765b](https://github.com/ipfs/js-ipfs/commit/700765be2634fa5d2d71d8b87cf68c9cd328d2c4))
- fix: make "ipfs resolve" cli command recursive by default ([#3707](https://github.com/ipfs/js-ipfs/pull/3707)) ([399ce36](https://github.com/ipfs/js-ipfs/commit/399ce367a1dbc531b52fe228ee4212008c9a1091))

## 🔨 Breaking changes

- feat: upgrade to the new multiformats ([#3556](https://github.com/ipfs/js-ipfs/issues/3556)) ([d13d15f](https://github.com/ipfs/js-ipfs/commit/d13d15f022a87d04a35f0f7822142f9cb898479c))

## 🕷️ Bug fixes

- docs: fixed relative link to CONFIG.md ([#3715](https://github.com/ipfs/js-ipfs/pull/3715)) ([54478b0](https://github.com/ipfs/js-ipfs/commit/54478b0f1d56f36d1f6827997862878958044eb6))
- chore: fix pkg.homepage for ipfs-core-types ([#3733](https://github.com/ipfs/js-ipfs/pull/3733)) ([cd548e6](https://github.com/ipfs/js-ipfs/commit/cd548e6c80001e4421c3399bffbaa0ddcc29bb5d))
- docs: examples/browser-create-react-app ([#3694](https://github.com/ipfs/js-ipfs/pull/3694)) ([dc041aa](https://github.com/ipfs/js-ipfs/commit/dc041aa3de789290bfc5c1c0b8c2878d8c79186a))
- fix(ipfs-core-types): wrong extension ([#3753](https://github.com/ipfs/js-ipfs/pull/3753)) ([4bad1c6](https://github.com/ipfs/js-ipfs/commit/4bad1c61f5946e32cf75196cd2c45c5316500b0f))
- fix: round bandwidth stats ([#3735](https://github.com/ipfs/js-ipfs/pull/3735)) ([58fb802](https://github.com/ipfs/js-ipfs/commit/58fb802a05f7ea44ef595f118130952176f7190d))
- fix: support @web-std/file in normalize input ([#3750](https://github.com/ipfs/js-ipfs/pull/3750)) ([6fd7776](https://github.com/ipfs/js-ipfs/commit/6fd777679d0aa80bbb784d16585456e54b5cf294))
- fix: fix flaky pubsub test ([#3761](https://github.com/ipfs/js-ipfs/pull/3761)) ([8bcf56f](https://github.com/ipfs/js-ipfs/commit/8bcf56fbec7324dc13d3ec5dce08806a6ef2f974))
- docs: improve README of browser-create-react-app ([#3737](https://github.com/ipfs/js-ipfs/pull/3737)) ([9852d14](https://github.com/ipfs/js-ipfs/commit/9852d14967b465c111b33c9c8bab8111d21b5b88))

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@3xtr4t3rr3str14l](https://github.com/3xtr4t3rr3str14l) (2 comments)
* [@AbhinavMir](https://github.com/AbhinavMir) (1 issue)
* [@achingbrain](https://github.com/achingbrain) (151 commits, 74 PRs, 7 issues, 107 comments)
* [@acostalima](https://github.com/acostalima) (1 commit, 2 comments)
* [@adam12121997](https://github.com/adam12121997) (1 issue)
* [@alanshaw](https://github.com/alanshaw) (1 commit, 1 PR, 1 issue, 3 comments)
* [@andrew](https://github.com/andrew) (1 comment)
* [@ashutosh1206](https://github.com/ashutosh1206) (1 issue)
* [@BasBastiaansen](https://github.com/BasBastiaansen) (1 comment)
* [@bgins](https://github.com/bgins) (1 commit, 1 PR)
* [@BigLep](https://github.com/BigLep) (10 comments)
* [@binarybaron](https://github.com/binarybaron) (2 issues, 2 comments)
* [@bluelovers](https://github.com/bluelovers) (7 PRs, 1 issue, 4 comments)
* [@carsonfarmer](https://github.com/carsonfarmer) (1 comment)
* [@chrisdukakis](https://github.com/chrisdukakis) (2 comments)
* [@codecov-commenter](https://github.com/codecov-commenter) (3 comments)
* [@CSDUMMI](https://github.com/CSDUMMI) (1 commit, 1 PR, 1 issue, 7 comments)
* [@d4mr](https://github.com/d4mr) (2 comments)
* [@D4nte](https://github.com/D4nte) (1 commit, 6 comments)
* [@da-kami](https://github.com/da-kami) (2 PRs, 2 comments)
* [@dabit3](https://github.com/dabit3) (1 issue)
* [@daviddias](https://github.com/daviddias) (1 comment)
* [@denyncrawford](https://github.com/denyncrawford) (2 issues)
* [@dependabot[bot]](https://github.com/dependabot%5Bbot%5D) (33 commits)
* [@evgkul](https://github.com/evgkul) (1 PR, 4 comments)
* [@expede](https://github.com/expede) (1 comment)
* [@fusetim](https://github.com/fusetim) (1 comment)
* [@glitch003](https://github.com/glitch003) (1 issue, 1 comment)
* [@Gozala](https://github.com/Gozala) (3 commits, 3 PRs, 6 issues, 36 comments)
* [@hacdias](https://github.com/hacdias) (2 commits)
* [@herexu](https://github.com/herexu) (2 issues, 1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (2 commits, 3 comments)
* [@iRyanBell](https://github.com/iRyanBell) (1 commit, 1 PR)
* [@jacobheun](https://github.com/jacobheun) (1 comment)
* [@JamieRez](https://github.com/JamieRez) (1 issue, 1 comment)
* [@Jan877](https://github.com/Jan877) (1 issue)
* [@janus](https://github.com/janus) (1 issue)
* [@jerradpatch](https://github.com/jerradpatch) (1 comment)
* [@jneidel](https://github.com/jneidel) (1 commit, 1 PR)
* [@jonyg80](https://github.com/jonyg80) (1 commit)
* [@JoranHonig](https://github.com/JoranHonig) (1 comment)
* [@jorishermans](https://github.com/jorishermans) (1 comment)
* [@kotx](https://github.com/kotx) (1 issue, 5 comments)
* [@kvutien](https://github.com/kvutien) (1 commit, 2 PRs, 3 comments)
* [@lidel](https://github.com/lidel) (5 commits, 1 PR, 62 comments)
* [@logasja](https://github.com/logasja) (2 issues, 2 comments)
* [@LoreBadTime](https://github.com/LoreBadTime) (1 comment)
* [@magniff](https://github.com/magniff) (1 comment)
* [@manas99](https://github.com/manas99) (1 issue)
* [@martinheidegger](https://github.com/martinheidegger) (2 issues)
* [@matheus23](https://github.com/matheus23) (1 commit, 1 PR, 2 issues, 3 comments)
* [@mcclure](https://github.com/mcclure) (1 commit, 1 PR, 4 issues, 4 comments)
* [@mctrivia](https://github.com/mctrivia) (1 comment)
* [@MisterY](https://github.com/MisterY) (1 commit, 1 comment)
* [@mkaranta](https://github.com/mkaranta) (1 comment)
* [@mobeiqingkong](https://github.com/mobeiqingkong) (1 PR)
* [@montassarBoukraine](https://github.com/montassarBoukraine) (1 comment)
* [@mrheat](https://github.com/mrheat) (1 comment)
* [@mtiger2k](https://github.com/mtiger2k) (1 issue, 1 comment)
* [@mxinden](https://github.com/mxinden) (1 commit, 1 PR)
* [@n1c01a5](https://github.com/n1c01a5) (1 issue)
* [@nazarhussain](https://github.com/nazarhussain) (1 commit, 2 PRs, 9 comments)
* [@negamaxi](https://github.com/negamaxi) (3 comments)
* [@NickBeukema](https://github.com/NickBeukema) (1 comment)
* [@ocknamo](https://github.com/ocknamo) (1 PR, 2 issues, 1 comment)
* [@oed](https://github.com/oed) (1 comment)
* [@oinuar](https://github.com/oinuar) (1 comment)
* [@oliveriosousa](https://github.com/oliveriosousa) (5 PRs, 1 issue, 2 comments)
* [@olizilla](https://github.com/olizilla) (2 commits, 2 PRs, 3 issues, 15 comments)
* [@peterbraden](https://github.com/peterbraden) (1 comment)
* [@phazejeff](https://github.com/phazejeff) (3 comments)
* [@PierreJeanjacquot](https://github.com/PierreJeanjacquot) (1 comment)
* [@pint1022](https://github.com/pint1022) (1 issue, 1 comment)
* [@PyKestrel](https://github.com/PyKestrel) (1 comment)
* [@ravi0the0sun](https://github.com/ravi0the0sun) (1 issue)
* [@realdennis](https://github.com/realdennis) (1 issue)
* [@RobertFischer](https://github.com/RobertFischer) (1 comment)
* [@rvagg](https://github.com/rvagg) (28 commits, 17 PRs, 1 issue, 39 comments)
* [@rysiekpl](https://github.com/rysiekpl) (1 comment)
* [@shikaan](https://github.com/shikaan) (1 PR)
* [@skogard](https://github.com/skogard) (1 issue, 1 comment)
* [@somay](https://github.com/somay) (2 comments)
* [@sreeharshar84](https://github.com/sreeharshar84) (1 issue, 1 comment)
* [@stale](undefined) (6 comments)
* [@stallingerl](https://github.com/stallingerl) (1 comment)
* [@stbrody](https://github.com/stbrody) (5 comments)
* [@tchardin](https://github.com/tchardin) (1 issue, 1 comment)
* [@Tcll](https://github.com/Tcll) (1 issue, 6 comments)
* [@TheBojda](https://github.com/TheBojda) (1 issue)
* [@TheDiscordian](https://github.com/TheDiscordian) (3 issues, 6 comments)
* [@ti0](https://github.com/ti0) (1 issue)
* [@TJKoury](https://github.com/TJKoury) (1 comment)
* [@Tumble17](https://github.com/Tumble17) (1 comment)
* [@ukstv](https://github.com/ukstv) (1 issue, 5 comments)
* [@v-stickykeys](https://github.com/v-stickykeys) (1 comment)
* [@vasco-santos](https://github.com/vasco-santos) (112 commits, 23 PRs, 3 issues, 58 comments)
* [@vaultec81](https://github.com/vaultec81) (1 issue, 3 comments)
* [@vmx](https://github.com/vmx) (2 commits, 2 comments)
* [@woss](https://github.com/woss) (1 issue)
* [@xmaysonnave](https://github.com/xmaysonnave) (1 comment)
* [@yng3](https://github.com/yng3) (2 PRs, 1 comment)
* [@yurtsiv](https://github.com/yurtsiv) (3 comments)
* [@yusefnapora](https://github.com/yusefnapora) (1 commit, 1 PR, 12 comments)
* [@Zaba505](https://github.com/Zaba505) (1 issue)
* [@zeim839](https://github.com/zeim839) (3 commits, 4 PRs, 10 comments)
* [@zhgromov](https://github.com/zhgromov) (1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-IPFS repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute: https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.io/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.

[unixfs]: https://docs.ipfs.io/guides/concepts/unixfs/
[cid]: https://docs.ipfs.io/guides/concepts/cid/
[mfs]: https://docs.ipfs.io/guides/concepts/mfs/
[libp2p]: https://github.com/libp2p/js-libp2p
[ipld]: https://github.com/ipld/js-ipld
[abortsignal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
[multihash]: https://multiformats.io/multihash
[dht]: https://docs.ipfs.io/concepts/dht/
[multiaddr]: https://multiformats.io/multiaddr/
[dag]: https://docs.ipfs.io/concepts/merkle-dag/
[core-api]: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
