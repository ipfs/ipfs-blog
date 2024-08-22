---
title: 'Migrating from Brave to IPFS Desktop'
description: 'Complete Guide to Migrating Your IPFS Data'
date: 2024-08-22
header_image: '/blog-post-placeholder.png'
tags:
- brave
- browsers
- IPFS Desktop
---


Brave browser users who have been relying on the built-in IPFS node functionality will soon need to find an alternative solution. Brave has [announced](https://github.com/brave/brave-browser/issues/37735) the removal of support for running IPFS nodes on behalf of users, which will be implemented in an upcoming stable release ([v1.69.153](https://github.com/brave/brave-browser/blob/56f6418ac301a4b015c1188786f6f4497b6ac393/CHANGELOG_DESKTOP.md#169153)). While this change may be disappointing for some, it presents an opportunity to adopt a more robust and flexible IPFS setup.

This guide will walk you through the process of moving your IPFS data from Brave to IPFS Desktop, ensuring you don't lose any of your important files, and keep access to IPFS resources in your browser.

## Why Migrate?

- **Imminent Removal:** The IPFS node feature in Brave is being [phased out](https://github.com/brave/brave-browser/issues/37735#issuecomment-2247764368) and will happen once v1.69.122 or later is released ([schedule](https://github.com/brave/brave-browser/wiki/Brave-Release-Schedule#release-channel-dates)). To ensure uninterrupted access to your IPFS data, migration is necessary, especially if you pinned something, or published with IPNS.
- **Limitations of the Brave Implementation:** The Brave-integrated IPFS node had some drawbacks. The access to WebUI was hidden behind `brave://ipfs-internal`. DNSLink detection was based on HTTP header rather than DNS TXT lookup. Running IPFS node required the Brave browser to be open for content and IPNS announcements to function, and in early days did not even start `ipfs daemon` before `ipfs://` was used for the first time, leading to content from local repository not being provided to IPFS Mainnet peers.
- **Improved Functionality:** Migrating to a standalone IPFS solution like IPFS Desktop offers several advantages: (1) Automatic security and performance updates without relying on browser updates. (2)  Ability to customize your IPFS node configuration, no vendor-specific overrides. (3) Browser-agnostic background service, allowing your node to run independently of any specific browser. (4) Easy access to your files in WebUI via system status bar icon.

### Time Investment

Migrating your IPFS node is a relatively quick process. Most users can complete the transition in 5 to 15 minutes, depending on their familiarity with IPFS and their system configuration.

## Prerequisites

Before we begin, you'll need to install two key components that will replace the functionality that was in Brave with an IPFS stack that will still work in Brave, but also in most other browsers.

- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) is a full node application that runs on your computer, managing your IPFS repository and providing a graphical interface for IPFS operations. Download IPFS Desktop by following the [install guide here](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions). Choose the appropriate version for your operating system ([Windows](https://docs.ipfs.tech/install/ipfs-desktop/#windows), [macOS](https://docs.ipfs.tech/install/ipfs-desktop/#macos), or [Linux](https://docs.ipfs.tech/install/ipfs-desktop/#ubuntu)) and follow the installation instructions.
- [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) is a browser extension that allows you to interact with IPFS content directly from your web browser, load it from your local IPFS node, and keep provisional support for `ipfs://` and `ipns://` in address bar. The easiest way to install IPFS Companion is through your browser's specific [extensions and add-ons store](https://docs.ipfs.tech/install/ipfs-companion/#install).

## Moving the Brave IPFS Repository

The IPFS repository, often referred to as `$IPFS_PATH` (aka `.ipfs`), contains all your IPFS data, IPNS keys, and PeerID identify of your IPFS node. Brave used the same repository format as Kubo, making migration to IPFS Desktop relatively easy.

If you did not use IPFS Desktop before, you can simply swap `.ipfs` created by IPFS Desktop with the one from your Brave node. This is the simplest way of migrating your node, all data, pins, IPNS keys, addresses and PeerID will remain the same and IPNS publishing will continue working.

First, we need to locate your Brave IPFS repository:

<!-- TODO: confirm these paths are valid -->
- Windows: `%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\Default\brave_ipfs`
- macOS: `~/Library/Application Support/BraveSoftware/Brave-Browser/Default/brave_ipfs`
- Linux: `~/.config/BraveSoftware/Brave-Browser/brave_ipfs`

To conform you've found the right directory, open `brave_ipfs/config` and write down the value of `PeerID`, it will act as unique identifier of your Brave repository.

Now, we'll move this repository to the default location for IPFS Desktop:

- Windows: `%USERPROFILE%/.ipfs`
- macOS and Linux: `~/.ipfs`

Before proceeding, make sure the `.ipfs` does not exist at the destination. If you already had `.ipfs`, shut down IPFS Desktop and rename `.ipfs` to `.ipfs.old` as a precaution to avoid data loss.

Now, move the `brave_ipfs` directory from Brave profile, to the location expected by IPFS Desktop.

You can use the following commands in your terminal or command prompt:

For Windows:

```
IF NOT EXIST "%USERPROFILE%\.ipfs" MOVE "%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\Default\brave_ipfs" "%USERPROFILE%\.ipfs"
```

For macOS:
```
test ! -d ~/.ipfs && mv ~/Library/Application\ Support/BraveSoftware/Brave-Browser/Default/brave_ipfs ~/.ipfs
```

Linux:
```
test ! -d ~/.ipfs && mv ~/.config/BraveSoftware/Brave-Browser/brave_ipfs ~/.ipfs
```

## Starting IPFS Desktop with Migrated IPFS Repository

Once move is completed, you can confirm it was successful if `.ipfs/config` exists, and includes `PeerID` of your Brave node.

If `.ipfs/config` exists, you can now start IPFS Desktop. If everything went as expected, your IPFS node should start and run without Brave.

## Updating RPC URL in IPFS Companion

Brave used custom ports: `45001` for RPC and `48080` for Gateway. If IPFS Companion browser extension does not detect your node after migrating repository from Brave, you need to update RPC and Gateway URLs in Companion preferences.

- Change the **Kubo RPC URL** from `http://127.0.0.1:5001` to `http://127.0.0.1:45001`
- Change the **Local Gateway** from `http://127.0.0.1:8080` to `http://127.0.0.1:48080`

## Conclusion

Congratulations! You've successfully migrated your IPFS data from Brave to IPFS Desktop.

If you encountered any challenges during the migration process or need further assistance, please don't hesitate to leave a comment in the thread below. The community is here to help, and your feedback can also assist others who might be going through the same process.

## FAQ

### Is it possible to move `brave_ipfs` to a different location than `.ipfs`?

Yes, but one needs to set `IPFS_PATH` environment variable before running IPFS Desktop to point at the new location.

### Can Kubo be used instead?

Yes, advanced users who are comfortable with command-line can use [Kubo](https://docs.ipfs.tech/install/command-line/) instead of IPFS Desktop, and run it against a custom `IPFS_PATH` to run a headless daemon, or perform selective manual migration via CLI.

For example, to export contents of MFS to a CAR, one could:
```
$ export IPFS_PATH=/path/to/.ipfs
$ ipfs dag export "$(ipfs files stat / | head -1)" > mfs-backup.car
$ [etc]
```
