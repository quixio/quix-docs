---
title: Manage projects
description: Managing your projects, pipelines, and applications.
---

# Manage your projects

This section of the documentation covers **managing your projects, pipelines, and applications**.

## Logs

When you build an application for deployment, you can view build logs for it:

![Build logs](../images/manage/build-logs.png)

Any problems with the build are shown here. There is also a button to enable you to download the build logs for offline viewing.

When looking at a deployment at run time, you can view logs for the service or job. Any run time errors are shown here.

![Logs](../images/manage/logs.png)

There is also a button to enable you to download the logs for offline viewing.

There is also a tab with messages view. This is described in a later section.

## Message viewer

The message view shows the raw message format. The message viewer is available next to the Build logs, and logs tabs, as shown in the following screenshot:

![Message viewer](../images/manage/messages.png)


## Portal API

The Portal API enables you to programmatically control Quix, and most objects in it. Using the Portal API you can manage entities including:

* Billing
* Deployments
* Profile
* Repositories
* Topics
* Users

You can read more about the [Portal API](../apis/portal-api/overview.md) in the docs, or view the [Swagger reference](https://portal-api.cloud.quix.io/swagger/index.html){target=_blank}.
