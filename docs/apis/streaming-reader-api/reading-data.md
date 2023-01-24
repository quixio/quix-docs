# Reading data

Before you can read data from a stream, you need to subscribe to an
event of the Streaming Reader service like ParameterData or EventData.

You can get a full list of Subscriptions and Events [here](subscriptions.md) .

## Example

The following code sample shows how to use the SignalR client library
to:

1.  Establish a connection to Quix

2.  Subscribe to a parameter data stream

3.  Receive data from that stream

4.  Unsubscribe from the event

<!-- end list -->

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => 'YOUR_ACCESS_TOKEN'
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://reader-YOUR_WORKSPACE_ID.platform.quix.ai/hub", options)
    .build();

// Establish connection
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream.
    connection.invoke("SubscribeToParameter", "your-topic-name", "your-stream-id", "your-parameter-id");

    // Read data from the stream.
    connection.on("ParameterDataReceived", data => {
        let model = JSON.parse(data);
        console.log("Received data from stream: " + model.streamId);

        // Unsubscribe from stream.
        connection.invoke("UnsubscribeFromParameter", "your-topic-name", "your-stream-id", "your-parameter-id");
    });
});
```
