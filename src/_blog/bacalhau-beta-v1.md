---
title: Bacalhau Beta v1: WASM Support, Simplified UX and Better Reliability
description: Bacalhau v1 Beta release and supported features
date: 2022-11-28
permalink: '/2022-11-28-bacalhau-beta-v1/'
translationKey: ''
header_image: "/bacalhau-high-level-view.png"
author:  David Aronchick
tags: 
- Bacalhau

---

Hi all!

Today, we are EXCEEDINGLY pleased to announce the Beta of **Project Bacalhau**. With Bacalhau, we plan to take a meaningful step towards unlocking distributed compute over data for everyone and improving how people interact with the ever-growing amount of information available.

## Background

Since our initial public launch in July, we have heard tons of exciting use cases and people using Bacalhau already for interesting work. These include:

- [Caltech High Energy Physics](http://hep.caltech.edu/): Caltech is partnering with the Bacalhau Project to support Caltech High Energy Physics (HEP) program's continued growth in massive-scale data processing. Together we plan to expand compute over **tens of petabytes of high energy physics experimental data** produced at unprecedented energies at the **Large Hadron Collider at CERN** in Geneva on the network.
- [City of Las Vegas & Blocz.io](https://medium.com/blocz/open-grid-alliance-unleashes-monetization-platform-in-las-vegas-5061eae8f946): Blocz IO is excited to partner with Bacalhau to process real-time CCTV data for the City of Las Vegas. Our combined services will significantly reduce costs and scale up the existing safety capabilities for its visitors.
- [Bacalhau Partners with LabDAO to Accelerate Scientific Progress](https://bacalhau.substack.com/p/bacalhau-partners-with-labdao-to): Our goal is to accelerate progress by making scientific tools more accessible - building distributed compute infrastructure is an essential component on the way there. We are excited to be partnering with the Bacalhau team to integrate this piece of the puzzle together.
- [Bacalhau Case Studies](https://www.bacalhau.org/casestudies/): 
    - Surface Ocean CO₂ Atlas (SOCAT): [Youtube Demo](https://www.notion.so/bc395ced30e949139528e1bb62ff4fe7), [Github](https://www.notion.so/bc395ced30e949139528e1bb62ff4fe7)
    - EUREC4A Cloud Masking: [Github](https://www.notion.so/bc395ced30e949139528e1bb62ff4fe7)
    - OpenMM Molecular Simulation: [Github](https://www.notion.so/bc395ced30e949139528e1bb62ff4fe7)

Based on user feedback, we are introducing a breadth of new features to help people adopt compute over data even faster.

## Introducing Bacalhau Beta v1

We are proud to move the Bacalhau API from `alpha` to `beta`. With this change, we are committing to both a more stable API as well as backward compatibility for future versions (`alpha` jobs will not be supported going forward). For most jobs, this will result in no change, but it will require updating the versions of your jobs from `v1alpha1` to `v1beta1`. 

**Note**: This only applies if you are using a JSON or YAML job format - if you are using the CLI, you should be all set.

Along with this change, we have several additional features that address some big requests:

- **Improvements to network reliability**: In particular, by switching the way we are using  libp2p gossipsub, you should see significantly reduced network latency.
- **Native Filecoin support**: via native Lotus integration as well as Estuary integration via an Estuary API key (Estuary publishes results from the network both into IPFS as well as backing them up in Filecoin)
- **Support for WebAssembly**: Bacalhau can now deterministically run WASM code either uploaded via the client or stored on IPFS.
- **Job pipelines from Apache Airflow**: Jobs can now be chained together via Airflow, Cron scheduling, and more.

## New Examples

We also have been running Bacalhau through its paces - below are just a *few* of the many examples you can *already run* on Bacalhau against IPFS and/or Filecoin data:

- [Python - Hello World](https://docs.bacalhau.org/examples/workload-onboarding/trivial-python/)
- [R - Hello World](https://docs.bacalhau.org/examples/workload-onboarding/r-hello-world/)
- [Rust via WebAssembly](https://docs.bacalhau.org/examples/workload-onboarding/rust-wasm/)
- [Python - Pandas](https://docs.bacalhau.org/examples/workload-onboarding/python-pandas/)
- [Python - Custom Containers](https://docs.bacalhau.org/examples/workload-onboarding/custom-containers/)
- [Image Processing](https://docs.bacalhau.org/examples/data-engineering/image-processing/)
- [Parallel Workloads](https://docs.bacalhau.org/examples/data-engineering/simple-parallel-workloads/)
- [Blockchain ETL](https://docs.bacalhau.org/examples/data-engineering/blockchain-etl/)
- [Oceanography Analysis](https://docs.bacalhau.org/examples/data-engineering/oceanography-conversion/)
- Stable Diffusion ([CPU](https://docs.bacalhau.org/examples/model-inference/stable-diffusion-cpu/) and [GPU](https://docs.bacalhau.org/examples/model-inference/stable-diffusion-gpu/))
- [Object detection - YOLO](https://docs.bacalhau.org/examples/model-inference/object-detection-yolo5/)
- [Speech Recognition with Whisper](https://docs.bacalhau.org/examples/model-inference/Openai-Whisper/)
- [Image Generation with StyleGAN](https://docs.bacalhau.org/examples/model-inference/StyleGAN3/)
- [Molecular Dynamics - Simulation with OpenMM](https://docs.bacalhau.org/examples/molecular-dynamics/openmm/)

## Roadmap

Our goal is to maintain a quarterly release cadence. By the end of the year, we hope to offer the following:

- Python SDK and SDKs for our API in some other languages too
- FIL+ Dashboard
- Initial simulator framework
- Improved examples
- A draft invocation spec in collaboration with the CoD ecosystem
- Networking design
- Trusted Execution Environment design
- An initial game theoretic analysis of the Bacalhau protocol

## Would you like to learn more? Come help!

If you would like to learn more about Bacalhau or let us know how you'd like the project to change and help you, visit any of the following:

- Website: [https://bacalhau.org/](https://bacalhau.org/)
- Docs: [https://docs.bacalhau.org/](https://docs.bacalhau.org/)
- Mail: [https://groups.google.com/g/bacalhau-discuss](https://groups.google.com/g/bacalhau-discuss)
- Slack: Slack: [https://filecoin.io/slack](https://filecoin.io/slack) ([#bacalhau](https://filecoin.io/slack) channel)
- Github: [https://github.com/filecoin-project/bacalhau](https://github.com/filecoin-project/bacalhau)
    
Thank you so much!
