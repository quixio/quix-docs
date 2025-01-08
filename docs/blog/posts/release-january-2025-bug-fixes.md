---
title: "Quix Release: January 2025 Bug Fixes"
date: 2025-01-07
authors: [steve-rosam]
slug: quix-release-january-2025-bug-fix-release
description: >
  Learn about the latest Quix release. 
categories:
  - releases
hide:
  - navigation  
---

Bug fixes and enhancements!

<!-- more -->

💎 **Enhancements** 💎

* Enabled Latest Deployments version feature to Submodules.

🦠 **Bug Fixes** 🦠

* Fixed several issues with Linked topics working together with limited permissions.

* Fixed a bug causing a bottleneck in the Streaming Reader service when handling a large number of parameter names, impacting the Waveform and Table views.

* Fixed issues with refreshing consumer group states and retrieving consumers without commits in the topic.

* Fixed an issue where operations executed via YAML were not registered in the Audit.

* Fixed an issue where Quix reports were not generated since the latest release.

* Fixed an issue where topic updates occasionally failed to propagate properly to the database, causing discrepancies between the Infra and backend.

* Fixed an issue where Topic Retention Minutes was set to 0 for very low retention values (less than 1 minute), causing topic configuration failures in the portal.

* Fixed an issue in the User Service where deleting service accounts failed due to a null value in the authorization ID.


## Find Out More
If you want to find out more or have any questions at all please get in touch.

<div class="" markdown>
<span>You can join our Slack community <a href="https://quix.io/slack-invite?_ga=join-from-docs-release-blog">here</a> or <a href="mailto:support@quix.io">send us an email</a>.</span>
</div>
