# Getting Swagger url

You can access documentation and a basic playground for [the Data
Catalogue API](intro.md) via
[Swagger](https://swagger.io/){target=_blank}. The exact URL is workspace-specific, and
follows this pattern:

    https://telemetry-query-${organisation}-${workspace}.platform.quix.io/

The workspace ID is a combination based on your organisation and
workspace names. For example, for an "acme" organisation with a
"weather" workspace, the final URL might look something like:

    https://telemetry-query-acme-weather.platform.quix.io/

To determine the final URL, you can [find out how to get a workspace
id](../../platform/how-to/get-workspace-id.md), or follow these instructions:

1.  Click the Data Explorer icon **Data Explorer** in the main menu.

2.  Click on CODE tab in the right top corner.

3.  Using the "Select code language" drop down on the right of this
    page, choose "Swagger".

![code-lang-swagger.png](../images/code-lang-swagger.png)

1.  Click the link to access the Swagger documentation.
