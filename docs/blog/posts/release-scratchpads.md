---
title: "Quix Release: Scratchpads"
date: 2024-10-28
authors: [steve-rosam]
slug: quix-release-scratchpads
description: >
  Learn about the latest Quix release. 
categories:
  - releases
hide:
  - navigation  
---

New features, bug fixes and performance upgrades!

<!-- more -->

## New features

- **Scratchpads:** Enables shared topics between environments, setting resources only in focused steps of the pipeline and allowing code modifications to be easily merged back into Production.
- **Data tiers:** this feature allows users to assign a **`Bronze, Silver, or Gold`** classification to their data - or define their own tiers for each topic, reflecting its data quality and level of pre-processing.
- **Quix CLI** 1.1.0 adds support for YAML variables on local development. [More info in docs](https://quix.io/docs/quix-cli/local-development/local-yaml-variables.html).

## Enhancements

- We have enabled replicas configuration for Jobs. Users can now set the replica count for deployments of type `Job`, enhancing job concurrency control.
- Added Support for separate private and public Library repositories. This feature allows dedicated clusters to configure separate repositories for private and public template items in the Library.
- Improved error descriptions when dealing with YAML and missing secret keys.
- Improved network configuration validation.
- Enhanced the readability of error messages in historical logs to make them more user-friendly.
- Optimized the 'Live Logs' download for improved performance.

## Bug Fixes

- Fixed a bug that prevented applications being run in the online IDE from stopping in some conditions.
- Fixed a bug that caused deployment statuses to refresh incorrectly after a runtime error occurred.
- Vulnerability fixes and patches.

## Find Out More
If you want to find out more or have any questions at all please get in touch.

<div class="" markdown>
<span>You can join our Slack community <a href="https://quix.io/slack-invite?_ga=join-from-docs-release-blog">here</a> or <a href="mailto:support@quix.io">send us an email</a>.</span>
</div>
