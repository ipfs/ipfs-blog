---
title: "IPIP-0499: Updating IPFS Standards for Consistent, Reproducible CIDs"
description: "IPIP-0499 makes IPFS CIDs deterministic and consistent across all implementations."
author: Michelle Lee
date: 2026-03-09
permalink: '/2026-03-reproducible-cids/'
canonicalUrl: https://ipfsfoundation.org/ipip-0499-updating-ipfs-standards-for-consistent-reproducible-cids/
header_image: '/2026-03-muted-teal-grid.png'
tags:
  - ipfs
  - cid
  - ipip
---

# IPIP-0499: Updating IPFS Standards for Consistent, Reproducible CIDs

_Cross-posted from the [IPFS Foundation blog](https://ipfsfoundation.org/ipip-0499-updating-ipfs-standards-for-consistent-reproducible-cids/)._

If you've worked with IPFS, you know that a content identifier (CID) is supposed to be a fingerprint for your data: feed in the same data, get the same CID. In practice, that hasn't been true. The same file or directory uploaded with [Kubo](https://github.com/ipfs/kubo), [Helia](https://github.com/ipfs/helia), or [Singularity](https://github.com/data-preservation-programs/singularity) could produce three different CIDs, because each tool uses different settings for how to split files into chunks, how wide to build the internal DAG tree, and when to switch to a HAMT structure for large directories.

To fix this, [IPIP-0499](https://specs.ipfs.tech/ipips/ipip-0499) has been merged into the IPFS specification. It introduces two named configuration profiles — `unixfs-v1-2025` and `unixfs-v0-2015` — each defining a complete set of DAG construction parameters.

### Benefits: Predictable CIDs, Faster Verification

The most immediate benefit is that CIDs are now deterministic. Previously, comparing two CIDs for "the same file" could return a false negative simply because the tools that created them used different chunk sizes or DAG widths. With this update, identical input processed by any implementation conforming to the same profile will always produce the same CID. That's the behavior most developers intuitively expect, and it's what makes content-addressing useful as a verification primitive.

A second major gain is verification efficiency. Without profile guarantees, confirming that two CIDs represent the same content requires fetching the underlying data and computing and comparing their Merkle DAGs. With deterministic CIDs, you can compare the CIDs directly without fetching the data itself. This matters especially at scale.

Finally, `unixfs-v1-2025` is a more performant default. Switching from 256 KiB chunks to 1 MiB, and from 174 to 1024 links per DAG node, produces shallower trees: a 1 TiB file requires 3 levels of DAG traversal instead of 4, with roughly 4x fewer total nodes. That translates to faster random access and seeking in large files, and fewer CIDs being announced to public routing infrastructure like the Amino DHT.

### Current Implementation Support

IPIP-499 is now supported across many implementations in Go ([kubo 0.40](https://github.com/ipfs/kubo/releases/tag/v0.40.0), [boxo 0.37](https://github.com/ipfs/boxo/releases/tag/v0.37.0), [go-ipfs-cmds 0.16](https://github.com/ipfs/go-ipfs-cmds/releases/tag/v0.16.0)) and JS ([helia/unixfs 7.0.3](https://www.npmjs.com/package/@helia/unixfs), [ipfs-unixfs-importer 16.1.1](https://github.com/ipfs/js-ipfs-unixfs/releases/tag/ipfs-unixfs-importer-16.1.1)). You can read the full specification, including detailed parameter comparison tables, at [specs.ipfs.tech/ipips/ipip-0499](https://specs.ipfs.tech/ipips/ipip-0499/).

### Acknowledgements

Special thanks to [@lidel](https://github.com/lidel/), [@2color](https://github.com/2color), and to everyone who contributed to the [forum discussion](https://discuss.ipfs.tech/t/should-we-profile-cids/18507/13) and [review](https://github.com/ipfs/specs/pull/499).
