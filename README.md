# IPFS Blog (v2 Beta)

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

This repository is home to in-development work on a VuePress/Forestry-based IPFS blog to replace [the existing IPFS blog](https://blog.ipfs.io). Target go-live is in late Q1 2021. Contact @jessicaschilling with any questions.

This work is part of a larger product-market fit realignment/enhancement effort on the IPFS website as a whole. [View tracking board.](https://github.com/orgs/ipfs/projects/11)

⚠️⚠️⚠️ **If you want to publish a blog post, don't do it here yet** — use [the existing blog](https://github.com/ipfs/blog) instead!

## Authoring/deployment workflow

This blog uses the `staging` branch as a work-in-progress scratchpad, with the production site deployed from `main` via [Fleek](https://fleek.co/).

We use [Forestry](https://forestry.io) as a CMS-style environment, including perks like WYSIWYG editing and image upload/crop tools. If you're an IPFS core team member and don't have Forestry access, contact @jessicaschilling to arrange access and a quick orientation session. (If you prefer writing in Markdown, don't fear: Forestry also has a raw Markdown view.) 

Forestry writes directly to `staging`, with previews available at https://ipfs-blog-staging.on.fleek.co/. Once a staged post is ready to go live, please PR `staging` to `main` using [this handy shortcut](https://github.com/ipfs/ipfs-blog/compare/main...staging?expand=1). *Note that if multiple posts are in-flight in staging and only one is approved to go live, your PR may need some massaging.*

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
