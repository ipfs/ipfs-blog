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


In [2021](https://brave.com/blog/ipfs-support/), IPFS maintainers worked with the Brave team to add native support for IPFS in the Brave Browser. This was the first deep integration of an IPFS node in a browser.

After over three years, the Brave team [decided](https://github.com/brave/brave-browser/issues/37735) remove support for running IPFS node as we could not find a mutually agreeable set of terms to make this integration sustainable. The removal was implemented in the latest stable release ([v1.69.153](https://github.com/brave/brave-browser/blob/56f6418ac301a4b015c1188786f6f4497b6ac393/CHANGELOG_DESKTOP.md#169153)) which shipped on Aug 22nd. 

While this change may be disappointing for some, it presents an opportunity to adopt a more robust and flexible IPFS setup.

This guide will walk you through the process of moving your IPFS data from Brave to [IPFS Desktop](https://github.com/ipfs/ipfs-desktop), ensuring you don't lose any of your important files, and keep access to IPFS resources in your browser.

## Why Migrate?

- **Imminent Removal:** The IPFS node feature in Brave is being [phased out](https://github.com/brave/brave-browser/issues/37735#issuecomment-2247764368) and will happen once you update to v1.69.153 or later. Although upgrading will not delete data associated with the IPFS node, migration is necessary to ensure uninterrupted access to your IPFS data, especially if you pinned something, or published with IPNS.
- **Improved Functionality:** Migrating to a standalone IPFS solution like IPFS Desktop offers several advantages:
  1. Automatic security and performance updates without relying on browser updates.
  2. Ability to customize your IPFS node configuration, no vendor-specific overrides.
  3. Browser-agnostic background service, allowing your node to run independently of any specific browser.
  4. Easy access to your files in WebUI via system status bar icon, and right-click file manager integration (on Windows).

### Time Investment

Migrating your IPFS node is a relatively quick process. Most users can complete the transition in 5 to 15 minutes, depending on their familiarity with IPFS and their system configuration.

## Prerequisites

Before we begin, you'll need to install two key components that will replace the functionality that was in Brave with an IPFS stack that will still work in Brave, but also in most other browsers.

- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) is a full node application that runs [Kubo](https://github.com/ipfs/kubo/) on your computer, managing your IPFS repository and providing a graphical interface for IPFS operations. Download IPFS Desktop by following the [install guide here](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions). Choose the appropriate version for your operating system ([Windows](https://docs.ipfs.tech/install/ipfs-desktop/#windows), [macOS](https://docs.ipfs.tech/install/ipfs-desktop/#macos), or [Linux](https://docs.ipfs.tech/install/ipfs-desktop/#ubuntu)) and follow the installation instructions.
- [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) is a browser extension that allows you to interact with IPFS content directly from your web browser, load it from your local IPFS node, and keep provisional support for `ipfs://` and `ipns://` in address bar. The easiest way to install IPFS Companion is through your browser's specific [extensions and add-ons store](https://docs.ipfs.tech/install/ipfs-companion/#install).

## Moving the Brave IPFS Repository

The IPFS repository, often referred to as `$IPFS_PATH` (aka `~/.ipfs`), contains all your IPFS data, IPNS keys, and PeerID identify of your IPFS node. Brave's IPFS Node used the same repository format as Kubo, making migration to IPFS Desktop relatively easy.

If you did not use IPFS Desktop before, you can simply swap `.ipfs` created by IPFS Desktop with the one from your Brave node. This is the simplest way of migrating your node, all data, pins, IPNS keys, addresses and PeerID will remain the same and IPNS publishing will continue working.

First, we need to locate your Brave IPFS repository. The configuration directory for the Brave managed IPFS node can be found in the browser’s profile directory in a subfolder named `brave_ipfs`. You can find your IPFS directory by opening `brave://version/`, finding "Profile Path", and replacing `/Default` with `/brave_ipfs`:

<!-- TODO: confirm these paths are valid -->
- Windows: `%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\brave_ipfs`
  - example: `C:\Users\YOURUSERNAME\AppData\Local\BraveSoftware\Brave-Browser\User Data\brave_ipfs`
- macOS: `~/Library/Application Support/BraveSoftware/Brave-Browser/brave_ipfs`
  - example: `/Users/YOURUSERNAME/Library/Application Support/BraveSoftware/Brave-Browser/brave_ipfs`
- Linux: `~/.config/BraveSoftware/Brave-Browser/brave_ipfs`
  - example: `/home/YOURUSERNAME/.config/BraveSoftware/Brave-Browser/brave_ipfs`

To confirm you've found the right directory, open `brave_ipfs/config` and write down the value of `PeerID`, it will act as unique identifier of your Brave repository.

Now, we'll move this repository to the default location for IPFS Desktop:

- Windows: `%USERPROFILE%/.ipfs`
  - example: `C:\Users\YOURUSERNAME\.ipfs`
- macOS: `~/.ipfs`
  - example: `/Users/YOURUSERNAME/.ipfs`
- Linux: `~/.ipfs`
  - example: `/home/YOURUSERNAME/.ipfs`

Before proceeding, make sure the `.ipfs` directory does not exist at the destination. If you already had `.ipfs`, shut down IPFS Desktop and rename `.ipfs` to `.ipfs.old` as a precaution to avoid data loss.

Now, move the `brave_ipfs` directory from Brave profile, to the location expected by IPFS Desktop.

You can use the following commands in your terminal or command prompt:

For Windows:

```
IF NOT EXIST "%USERPROFILE%\.ipfs" MOVE "%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data\brave_ipfs" "%USERPROFILE%\.ipfs"
```

For macOS:
```
test ! -d ~/.ipfs && mv ~/Library/Application\ Support/BraveSoftware/Brave-Browser/brave_ipfs ~/.ipfs
```

Linux:
```
test ! -d ~/.ipfs && mv ~/.config/BraveSoftware/Brave-Browser/brave_ipfs ~/.ipfs
```

## Starting IPFS Desktop with Migrated IPFS Repository

Once move is completed, you can confirm it was successful if `.ipfs/config` exists in your home directory, and includes `PeerID` of your Brave node.

If `.ipfs/config` exists, you can now start IPFS Desktop. If everything went as expected, your IPFS node should start and run without Brave.

## Optional: Adjusting Configuration

Brave-integrated IPFS node had some drawbacks. The access to WebUI was hidden behind `brave://ipfs-internal`. DNSLink detection was based on HTTP header rather than DNS TXT lookup. Running IPFS node required the Brave browser to be open for content and IPNS announcements to function, and in early days did not even start `ipfs daemon` before `ipfs://` was used for the first time, leading to content from local repository not being provided to IPFS Mainnet peers. Repository cache was artificaially limited to 1GiB in size, and evicted along with browser cache, degrading the utility of peers cohosting casually browsed data.

Switching to IPFS Desktop+Companion solves most of these shortcomings, however you may need to adjust some settings to get full benefit of a standalone IPFS node.

### Updating Cache Size

[`Datastore.StorageMax`](https://github.com/ipfs/kubo/blob/master/docs/config.md#datastorestoragemax) controls how much space is allocated to data that is not pinned, such as visited IPFS websites, or other content you've viewed but do not want to pin forever. Having a bigger cache improves the data availability on the network, making websites more resilient.

To increase IPFS block cache size ([`Datastore.StorageMax`](https://github.com/ipfs/kubo/blob/master/docs/config.md#datastorestoragemax)) from 1GB to at least 100GB (the current default in Kubo):
```
$ ipfs config Datastore.StorageMax
1GB
$ ipfs config Datastore.StorageMax 100GB                                                                                                                                                   ~
```

### Updating RPC URL in IPFS Companion

Brave used custom ports: `45001` for RPC and `48080` for Gateway.

If IPFS Companion browser extension does not detect your node after migrating repository from Brave, you need to update RPC and Gateway URLs in Companion preferences.

- Change the **Kubo RPC URL** from `http://127.0.0.1:5001` to `http://127.0.0.1:45001`
- Change the **Local Gateway** from `http://127.0.0.1:8080` to `http://127.0.0.1:48080`

Alternative is to update `.ipfs/config` and replace all occurences of `45001` with `5001` and `48080` with `8080`. Make sure you do not have anything listening on these ports before you make the change.

## Conclusion

Congratulations! You've successfully migrated your IPFS data from Brave to IPFS Desktop.

If you encountered any challenges during the migration process or need further assistance, please don't hesitate to leave a comment in the thread below. The community is here to help, and your feedback can also assist others who might be going through the same process.

## FAQ

### Is it possible to move `brave_ipfs` to a different location than `.ipfs`?

Yes, but you need to set the `IPFS_PATH` environment variable before running IPFS Desktop to point at the new location.

See [How does IPFS Desktop select the IPFS repo location?](https://github.com/ipfs/ipfs-desktop/?tab=readme-ov-file#how-does-ipfs-desktop-select-the-ipfs-repo-location)

### Where can I find FAQ/Troubleshooting for IPFS Desktop?

See [github.com/ipfs/ipfs-desktop/#faq--troubleshooting](https://github.com/ipfs/ipfs-desktop/?tab=readme-ov-file#faq--troubleshooting)

### Can Kubo be used instead?

Yes, advanced users who are comfortable with command-line can use [Kubo](https://docs.ipfs.tech/install/command-line/) instead of IPFS Desktop, and run it against a custom `IPFS_PATH` to run a headless daemon, or perform selective manual migration via CLI.

### How to export my Files (MFS) with Kubo CLI?

To export contents of MFS to a CAR, run the following commands:
```
$ export IPFS_PATH=/path/to/brave_ipfs
$ export MFS_ROOT="$(ipfs files stat / | head -1)"
$ ipfs dag export $MFS_ROOT > mfs-backup.car
```

Then, it can be imported on another node and added to MFS there:

```
$ export IPFS_PATH=/path/to/some/other/.ipfs
$ ipfs dag import ./mfs-backup.car
$ ipfs files cp /ipfs/$MFS_ROOT /brave_mfs_backup
$ ipfs pin rm $MFS_ROOT
```

Note: low-level pin (created by `dag import`) can be removed (`pin rm`) after import because presence in MFS is enough to protect data from garbage-collection.

### How to manually migrate my IPNS names with Kubo CLI?

To export IPNS keys, and re-publish with them, see `ipfs key --help` and `ipfs name --help`.

### How to fix `Error: ipfs repo needs migration, please run migration tool.` ?

IPFS Desktop should run migrations the first time you start, but if you use Kubo CLI
you may need to run `ipfs daemon --migrate=true` once, to upgrade to latest version.
