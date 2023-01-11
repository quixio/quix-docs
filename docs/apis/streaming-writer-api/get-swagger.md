# Getting Swagger url

You can access documentation and a basic playground for the [Streaming
Writer API](intro.md) via
[Swagger](https://swagger.io/){target=_blank}. The exact URL is workspace-specific, and
follows this pattern:

    https://writer-${organization}-${workspace}.platform.quix.ai/

The workspace ID is a combination based on your organization and
workspace names. For example, for an "acme" organization with a
"weather" workspace, the final URL might look something like:

    https://writer-acme-weather.platform.quix.ai/

To determine the final URL, you can [find out how to get a workspace id](../../platform/how-to/get-workspace-id.md), or follow these
instructions:

1.  Click the Library icon **Library** in the main menu.

2.  Search for "HTTP API - Shell Script" item in the search bar and
    select the item.

3.  Find in the Code Preview the Url on any of the POST methods of the
    sample.
