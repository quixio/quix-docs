# Subscription and Event reference

The Quix SignalR hub provides the following subscriptions and events.

## Subscriptions

You can subscribe to the following hub methods using [the `invoke` method](https://docs.microsoft.com/en-gb/javascript/api/@aspnet/signalr/hubconnection?view=signalr-js-latest#invoke){target=_blank} of a `HubConnection`:

  - `SubscribeToParameter(topicName, streamId, parameterId)`: Subscribe to a parameter data stream.

  - `SubscribeToEvent(topicName, streamId, eventId)`: Subscribes to an event data stream.

  - `IList<ActiveStream> SubscribeToActiveStreams(topicName)`: Subscribe to Active Streams List changes. The subscription method returns an initial list of the active streams existing in the topic.

  - `IList<TopicMetrics> SubscribeToTopicMetrics(topicName)`: Subscribe to Topic metrics updates. The subscription method returns an initial list of the last 5 minutes of topic metrics.

  - `SubscribeToPackages(string topicName)`: Subscribe to Topic packages. A package is an abstraction for any message received in the topic.

Each Subscribe method has its own Unsubscribe. Use them once you don’t need the subscriptions anymore to avoid receiving data unnecessarily:

  - `UnsubscribeFromParameter(topicName, streamId, parameterId)`: Unsubscribe from a parameter data stream.

  - `UnsubscribeFromEvent(topicName, streamId, eventId)` Unsubscribe from an event data stream.

  - `UnsubscribeFromActiveStreams(string topicName)`: Unsubscribe from Streams List changes.

  - `UnsubscribeFromTopicMetrics(topicName)`: Unsubscribe from Topic metrics updates.

  - `UnsubscribeFromPackages(string topicName)`: Unsubscribe from Topic packages.

  - `UnsubscribeFromStream(topicName, streamId)`: Unsubscribes from all subscriptions of the specified stream.

You should pass the method’s name as the first argument to `invoke`, followed by the method-specific arguments. For example, to call:

```
SubscribeToParameter(topicName, streamId, parameterId)
```

Use the following:

``` javascript
connection.invoke("SubscribeToParameter", "your-topic-name", "your-stream-id", "your-parameter-id");
```

A more complete example is shown here:

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => '<your-PAT>'
};

const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://reader-joeengland-apitests-testing.platform.quix.ai/hub", options)
      .build();

// Establish connection 
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream 
    connection.invoke("SubscribeToParameter", "f1-data", "*", "EngineRPM");

    // Read parameter data from the stream 
    connection.on("ParameterDataReceived", data => {
        console.log('topicId ', data.topicId);
        console.log('streamId ', data.streamId);
        console.log('streamId ', data.numericValues.EngineRPM);

        // Unsubscribe from stream 
        connection.invoke("UnsubscribeFromParameter", "f1-data", "*", "EngineRPM");
    });
});
```

!!! tip

    When subscribing, you can use the wildcard `*` for topics, streams, and parameters.

## SignalR events

You can register a handler for SignalR events using [the `on` method](https://docs.microsoft.com/en-gb/javascript/api/@aspnet/signalr/hubconnection?view=signalr-js-latest#on){target=_blank} of a `HubConnection`. 

The following events are available:

  - `ParameterDataReceived(parameterData)`

  - `EventDataReceived(eventData)`

  - `ActiveStreamsChanged(stream, action)`

  - `TopicMetricsUpdated(metrics)`

  - `PackageReceived(package)`


You should pass the event’s name as the first argument to `on`,	followed by a function callback. For example, to react to the `ParameterDataReceived` event, use the following:

``` javascript
connection.on("ParameterDataReceived", data => {
  // process payload data
});
```

### ParameterDataReceived

Add a listener to `ParameterDataReceived` event to receive data from a `SubscribeToParameter` subscription.

One event is generated each time a ParameterData package is received in the Topic and the data contains the Parameter the user has subscribed for.

A more complete example is shown here:

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => '<your-PAT>'
};

const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://reader-joeengland-apitests-testing.platform.quix.ai/hub", options)
      .build();

// Establish connection 
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream 
    connection.invoke("SubscribeToParameter", "f1-data", "*", "EngineRPM");

    // Read parameter data from the stream 
    connection.on("ParameterDataReceived", data => {
        console.log('topicId ', data.topicId);
        console.log('streamId ', data.streamId);
        console.log('streamId ', data.numericValues.EngineRPM);

        // Unsubscribe from stream 
        connection.invoke("UnsubscribeFromParameter", "f1-data", "*", "EngineRPM");
    });
});
```

