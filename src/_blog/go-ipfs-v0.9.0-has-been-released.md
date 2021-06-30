---
tags:
- DHT
- DAG
- go-ipfs
- release notes
- pinning
title: go-ipfs v0.9.0 has been released!
description: We're happy to announce go-ipfs 0.9.0, making go-ipfs more configurable
  w/ some fun experiments to boot!
date: 2021-06-24
permalink: "/2021-06-24-go-ipfs-0-9-0/"
translationKey: ''
header_image: "/ipfs-blog-release-0-9-0.jpg"
author: Adin Schmahmann

---
# **go-ipfs v0.9.0 Release**

We're happy to announce go-ipfs 0.9.0. This release makes go-ipfs even more configurable with some fun experiments to boot. We're also deprecating or removing some uncommonly used features to make it easier for users to discover the easy ways to use go-ipfs safely and efficiently.

As usual, this release includes important fixes, some of which may be critical for security. Unless the fix addresses a bug being exploited in the wild, the fix will _not_ be called out in the release notes. Please make sure to update ASAP. See our [release process](https://github.com/ipfs/go-ipfs/tree/master/docs/releases.md#security-fix-policy) for details.

## 🔦 **Highlights**

### 📦 **Exporting of DAGs via Gateways**

Gateways now support downloading arbitrary IPLD graphs via the `/api/v0/dag/export` endpoint. This endpoint works in the same way as the `ipfs dag export` command.

One major thing this enables is ability to verify data downloaded from public gateways. If you go to [https://somegateway.example.net/ipfs/bafyexample](https://somegateway.example.net/ipfs/bafyexample "https://somegateway.example.net/ipfs/bafyexample") you are using the old school HTTP transport, and trusting that the gateway is being well behaved. However, if you download the graph as a [DAG archive](https://ipld.io/specs/transport/car/) then it is possible to verify that the data you downloaded does in fact match `bafyexample` .

### ☁ **Custom DNS Resolvers**

Resolution of DNS records for DNSLink and DNSAddrs means that names are sent in cleartext between the operating system and the DNS server provided by an ISP. In the past, the only way to customize DNS resolution in IPFS stack was to set up own DNS proxy server.

There is now the ability to [customize DNS resolution](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#dns) and override the default resolver from the OS with [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) (DoH) one. We made it really flexible: override can be applied globally, or per specific [TLD](https://en.wikipedia.org/wiki/Top-level_domain)/[FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name). Examples can be found in the [documentation](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#dns).

### 👪 **Support for non-ICANN DNSLink names**

Building off of the support for custom DNS resolvers it is now possible to create DNSLink names not handled by ICANN and choose how that domain name will be resolved. An example of this is how ENS is supported, despite `.eth` not being an ICANN TLD you can point `.eth` to any ENS resolver you want (including a local one).

While go-ipfs may have some DoH defaults for a few popular non-ICANN DNSLink names (e.g. ENS), you are free to use any protocol for a naming system and as long as it exposes a DNSLink record via a DNS endpoint you can make it work.

### 🖥️ **Updated to the latest WebUI**

Our web interface now includes experimental support for pinning services, and various updates to _Files_ and _Peers_ screens.

Remote pinning services added via the `ipfs pin remote service add` command are already detected, one can also add one from _Settings_ screen, and it will appear in _Set pinning_ interface on the _Files_ screen.

Data presented on the _Peers_ screen can now be copied by simply clicking on a specific cell, and a list of open streams gives better insight into how a local node interacts with a specific peer.

See release notes for [ipfs-webui v2.12](https://github.com/ipfs/ipfs-webui/releases/tag/v2.12.0) for screenshots and more details.

### 🔑 **IPNS keys can now be exported via the CLI without stopping the daemon**

`ipfs key export` no longer requires interrupting `ipfs daemon` ✨

### 🕸 **Experimental DHT Client and Provider System**

An area of go-ipfs that has been historically tricky is how go-ipfs finds who has the data they are looking for. While the IPFS Public DHT is only one of the ways go-ipfs can find data it tends to be an important one. While since go-ipfs v0.5.0 the time to find content in the network has dropped significantly the time to put/get IPNS records or for a node to advertise the content it has still has much room for improvement.

We have been doing some experimenting and have an alternative DHT client that essentially trades off some resources and in return is much more performant. We have also included with the experimental DHT client a bulk provider system that takes advantage of the new client to more efficiently do many advertisements at a time

This work is quite new and still under development, however, the results so far have been promising especially for users with lots of data who have otherwise been having difficulty advertising their data into the IPFS Public DHT

As described in the experimental features [documentation](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client) the experimental client can be enabled using the command below (or modifying the config file).

`ipfs config --json Experimental.AcceleratedDHTClient true`

A few things to take note of when `AcceleratedDHTClient` is enabled:

* go-ipfs will likely use more resources then previously
* DHT queries will not be usable (i.e. finding which peers have some data, finding where a particular peer is, etc.) for the first 5-10 minutes of operation depending on your network conditions
* There is an `ipfs stats provide` command that will help you track your provide/reprovide usage, if you are providing lots of data you may want to consider how to reduce the amount you are providing (e.g. [Reprovider Strategies](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#reproviderstrategy) and/or [Strategic Providing](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#strategic-providing))

See the [documentation](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client) for more details.

### 🚶‍♀️ **Migrations**

#### **Migrations are now individually packaged**

While previously the go-ipfs [repo migration](https://github.com/ipfs/fs-repo-migrations) binary was monolithic and contained all migrations from previous go-ipfs versions the binaries are now packaged individually. However, the fs-repo-migrations binary is still there to help those who manually upgrade their repos to download all the individual migrations.

This means faster download times for upgrades, a much easier time building migrations for those who make use of custom plugins, and an easier time developing new migrations going forward.

#### **Configurable migration downloads enable downloading over IPFS**

Previously the migration downloader built into go-ipfs downloaded the migrations from [dist.ipfs.io](https://dist.ipfs.io/). While users could use tools like [ipfs-update](https://github.com/ipfs/ipfs-update) to download the migrations over IPFS or manually download the migrations (over IPFS or otherwise) themselves, this is now automated and configurable. Users can choose to download the migrations over IPFS or from any specified IPFS Gateway.

The configurable migration options are described in the config file [documentation](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#migration), although most users should not need to change the default settings.

The main benefit here is that users behind restrictive firewalls, or in offline/private deployments, won't have to run migrations manually, which is especially important for desktop use cases where go-ipfs is running inside of [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#readme) and [Brave](https://brave.com/ipfs-support/).

### 🍎 **Published builds for Apple M1 hardware**

Go now supports building for Darwin ARM64, and we are now publishing those builds

### 👋 **Deprecations and Feature Removals**

#### **The** `ipfs object` **commands are now deprecated**

In the last couple years most of the Object API's commands have become fulfillable using alternative APIs.

The utility of Object API's is limited to data in UnixFS-v1 (`dag-pb`) format. If you are still using it, it is highly recommended that you switch to the DAG `ipfs dag` (supports modern data types like `dag-cbor`) or Files `ipfs files` (more intuitive for working with `dag-pb`) APIs.

While the Object API and commands are still usable they are now marked as deprecated and hidden from users on the command line to discourage further use. We also updated their `--help` text to point at the modern replacements.

#### `X-Ipfs-Gateway-Prefix` **is now deprecated**

IPFS community moved towards dedicated Origins (DNSLink and [subdomain gateways](https://docs.ipfs.io/how-to/address-ipfs-on-web/#subdomain-gateway)) which are much easier to isolate and reason about.

Setting up `Gateway.PathPrefixes` and `X-Ipfs-Gateway-Prefix` is no longer necessary and support [will be removed in near future](https://github.com/ipfs/go-ipfs/issues/7702).

#### **Proquints support removed**

A little known feature that was not well used or documented and was more well known for the error message `Error:not a valid pro quint string` users received when trying to download invalid IPNS or DNSLink names (e.g. [https://dweb.link/ipns/badname](https://somegateway.example.net/ipfs/bafyexample "https://somegateway.example.net/ipfs/bafyexample")). We have removed support for proquints as they were out of place and largely unused, however proquints are [valid multibases](https://github.com/multiformats/multibase/pull/78) so if there is renewed interest in them there is a way forward.

#### **SECIO support removed**

SECIO was deprecated and turned off by default given the prevalence of TLS and Noise support, SECIO support is now removed entirely.

#### **Changelog**

For a full list of updates included in this release, you can review the changelog within [this release post](https://github.com/ipfs/go-ipfs/releases/tag/v0.9.0).

### **Thank you contributors!**

A huge thank you to [**everyone who contributed**](https://github.com/ipfs/go-ipfs/releases/tag/v0.9.0) patches and improvements in this release, all 45 of you! We couldn’t have made this happen without your help and feedback. ❤

### **Install, upgrade, and join us!**

You can get started by [**installing go-ipfs**](https://dist.ipfs.io/#go-ipfs) or upgrading to [**go-ipfs 0.9**](https://github.com/ipfs/go-ipfs/releases/tag/v0.9.0).

There are many ways to get involved with IPFS based on your skill set, interest, and availability. Please check out our [**contribution page**](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md) on GitHub for guidance and next steps.

This is an exciting time for IPFS and the web in general. Join us!
