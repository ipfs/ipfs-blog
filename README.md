# IPFS Blog

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

> Source for the [IPFS Blog](https://blog.ipfs.io)

![ipfs-blog @ 2018-11-30](https://ipfs.io/ipfs/QmYxumHGuNdu8rAwcw6kgc2UU1buJxv7V7uFs17tBx9w3W/ipfs-blog.png)

- [IPFS Blog](#ipfs-blog)
  - [Usage](#usage)
  - [Create a new blog post](#create-a-new-blog-post)
    - [Custom header image](#custom-header-image)
    - [Editing](#editing)
    - [Publishing](#publishing)
    - [Translating 🌐✍️🖖](#translating-️)
  - [Contribute](#contribute)
    - [Want to hack on IPFS?](#want-to-hack-on-ipfs)
  - [License](#license)

## Usage

TK (dependencies etc)

**Run the site in dev mode**

```bash
$ instructions TK
...

Web Server is available at http://localhost:8080/
```

**Build the production site**

```bash
$ instructions TK

...

Site built out to ./dist dir
```

This will build out the static site, optimized and ready for deployment, to the `./dist` directory.

## Create a new blog post

Forestry instructions TK, including info on metadata, tags, custom header image, and other best practices

## Canonical tag list

Please note uppercase letters, where they exist, for consistency.
If you need to add a tag, think carefully, and then add it to this list too.

- AEgir
- API
- async/await
- Bitswap
- blockstore
- bootstrap nodes
- breaking change
- browsers
- case study
- CDN
- censorship
- CID
- CLI tools
- collaborative cluster
- community (include ecosystem/collabs here)
- conferences
- containerization
- content routing
- CRDTs
- DAG
- datastore
- demo
- DHT
- DNSLink
- Docker
- docs
- Drand
- encryption
- Ethereum
- Filecoin
- gateways
- go-ipfs
- Gossipsub
- identity
- infrastructure
- interoperability
- interview
- IoT
- IPFS Camp
- IPFS Cluster
- IPFS Companion
- IPFS Desktop
- IPFS Web UI
- IPLD
- IPNS
- js-ipfs
- Kademlia
- Kubernetes
- libp2p
- Linux
- MacOS
- MFS
- mobile (including Android, iOS)
- official meetup
- package managers
- pinning
- project planning
- pubsub
- QUIC
- recap (annual, quarterly, etc)
- research
- Rust
- SECIO
- security
- static publishing
- streaming
- Testground
- tutorial
- Windows
- weekly
- whitepaper

### Editing

Submit a Github PR with your changes, and request a review.

1. Make a change to a file
2. Add and commit.
3. Push to a remote branch.
4. Make a pull request to `master`.
5. Request a review from another member of the IPFS org.

### Publishing

Most publishing activities can take place in Forestry, but ...

CircleCI builds the static site, pins it to our IPFS Cluster, and provides a preview link for a review on the gateway. Merges to to `master` do the same steps plus update the DNSLink for the domain.

In order for CircleCI to build the site after your merge, you _must_ be a member of the [website-deployers](https://github.com/orgs/ipfs/teams/website-deployers/members), comms, GUI or admin teams on the IPFS GitHub org and you _must_ subscribe to the CircleCI builds for the ipfs/blog repository. Create a free CircleCI account, and then [subscribe to the repo here](https://circleci.com/gh/ipfs/workflows/blog/tree/master).

After the CircleCI build completes, it will take a few minutes for the DNS update to propagate and your changes to show up on the website.

### Translating 🌐✍️

**To be replaced with VuePress-accurate translation instructions**
Every post can be optionally translated by:

1. Ensuring `config.toml` includes relevant [language code](http://www.rssboard.org/rss-language-codes) in `[languages]` section
2. Adding a translation file with correct locale suffix, for example:

   - English: `content/post/45-ipfs-weekly-11.md` → //blog.ipfs.io/45-ipfs-weekly-11/
   - Chinese (Simplified): `content-i18n/<lang_code>/post/45-ipfs-weekly-11.md` → //blog.ipfs.io/**zh-cn**/45-ipfs-weekly-11/

   Note: To ensure the translation is grouped with source post the `translationKey` header needs to be the same in both files, and `url` of translation needs to be prefixed with locale code (`zh-cn` for Chinese Simplified), for example:

   ```markdown
   ---
   date: 2018-09-25
   title: IPFS 周报-11
   url: /zh-cn/45-ipfs-weekly-11/
   translationKey: 45-ipfs-weekly-11
   ---
   ```

Having that, non-english version will have unique URL, as seen on the example below:

| Chinese (Simplified)                                                                                      | English                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![en](https://user-images.githubusercontent.com/157609/52483815-13a27680-2bb5-11e9-83d5-63a3f0122728.png) | ![zh-cn](https://user-images.githubusercontent.com/157609/52483825-169d6700-2bb5-11e9-94a6-cfde2f82e2b7.png) |

## Contribute

Feel free to join in! PRs and [issues](https://github.com/ipfs/blog/issues) are welcome.

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
