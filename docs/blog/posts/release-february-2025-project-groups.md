---
title: "Project Groups - Quix Release #3 February 2025"
date: 2025-02-27
authors: [steve-rosam]
slug: quix-release-february-2025-project-groups
description: >
  Learn about the latest Quix release. 
categories:
  - releases
hide:
  - navigation  
---

The latest release brings new features, enhancements and bug fixes to Quix.

<!-- more -->

🌱 **New Features** 🌱

* **Project Groups**: Projects can now be organized into predefined groups set in Organization Settings for consistency. These groups appear in the Organization Overview when you assign a Project to a specific group in Project Settings, making project management clearer and more structured.

* **New "Timestamp" Offset Type in Messages Explorer**: We've added a new offset type, "Timestamp", to the messages explorer. This option works similarly to the Custom offset selection but allows users to select messages based on a specific timestamp instead of manually entering an offset.


💎 **Enhancements** 💎

- Projects:
    - Improved the tab environments dropdown UI to handle multiple environments without breaking the top bar layout.

- Deployments:
    - Updated the deployment dialog settings to allow users to modify the ImageURI when editing a deployment.

- Topics:
    - Added a dropdown next to the topic name in the topic detail page header, allowing users to easily **switch between topics**.
    - Added support for **bulk deletion of topics**. This feature is accessible via the three-dot menu, which activates checkboxes for topic selection and updates the top bar with relevant actions.
    - Introduced the new `unmanaged` property in `quix.yaml`, ensuring that topics marked as `unmanaged` are treated as external. This prevents Quix Cloud from creating, modifying, or deleting these topics, enforcing stricter control over externally managed topics.
    - Added the ability to view **Headers** of messages in the Topic Explorer, providing more visibility into message metadata.
    - Improved Topic Explorer performance by optimizing bound reading to fetch all latest offsets for partitions in a single query.

- Other:
    - Adjusted the notification position to prevent overlap with call-to-action (CTA) buttons, ensuring better accessibility and visibility.
    - Introduced a new post-deployment wizard for the HTTP API Connector, guiding users to send test messages easily. The wizard includes a message box, example code for multiple languages, and a link to the Swagger interface for API exploration.


🦠 **Bug Fixes** 🦠

- Pipeline:
    - Resolved an issue where deployments using SharedFolders were incorrectly marked as outdated in the pipeline view.
    - Fixed an issue where the YAML variables list did not correctly display default values when environment-specific values were null or empty.
    - Resolved an issue where the "Deploy External Image" option was not displayed when no applications were available.
    - Fixed an issue where an undefined topic in the pipeline would cause it to break.

- Applications:
    - Fixed an issue where paths were not automatically converted to lowercase and spaces were not replaced with hyphens when deploying from a library item.
    - Fixed an issue where duplicating a project with a shared folder did not retain the shared folder reference.
    - Resolved an issue where the Online IDE editor did not refresh the content of the currently selected file after pushing a local commit externally and pressing refresh.

- Deployments:
    - Resolved inconsistencies in deployment metrics, ensuring consistent CPU and memory reporting across different statuses.
    - Fixed an issue where deployments remained stuck in 'Deploying' status by improving event consistency handling.
    - Fixed an issue where Shared Folders were not correctly resolved during deployments in Quix Cloud, causing build failures when accessing subdirectories.
    - Resolved an issue where public URL links for deployments incorrectly redirected to the root or displayed 'undefined' instead of the expected destination.

- Topics:
    - Resolved an issue where clicking on the icon of a data tier in the selection dropdown did not properly select the item.

## Find Out More
If you want to find out more or have any questions at all please get in touch.

<div class="" markdown>
<span>You can join our Slack community <a href="https://quix.io/slack-invite?_ga=join-from-docs-release-blog">here</a> or <a href="mailto:support@quix.io">send us an email</a>.</span>
</div>
