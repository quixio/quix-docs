# Quix Developer Documentation

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build](https://github.com/quixio/quix-docs/actions/workflows/sync-build-deploy.yaml/badge.svg)](https://github.com/quixio/quix-docs)

This repository is the source content for the Quix documentation that is published on the web at https://quix.io/docs. The source files for the documentation are in GitHub-flavoured Markdown, with additions supported by our tooling, [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

To get a free Quix account, [sign up](https://portal.platform.quix.ai/self-sign-up).

## Contributing

If you would like to contribute to these docs, see the [Contribution Guide](./CONTRIBUTING.md). 

If you create a PR on the docs `dev` branch, a review app consisting of a complete rendered docs build is created automatically for you, so you can preview your changes there. Currently, to rebuild the docs after pushing up any further changes, you need to close and reopen your PR.

**IMPORTANT:** All docs PRs should be raised against the `dev` branch.

If you plan to make more than basic changes to the documentation, you should also become familiar with the Quix [Writing Style Guide](./WRITING-STYLE.md) and the [Best Practice Guide](./BEST-PRACTICE.md).

## Running docs locally

The following is only required if you are part of the Quix technical writing team, or you contribute frequently, and want to check your docs PR locally before pushing up. Otherwise, the simplest approach is to refer to the review app that is created automatically for you, when you push up a PR on the `dev` branch.

### Prerequisites

To run these docs locally you'll need:

* [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
* Sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/), if you want to see all features rendered locally.
* A Git client (the command line is fine).

### Plugins used

If you want to fully render all documentation locally you will need to install the following plugins with `pip install`:

* [glightbox](https://pypi.org/project/mkdocs-glightbox/0.1.0/)
* [multirepo](https://pypi.org/project/mkdocs-multirepo/)
* [redirects](https://pypi.org/project/mkdocs-redirects/)

You will also need to sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/).

The [social plugin](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/) is also used to automatically provide metadata. See the [social plugin documentation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/) for details on how to install the dependencies of the plugin. You might also need to first install `cffi` with `pip install cffi`, if not present on your system.

### Linked repositories

This repo uses the `multirepo` plugin to pull in client library content from the [Quix Streams repo](https://github.com/quixio/quix-streams). 

You can read more about Quix Streams [here](https://github.com/quixio/quix-streams/blob/main/README.md).

### Viewing the docs

To view the docs locally:

1. Follow the install guide for Material [here](https://squidfunk.github.io/mkdocs-material/getting-started/).
2. Clone the repo as follows:

   ```
   git clone https://github.com/quixio/quix-docs.git
   ```
3. Change into the docs directory you cloned (there will be a `mkdocs.yml` file there). 
4. Run `mkdocs serve`.
5. Navigate your browser to `localhost:8000` to view the docs.

## Getting in touch

The best way to contact us is through our public Slack channel, [The Stream community](https://quix.io/slack-invite). Please sign up, and introduce yourself!

Thanks!
