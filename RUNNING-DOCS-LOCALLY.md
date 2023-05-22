# Running docs locally

The following is only required if you are part of the Quix technical writing team, or you contribute frequently, and want to check your docs PR locally before pushing up to the docs repo. Otherwise, the simplest approach is to refer to the [docs preview site](./README.md#docs-preview-site) that is created automatically for you, when you push up a PR on the `dev` branch.

## Prerequisites

To run these docs locally you'll need:

* [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
* Sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/), if you want to see all features rendered locally.
* A Git client (the command line is fine).

## Plugins used

If you want to fully render all documentation locally you need to install the following plugins with `pip install`:

* [mkdocs-glightbox](https://pypi.org/project/mkdocs-glightbox/0.1.0/)
* [mkdocs-multirepo](https://pypi.org/project/mkdocs-multirepo/)
* [mkdocs-redirects](https://pypi.org/project/mkdocs-redirects/)

You also need to sign up to the [Insiders Programme](https://squidfunk.github.io/mkdocs-material/insiders/).

The [social plugin](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/) is also used to automatically provide metadata. See the [social plugin documentation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/) for details on how to install the dependencies of the plugin. You might also need to first install `cffi` with `pip install cffi`, if not present on your system.

## Linked repositories

This repo uses the `multirepo` plugin to pull in client library content from the [Quix Streams repo](https://github.com/quixio/quix-streams). 

You can read more about Quix Streams [here](https://github.com/quixio/quix-streams/blob/main/README.md).

## Viewing the docs

To view the docs locally:

1. Follow the install guide for Material [here](https://squidfunk.github.io/mkdocs-material/getting-started/).
2. Clone the repo as follows:

   ```
   git clone https://github.com/quixio/quix-docs.git
   ```
3. Change into the docs directory you cloned (there will be a `mkdocs.yml` file there). 
4. Run `mkdocs serve`.
5. Navigate your browser to `localhost:8000` to view the docs.
