---
date: 2024-04-11
permalink: /verified-fetch/
title: 'Verified and Resilient IPFS Retrieval with Verified Fetch'
description: ''
author: Daniel Norman
header_image: /dapps-ipfs/header.png
tags:
  - ipfs
  - dapps
  - Helia
  - ipns
  - ens
---

## Announcing @helia/verified-fetch

We’re thrilled to announce the `@helia/verified-fetch` npm package is now ready for broader adoption. Verified Fetch is a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-like library for fetching IPFS, IPNS, and DNSLink content on the web and JS runtimes. [Try it out](https://www.npmjs.com/package/@helia/verified-fetch) and let us know what you think.

This blog post goes over some of the challenges of IPFS retrieval in JS land. If you're are familiar with these, feel free to jump ahead to [Solution: Verified Fetch](#solution-verified-fetch)

## Problem: verified IPFS retrieval on the web is hard

IPFS stands out as the leading decentralized network for distributing content-addressed data, spanning a wide range of use cases such as off-chain voting, NFTs, [censorship-resistant Wikipedia](https://blog.ipfs.tech/24-uncensorable-wikipedia/), and dapp distribution.

However, developing web applications for the browser with an IPFS implementation capable of verified content retrieval has been an ongoing challenge for developers. There are several reasons: inherent constraints of the Web Platform, the apparent complexity of IPFS, and the historical lack of focused tooling for verified IPFS retrieval on the Web.

For this reason, many developers use a **trusted gateway** and call it a day. That's understandable and speaks to the ease and utility of gateways as an abstraction of IPFS.

### IPFS Gateways are a useful abstraction for IPFS retrieval

Trusted IPFS Gateways abstract much of the complexity (peer-to-peer connectivity, content routing, content retrieval, verification) of IPFS with a straightforward HTTP API to the IPFS network:

<img alt="gateway architecture diagram" src="../assets/verified-fetch/gateways.png" width="500">

The beauty of IPFS Gateways is in how simple they are to use: you append the CID to the URL of the Gateway and all IPFS magic is handled by the gateway for you.

For example, fetching an image with the CID: [`bafk...beom`](https://cid.ipfs.tech/#bafkreie7ohywtosou76tasm7j63yigtzxe7d5zqus4zu3j6oltvgtibeom) is as simple as constructing the URL: `https://ipfs.io/ipfs/bafkreie7ohywtosou76tasm7j63yigtzxe7d5zqus4zu3j6oltvgtibeom` which can be passed to the `src` attribute of an `<img>`, as follows:

<img class="py-4" alt="image loaded from an IPFS gateway" src="https://ipfs.io/ipfs/bafkreie7ohywtosou76tasm7j63yigtzxe7d5zqus4zu3j6oltvgtibeom" width="350">

### Trusting an IPFS Gateway without verifying is an anti-pattern

**Nonetheless, fetching from a trusted IPFS gateway without verifying is an anti-pattern** and goes against [the principles of IPFS](https://specs.ipfs.tech/architecture/principles/#verification-matters).

Content addressing in IPFS frees you from the model of a single canonical source for data. This is a powerful concept from which the benefits of IPFS stem: resilience, censorship resistance, and trustlessness. But, **fully reaping the benefits of IPFS requires verification**.

### Verification allows resilience through multi-source fetching

Verification allows you to fetch CIDs from anyone –be it a provider or a gateway– who claims to have it, without needing to trust them. If one provider for a CID is unavailable, unreachable, or censored, you can try another.

### Trustless IPFS Gateways enable verification

[Trustless IPFS Gateways](https://specs.ipfs.tech/http-gateways/trustless-gateway/) have been gaining steam as a means of enabling verification and its downstream benefits with the simplicity of IPFS Gateways.

Trustless IPFS Gateways' response types are always fully verifiable: clients can decide between a [raw block](https://docs.ipfs.tech/concepts/glossary/#block) or a [CAR stream](https://docs.ipfs.tech/concepts/glossary/#car).

Trustless IPFS Gateways are useful for browsers because they can be composed in a way that unleashes many of the aforementioned benefits of IPFS and content addressing.

## Solution: Verified Fetch

[`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch) or simply **Verified Fetch** is a new library by [The Shipyard team](https://blog.ipfs.tech/shipyard-hello-world/) that makes verified retrieval from trustless gateways easy.

It's the culmination of multiple streams of work we undertook to bring deeper IPFS integrations to browsers and improve the development experience with IPFS.

<!-- These efforts include:
- [Delegated routing over HTTP](https://specs.ipfs.tech/routing/http-routing-v1/) and [hosted someguy](https://docs.ipfs.tech/concepts/public-utilities/#delegated-routing)
- [Trustless Gateway](https://specs.ipfs.tech/http-gateways/trustless-gateway/)
- [Helia](https://github.com/ipfs/helia/): lean, modular, and modern TypeScript implementation of IPFS for the prolific JS and browser environments.
- [Helia/http](https://github.com/ipfs/helia/tree/main/packages/http): A lightweight version of Helia on IPFS over HTTP with Trustless Gateways -->

### Familiar, like the Fetch API

Verified Fetch is modeled after the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and returns [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) making it easy to adopt.

For example, fetching the CID of a JSON object is as simple

```ts
import { verifiedFetch } from '@helia/verified-fetch'
const resp = await verifiedFetch(
  'ipfs://baguqeeradnk3742vd3jxhurh22rgmlpcbzxvsy3vc5bzakwiktdeplwer6pa'
)
const obj = await resp.json()
```

Under the hood, Verified Fetch will handle both fetching from trustless gateways and verification:

<p class="codepen" data-height="350" data-default-tab="js,result" data-slug-hash="oNOyarL" data-user="2color" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/2color/pen/oNOyarL">
  Fetching a CID with @helia/verified-fetch example</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Fast and Resilient Retrieval with Multiple Gateways

Verified Fetch supports retrieval from multiple trustless gateways, ensuring both performance and resilience. It comes [pre-configured with three default gateways](https://github.com/ipfs/helia/blob/b67ac5f16eca1df5534c985045250bdb334a85cf/packages/block-brokers/src/trustless-gateway/index.ts#L6-L15), but can be easily customized:

```ts
import { createVerifiedFetch } from '@helia/verified-fetch'

const verifiedFetch = await createVerifiedFetch({
  gateways: ['https://trustless-gateway.link', 'https://cloudflare-ipfs.com'],
})
```

### Mutable Pointers

Mutable pointers are a powerful way to have a stable pointer that can be updated over time. In the IPFS ecosystem, there are two approaches to this: [IPNS](https://docs.ipfs.tech/concepts/ipns/) and [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

Verified Fetch can resolve, fetch and verify both using the `ipns://` path prefix.

### Resolving IPNS names

IPNS names are resolved using the [Delegated routing over HTTP](https://specs.ipfs.tech/routing/http-routing-v1/) provided by the [`https://delegated-ipfs.dev` endpoint](https://docs.ipfs.tech/concepts/public-utilities/#delegated-routing).

<iframe height="300" style="width: 100%;" scrolling="no" title="Resolving and Fetching a DNSLink with @helia/verified-fetch example" src="https://codepen.io/2color/embed/BaEVMWW?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/BaEVMWW">
  Resolving and Fetching a DNSLink with @helia/verified-fetch example</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Note that you can deploy and configure your own [someguy](https://github.com/ipfs/someguy) instance or Delegated Routing endpoint.

To configure it, pass the endpoint to the `routers` config option:

```ts
import { createVerifiedFetch } from '@helia/verified-fetch'

const verifiedFetch = await createVerifiedFetch({
  routers: ['https://delegated-ipfs.dev'],
})
```

### Resolving DNSLink domains

DNSLink domains are resolved using configurable DNS over HTTPS endpoint:

<p class="codepen" data-height="350" data-default-tab="js,result" data-slug-hash="YzMvRmv" data-user="2color" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/2color/pen/YzMvRmv">
  Resolving and Fetching a DNSLink with @helia/verified-fetch example</a></span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### ENS names are also supported with DNSLink

Verified Fetch can also resolve [ENS names](https://ens.domains/) that have the [Contenthash record](https://docs.ens.domains/ensip/7) set with the help of [EthDNS](https://eth.link/) (provides a DNS bridge to ENS names). To do so, pass a DNS over HTTP EthDNS endpoint to the `dnsResolvers` option, like the [one provided by eth.limo](https://github.com/ethlimo/documentation/blob/master/dns-over-https/doh.md):

<!-- ```ts
import { createVerifiedFetch } from '@helia/verified-fetch'
import { dnsJsonOverHttps } from '@multiformats/dns/resolvers'

const verifiedFetch = await createVerifiedFetch({
  dnsResolvers: {
    'eth.': dnsJsonOverHttps('https://dns.eth.limo/dns-query'),
    '.': dnsJsonOverHttps('https://cloudflare-dns.com/dns-query')
  }
})
const resp = await verifiedFetch('ipns://vitalik.eth/images/scaling-files/cryptokitties.png')
``` -->

The following example uses Verified Fetch to fetch and verify an image from Vitalik's website:

<iframe height="500" style="width: 100%;" scrolling="no" title="Resolving and Fetching a DNSLink with @helia/verified-fetch and custom DoH endpoint example" src="https://codepen.io/2color/embed/wvZXRPa?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/wvZXRPa">
  Resolving and Fetching a DNSLink with @helia/verified-fetch and custom DoH endpoint example</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Supports a wide range of data types

As you may have noticed, you can use Verified Fetch to fetch a wide range of data types. Verified Fetch abstracts much of the complexity of IPLD codecs, supporting [UnixFS](https://docs.ipfs.tech/concepts/file-systems/#unix-file-system-unixfs), dag-cbor, and dag-json out of the box. This frees you to focus on your application. The `text()`, `.blob()`, and .`arrayBuffer()` methods will work as expected without a detailed content type.

By default, if the response can be parsed as JSON, Verified Fetch sets the `Content-Type` header of the Response object to as `application/json`, otherwise it sets it as application/octet-stream.

[You can also pass the `Accept` header](https://github.com/ipfs/helia-verified-fetch/tree/main/packages/verified-fetch#the-accept-header) to override certain response processing, or to ensure that the final Content-Type of the response is the one that is expected.

### Customizable

By default, Verified Fetch uses [Helia/http](https://github.com/ipfs/helia/tree/main/packages/http): a lightweight version of Helia on IPFS over HTTP with Trustless Gateways. However, you can pass an instance of Helia that is customized to your needs. A common use-case might be when running on Node.js where you might want to lean more heavily on direct retrieval using Bitswap over TCP.

### 📕 Docs & Examples

In addition to the embedded examples above, check out the [README](https://github.com/ipfs/helia-verified-fetch/tree/main/packages/verified-fetch) for a more elaborate overview of usage patterns and reconfigurability.

We also have a [ready-to-run example](https://github.com/ipfs-examples/helia-examples/tree/main/examples/helia-browser-verified-fetch) showing `@helia/verified-fetch` in the browser handling different content types.


## Try it out today

-

<!--=
OUTLINE
-------

- Problem: Fetching from trusted gateways in not IPFS.
  - Fragile
  - Too trusty
  - But there's good reasons for this. Doing IPFS retrieval and verification in a way that works on all js runtimes is tricky.
- Solution: @helia/verified fetch: like fetch, but for CIDs (and IPNS and DNSLink)
  - Resilient:
    - no more dead links with multiple gateways
    - As long as one of the gateways has it cached
  - Trustless: All content is retrieved in a trustless manner, meaning that the integrity of all bytes is verified by comparing hashes of the data
  - Runs everywhere JS does! Built on top of Web APIs and published as an ESM module.
  - DX: developer friendly!
    - modelled after the Fetch  API
    - Fully typed with TypeScript
    - Well documented
    - Customisable
      - By default: trustless gateways
      - Pass a custom Helia instance
  - platform-agnostic way to distribute JS code
  - The culmination of many streams of works:
    - delegated routing over HTTP and hosted someguy
    - trustless-gateway
    - Helia as the canonical IPFS implementation with TypeScript
    - Helia/http
- Try it today
  - npm package
  - configurable gateways and routers
  - examples
- What's next
  - direct retrieval from peers using delegated routing
  -
 - optimisations (car retrieval, gateway heuristics, caching)

 -->
