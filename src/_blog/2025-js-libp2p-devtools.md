---
date: 2025-07-25
permalink: /2025-js-libp2p-helia-devtools/
title: 'Debugging superpowers with the new js-libp2p developer tools'
description: 'Discover the new js-libp2p inspector developer tools from Interplanetary Shipyard that provide real-time debugging capabilities for js-libp2p and Helia nodes in both browser and Node.js environments.'
author: Daniel Norman
header_image: /dev-tools.jpg
tags:
  - ipfs
  - devtools
  - js-libp2p
  - browsers
  - node.js
  - extension
  - Interplanetary Shipyard
---
<!-- ## New Developer Tools for js-libp2p and Helia -->

[Interplanetary Shipyard](https://ipshipyard.com/) is thrilled to share [js-libp2p inspector](https://github.com/ipshipyard/js-libp2p-inspector/), the new developer tools for debugging and inspecting js-libp2p and Helia, for use both in browsers and Node.js.

Debugging is an essential part of software development, and having the right tools can make all the difference. The new developer tools provide a user-friendly interface to inspect your libp2p nodes in real-time, tightening the feedback loop, making it easier to diagnose issues.

## Inspecting and monitoring throughout the development cycle

These new developer tools expand the existing set of metrics implementations for js-libp2p, which include [metrics-prometheus](https://github.com/libp2p/js-libp2p/tree/main/packages/metrics-prometheus) and [metrics-opentelemetry](https://github.com/libp2p/js-libp2p/tree/main/packages/metrics-opentelemetry).

While Prometheus and OpenTelemetry are for monitoring and tracing in production (though not exclusively), the inspector is intended for use during development. Together, these tools provide a comprehensive solution for monitoring and debugging js-libp2p and Helia nodes throughout the development cycle.

<!-- js-libp2p is a powerful peer-to-peer networking library, but with that power comes inherent complexity. The new developer tools provide a way to inspect and debug your js-libp2p nodes while it's running, giving you insight into the node's peers, addresses, in addition to providing direct API access to the ping and identify protocols.  -->

## Getting started

To inspect a js-libp2p or Helia node, you need to pass the metrics implementation from the [`@ipshipyard/libp2p-inspector-metrics`](https://www.npmjs.com/package/@ipshipyard/libp2p-inspector-metrics) package to your js-libp2p or Helia factory:

### js-libp2p example

```js
import { createLibp2p } from 'libp2p'
import { inspectorMetrics } from '@ipshipyard/libp2p-inspector-metrics'

const node = await createLibp2p({
  metrics: inspectorMetrics()
})
```

### Helia example

```js
import { createHelia } from 'helia'
import { inspectorMetrics } from '@ipshipyard/libp2p-inspector-metrics'

const node = await createHelia({
  libp2p: {
    metrics: inspectorMetrics()
  },
})
```

Once you have your node running with the inspector metrics enabled, you can start inspecting it using the browser extension or the Electron app.

The following video walks through setup and usage with both Node.js and browser environments:

@[youtube](AKNGtn7EZxI)

## Try the new developer tools

The new developer tools consist of several npm packages that work together:

- [`@ipshipyard/libp2p-devtools`:](https://github.com/ipshipyard/js-libp2p-inspector/tree/main/packages/libp2p-devtools) Browser DevTools extension to inspect a libp2p node running in a web page.
- [`@ipshipyard/libp2p-inspector`:](https://github.com/ipshipyard/js-libp2p-inspector/tree/main/packages/libp2p-inspector) - Electron based app to inspect a running libp2p node in Node.js.
- [`@ipshipyard/libp2p-inspector-metrics`:](https://github.com/ipshipyard/js-libp2p-inspector/tree/main/packages/libp2p-inspector-metrics) Metrics implementation that instruments the libp2p node such that it can be inspected by the inspector or the browser extension. This package needs to be imported in your js-libp2p based application to enable inspection
- [`@ipshipyard/libp2p-inspector-ui`:](https://github.com/ipshipyard/js-libp2p-inspector/tree/main/packages/libp2p-inspector-ui) The user interface for inspecting a libp2p node.

We encourage you to try out the new developer tools and provide feedback. You can find the source code on [GitHub](https://github.com/ipshipyard/js-libp2p-inspector).
