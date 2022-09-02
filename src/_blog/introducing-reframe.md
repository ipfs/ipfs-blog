---
title: Introducing Reframe
description: kubo v0.14.0 now has support for the Reframe protocol, learn all about
  Reframe in this post.
author: Adin Schmahmann
date: 2022-09-02
permalink: "/2022-09-02-introducing-reframe/"
translationKey: ''
header_image: "/ipfs-blog-header_-reframe.png"
tags:
- CID

---
[kubo v0.14.0 added support](https://github.com/ipfs/kubo/releases/tag/v0.14.0#delegated-routing) for the [Reframe protocol](https://github.com/ipfs/specs/tree/main/reframe#readme), which enables users to configure how their kubo node discovers content, peers, and handles IPNS records by just adding an HTTP endpoint to their config file. This means if you have a new content routing system you’d like to try out next to, or instead of, the IPFS Public DHT it’s now simple to do so. Similarly, Reframe starts enabling applications like public IPFS HTTP Gateways to decouple their DHT nodes from their content serving nodes so that they can be scaled and load-balanced independently.

You can see more information and a demo utilizing Reframe in this [presentation](https://www.youtube.com/watch?v=lpphD7OJ28U&list=PLuhRWgmPaHtSF3oIY3TzrM-Nq5IU_RTXb) from IPFS Thing 2022.

## Why Reframe

The IPFS Public DHT provides functionality for peer routing (e.g., what's the current IP address of this peer), content routing (e.g., finding which peers have a specific piece of content), IPNS record publishing and discovery, and more.

However, there are likely to be other types of systems that fulfill similar roles to the IPFS Public DHT but with different sorts of properties. While common IPFS libraries have long had support for plugging in custom code for new routing systems, it can be more cumbersome to add support for one without calling an out-of-process API. This is similar to how new DNSLink resolvers for custom TLDs [can be added simply by plugging in a new DNSLink resolver](https://github.com/ipfs/kubo/blob/master/docs/config.md#dns), whether it's local or remote.

Additionally, there have been proposals for recursive or caching routing systems where some node close to the user gets a request and has the opportunity to respond before falling back to requesting data from another node or system. Making these routing systems composable is much easier when they have a shared API that they can speak.

Reframe was established as a way of resolving both of these problems.

## What is Reframe

Reframe is a request-response protocol with two components:

1. **Methods** -> the different requests you can make to a Reframe endpoint (e.g., FindProviders which asks for which peers have a given piece of content)
2. **Transports** -> the way in which requests and responses are made (e.g., HTTP with the data encoded using DAG-JSON)

For example, if you want to send a FindProviders request over HTTP you can encode the request and response as the transport requires.

The Reframe protocol is specified in [ipfs/specs](https://github.com/ipfs/specs/tree/main/reframe).

### Reframe flexibility

Reframe's flexibility in being defined abstractly over methods and transports is that adding new methods, new transports, or even new ways of encoding data within transports is fairly easy to do, while not preventing users from using transport-specific features (e.g., HTTP headers).

### Transports

For example, while using HTTP is desirable in many environments, others prefer gRPC, making some custom protocol over QUIC, or a more general libp2p stream. While only HTTP has been specified, if you find yourself needing something else then start hacking and raise a [spec](https://github.com/ipfs/specs/tree/main/reframe) PR.

Similarly, while the initial HTTP transport used the DAG-JSON format to encode requests because HTTP + JSON is familiar to people and works easily with existing tooling, some of the earliest Reframe users also wanted a binary format in an HTTP GET request for better interoperability with caches. Since the method parameters are described abstractly, it was trivial to use the DAG-CBOR format with GETs for when HTTP cacheability is more important than JSON’s ease of use.

### Methods

On the method side, we’ve already [added methods](https://github.com/ipfs/specs/blob/main/reframe/REFRAME_KNOWN_METHODS.md) beyond the initial FindProviders method, including IPNS Get and Put. We’ve also extended FindProviders itself to support a greater variety of protocols. There are more proposals underway, but if you have a new method that you think Reframe would be useful for, implement and make spec PRs to tell people what you're working on.

While not every Reframe client or endpoint is going to support every method, having shared specs and tooling can make it easier for Reframe implementations to support what they need to.

## Reframe Implementations

### Server Implementations

Two current Reframe server implementations are [StoreTheIndex](https://github.com/filecoin-project/storetheindex) which supports the [Network Indexers](https://docs.cid.contact/filecoin-network-indexer/overview), and [someguy](https://github.com/aschmahmann/someguy)which is a delegated routing endpoint that forwards requests to other services such as the IPFS Public DHT and Network Indexers and streams back the results. The [go-delegated-routing](https://github.com/ipfs/go-delegated-routing) library provides tooling to make it easier to create new server implementations.

Protocol Labs is currently running a someguy instance at [routing.delegate.ipfs.io](http://routing.delegate.ipfs.io/).

### Client Implementations

There are various clients that utilize the [go-delegated-routing](https://github.com/ipfs/go-delegated-routing) library to handle their requests including [kubo](https://github.com/ipfs/kubo), [hydra-booster](https://github.com/libp2p/hydra-booster) and [someguy](https://github.com/aschmahmann/someguy).

### Example

Querying the Reframe endpoint at [routing.delegate.ipfs.io](http://routing.delegate.ipfs.io/) for the providers of a CID will return those providers and some metadata about them such as their addresses and the protocols they support.

    curl -X POST <https://routing.delegate.ipfs.io/reframe>
    	-H "Content-Type: application/vnd.ipfs.rpc+dag-json; version=1"
        -d '{"FindProvidersRequest" : {"Key" : {"/" : "bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy"}}}'

This returns results like:

    {
      "FindProvidersResponse": {
        "Providers": [
          {
            "Node": {
              "peer": {
                "ID": {
                  "/": {
                    "bytes": "EiAngCqwSSL46hQ5+DWaJsZ1SPV2RwrqwID/OEuj5Rdgqw"
                  }
                },
                "Multiaddresses": [
                  {
                    "/": {
                      "bytes": "NiJwZWVyLmlwZnMtZWxhc3RpYy1wcm92aWRlci1hd3MuY29tBgu43QM"
                    }
                  }
                ]
              }
            },
            "Proto": [
              {
                "2304": {}
              }
            ]
          }
        ]
      }
    }
    {
      "FindProvidersResponse": {
        "Providers": [
          {
            "Node": {
              "peer": {
                "ID": {
                  "/": {
                    "bytes": "ACQIARIgQVLXNhpkw8mXoMgvZvljvcg/Nc/m+TZI6ZWJgWSg69I"
                  }
                },
                "Multiaddresses": [
                  {
                    "/": {
                      "bytes": "BIuyRFsGD6E"
                    }
                  },
                  {
                    "/": {
                      "bytes": "BIuyRFsGD6LdAw"
                    }
                  },
                  {
                    "/": {
                      "bytes": "KSYEE4BF4ScAAAAAAAAAAAMGD6LdAw"
                    }
                  },
                  {
                    "/": {
                      "bytes": "KSYEE4BF4ScAAAAAAAAAAAMGD6E"
                    }
                  }
                ]
              }
            },
            "Proto": [
              {
                "2304": {}
              }
            ]
          }
        ]
      }
    }

These indicate a couple of libp2p nodes have advertised that they provide the content and support some version of the Bitswap protocol.

## Reframe support in Kubo

Kubo (formerly go-ipfs) v0.14.0 supports delegating routing requests to Reframe endpoints. This means that if you’d like your instance of kubo to support an additional system being queried for the types of requests that the IPFS Public DHT is used for you can just modify it via the config file. If you’ve ever thought about what kubo might look like if it used alternative mechanisms from the IPFS Public DHT, you can now get to it!

For example, support for querying the endpoint at [cid.contact](http://cid.contact/) can be specified via:

    ipfs config Routing.Routers.CidContact --json '{
      "Type": "reframe",
      "Parameters": {
        "Endpoint": "<https://cid.contact/reframe>"
      }
    }'

See [https://github.com/ipfs/kubo/blob/master/docs/config.md#routing](https://github.com/ipfs/kubo/blob/master/docs/config.md#routing "https://github.com/ipfs/kubo/blob/master/docs/config.md#routing") for more details.

Note: further work to homogenize routing configuration across the multiple routing systems used in Kubo including the IPFS Public DHT and various Reframe endpoints is happening [here](https://github.com/ipfs/kubo/issues/9150).