# Setup

To use the APIs you'll typically need the following:

1. [Sign up to Quix](https://portal.platform.quix.ai/self-sign-up).

2. Obtain a Personal Access Token - you need this to authenticate requests.

3. Get your environment ID - you need this for request URLs.

4. View the API reference documentation.

5. If you intend to use WebSockets, and the API supports it, you'll need to install SignalR.

Each of these is described in the following sections.

## Project settings

Useful information can also be found in the settings panels for your environment:

1. Click `Settings` in the bottom left corner of the Quix portal.

2. From `Project settings` select the environment you are working with.

3. Click `APIs and tokens`.

You are now presented with a very useful panel. From here you have useful links to items such as API documentation (rendered with Swagger), as well as your Personal Access Tokens (PATs):

![APIs and tokens](./images/apis-tokens.png){width=80%}

## Personal access token (PAT)

Personal Access Tokens, or PATs, are bearer tokens that can be used to authenticate the various Quix APIs, such as the Portal API.

To obtain a PAT, log in to Quix, and click on your profile icon in the top right corner, then click `Personal Access Tokens`. You can then generate a PAT with a lifetime suitable for your use case.

Alternatively, log in to the Quix Portal, and click `Settings` in the main left-hand navigation. Then, for a specific environment, click `APIs and tokens`.

In the `APIs and tokens` dialog, you can click `Personal Access Tokens` to generate PATs, or a Streaming Token for use with the Quix Streams client library.

## Get environment ID

When using APIs you’ll need to obtain an ID based on a specific environment. For example, endpoints for the Query API use a domain with the following pattern:

    https://telemetry-query-${environment-id}.platform.quix.ai/

The environment ID is a combination of your organization and environment names, converted to URL friendly values. 

### Obtain your environment ID from the URL

1.  Go to the [Portal home](https://portal.platform.quix.ai/){target=_blank}.

2.  Locate the environment you’re interested in and open it.

3.  At this point, take note of the URL. It will be in the form:

    https://portal.platform.quix.ai/home?workspace={environment-id}

### Obtain environment ID from settings

You can also get the environment ID from Settings. Click `Settings` in the bottom-left corner of the portal, select the environment of interest. You can then copy the environment ID (previously known as the workspace ID) from the settings panel, as shown in the following screenshot:

![Get environment ID from settings](../../images/get-environment-id/get-environment-id-settings.png){width=80%}

### Example environment ID

Given the following URL for the environment:

```
https://portal.platform.quix.ai/pipeline?workspace=joeengland-apitests-testing
```

The environment ID is:

```
joeengland-apitests-testing
```

The components of the environment ID are as follows:

| joeengland | The name of the Quix account, known as the organization, in this case the personal account of Joe England |
| apitests | The name of the project |
| testing | The name of the environment | 

Copy the value for `environment-id` and use it wherever you need an environment ID.

!!! note

    The `workspace=` parameter in the URL `https://portal.platform.quix.ai/home?workspace={environment-id}` is there for legacy reasons, and does in fact indicate an environment.

## API reference documentation

An OAS3 API reference guides are available for HTTP/REST APIs. These are rendered using [Swagger](https://swagger.io/){target=_blank}. 

The URLs for the API references are specific to your environment, so you can easily test out API calls on your environment using the API reference. You'll need to get you environment ID. The exception to this is the Portal API, which is account-wide.

| API | API reference URL (Swagger documentation)|
|---|---|
| Streaming Writer | https://writer-`<environment-id>`.platform.quix.ai/swagger |
| Streaming Reader | No HTTP/REST interface - SignalR (WebSockets or Long Polling)|
| Portal | https://portal-api.platform.quix.ai/swagger |
| Query | https://telemetry-query-`<environment-id>`.platform.quix.ai/swagger |

Replace `<environment-id>` with your environment ID.

!!! tip

    Once you access the API reference, you can select the version of the API you require from the `Select a definition` dropdown list.

## Set up SignalR

[Microsoft SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr){target=_blank} enables real-time bi-directional communication between Quix and a client. The underlying transport used is either WebSockets or Long POlling, depending on the client's capabilities. 

You'll use SignalR where you need high speed, real-time, communication between Quix and the client, as typically the request-response model of the HTTP/REST approach does not scale to this use case. 

This page explains how to set up Microsoft SignalR.

### Installation

You can install SignalR using `npm` (for Node.js applications) or using a CDN (for web browser applications):

=== "npm"

      If you are using a package manager such as [npm](https://www.npmjs.com/){target=_blank}, you can install SignalR using:

      ``` shell
      npm install @microsoft/signalr
      ``` 

=== "CDN"

      You can also install SignalR using a CDN. For example, in HTML:

      ``` html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello SignalR</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"></script>
        </head>
        ...
      </html>
      ```

### Testing the connection

Once you’ve installed the SignalR library, you can test it with the following code snippet. This opens a connection to the hub running on your custom subdomain, and checks authentication.

You should replace the text `YOUR_PAT` with your PAT.

You should also replace `YOUR_ENVIRONMENT_ID` with your environment ID.

=== "Writer API"

    ```javascript
    var signalR = require("@microsoft/signalr");
    const token = "YOUR_PAT"
    const environmentId = "YOUR_ENVIRONMENT_ID"

    const options = {
        accessTokenFactory: () => token
    };

    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://writer-" + environmentId + ".platform.quix.ai/hub", options)
        .build();

    connection.start().then(() => console.log("SignalR connected."));
    ```

=== "Reader API"

      ```javascript
      var signalR = require("@microsoft/signalr");

      const options = {
          accessTokenFactory: () => 'YOUR_PAT'
      };

      const connection = new signalR.HubConnectionBuilder()
          .withUrl("https://reader-YOUR_ENVIRONMNENT_ID.platform.quix.ai/hub", options)
          .build();

      connection.start().then(() => console.log("SignalR connected."));
      ```

If the connection is successful, you see the console log "SignalR connected".

!!! tip 
	
	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/L9ha4p5j/](https://jsfiddle.net/QuixAI/L9ha4p5j/){target=_blank}
    
## 🏃‍♀️ Next step

[Learn about HTTP requests :material-arrow-right-circle:{ align=right }](http-requests.md)
