---
title: "Quix Release: Linked Projects"
date: 2024-11-25
authors: [steve-rosam]
slug: quix-release-linked-projects
description: >
  Learn about the latest Quix release. 
categories:
  - releases
hide:
  - navigation  
---

New features, bug fixes and performance enhancements!

<!-- more -->

🌱 **New Features** 🌱

- **Linked projects:** Share real-time data across projects by linking topics. Linked projects enable seamless data stream connections, fostering cross-team collaboration and efficient data sharing. The new **Project Pipeline view** provides a clear graphical representation of these connections, simplifying the understanding of data flows between projects. More info [in Docs](https://quix.io/docs/create/create-linked-project.html). ⚠️This feature requires updating the **Quix Streams** version to **3.1.1** or higher for any app using a linked topic⚠️

💎 **Enhancements** 💎

- Improved platform compatibility with **Kafka Streams** and **Java** applications, enhancing Templates and the Online IDE experience.
- Introduced **network settings** configuration in the deployment edit dialog, allowing users to specify ports and service names directly through the UI instead of using YAML.
- Added a toggle '**Lock unrelated Deployments and Topics**' to Scratchpads, allowing unrelated deployments and topics to be imported and made available in your scratchpad when needed.
- Added '**Edit Code**' option to deployment dropdowns for easier access.
- Enhanced visibility of data tiers by adding tier descriptions across more interface locations.
- Improved handling for application zip uploads by supporting additional valid content types.
- CLI general performance improvements

🦠 **Bug Fixes** 🦠

- Resolved flickering issues occurring during transitions between the Pipeline view and other options in the environment.
- Fixed an issue where the Environment tab was not correctly selected when switching between environments across different projects.
- Fixed an issue where accessing logs for a failed replica (e.g. 1 or 2) returned the logs for Replica 0 instead.
- Fixed a bug causing data not being displayed in the Waveform/Table view.
- Resolved a memory leak in Topic Metrics services caused by unnecessary subscriptions to the platform.
- Fixed an issue where deployments could get stuck on a failed commit after a build failure, even when the code was corrected and redeployed.
- Resolved an issue where log lines estimation timed out, causing interference with Deployment status monitoring.
- Fixed an issue where Topic metrics occasionally loaded indefinitely, particularly after switching environments or accessing the Topics view.
- Fixed an issue where creating a deployment from an existing app did not select the correct 'Application' section.
- Removed the need for leading slashes in `library.json` path entries to prevent errors and simplify configuration for private library users.


## Find Out More
If you want to find out more or have any questions at all please get in touch.

<div class="" markdown>
<span>You can join our Slack community <a href="https://quix.io/slack-invite?_ga=join-from-docs-release-blog">here</a> or <a href="mailto:support@quix.io">send us an email</a>.</span>
</div>
