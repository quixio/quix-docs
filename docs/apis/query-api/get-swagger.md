# Getting the Swagger documentation URL

You can access [Swagger documentation](https://swagger.io/){target=_blank} and then use it to try out the [Query API](./index.md). 

The URL is environment-specific, and follows this pattern:

    https://telemetry-query-${organization}-${environment}.platform.quix.ai/swagger

The environment ID is a combination based on your organization and environment names. For example, for an `acme` organization with a `weather` environment, the URL would have the following format:

    https://telemetry-query-acme-weather.platform.quix.ai/swagger

To help determine the URL, you can [find out how to get your environment id](../../platform/how-to/get-environment-id.md).

!!! tip

    Once you access the Swagger documentation, you can select the version of the API you require from the `Select a definition` dropdown list.
