# Set up SignalR

TODO


## Installation

If you are using a package manager like [npm](https://www.npmjs.com/){target=_blank}, you can install SignalR using `npm install @microsoft/signalr`. For other installation options that don’t depend on a platform like Node.js, such as consuming SignalR from a CDN, please refer to [SignalR documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-3.1){target=_blank}.

## Testing the connection

Once you’ve installed the SignalR library, you can test it’s set up correctly with the following code snippet. This opens a connection to the hub running on your custom subdomain, and checks authentication.

You should replace the text `YOUR_ACCESS_TOKEN` with your [PAT](../../platform/how-to/personal-access-token-pat.md).

You should also replace `YOUR_ENVIRONMENT_ID` with your [environment ID](../../platform/how-to/get-environment-id.md).

```javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => 'YOUR_ACCESS_TOKEN'
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://reader-YOUR_ENVIRONMNENT_ID.platform.quix.ai/hub", options)
    .build();

connection.start().then(() => console.log("SignalR connected."));
```

If the connection is successful, you should see the console log "SignalR connected".
