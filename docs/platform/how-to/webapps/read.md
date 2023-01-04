# Read from Quix with NodeJs

Quix supports real-time data streaming over WebSockets. JavaScript
clients can receive updates on parameter and event definition updates,
parameter data and event data as they happen. Following examples use
[SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1){target=_blank}
client library to connect to Quix over WebSockets.

## Setting up SignalR

If you are using a package manager like npm, you can install SignalR
using `npm install @microsoft/signalr`. For other installation options
that don’t depend on a platform like Node.js such as consuming SignalR
from a CDN please refer to [SignalR
documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-3.1){target=_blank}.

Following code snippet shows how you can connect to Quix after SignalR
has been setup.

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => 'your_access_token'
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://reader-your-workspace-id.portal.quix.io/hub", options)
    .build();

connection.start().then(() => console.log("SignalR connected."));
```

If the connection is successful, you should see the console log "SignalR
connected".

## Reading data from a stream

Before you can read data from a stream, you need to subscribe to an
event like parameter definition, event definition, parameter data or
event data.

Following is an example of establishing a connection to Quix,
subscribing to a parameter data stream, reading data from that stream,
and unsubscribing from the event using a SignalR client.

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => 'your_access_token'
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://reader-your-workspace-id.portal.quix.io/hub", options)
    .build();

// Establish connection
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream.
    connection.invoke("SubscribeToParameter", "your-topic-name", "your-stream-id", "your-parameter-id");

    // Read data from the stream.
    connection.on("ParameterDataReceived", data => {
        let model = JSON.stringify(data);
        console.log("Received data from stream: " + model);

        // Unsubscribe from stream.
        connection.invoke("UnsubscribeFromParameter", "your-topic-name", "your-stream-id", "your-parameter-id");
    });
});
```

Following is a list of subscriptions available for SignalR clients.

  - `SubscribeToParameter(topicName, streamId, parameterId)`: Subscribes
    to a parameter data stream. Use `UnsubscribeFromParameter(topicname,
    streamId, parameterId)` to unsubscribe.

  - `SubscribeToParameterDefinitions(topicName, streamId)`: Subscribes
    to parameter definition updates.

  - `SubscribeToEvent(topicName, streamId, eventId)`: Subscribes to an
    event data stream. Use `UnsubscribeFromEvent(topicName, streamId,
    eventId)` to unsubscribe.

  - `SubscribeToEventDefinitions(topicName, streamId)`: Subscribes to
    event definition updates.

  - `UnsubscribeFromStream(topicName, streamId)`: Unsubscribes from all
    subscriptions of the specified stream.

Following is a list of SignalR events supported by Quix and their
payloads.

  - `ParameterDataReceived`: Add a listener to this event to receive
    parameter data from a stream. Following is a sample payload for this
    event.

<!-- end list -->

``` javascript
{
  topicName: 'topic-1',
  streamId: 'b45969d2-4624-4ab7-9779-c8f90ce79420',
  timestamps: [ 1591733989000000000, 1591733990000000000, 1591733991000000000 ],
  numericValues: { ParameterA: [ 1, 2, 3 ] },
  stringValues: {},
  tagValues: { ParameterA: [ null, null, 'tag-1' ] }
}
```

  - `ParameterDefinitionsUpdated`: Add a listener to this event to
    receive data from `SubscribeToParameterDefinitions` subscription.
    Following is a sample payload of this event.

<!-- end list -->

``` javascript
{
    topicName: 'topic-1',
    streamId: 'b45969d2-4624-4ab7-9779-c8f90ce79420',
    definitions: [
        {
            Id: 'ParameterA',
            Name: 'Parameter A',
            Description: 'Description of parameter A',
            MinimumValue: null,
            MaximumValue: 100.0,
            Unit: 'kmh',
            CustomProperties: null,
            Localtion: '/car/general'
        }
    ]
}
```

  - `EventDataReceived`: Add a listener to this event to receive data
    from `SubscribeToEvent` subscription. Following is a sample payload
    of this event.

<!-- end list -->

``` javascript
{
    topicName: 'topic-1',
    streamId: 'b45969d2-4624-4ab7-9779-c8f90ce79420'
    id: 'EventA',
    timestamp: 1591733990000000000,
    value: 'val-a',
    tags: {
        tag1: 'val1'
    }
}
```
