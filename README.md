# Quix Developer Documentation

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build](https://github.com/quixio/quix-docs/actions/workflows/sync-build-deploy.yaml/badge.svg)](https://github.com/quixio/quix-docs)


This repository is the source content for the Quix documentation that is published on the web at https://quix.io/docs. 

To get a free Quix account, [sign up](https://portal.platform.quix.ai/self-sign-up).

## Prerequisites

To run these docs locally you'll need:

* [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
* Sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/), if you want to see all features rendered locally.
* A Git client (the command line is fine).

## Plugins used

If you want to fully render all documentation locally you will need to install the following plugins with `pip install`:

* [glightbox](https://pypi.org/project/mkdocs-glightbox/0.1.0/)
* [multirepo](https://pypi.org/project/mkdocs-multirepo/)
* [redirects](https://pypi.org/project/mkdocs-redirects/)

You will also need to sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/).

## Linked repositories

This repo uses the `multirepo` plugin to pull in client library content from the [Quix Streams repo](https://github.com/quixio/quix-streams). 

You can read more about Quix Streams [here](https://github.com/quixio/quix-streams/blob/main/README.md).

## Running the docs locally

To view the docs locally:

1. Follow the install guide for Material [here](https://squidfunk.github.io/mkdocs-material/getting-started/).
2. Clone the repo as follows:

   ```
   git clone https://github.com/quixio/quix-docs.git
   ```
3. Change into the docs directory you cloned (there will be a `mkdocs.yml` file there). 
4. Run `mkdocs serve`.
5. Navigate your browser to `localhost:8000` to view the docs.

## Contributing

If you would like to contribute to these docs, see the [Contribution Guide](./CONTRIBUTING.md). 

You should also become familiar with the Quix [Writing Style Guide](./GUIDE.md) and the [Best Practice Guide](./BEST-PRACTICE.md).

## Getting in touch

The best way to contact us is through our public Slack channel, [The Stream community](https://quix.io/slack-invite). Please sign up, and introduce yourself!

Thanks!
