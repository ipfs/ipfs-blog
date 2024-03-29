---
date: 2020-10-29
permalink: '/2020-10-29-js-ipfs-0-50/'
translationKey: ''
header_image: '/header-image-js-ipfs-placeholder.png'
title: js-IPFS 0.51.0 adds type definitions and removes SECIO
description: ''
author: Alex Potsides
tags:
  - js-ipfs
  - SECIO
---

# 🔦 Highlights

> Type Defs! No more SECIO! Halve your install time!

`js-IPFS@0.51.0` has taken off from the launchpad and is on route to your node_modules folder with TypeScript support, Custom DAG Formats and a new, lighter way to consume the module

## 🍪 Types

TypeScript has taken the JS world by storm, allowing developers to be alerted when the interface they are coding against is not what they expect and to enable vast amounts of useful tooling like accurate code completion and inline doc viewing.

There have been [several](https://github.com/vishalkuo/types-ipfs) [community](https://github.com/survirtual/types-ipfs) [led](https://github.com/beenotung/typestub-ipfs) [efforts](https://github.com/zabirauf/ipfs-types) to provide type information for `js-IPFS` but since the project moves so quickly it's an uphill struggle to keep compatibility with the changes that get landed in every release.

With `js-IPFS@0.51.0` types are now a first-class citizen within the codebase. The project has not gone so far as to convert to TypeScript - we do not wish knowledge of TypeScript to become a prerequisite to contributing to `js-IPFS` development, instead all types are defined using [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) comments and are built and validated during development and Continuous Integration.

Going forward all new code will be required to have types so to help contributors with that [aegir](https://github.com/ipfs/aegir) recently added stricter linting for JSDoc comments and we also [added a typecheck github action](https://github.com/ipfs/js-ipfs/pull/3327) to `js-IPFS` so any errors or missing types should be easy to spot in a PR.

![](../assets/types.png =600x)

## SECIO Removal

The [deprecated](https://blog.ipfs.tech/2020-08-07-deprecating-secio/) security transport [SECIO](https://github.com/libp2p/specs/blob/master/secio/README.md) has finally been removed in `js-IPFS@0.51.0`. It's successor, [Noise](https://github.com/libp2p/specs/blob/master/noise/README.md) was first released with `js-IPFS@0.47.0` and is now the default security transport used by libp2p.

`go-IPFS@0.7.0` recently also removed SECIO support after introducing Noise in `go-IPFS@0.6.0`, which means `js-IPFS@0.51.0` and `go-IPFS@0.7.0` can only talk to other nodes running `go-IPFS@0.6.0` or `js-IPFS@0.47.0` or later.

If you are running IPFS nodes with a diverse range of versions you'll want to upgrade them all to `go-IPFS@0.6.0` or later and `js-IPFS@0.47.0` at a minimum, otherwise you will start to lose connectivity with the rest of the network as `SECIO` ceases to be supported by peers.

## 📌 Custom DAG Formats

At its heart IPFS is about files, which means [UnixFS](https://github.com/ipfs/specs/blob/master/UNIXFS.md) and in terms of [IPLD Formats](https://github.com/ipld/interface-ipld-format) means [dag-pb](https://github.com/ipld/js-ipld-dag-pb) and [ipld-raw](https://github.com/ipld/js-ipld-raw).

IPFS gives you access to all the underlying components though, allowing you to use [dag-cbor](https://github.com/ipld/js-ipld-dag-cbor) to connect your data structures together and have them accessible and distributable across the internet through [libp2p](https://github.com/libp2p/js-libp2p).

But what if these codecs don't meet your requirements, what if you want to develop a new codec or use less common ones like [dag-jose](https://github.com/ceramicnetwork/js-dag-jose)?

We don't bundle every available codec with the default `js-IPFS` install because some of them pull in large dependency trees which will unnecessarily slow down the install for people who aren't going to use them.

Previously you've been able to use [custom IPLD formats](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#ipld-formats) with `ipfs-http-client` and when running `ipfs` as an in-process node as part of your application, but now you can use them in a running daemon as well.

See the new [custom-ipld-formats](https://github.com/ipfs/js-ipfs/tree/master/examples/custom-ipld-formats) example in the `js-IPFS` repo for more information on how to set this up.

## 🍏 ipfs-core - a new lighter IPFS for application authors

When you `npm install ipfs` you get the core IPFS node as well as tools to run a daemon, an HTTP API server and a CLI. If you're installing this globally to use on the command line to use with IPFS Desktop or just to have a node running on your network this is great as you want the extra tools to be able to communicate with your node.

These take time to install and use up hard drive space and if you are building an application on top of `js-IPFS` you don't necessarily need them.

Now you can `npm install ipfs-core` to just get the parts of the IPFS stack you need to run an in-process node. This has roughly halved the install size of `js-IPFS` by not installing all those extra dependencies that you don't need.

You can use the module in the same way you did before, all you need to do is change the dependency name/version and update the require name:

```javascript
const IPFS = require('ipfs')

async function () {
  const node = await IPFS.create()

  node.add(...)

  await node.stop()
}
```

to this:

```javascript
const IPFS = require('ipfs-core')

async function () {
  const node = await IPFS.create()

  node.add(...)

  await node.stop()
}
```

and you're all set! This is the start of an attempt to make the codebase more modular and allow for swapping components out and maybe not pulling in everything all the time to enable power users to create a minimal node that only contains the functionality they require. Watch this space for more!

## CORS is now disabled by default

[Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a browser security measure to prevent unauthorized access to APIs by rogue JavaScript running on compromised sites on the web.

Versions of `js-IPFS` prior to `0.51.0` have a very permissive CORS setting allowing requests from anywhere which although makes developing against the API very simple it leaves a little to be desired in terms of security.

From `0.51.0` onwards CORS is disabled by default so if you plan on making requests against the HTTP RPC API you will need to add the relevant origin and methods you will be using to the node configuration before starting it.

See the [CORS section](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-http-client/README.md#cors) of the README for the full lowdown.

# ✨New features

- Type check & generate defs from jsdoc ([#3281](https://github.com/ipfs/js-ipfs/issues/3281)) ([bbcaf34](https://github.com/ipfs/js-ipfs/commit/bbcaf34111251b142273a5675f4754ff68bd9fa0))
- Enable custom formats for dag put and get ([#3347](https://github.com/ipfs/js-ipfs/pull/3347)) ([3250ff4](https://github.com/ipfs/js-ipfs/commit/3250ff453a1d3275cc4ab746f59f9f70abd5cc5f))
- Node.js 15 support ([#3339](https://github.com/ipfs/js-ipfs/pull/3339)) ([66f2081](https://github.com/ipfs/js-ipfs/commit/66f2081d02decbdcdc79532191a8ead0588c63cc))
- Implement ipfs.ls on message-port-client ([#3322](https://github.com/ipfs/js-ipfs/pull/3322)) ([f642f1d](https://github.com/ipfs/js-ipfs/pull/3322/commits/f642f1d892d960ce09d71ed3390d9211ae4f56c9))
- webui v2.11.4 ([#3317](https://github.com/ipfs/js-ipfs/pull/3317)) ([7f32f7f](https://github.com/ipfs/js-ipfs/commit/7f32f7fd1eb3cffc3cd529827e4af7a8a08e36d9))

## 🔨 Breaking changes

- Support for SECIO has been removed ([#3295](https://github.com/ipfs/js-ipfs/issues/3295)) ([5f5ef7e](https://github.com/ipfs/js-ipfs/commit/5f5ef7ee6cc6dc634cc6adbede0602492490a85d))
- Disable CORS by default ([#3275](https://github.com/ipfs/js-ipfs/issues/3275)) ([3ff833d](https://github.com/ipfs/js-ipfs/commit/3ff833db6444a3e931db9b76bf74c3420e57ee02))
- Remove buffer export from ipfs-core ([#3348](https://github.com/ipfs/js-ipfs/pull/3348)) ([5cc6dfe](https://github.com/ipfs/js-ipfs/commit/5cc6dfebf96ad9509e7ded175291789e32402eec))

## 🕷️ Bug fixes

- files ls should return string ([#3352](https://github.com/ipfs/js-ipfs/pull/3352)) ([16ecc74](https://github.com/ipfs/js-ipfs/commit/16ecc7485dfbb1f0c827c5f804974bb804f3dafd))
- fixes "interface-ipfs-core" link ([#3334](https://github.com/ipfs/js-ipfs/pull/3334)) ([3e7e222](https://github.com/ipfs/js-ipfs/commit/3e7e22239e334705acd665408e77c84e65da2b32))
- packages/ipfs-core/src/index.js attempts to export undefined Buffer ([#3312](https://github.com/ipfs/js-ipfs/issues/3312)) ([5cc6dfe](https://github.com/ipfs/js-ipfs/commit/5cc6dfebf96ad9509e7ded175291789e32402eec))
- HTTP client factory: Invalid URL in React Navtive ([#3331](https://github.com/ipfs/js-ipfs/issues/3331)) ([4eb196c](https://github.com/ipfs/js-ipfs/commit/4eb196c07129d0ee90a7ad55feca69b6b349d8b7))
- Invalid version error triggered in cli pin add/rm ([#3306](https://github.com/ipfs/js-ipfs/pull/3306)) ([69757f3](https://github.com/ipfs/js-ipfs/commit/69757f3c321c5d135ebde7a262c169427e4f1105))
- Loading ipfs-js bundle in worker fails with ReferenceError: window is not defined ([#2349](https://github.com/ipfs/js-ipfs/issues/2349)) ([3f72e50](https://github.com/ipfs/aegir/commit/3f72e5074145a8f2ec03143db4230514af664f95))

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

- [@achingbrain](https://github.com/achingbrain) (52 commits, 33 PRs, 2 issues, 78 comments)
- [@acolytec3](https://github.com/acolytec3) (1 commit, 1 PR)
- [@acostalima](https://github.com/acostalima) (2 issues, 5 comments)
- [@adamprocter](https://github.com/adamprocter) (1 issue, 1 comment)
- [@andrew](https://github.com/andrew) (1 comment)
- [@aphelionz](https://github.com/aphelionz) (1 issue, 3 comments)
- [@aschmahmann](https://github.com/aschmahmann) (1 comment)
- [@AuHau](https://github.com/AuHau) (2 issues, 4 comments)
- [@autonome](https://github.com/autonome) (1 issue, 1 comment)
- [@bconnorwhite](https://github.com/bconnorwhite) (1 commit, 1 PR)
- [@bellbind](https://github.com/bellbind) (1 issue, 1 comment)
- [@BlackGlory](https://github.com/BlackGlory) (1 comment)
- [@bluelovers](https://github.com/bluelovers) (1 commit, 1 PR, 3 comments)
- [@chafey](https://github.com/chafey) (2 issues, 1 comment)
- [@chebyte](https://github.com/chebyte) (2 comments)
- [@cindywu](https://github.com/cindywu) (1 commit, 1 PR)
- [@codecov-commenter](https://github.com/codecov-commenter) (2 comments)
- [@codecov-io](https://github.com/codecov-io) (1 comment)
- [@conr2d](https://github.com/conr2d) (1 commit, 1 PR)
- [@daviddias](https://github.com/daviddias) (1 comment)
- [@DougAnderson444](https://github.com/DougAnderson444) (1 comment)
- [@duc811997](https://github.com/duc811997) (1 issue)
- [@EthanTheMaster](https://github.com/EthanTheMaster) (1 commit, 1 PR, 1 comment)
- [@gcohler](https://github.com/gcohler) (1 PR, 1 issue, 2 comments)
- [@georgyo](https://github.com/georgyo) (2 issues)
- [@Gozala](https://github.com/Gozala) (12 commits, 15 PRs, 6 issues, 33 comments)
- [@hugomrdias](https://github.com/hugomrdias) (1 comment)
- [@icidasset](https://github.com/icidasset) (3 comments)
- [@imestin](https://github.com/imestin) (1 commit, 1 PR, 1 issue, 3 comments)
- [@jacobheun](https://github.com/jacobheun) (20 commits, 6 PRs, 4 issues, 29 comments)
- [@jakehemmerle](https://github.com/jakehemmerle) (1 comment)
- [@Jonybang](https://github.com/Jonybang) (1 issue, 1 comment)
- [@kottackalsulvin](https://github.com/kottackalsulvin) (3 issues, 9 comments)
- [@lidel](https://github.com/lidel) (2 commits, 3 PRs, 7 comments)
- [@mburns](https://github.com/mburns) (1 PR, 3 comments)
- [@mcclure](https://github.com/mcclure) (3 issues, 3 comments)
- [@mh-cbon](https://github.com/mh-cbon) (2 issues, 1 comment)
- [@mikeal](https://github.com/mikeal) (1 commit, 1 issue, 5 comments)
- [@mpetrunic](https://github.com/mpetrunic) (7 commits, 1 PR, 1 comment)
- [@negamaxi](https://github.com/negamaxi) (2 comments)
- [@obo20](https://github.com/obo20) (1 comment)
- [@oed](https://github.com/oed) (1 issue, 1 comment)
- [@olizilla](https://github.com/olizilla) (1 issue)
- [@onichandame](https://github.com/onichandame) (1 issue, 3 comments)
- [@pepoospina](https://github.com/pepoospina) (3 comments)
- [@rafaelramalho19](https://github.com/rafaelramalho19) (1 issue)
- [@RobertFischer](https://github.com/RobertFischer) (1 comment)
- [@rvagg](https://github.com/rvagg) (5 comments)
- [@rysiekpl](https://github.com/rysiekpl) (3 comments)
- [@simonovic86](https://github.com/simonovic86) (2 PRs, 1 issue, 7 comments)
- [@stale](undefined) (9 comments)
- [@StationedInTheField](https://github.com/StationedInTheField) (1 issue, 3 comments)
- [@straiforos](https://github.com/straiforos) (1 issue, 2 comments)
- [@tabcat](https://github.com/tabcat) (1 commit, 1 issue, 6 comments)
- [@Tcll](https://github.com/Tcll) (1 issue, 4 comments)
- [@tniessen](https://github.com/tniessen) (1 comment)
- [@tuyennhv](https://github.com/tuyennhv) (3 commits, 3 PRs, 1 comment)
- [@ubernaut](https://github.com/ubernaut) (1 issue, 1 comment)
- [@vasco-santos](https://github.com/vasco-santos) (30 commits, 25 PRs, 6 issues, 42 comments)
- [@vmx](https://github.com/vmx) (11 commits, 1 PR, 8 comments)
- [@Weedshaker](https://github.com/Weedshaker) (1 comment)
- [@welcome](undefined) (17 comments)
- [@wemeetagain](https://github.com/wemeetagain) (4 commits, 1 PR, 4 comments)
- [@woss](https://github.com/woss) (6 comments)
- [@Xmader](https://github.com/Xmader) (1 commit, 1 PR, 1 comment)
- [@Xplorer123](https://github.com/Xplorer123) (1 issue)
- [@yfs-2000](https://github.com/yfs-2000) (1 issue, 1 comment)
- [@zebateira](https://github.com/zebateira) (1 comment)
- [@zoernert](https://github.com/zoernert) (1 commit, 1 PR, 1 comment)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

- Check the issues with the `help wanted` label in the [js-IPFS repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute: https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands
- Hack with IPFS and show us what you made! The All Hands call is also the perfect venue for demos, join in and show us what you built
- Join the discussion at https://discuss.ipfs.tech/ and help users finding their answers.
- Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.tech](https://discuss.ipfs.tech). We are also available at the `#ipfs` channel on Freenode.

[unixfs]: https://docs.ipfs.tech/guides/concepts/unixfs/
[cid]: https://docs.ipfs.tech/guides/concepts/cid/
[mfs]: https://docs.ipfs.tech/guides/concepts/mfs/
[libp2p]: https://github.com/libp2p/js-libp2p
[ipld]: https://github.com/ipld/js-ipld
[abortsignal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
[multihash]: https://multiformats.io/multihash
[dht]: https://docs.ipfs.tech/concepts/dht/
[multiaddr]: https://multiformats.io/multiaddr/
[dag]: https://docs.ipfs.tech/concepts/merkle-dag/
[core-api]: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
