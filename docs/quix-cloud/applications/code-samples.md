---
title: Code Samples
description: Browse the Quix Code Samples library — Connectors, Templates, and Services you can preview, customize, and deploy.
---

# Code Samples

The **Code Samples** library (sidebar: **Code Samples**, URL: `/code-samples`) is a catalog of ready-to-deploy applications that you can preview, customize, and run in your environment. Items are grouped into three tabs.

Once you select an item you can preview the code, open it in an editor, or deploy it directly — typically with a few environment variables to configure.

## Connectors

Connectors move data in and out of Quix. The Connectors tab is filtered by the `Pipeline Stage` facet:

- **Source** — read data from an external system and publish it to a Kafka topic (for example, MQTT, HTTP polling, CSV import, demo data).
- **Destination** — consume from a topic and write to an external system (databases, object stores, message queues, webhooks).

## Templates

Templates are full sample projects — usually a transformation or a small pipeline — that you can fork into your environment as a starting point. Use them when you want a working example rather than a single source or destination.

## Services

The Services tab lists deployable side-car services (for example, dashboards or APIs) that complement a streaming pipeline.

## GitHub repository

All items in the library come from the public [quix-samples](https://github.com/quixio/quix-samples){target=_blank} repository. Each sample lives in its own folder under a language tree (`python/`, `csharp/`, `nodejs/`, `java/`, `shell/`) and is described by a `library.json` manifest that defines its name, language, tags (Pipeline Stage, Type, Category), variables, and entry point.

You can contribute new samples or improvements by opening a pull request against that repository.

!!! important

    When you deploy a public sample into Quix it is copied into your environment's Git repository, so any changes you make stay private. If you are working in a public repository, modifications will be public as well.
