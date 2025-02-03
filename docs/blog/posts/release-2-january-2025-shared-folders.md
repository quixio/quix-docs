---
title: "Quix Release #2: January 2025 Shared Folders"
date: 2025-01-29
authors: [steve-rosam]
slug: quix-release-2-january-2025-shared-folders
description: >
  Learn about the latest Quix release. 
categories:
  - releases
hide:
  - navigation  
---

Bug fixes and enhancements!

<!-- more -->

## 🌱 **New Features**

### Shared folders

* We added support for code reuse across multiple applications within the same project. 

  Users can now declare shared folders in the app.yaml, enabling shared code to be available in the build process.

  Additionally, we introduced UI components that allow users to easily configure included folders directly from the Online IDE.

  An example of how to configure shared folders from the app.yaml file:
  ```
  app.yaml

  includedFolders:
    - shared_module
    - shared_lib
  ```

  !!! info
        With this setup, both shared_module and shared_lib will be available for import within the application. More info in the [docs](https://quix.io/docs/quix-cli/yaml-reference/app-descriptor.html#4-included-folders).

  !!! warning     
        This feature needs an update to a new version of your Application dockerfile. More info in the [docs](https://quix.io/docs/quix-cli/yaml-reference/dockerfile.html). 

### Disable Deployments

* New options to Enable/Disable deployments. When a deployment is disabled, it remains in the pipeline but is not provisioned in the infrastructure. Additionally, an optional property (`Disabled`) has been added to the `quix.yaml`, allowing dynamic configuration per environment via YAML variables.

### Pipeline filters

* Introduced options to hide standalone and disabled deployments, helping users focus on active and relevant deployments in the pipeline flow. These preferences are stored locally for a personalized experience.

### Dedicated Compute Nodes

* Business Cloud users can now request Dedicated Compute Nodes, ensuring exclusive access to resources in specific regions. This feature offers enhanced performance, private networking, and control through a unified control plane.

### Dedicated Brokers

* Introduced the ability to provision and configure Dedicated Brokers tied directly to your Dedicated Compute Nodes. This provides optimized messaging performance and seamless integration with your dedicated infrastructure in specific regions.


## 💎 Enhancements

### Pipeline

* Added a hover effect on deployments to highlight output topics and their corresponding destination deployments for better clarity.

### Deployments

* Added the Quix__Deployment__Network__PublicUrl variable, which provides the public URL assigned to a deployment when public access is enabled. This allows for easy reference to externally accessible endpoints.

### Applications

* Improved Suggested Folder Names for New Applications. Folder names are now automatically formatted by converting spaces to "-" and changing uppercase letters to lowercase.

### Topics

* Added previous and next navigation buttons when using Custom Offset Selection in Topic Messages. These allow users to browse messages efficiently based on the Max Results setting.

* Enhanced the edit boxes on Topic configuration dialog to support larger numbers when limits are set to infinite, removing unnecessary restrictions.

* The default retention time is now infinite for Quix-managed brokers, aligning with existing retention size limits.

### Online IDE

* Markdown files (.md) now automatically render in the Online IDE, providing a better reading experience.

### Other

* Added a refresh option to the Environment bar, allowing users to manually update the synchronization status.

* Added the ability to edit the organization name from the Organization Settings.

* Optimized the branch creation process to handle large repositories more efficiently.


## 🦠Bug Fixes

### Projects

* Resolved an issue where linked topics with an external source were incorrectly propagated to the destination project.

* Fixed an issue where selecting "Use existing repository" during project creation reverted to "Create New Git Repository" and a bug where the SshPublicKey was not sent, preventing environment creation.

### Deployments

* Fixed a bug where jobs incorrectly moved to Completed status instead of Running. Jobs will now properly reflect their execution state.

* Resolved an issue where deployments locked by the Scratchpad prevented updates. Users can now modify versions and other settings without triggering an exception during a synchronization process.

* Resolved an issue where changes to build arguments in the Dockerfile were not triggering a new build.

* Fixed a bug where deployment details would switch to another deployment’s details when the platform received an update notification.
Historical Logs are now stored as compressed files with accurate line counts, improving efficiency and consistency.

### Topics

* Resolved an issue where non-JSON messages caused incorrect broker timestamps in Messages views.

* Fixed a bug where Live Messages always sent data in the Quix format instead of preserving the original message.

* Fixed an issue where missing partition leaders resulted in UI errors during message exploration.

### Online IDE

* Fixed an issue where updates to secrets in the Online IDE were not detected automatically, requiring a session restart.

* Editing code in the Online IDE is now restricted in Protected environments.

### Other

* Fixed a bug where creating a new branch from the Change Branch dialog would close all dialogs without applying the branch change.

* Fixed an issue where CLI setup instructions were incorrect for environments other than the default Serverless platform. The setup flow now includes an additional step to configure the correct API endpoint when needed.


## Find Out More
If you want to find out more or have any questions at all please get in touch.

<div class="" markdown>
<span>You can join our Slack community <a href="https://quix.io/slack-invite?_ga=join-from-docs-release-blog">here</a> or <a href="mailto:support@quix.io">send us an email</a>.</span>
</div>