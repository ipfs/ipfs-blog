---
title: js-IPFS 0.55.0 greatly improves type definitions
description: The new release comes with types rewritten from the ground up
author: Alex Potsides
date: 2021-05-12
permalink: "/2021-05-11-js-ipfs-0-55/"
translationKey: ''
header_image: "/header-image-js-ipfs-placeholder.png"
tags:
- breaking change
- js-ipfs

---
# 🔦 Highlights

> TypeScript type definitions have been rewritten from the ground up

## 🍪 Types

It's been a long time in the works, but `js-ipfs@0.55.0` finally lands with a brand new set of TypeScript type definitions entirely re-written from the ground up.

We previously shipped `0.51.0` with bundled TypeScript type definitions which enabled users to explore the IPFS Core API through [intellisense](https://code.visualstudio.com/docs/editor/intellisense) and use that to ensure they were calling methods that existed, but the argument and return types were frequently marked `any`, which, although would not cause TypeScript compilation errors, gave you little in the way of actual type safety.

Part of the problem is that `js-ipfs` exposes the return types of many supporting modules which do not ship with TypeScript definitions.  This means we either had to PR support for TypeScript definitions into these modules or type their input/output at the `js-ipfs` level which is error prone and makes no guarantees about the actual underlying code.

We took a look at our stack and started to add TypeScript types from the lowest level up, which has been an enormous job with some 250 pull requests opened, reviewed, merged and shipped as part of this effort. A massive thanks to everyone involved, see the contributors list further down this post for who helped out!

## 🙅 noImplicitAny

Early on we decided to enable [noImplicitAny](https://www.typescriptlang.org/tsconfig) in our `tsconfig.json` files.  This is a strict setting which causes an error when type information for any variable cannot be found.

It means that everything has to be typed internally which increased the amount of work necessary to deliver this release but our internal code is now vastly safer and it even surfaced a few bugs and unhandled edge cases in the implementation so upgrading is very much recommended.

## 🤖 Future proofing

In line with our [supported versions](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md#supported-versions), `js-ipfs@0.55.0` has dropped support for Node.js < 14. This is so we can support the latest and greatest features without having to carry legacy baggage forward.

We've also switched to using named exports for our top-level modules instead of default exports as it makes them more pleasant to consume from [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) environments.  It also means the type definitions generated from [JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) are more compact and have to jump through fewer hoops to reflect the code they are generated from.

From perspective of the external API, this only affects ipfs-http-client:

```js
// before
const create = require('ipfs-http-client')
const ipfs = create()

// after
const { create } = require('ipfs-http-client')
const ipfs = create()
```

Finally, in some places we previously returned instances of the [bignumber.js](https://www.npmjs.com/package/bignumber.js) module—this has been necessary in the past because JavaScript lacked an arbitrary precision number type.  [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) has been present in all of our supported environments for some time so we've been removing `bignumber.js` in favour of `BigInt` in the [Core API](https://github.com/ipfs/js-ipfs/tree/master/docs).

# 🛍️ Upgrade guide

We've taken this opportunity to align the implementation with the published [Core API Docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api). In some cases the accepted input types were broader than what was documented for backward compatibility, but that compatibility comes at the cost of code complexity and added maintenance, so those old code paths have been removed.

If you have coded against the Core API docs you should have very few surprises in store.

The API changes are as follows:

* `ipfs.bitswap.stat()` - returned `peers` is a `string[]` (was `CID[]`)
* `ipfs.bitstwap.stat()` - returned `blocksReceived` is a `BigInt` (was `bignumber.js`)
* `ipfs.bitstwap.stat()` - returned `dataReceived` is a `BigInt` (was `bignumber.js`)
* `ipfs.bitstwap.stat()` - returned `blocksSent` is a `BigInt` (was `bignumber.js`)
* `ipfs.files.rm(path, opts)` - `path` arg is `string | string[]` (was `...string`)
* `ipfs.files.cp(source, dest, opts)` - `source` arg is `string | string[]` (was `...string`)
* `ipfs.files.mv(source, dest, opts)` - `source` arg is `string | string[]` (was `...string`)

## ✨New features

* Support identity hash ([`0x00`](https://github.com/multiformats/multicodec/blob/master/table.csv#L2)) in`ipfs.block.get()`+`ipfs.dag.get()` ([#3616](https://github.com/ipfs/js-ipfs/issues/3616)) ([28ad9ad](https://github.com/ipfs/js-ipfs/commit/28ad9ad6e50abb89a366ecd6b5301e848f0e9962))

## 🔨 Breaking changes

* The minimum supported Node.js version is 14
* All Core API methods now have types, some method signatures have changed (see Upgrade Guide above)
* Named exports are now used by the http, grpc and ipfs client modules (see Future proofing, above)

## 🕷️ Bug fixes

* mark ipld options as partial ([#3669](https://github.com/ipfs/js-ipfs/issues/3669)) ([f98af8e](https://github.com/ipfs/js-ipfs/commit/f98af8ed24784929898bb5d33a64dc442c77074d))
* only accept cid for ipfs.dag.get ([#3675](https://github.com/ipfs/js-ipfs/issues/3675)) ([bb8f8bc](https://github.com/ipfs/js-ipfs/commit/bb8f8bc501ffc1ee0f064ba61ec0bca4015bf6ad)), closes [#3637](https://github.com/ipfs/js-ipfs/issues/3637)
* only use public api in http api server ([#3660](https://github.com/ipfs/js-ipfs/issues/3660)) ([61d0981](https://github.com/ipfs/js-ipfs/commit/61d0981c05371c4846dcea3330ac9fb2e810b8fa)), closes [#3639](https://github.com/ipfs/js-ipfs/issues/3639)
* reject requests when cors origin list is empty ([#3674](https://github.com/ipfs/js-ipfs/issues/3674)) ([0b2d98c](https://github.com/ipfs/js-ipfs/commit/0b2d98c53ba18491d7b99ae9cc0955281146610d))
* add missing type import ([#3664](https://github.com/ipfs/js-ipfs/issues/3664)) ([64cc1e1](https://github.com/ipfs/js-ipfs/commit/64cc1e1ea7da77f1553ac127e9fef1905f7c78da))
* fix types ([#3662](https://github.com/ipfs/js-ipfs/issues/3662)) ([0fe8892](https://github.com/ipfs/js-ipfs/commit/0fe8892361180dab53ed3c3b006479b32a792d44))
* loosen input type for swarm.connect and swarm.disconnect ([#3673](https://github.com/ipfs/js-ipfs/issues/3673)) ([46618c7](https://github.com/ipfs/js-ipfs/commit/46618c795bf5363ba3186645640fb81349231db7)), closes [#3638](https://github.com/ipfs/js-ipfs/issues/3638)
* ignore the ts error caused by the recent protobufjs type change ([#3656](https://github.com/ipfs/js-ipfs/issues/3656)) ([084589c](https://github.com/ipfs/js-ipfs/commit/084589c0116d8f27ce1462424fb93b6037b776a9))
* update data type for ws message event handler ([#3641](https://github.com/ipfs/js-ipfs/issues/3641)) ([4a14d20](https://github.com/ipfs/js-ipfs/commit/4a14d20e727b50a8d98c14573d9a5b6fa0e8699d))
* do not republish self key twice ([#3634](https://github.com/ipfs/js-ipfs/issues/3634)) ([8545a76](https://github.com/ipfs/js-ipfs/commit/8545a763daa38aefa71cca514016ba400363830a))
* fix types ([#3662](https://github.com/ipfs/js-ipfs/issues/3662)) ([0fe8892](https://github.com/ipfs/js-ipfs/commit/0fe8892361180dab53ed3c3b006479b32a792d44))
* update ipfs repo ([#3671](https://github.com/ipfs/js-ipfs/issues/3671)) ([9029ee5](https://github.com/ipfs/js-ipfs/commit/9029ee591fa74ea65c9600f2d249897e933416fa))
* update types after feedback from ceramic ([#3657](https://github.com/ipfs/js-ipfs/issues/3657)) ([0ddbb1b](https://github.com/ipfs/js-ipfs/commit/0ddbb1b1deb4e40dac3e365d7f98a5f174c2ce8f)), closes [#3640](https://github.com/ipfs/js-ipfs/issues/3640)

# 🗺️ What’s next?

Check out the js-IPFS [Project Roadmap](https://github.com/orgs/ipfs/projects/6) which contains headline features organised in the order we hope them to land.

Only large features are called out in the roadmap, expect lots of small bugfix releases between the roadmapped items!

# 😍 Huge thank you to everyone that made this release possible

* [@5310](https://github.com/5310) (1 comment)
* [@achingbrain](https://github.com/achingbrain) (279 commits, 153 PRs, 16 issues, 172 comments)
* [@acolytec3](https://github.com/acolytec3) (1 commit, 1 PR, 1 comment)
* [@acostalima](https://github.com/acostalima) (1 PR, 4 comments)
* [@akinovak](https://github.com/akinovak) (1 issue)
* [@alanshaw](https://github.com/alanshaw) (12 commits, 4 PRs, 1 issue, 5 comments)
* [@amitOodles](https://github.com/amitOodles) (1 issue)
* [@ampcpmgp](https://github.com/ampcpmgp) (1 comment)
* [@andrew](https://github.com/andrew) (1 commit)
* [@andychri123](https://github.com/andychri123) (1 issue)
* [@aphelionz](https://github.com/aphelionz) (1 comment)
* [@arnWolff](https://github.com/arnWolff) (1 comment)
* [@aschmahmann](https://github.com/aschmahmann) (1 issue, 6 comments)
* [@AuHau](https://github.com/AuHau) (1 comment)
* [@autonome](https://github.com/autonome) (2 comments)
* [@awantoch](https://github.com/awantoch) (1 comment)
* [@b-rohit](https://github.com/b-rohit) (1 issue)
* [@Bholtland](https://github.com/Bholtland) (1 issue, 3 comments)
* [@BigLep](https://github.com/BigLep) (21 comments)
* [@buchhlz2](https://github.com/buchhlz2) (1 comment)
* [@bws9000](https://github.com/bws9000) (1 PR)
* [@chrisdukakis](https://github.com/chrisdukakis) (3 PRs, 1 comment)
* [@christopheSeeka](https://github.com/christopheSeeka) (1 issue, 2 comments)
* [@CluEleSsUK](https://github.com/CluEleSsUK) (1 issue, 3 comments)
* [@codecov-io](https://github.com/codecov-io) (1 comment)
* [@D4nte](https://github.com/D4nte) (1 commit, 2 PRs, 6 issues, 15 comments)
* [@da-kami](https://github.com/da-kami) (2 issues, 3 comments)
* [@danielcjacks](https://github.com/danielcjacks) (1 comment)
* [@dapplion](https://github.com/dapplion) (1 issue, 17 comments)
* [@deanpress](https://github.com/deanpress) (1 comment)
* [@dejano-with-tie](https://github.com/dejano-with-tie) (1 issue, 1 comment)
* [@dependabot\[bot\]](https://github.com/dependabot%5Bbot%5D) (17 commits)
* [@devhyunjae](https://github.com/devhyunjae) (1 issue, 1 comment)
* [@dlecan](https://github.com/dlecan) (1 comment)
* [@dxtr85](https://github.com/dxtr85) (1 issue, 1 comment)
* [@ekumahost](https://github.com/ekumahost) (1 issue, 3 comments)
* [@elmariachi111](https://github.com/elmariachi111) (5 comments)
* [@EmiM](https://github.com/EmiM) (1 issue)
* [@ericspt](https://github.com/ericspt) (1 comment)
* [@expede](https://github.com/expede) (1 commit, 1 PR)
* [@FCO](https://github.com/FCO) (1 comment)
* [@filoozom](https://github.com/filoozom) (1 PR, 1 issue, 19 comments)
* [@Funarp](https://github.com/Funarp) (1 issue, 4 comments)
* [@gabigarcez](https://github.com/gabigarcez) (1 comment)
* [@gcxfd](https://github.com/gcxfd) (1 issue)
* [@georgyo](https://github.com/georgyo) (1 commit, 1 PR)
* [@Gozala](https://github.com/Gozala) (16 commits, 10 PRs, 6 issues, 49 comments)
* [@hacdias](https://github.com/hacdias) (4 commits)
* [@hannahhoward](https://github.com/hannahhoward) (2 commits, 3 PRs, 5 comments)
* [@Hesbon5600](https://github.com/Hesbon5600) (2 comments)
* [@hueimin426](https://github.com/hueimin426) (1 comment)
* [@hugomrdias](https://github.com/hugomrdias) (53 commits, 14 PRs, 3 issues, 20 comments)
* [@icidasset](https://github.com/icidasset) (4 comments)
* [@igibliss00](https://github.com/igibliss00) (1 issue)
* [@iNDicat0r](https://github.com/iNDicat0r) (2 issues, 2 comments)
* [@jacobheun](https://github.com/jacobheun) (13 commits, 1 PR, 29 comments)
* [@javaskript](https://github.com/javaskript) (1 commit, 1 PR)
* [@jeffkhull](https://github.com/jeffkhull) (2 issues, 2 comments)
* [@jeffscottward](https://github.com/jeffscottward) (1 issue, 1 comment)
* [@JonathanWilbur](https://github.com/JonathanWilbur) (1 issue, 3 comments)
* [@JoranHonig](https://github.com/JoranHonig) (1 issue)
* [@jordan-public](https://github.com/jordan-public) (1 issue)
* [@julienmalard](https://github.com/julienmalard) (1 comment)
* [@jurelik](https://github.com/jurelik) (2 comments)
* [@justinmchase](https://github.com/justinmchase) (1 issue, 5 comments)
* [@khayliang](https://github.com/khayliang) (1 issue)
* [@koivunej](https://github.com/koivunej) (2 comments)
* [@kuabhish](https://github.com/kuabhish) (1 issue, 3 comments)
* [@KyleMaas](https://github.com/KyleMaas) (1 commit, 3 PRs, 4 issues, 14 comments)
* [@lacker](https://github.com/lacker) (1 comment)
* [@LehaoLin](https://github.com/LehaoLin) (2 PRs, 2 comments)
* [@lidel](https://github.com/lidel) (14 commits, 3 PRs, 2 issues, 45 comments)
* [@ludwigschubi](https://github.com/ludwigschubi) (2 commits, 2 PRs, 1 issue, 1 comment)
* [@mctrivia](https://github.com/mctrivia) (1 issue, 1 comment)
* [@mehtaphysical](https://github.com/mehtaphysical) (1 commit, 1 PR)
* [@miguelmota](https://github.com/miguelmota) (1 commit, 1 PR, 1 issue, 1 comment)
* [@mikeal](https://github.com/mikeal) (1 commit, 6 comments)
* [@MisterY](https://github.com/MisterY) (1 PR, 1 comment)
* [@momack2](https://github.com/momack2) (2 comments)
* [@mrappard](https://github.com/mrappard) (1 issue, 1 comment)
* [@nadimkobeissi](https://github.com/nadimkobeissi) (2 commits, 2 PRs, 1 issue, 5 comments)
* [@nduchak](https://github.com/nduchak) (2 issues, 1 comment)
* [@novaknole](https://github.com/novaknole) (1 issue)
* [@obo20](https://github.com/obo20) (1 comment)
* [@ocknamo](https://github.com/ocknamo) (1 issue, 2 comments)
* [@oed](https://github.com/oed) (3 comments)
* [@olizilla](https://github.com/olizilla) (3 commits, 3 PRs, 3 comments)
* [@pascalverlinden](https://github.com/pascalverlinden) (1 issue, 1 comment)
* [@perfectmak](https://github.com/perfectmak) (1 comment)
* [@peterbraden](https://github.com/peterbraden) (1 issue, 2 comments)
* [@phillmac](https://github.com/phillmac) (1 comment)
* [@PierreJeanjacquot](https://github.com/PierreJeanjacquot) (1 issue, 1 comment)
* [@piskel](https://github.com/piskel) (1 issue)
* [@pmuens](https://github.com/pmuens) (1 commit, 1 PR)
* [@PradneshShinde](https://github.com/PradneshShinde) (1 issue)
* [@raphael10-collab](https://github.com/raphael10-collab) (8 issues, 22 comments)
* [@re2005](https://github.com/re2005) (1 comment)
* [@rikur](https://github.com/rikur) (1 comment)
* [@rob-deutsch](https://github.com/rob-deutsch) (1 issue)
* [@robertkiel](https://github.com/robertkiel) (1 PR, 6 comments)
* [@RomarQ](https://github.com/RomarQ) (2 comments)
* [@rrthomas](https://github.com/rrthomas) (2 issues, 1 comment)
* [@rvagg](https://github.com/rvagg) (47 commits, 24 PRs, 5 issues, 70 comments)
* [@SahidMiller](https://github.com/SahidMiller) (1 commit, 2 PRs)
* [@sahilpohare](https://github.com/sahilpohare) (1 issue)
* [@satoshi999](https://github.com/satoshi999) (2 issues)
* [@shapnam83](https://github.com/shapnam83) (1 issue, 1 comment)
* [@SignpostMarv](https://github.com/SignpostMarv) (1 comment)
* [@Slender1808](https://github.com/Slender1808) (1 issue, 1 comment)
* [@somay](https://github.com/somay) (1 issue)
* [@SonataOto](https://github.com/SonataOto) (1 comment)
* [@stale](undefined) (1 comment)
* [@stbrody](https://github.com/stbrody) (3 issues, 6 comments)
* [@Stebalien](https://github.com/Stebalien) (6 comments)
* [@tabcat](https://github.com/tabcat) (2 comments)
* [@teohhanhui](https://github.com/teohhanhui) (1 comment)
* [@terichadbourne](https://github.com/terichadbourne) (1 comment)
* [@TheDiscordian](https://github.com/TheDiscordian) (4 comments)
* [@ThomasFreedman](https://github.com/ThomasFreedman) (1 comment)
* [@TJKoury](https://github.com/TJKoury) (2 commits, 2 PRs, 4 issues, 24 comments)
* [@tymmesyde](https://github.com/tymmesyde) (1 comment)
* [@uluhonolulu](https://github.com/uluhonolulu) (1 issue, 1 comment)
* [@ungarson](https://github.com/ungarson) (1 comment)
* [@Usman-Qasim](https://github.com/Usman-Qasim) (2 comments)
* [@valmack](https://github.com/valmack) (1 issue, 3 comments)
* [@vasco-santos](https://github.com/vasco-santos) (230 commits, 66 PRs, 8 issues, 167 comments)
* [@vmx](https://github.com/vmx) (41 commits, 11 PRs, 3 issues, 31 comments)
* [@vogdb](https://github.com/vogdb) (1 commit, 9 comments)
* [@wehriam](https://github.com/wehriam) (1 issue, 1 comment)
* [@wemeetagain](https://github.com/wemeetagain) (1 commit, 1 PR, 1 issue, 2 comments)
* [@xmaysonnave](https://github.com/xmaysonnave) (2 issues, 4 comments)
* [@xzy-96](https://github.com/xzy-96) (1 issue)
* [@yuhr](https://github.com/yuhr) (1 issue, 3 comments)
* [@yurtsiv](https://github.com/yurtsiv) (1 commit, 2 PRs, 1 issue, 10 comments)
* [@yusefnapora](https://github.com/yusefnapora) (1 PR, 4 comments)
* [@zerdos](https://github.com/zerdos) (1 issue)
* [@Zorlin](https://github.com/Zorlin) (1 issue, 3 comments)

# 🙌🏽 Want to contribute?

Would you like to contribute to the IPFS project and don’t know how? Well, there are a few places you can get started:

* Check the issues with the `help wanted` label in the [js-IPFS repo](https://github.com/ipfs/js-ipfs/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
* Join an IPFS All Hands, introduce yourself and let us know where you would like to contribute: [https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands](https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands "https://github.com/ipfs/team-mgmt/#weekly-ipfs-all-hands")
* Join an IPLD All Hands call if you're interested in the data layer of IPFS: [https://github.com/ipld/team-mgmt#every-two-weeks-call](https://github.com/ipld/team-mgmt#every-two-weeks-call)
* Hack with IPFS and show us what you made! The All Hands calls are also the perfect venue for demos, join in and show us what you built
* Join the discussion at [https://discuss.ipfs.io/](https://discuss.ipfs.io/ "https://discuss.ipfs.io/") and help users finding their answers.
* Join the [🚀 IPFS Core Implementations Weekly Sync 🛰](https://github.com/ipfs/team-mgmt/issues/992) and be part of the action!

# ⁉️ Do you have questions?

The best place to ask your questions about IPFS, how it works, and what you can do with it is at [discuss.ipfs.io](https://discuss.ipfs.io). We are also available at the `#ipfs` channel on Freenode.
