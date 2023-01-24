# Get Workspace ID

Occasionally, you’ll need to obtain an ID based on a specific workspace.
For example, endpoints for the [Data Catalogue API](../../apis/data-catalogue-api/intro.md) use a domain with the
following pattern:

    https://telemetry-query-${workspace-id}.platform.quix.ai/

The workspace ID is a combination of your organization and workspace
names, converted to URL friendly values. The easiest way to get hold of
it is as follows:

1.  Go to the [Portal home](https://portal.platform.quix.ai/){target=_blank}.

2.  Locate the workspace you’re interested in and click **OPEN**.

3.  At this point, take note of the URL. It should be in the form:

<!-- end list -->

    https://portal.platform.quix.ai/home?workspace=**{workspace-id}**

Copy that value and use it wherever you need a workspace ID.
