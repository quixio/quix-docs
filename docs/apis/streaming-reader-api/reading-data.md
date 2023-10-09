# Reading data

Before you can read data from a stream, you need to subscribe to an event of the Streaming Reader service such as `ParameterData` or `EventData`.

Read the [Subscriptions and Events reference guide](subscriptions.md).

## Example

The following code sample shows how to use the SignalR client library to:

1.  Establish a connection to Quix.

2.  Subscribe to a parameter data stream (you can subscribe to multiple streams using the special wildcard character `*`).

3.  Receive data from that stream.

4.  Unsubscribe from the event.

In the following Node.js code, click `+` to see the annotation:

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => 'YOUR_ACCESS_TOKEN'
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://reader-YOUR_ENVIRONMENT_ID.platform.quix.ai/hub", options)
    .build();

// Establish connection (1)
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream (2)
    connection.invoke("SubscribeToParameter", "your-topic-name", "your-stream-id", "your-parameter-id");

    // Read data from the stream (3)
    connection.on("ParameterDataReceived", data => {
        let model = JSON.parse(data);
        console.log("Received data from stream: " + model.streamId);

        // Unsubscribe from stream (4)
        connection.invoke("UnsubscribeFromParameter", "your-topic-name", "your-stream-id", "your-parameter-id");
    });
});
```

1. Establish the connection to Quix.
2. Subscribe to a parameter data stream (you can subscribe to multiple streams using the special wildcard character `*`).
3. Read data from the stream.
4. Unsubscribe from the stream.