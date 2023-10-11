# Set up SignalR

[Microsoft SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr){target=_blank} enables real-time bi-directional communication between Quix and a client. The underlying transport used is either WebSockets or Long POlling, depending on the client's capabilities. 

You'll use SignalR where you need high speed, real-time, communication between Quix and the client, as typically the request-response model of the HTTP/REST approach does not scale to this use case. 

This page explains how to set up Microsoft SignalR.

## Installation

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

## Testing the connection

Once you’ve installed the SignalR library, you can test it with the following code snippet. This opens a connection to the hub running on your custom subdomain, and checks authentication.

You should replace the text `YOUR_PAT` with your [PAT](../platform/how-to/personal-access-token-pat.md).

You should also replace `YOUR_ENVIRONMENT_ID` with your [environment ID](../platform/how-to/get-environment-id.md).

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