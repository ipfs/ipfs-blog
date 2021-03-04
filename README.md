# IPFS Blog (v2 Beta)

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

This repository is home to in-development work on a VuePress/Forestry-based IPFS blog to replace [the existing IPFS blog](https://blog.ipfs.io). Target go-live is in late Q1 2021. Contact @jessicaschilling with any questions.

This work is part of a larger product-market fit realignment/enhancement effort on the IPFS website as a whole. [View tracking board.](https://github.com/orgs/ipfs/projects/11)

⚠️⚠️⚠️ **If you want to publish a blog post, don't do it here yet** — use [the existing blog](https://github.com/ipfs/blog) instead!

## Workflow for post authors/editors

This site uses the `staging` branch as a work-in-progress scratchpad for blog content. Once approved for go-live, `staging` is merged into `main`; the production site is automatically deployed from the latest `main` using [Fleek](https://fleek.co/).

Post authors and editors are strongly encouraged to use this site's [Forestry](https://forestry.io) integration for drafting and editing, including perks like WYSIWYG editing and image upload/crop tools. If you're an IPFS core team member and don't have Forestry access, contact @jessicaschilling to arrange access and a quick orientation session. (If you prefer writing in Markdown, don't fear: Forestry also has a raw Markdown view.) 

### Forestry tips

Foo

### To deploy to the live site

Forestry writes directly to `staging`, with previews available at https://ipfs-blog-staging.on.fleek.co/. Once a staged post is ready to go live, please PR `staging` to `main` using [this handy shortcut](https://github.com/ipfs/ipfs-blog/compare/main...staging?expand=1). *Note that if multiple posts are in-flight in staging and only one is approved to go live, your PR may need some massaging.*

### Just want to add a new "link card"?

Feel free to use Forestry to add details for "link cards" like videos, release notes or news items, and submit a PR for review/merge. However, if you're in a hurry, simply fill in the [public submission form](https://airtable.com/shrNH8YWole1xc70I) and a site maintainer will take care of the rest.

## Workflow for site developers

**Important!** All site development forks/PRs (as opposed to blog posts) should be based on and merged into `main`. 

This site is built in [Vuepress](https://vuepress.vuejs.org/guide/), and uses Vue/JavaScript for functional code and Markdown for post content.

### Build and run locally
To build a local copy, run the following:

1. Clone this repository:

   ```bash
   git clone https://github.com/ipfs/ipfs-blog.git
   ```

1. Move into the `ipfs-blog` folder and install the NPM dependencies:

   ```bash
   cd ipfs-docs
   npm install
   ```

1. Boot up the application in _dev mode_:

   ```bash
   npm start
   ```

1. Open [localhost:8080](http://localhost:8080) in your browser.
1. Close the local server with `CTRL` + `c`.
1. To restart the local server, run `npm start` from within the `ipfs-blog` folder.

### PR and preview
Once you're happy with your local changes, please make a PR against the `main` branch. Including detailed notes on your PR helps smooth the approval and deployment process, so make sure to thoroughly document your changes, including screenshots to depict any changes in UI.

PRs against `main` will automatically generate Fleek previews for ease of review. A successful run of a Fleek preview build generates a live preview viewable by clicking `Details` in the `fleek/build` check at the bottom of your PR page:
![image](https://user-images.githubusercontent.com/1507828/110034382-9dbb5b80-7cf7-11eb-89a4-7772970677d3.png)

## Maintainers

This site is under active maintenance by members of the core [IPFS team](https://ipfs.io/team/).

## License

© Protocol Labs | Code is licensed with the [MIT](LICENSE) License. Except as noted, other content licensed [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/us/).
