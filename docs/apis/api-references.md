## API reference guides

An OAS3 API reference guides are available for HTTP/REST APIs. These are rendered using [Swagger](https://swagger.io/){target=_blank}. 

The URLs for the API references are specific to your environment, so you can easily test out API calls on your environment using the API reference. You'll need to [get you environment ID](../platform/how-to/get-environment-id.md). The exception to this is the Portal API, which is account-wide.

| API | API reference URL (Swagger documentation)|
|---|---|
| Streaming Writer | https://writer-`<environment-id>`.platform.quix.ai/swagger |
| Streaming Reader | No HTTP/REST interface - SignalR (WebSockets or Long Polling)|
| Portal | https://portal-api.platform.quix.ai/swagger |
| Query | https://telemetry-query-`<environment-id>`.platform.quix.ai/swagger |

Replace `<environment-id>` with your [environment ID](../platform/how-to/get-environment-id.md).

!!! tip

    Once you access the API reference, you can select the version of the API you require from the `Select a definition` dropdown list.