Example payload:

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

### EventDataReceived

Add a listener to `EventDataReceived` event to receive data from a `SubscribeToEvent` subscription.

One event is generated each time a EventData package is received in the Topic and the data contains the Event the user has subscribed for.

A more complete example is shown here:

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => '<your-PAT>'
};

const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://reader-joeengland-apitests-testing.platform.quix.ai/hub", options)
      .build();

// Establish connection 
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream 
    connection.invoke("SubscribeToEvent", "event-data-topic", "rig-telemetry", "temp");

    // Read parameter data from the stream 
    connection.on("EventDataReceived", data => {
        console.log('data --> ', data);

        // Unsubscribe from stream 
        connection.invoke("UnsubscribeFromEvent", "f1-data", "*", "EngineRPM");
    });
});
```

Example payload:

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

### ActiveStreamsChanged

This event is generated each time a change has been produced in the list of Active streams of a Topic.

Add a listener to `ActiveStreamChanged` event to receive data from a `SubscribeToActiveStreams` subscription. This SignalR event contains two arguments on it:

  - `stream`: Payload of the stream that has been changed.

  - `action`: It describes the type of operation has been applied to the list of active streams:
    
      - `AddUpdate`: Stream added or updated
    
      - `Remove`: Stream removed

Example code:

``` javascript
var signalR = require("@microsoft/signalr");

const options = {
    accessTokenFactory: () => '<your-PAT>'
};

const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://reader-joeengland-apitests-testing.platform.quix.ai/hub", options)
      .build();

