---
title: 'Migrating From Brave to IPFS Desktop'
description: ' Complete Guide to Migrating Your IPFS Data'
date: 2024-08-13
header_image: '/braveinfobar2.png'
tags:
- brave
- browsers
- IPFS Desktop
---

If you've been using Brave browser's built-in IPFS node, you might be ready to
take your IPFS experience to the next level :^)

Migrating to IPFS Desktop application offers more control, timely updates,
better performance, and additional features.

This guide will walk you through the process of moving your IPFS data from
Brave to IPFS Desktop, ensuring you don't lose any of your important files.

## Prerequisites

Before we begin, you'll need to install two key components that will replace Brave.

### IPFS Desktop

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) is a full node application that runs on your computer, managing
your IPFS repository and providing a graphical interface for IPFS operations.

Download IPFS Desktop by following the [install guide here](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).
Choose the appropriate version for your operating system ([Windows](https://docs.ipfs.tech/install/ipfs-desktop/#windows), [macOS](https://docs.ipfs.tech/install/ipfs-desktop/#macos), or [Linux](https://docs.ipfs.tech/install/ipfs-desktop/#ubuntu)) and follow the installation instructions.

### IPFS Companion browser extension:

[IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) is a browser extension that allows you to interact with IPFS
content directly from your web browser and support `ipfs://` and `ipns://` in address bar.

The easiest way to install IPFS Companion is through your browser's specific extensions and add-ons store:

| [Firefox](https://www.mozilla.org/firefox/new/) \| [Firefox for Android](https://play.google.com/store/apps/details?id=org.mozilla.firefox)          | [Chrome](https://www.google.com/chrome/) \| [Brave](https://brave.com/) \| [Opera](https://www.opera.com/) \| [Edge](https://www.microsoftedgeinsider.com/)                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Install From AMO](https://ipfs.io/ipfs/QmWNa64XjA78QvK3zG2593bSMizkDXXcubDHjnRDYUivqt)](https://addons.mozilla.org/firefox/addon/ipfs-companion/) | [![Install from Chrome Store](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) |

## Easy Option: Moving the IPFS Repository

The IPFS repository, often referred to as `$IPFS_PATH` (aka `.ipfs`), contains all your IPFS data.

If you did not use IPFS Desktop before, you can simply swap `.ipfs` created by IPFS Desktop with the one from your Brave node.
This is the simplest way of migrating your node, all data, pins, IPNS keys, addresses and PeerID will remain the same and IPNS publishing will continue working.

First, we need to locate your Brave IPFS repository:

<!-- TODO: confirm these paths are valid -->
- Windows: `%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\Default\ipfs`
- macOS: `~/Library/Application Support/BraveSoftware/Brave-Browser/Default/ipfs`
- Linux: `~/.config/BraveSoftware/Brave-Browser/Default/ipfs`

Now, we'll move this repository to the default location for IPFS Desktop:

- Windows: `%USERPROFILE%/.ipfs`
- macOS and Linux: `~/.ipfs`

To move the directory, you can use the following commands in your terminal or command prompt:

For Windows:

```
move "%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\Default\ipfs" "%USERPROFILE%\.ipfs"
```

For macOS and Linux:

```
mv ~/Library/Application\ Support/BraveSoftware/Brave-Browser/Default/ipfs ~/.ipfs
```

<!-- TODO: decide if we even go here
## Advanced  Option: Manually Moving MFS and IPNS keys

- TODO: what if I already had IPFS DEsktop and data there?
- TODO: Copying the MFS Root
- TODO: copying IPNS keys
  - TODO: re-publishing IPNS  from new node
-->

## Conclusion

Congratulations! You've successfully migrated your IPFS data from Brave to IPFS Desktop.

If you encountered any challenges during the migration process or need further assistance, please don't hesitate to leave a comment in the thread below. The community is here to help, and your feedback can also assist others who might be going through the same process.
