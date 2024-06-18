---
title: "Announcing Quix 2.0—now with Git integration and multiple environments"
date: 2023-09-26
authors: [mike-rosam]
slug: whats-new-in-quix
description: >
  Quix 2.0 is here 🚀 Designed around the concept of Infrastructure-as-Code, Quix 2.0 makes it easier to build and run reliable, powerful event-streaming applications that scale, with a single source of truth powered by Git.
categories:
  - announcements
---

# Announcing Quix 2.0—now with Git integration and multiple environments

Quix 2.0 is here 🚀 Designed around the concept of Infrastructure-as-Code, Quix 2.0 makes it easier to build and run reliable, powerful event-streaming applications that scale, with a single source of truth powered by Git.

<!-- more -->

Today, we’ve upgraded Quix to make developing event-streaming applications
even easier. You can now connect Quix to your own Git provider and manage your
infrastructure as code. Quix 2.0 now supports multiple environments too, so
you can create any named environments you like such as “dev”, “staging” and
“prod”.

### **Quix 2.0 is built with Infrastructure-as-Code in mind**

Now, your Quix projects sync up with Git, giving you one reliable source for
your event-streaming apps. It’s compatible with GitHub and GitLab, so you can
set up isolated dev environments whenever you need. And if something breaks in
production, you can fix it quickly with a pull request.

The Git feature also lets you move code from development to staging and
production automatically—no clicking around in a UI needed.

### **Workspaces are now “projects”**

What used to be called "_workspaces_ " in Quix are now called "_projects_ ''
that are linked to specific Git repositories. Each project can have different
environments, and each environment links to a specific Git branch. Quix
creates a deployment configuration file (quix.yaml) for every environment,
which keeps track of all your app settings and deployments. Feel like getting
hands-on? You can tweak that configuration file yourself to set up pipelines
with just code. You can also create protected environments, assign new
branches, and create pull requests with the click of a button.

## **Benefits of the new Git integration**

**Centralised Code Management** : Manage your Quix-related code alongside the
rest of your application code.

**Enhanced Collaboration** : Quix's interface makes concurrent development and
code merging more intuitive than Git alone because you can run and test each
other’s code within the Quix IDE.

**Direct Deployments** : Deploy changes to different services right from your
Git commits or pull requests within Quix.

**Automated Environment Setup** : Quix automates the setup of multiple
environments from different branches such as development, staging, and
production environments or specific named feature branches.

‍**Infrastructure-as-Code** : Use Quix's YAML configuration files to define
everything from service deployments to data pipeline settings, all tied to
specific Git branches. This makes it incredibly easy to replicate other
projects (such as our project templates).

## **More Features**

**New Quix-managed Git service powered by Gitea**

If you're starting a new project in Quix and don't already have a Git
repository, no worries—Quix will automatically create one for you using Gitea.
This means you can focus on coding without the initial setup hassle. Your Quix
projects and their corresponding Git repos are managed in one place,
streamlining your workflow.

**The Quix UI supports more Git Operations  **

You can now merge branches and create pull requests right inside the Quix UI.
No need to switch back and forth between Quix and your Git platform—do it all
in one place and keep your workflow simple.

**You can now manage your secrets in Quix**

Quix now offers built-in secrets management, making it easier and safer to
handle sensitive data like passwords. You can store these secrets right in
Quix and securely use them in your builds and deployments. Plus, with the new
'Secret' variable type, you can assign and transmit sensitive information
directly to your deployments without exposing it to anyone else using the
platform.

**Easily sync your Quix configuration with your Git repo**

Quix shows the sync status between your local environment and the Git repo.
You'll know at a glance if everything is aligned or if you need to update.
You’ll see a "Sync environment" button that updates your local YAML if it's
out of sync with the one in Git. It ensures your configurations match.

## **Try out Quix 2.0**

If you already have an active account, you can simply [log
in](https://portal.platform.quix.ai/) and create a new project to try out the
brand-new version of Quix.  

![Quix 2.0 introduction.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/65126b7804d35180d5faaa8a_D3BCze1GOg5W7zk7X5BmwlaON9rYgMsODTNL03WJGySLHL4L4GJdxA9CWJk3bRCMHfVLAJ1ulHwWieouVLvniNHkh_TJrIjd1-QRJ1bADDtdTCMWyUdQ7Pbvvif7s6pa4ytI8WgOdRth6wbrJXEUCEs.png)

If you are not a Quix user yet and you want to try out the new
functionalities, or if you just need some inspiration on what you can build
with Quix, we created 2 ungated experiences:

### **Project template: image processing**

This project uses object detection and real-time image processing to visualise
traffic density on a map of London. Quix is ingesting live video frames from
London's traffic cameras (TfL) and detects the vehicles in each frame.

[View “Computer Vision” template](https://app-demo-computervisiondemo-
prod.deployments.quix.ai/)

### **Project template: sentiment analysis**

This project analyses real-time message feeds and uses natural language
processing to detect the emotional pulse of any conversation.

[View “Sentiment Analysis” template](https://sentimentdemoui-demo-chatappdemo-
prod.deployments.quix.ai/chat)

‍




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)