// Establish connection 
connection.start().then(() => {
    console.log("Connected to Quix.");

    // Subscribe to parameter data stream 
    connection.invoke("SubscribeToActiveStreams", "f1-data");

    // Read parameter data from the stream 
    connection.on("ActiveStreamsChanged", (stream, action) => {
        console.log('stream -----> ', stream);
        console.log('action -----> ', action);

        // Unsubscribe from stream 
        connection.invoke("UnsubscribeFromParameter", "f1-data", "*", "*");
    });
});
```

Might produce the following output:

``` shell
[2023-10-09T15:23:27.993Z] Information: WebSocket connected to wss://reader-joeengland-apitests-testing.platform.quix.ai/hub?id=o9Ctg5zdQ7aAzdQ2Cz4eMw.
Connected to Quix.
stream ----->  {
  streamId: '0a23798f-7d75-413d-9031-8d8386c2f8c7',
  topicId: 'joeengland-apitests-testing-f1-data',
  topicName: 'f1-data',
  metadata: {},
  parents: [],
  parameters: {
    EngineTemp: { dataType: 'Numeric' },
    Motion_WorldPositionX: { dataType: 'Numeric' },
    Steer: { dataType: 'Numeric' },
    Brake: { dataType: 'Numeric' },
    EngineRPM: { dataType: 'Numeric' },
    Motion_WorldPositionZ: { dataType: 'Numeric' },
    TotalLapDistance: { dataType: 'Numeric' },
    LapDistance: { dataType: 'Numeric' },
    Gear: { dataType: 'Numeric' },
    original_timestamp: { dataType: 'Numeric' },
    Motion_WorldPositionY: { dataType: 'Numeric' },
    Speed: { dataType: 'Numeric' }
  },
  events: {},
  firstSeen: '2023-10-09T15:23:29.7197985Z',
  lastSeen: '2023-10-09T15:23:29.7198602Z',
  status: 'Receiving',
  lastData: '2023-10-09T15:23:29.7198603Z'
}
action ----->  AddUpdate
```

Another stream payload example, showing more metadata:

``` json
{
  "streamId": "5ecfc7ce-906c-4d3a-811c-a85ea75a24b3",
  "topicName": "f1-data",
  "name": "F1 Game - Swal - Sakhir Short 2022-04-08-09:00:39",
  "location": "/Game/Codemasters/F1-2019/Sakhir Short",
  "metadata": {
    "GameVersion": "1.22",
    "PacketFormat": "2019",
    "Track": "Sakhir Short",
    "SessionId": "237322236454500810",
    "Player0_Name": "Swal",
    "Player0_Id": "100"
  },
  "parents": [],
  "timeOfRecording": "2022-04-08T09:00:39.3971666Z",
  "parameters": {
    "EngineRPM": {
      "dataType": "Numeric",
      "minimumValue": 0,
      "maximumValue": 20000,
      "location": "/Player/Telemetry/Engine"
    },
    "LapDistance": {
      "dataType": "Numeric",
      "unit": "m",
      "location": "/Player/Telemetry/Misc"
    },
    "Brake": {
      "description": "Amount of brake applied",
      "dataType": "Numeric",
      "minimumValue": 0,
      "maximumValue": 1,
      "location": "/Player/Telemetry/Input"
    },
    "Throttle": {
      "dataType": "Unknown",
      "minimumValue": 0,
      "maximumValue": 1,
      "location": "/Player/Telemetry/Input"
    },
    "Gear": {
      "dataType": "Numeric",
      "minimumValue": -1,
      "maximumValue": 8,
      "location": "/Player/Telemetry/Engine"
    },
    "Speed": {
      "dataType": "Numeric",
      "minimumValue": 0,
      "maximumValue": 400,
      "location": "/Player/Telemetry/Engine"
    },
    "Steer": {
      "dataType": "Numeric",
      "minimumValue": -1,
      "maximumValue": 1,
      "location": "/Player/Telemetry/Input"
    },
  },
  "events": {
    "Player_NewLap": {
      "name": "Player NewLap",
      "level": "Information",
      "location": ""
    },
    "Player_Position_Changed": {
      "name": "Player Position Changed",
      "level": "Critical",
      "location": ""
    },
    "RaceWinner": {
      "name": "Race Winner",
      "level": "Critical",
      "location": ""
    },
  },
  "firstSeen": "2022-04-08T08:57:40.3406586Z",
  "lastSeen": "2022-04-08T09:00:39.6308255Z",
  "status": "Receiving",
  "lastData": "2022-04-08T09:00:39.6237312Z"
}
```

### TopicMetricsUpdated

This event is generated periodically by the service to provide basic metrics about a Topic, like "Bytes per Second" or "Number of Active Streams".

Add a listener to `TopicMetricsUpdated` event to receive data from a `SubscribeToTopicMetrics` subscription.

Topic Metrics payload example:

``` json
{
    "timestamp": "2022-04-10T19:26:49.1417825Z",
    "topicName": "f1-data",
    "bytesPerSecond": 14877,
    "activeStreams": 1
}
```

### PackageReceived

Add a listener to `PackageReceived` event to receive data from a `SubscribeToPackages` subscription.

One event is generated each time a package is received in the topic.

  - Type: Indicates the Quix Sdk model used to deserialize the package.

  - Value: Deserialized package object represented as a Json string
    format.

Package payload example:

``` json
{
    "topicName": "f1-data",
    "streamId": "dec481d7-7ae4-403a-9d20-a1cabdcd3275",
    "type": "Quix.Sdk.Process.Models.ParameterDataRaw",
    "value": "{\"Epoch\":0,\"Timestamps\":[1649623155716050700],\"NumericValues\":{\"LapDistance\":[542.504638671875],\"TotalLapDistance\":[4368.53271484375]},\"StringValues\":{},\"BinaryValues\":{},\"TagValues\":{\"LapValidity\":[\"Valid\"],\"LapNumber\":[\"2\"],\"PitStatus\":[\"None\"],\"Sector\":[\"0\"],\"DriverStatus\":[\"Flying_lap\"]}}",
    "dateTime": "2022-04-10T20:39:16.63Z"
}
```
