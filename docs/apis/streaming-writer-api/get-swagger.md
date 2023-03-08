# Getting the Swagger documentation URL

You can access [Swagger documentation](https://swagger.io/){target=_blank} and then use it to try out the [Streaming Writer API](intro.md). 

The URL is workspace-specific, and follows this pattern:

    https://writer-${organization}-${workspace}.platform.quix.ai/swagger

The workspace ID is a combination based on your organization and workspace names. For example, for an `acme` organization with a `weather` workspace, the URL would have the following format:

    https://writer-acme-weather.platform.quix.ai/swagger

To help determine the URL, you can [find out how to get your workspace id](../../platform/how-to/get-workspace-id.md).

!!! tip

    Once you access the Swagger documentation, you can select the version of the API you require from the `Select a definition` dropdown list.
