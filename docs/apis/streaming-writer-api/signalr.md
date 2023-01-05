# Set up SignalR

## Before you begin

  - Get a PAT for
    [Authentication](authenticate.md)

  - Ensure you know your workspace ID

## Installation

If you are using a package manager like [npm](https://www.npmjs.com/){target=_blank},
you can install SignalR using `npm install @microsoft/signalr`. For
other installation options that don’t depend on a platform like Node.js,
such as consuming SignalR from a CDN, please refer to [SignalR
documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-3.1){target=_blank}.

## Testing the connection

Once you’ve installed the SignalR library, you can test it’s set up
correctly with the following code snippet. This opens a connection to
the hub running on your custom subdomain, and checks authentication.

You should replace the text `YOUR_ACCESS_TOKEN` with the PAT obtained
from [Authenticating with the Streaming Writer
API](authenticate.md).

You should also replace `YOUR_WORKSPACE_ID` with the appropriate
identifier, a combination of your organization and workspace names.
This can be located in one of the following ways:



  - Portal URL  
    Look in the browsers URL when you are logged into the Portal and
    inside the Workspace you want to work with. The URL contains the
    workspace id. e.g everything after "workspace=" till the next *&*

  - Topics Page  
    In the Portal, inside the Workspace you want to work with, click the
    Topics menu
    ![Topic icon](../images/icons/topics.png) and then
    click the expand icon
    ![Expand icon](../images/icons/expand.jpg) on any
    topic. Here you will see a *Username* under the Broker Settings.
    This Username is also the Workspace Id.



``` javascript
var signalR = require("@microsoft/signalr");
const token = "YOUR_TOKEN"
const workspaceId = "YOUR_WORKSPACE_ID"

const options = {
    accessTokenFactory: () => token
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://writer-" + workspaceId + ".platform.quix.ai/hub", options)
    .build();

connection.start().then(() => console.log("SignalR connected."));
```

If the connection is successful, you should see the console log “SignalR
connected”.

!!! tip 
	
	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/L9ha4p5j/](https://jsfiddle.net/QuixAI/L9ha4p5j/){target=_blank}