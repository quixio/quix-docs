# SignalR subscription and event reference

The Quix SignalR hub provides the subscriptions and events. You subscribe to channels of interest, and then you can write code that handles events on that channel if and when they occur.

## Subscribe

You can subscribe to the following hub methods using [the `invoke` method](https://docs.microsoft.com/en-gb/javascript/api/@aspnet/signalr/hubconnection?view=signalr-js-latest#invoke){target=_blank} of a `HubConnection`:

| Hub method (C#) | Description | Invocation code (JavaScript) |
|----|----|----|
| `SubscribeToParameter(topicName, streamId, parameterId)` | Subscribe to a parameter data stream | `connection.invoke("SubscribeToParameter", "your-topic-name", "your-stream-id", "your-parameter-id");` |
| `SubscribeToEvent(topicName, streamId, eventId)` | Subscribes to an event data stream | `connection.invoke("SubscribeToEvent", "your-topic-name", "your-stream-id", "your-parameter-id");` |
| `IList<ActiveStream> SubscribeToActiveStreams(topicName)` | Subscribe to Active Streams List changes. The subscription method returns an initial list of the active streams existing in the topic | `connection.invoke("SubscribeToActiveStreams", "your-topic-name");` |
| `IList<TopicMetrics> SubscribeToTopicMetrics(topicName)` | Subscribe to Topic metrics updates. The subscription method returns an initial list of the last 5 minutes of topic metrics | `connection.invoke("SubscribeToTopicMetrics", "your-topic-name");` |
| `SubscribeToPackages(string topicName)` | Subscribe to Topic packages. A package is an abstraction for any message received in the topic | `connection.invoke("SubscribeToTopicPackages", "your-topic-name");` |

!!! tip

    When subscribing, you can use the wildcard `*` for topics, streams, and parameters.

## Unsubscribe

Each Subscribe method has its own `Unsubscribe` method. Use them to avoid receiving data unnecessarily. The `Unsubscribe` methods are detailed in the following table:

| Method | Description |
|----|----|
| `UnsubscribeFromParameter(topicName, streamId, parameterId)` | Unsubscribe from a parameter data stream |
| `UnsubscribeFromEvent(topicName, streamId, eventId)` | Unsubscribe from an event data stream |
| `UnsubscribeFromActiveStreams(string topicName)` | Unsubscribe from Streams List changes |
| `UnsubscribeFromTopicMetrics(topicName)` | Unsubscribe from Topic metrics updates |
| `UnsubscribeFromPackages(string topicName)` | Unsubscribe from Topic packages |
| `UnsubscribeFromStream(topicName, streamId)` | Unsubscribes from all subscriptions of the specified stream |

## SignalR events

You can register a handler for SignalR events using [the JavaScript `on` method](https://docs.microsoft.com/en-gb/javascript/api/@aspnet/signalr/hubconnection?view=signalr-js-latest#on){target=_blank} of a `HubConnection`. 

The following events are available:

  - `ParameterDataReceived(parameterData)`

  - `EventDataReceived(eventData)`

  - `ActiveStreamsChanged(stream, action)`

  - `TopicMetricsUpdated(metrics)`

  - `PackageReceived(package)`


Pass the event’s name as the first argument to the `on` method,	followed by a callback function. For example, to react to the `ParameterDataReceived` event, use the following:

``` javascript
connection.on("ParameterDataReceived", data => {
  // process payload data
});
```

Each of the previously llisted methods are described in the following sections.

### ParameterDataReceived

Add a listener to `ParameterDataReceived` event to receive parameter data from a `SubscribeToParameter` subscription.

One event is generated each time a `ParameterData`` package is received in the topic and the data contains the parameter the user has subscribed to.

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

One event is generated each time a EventData package is received in the topic and the data contains the event the user has subscribed for.

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

    // Subscribe to event data stream 
    connection.invoke("SubscribeToEvent", "topic-1", "*", "EventA");

    // Read event data from the stream 
    connection.on("EventDataReceived", data => {
        console.log('data --> ', data);

        // Unsubscribe from stream 
        connection.invoke("UnsubscribeFromEvent", "topic-1", "*", "EventA");
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

This event is generated each time a change has been produced in the list of active streams in a topic.

Add a listener to `ActiveStreamsChanged` event to receive data from a `SubscribeToActiveStreams` subscription. This SignalR event returns two callback parameters:

| Callback Parameter | Description |
|----|----|
| `stream` | Payload of the stream that has been changed |
| `action` | It describes the type of operation has been applied to the list of active streams. Two actions are possible: `AddUpdate`: Stream added or updated. `Remove`: Stream has been removed. |

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

    connection.invoke("SubscribeToActiveStreams", "f1-data");

    connection.on("ActiveStreamsChanged", (stream, action) => {
        console.log('stream -----> ', stream);
        console.log('action -----> ', action);

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

    connection.invoke("SubscribeToTopicMetrics", "f1-data");

    connection.on("TopicMetricsUpdated", (metrics) => {
        console.log('metrics -----> ', metrics);
    });
});
```

Topic Metrics payload examples:

``` json
metrics ----->  {
  timestamp: '2023-10-11T10:22:14.7787333Z',
  topicId: 'joeengland-apitests-testing-f1-data',
  topicName: 'f1-data',
  bytesPerSecond: 8282,
  activeStreams: 1
}
metrics ----->  {
  timestamp: '2023-10-11T10:22:15.7761409Z',
  topicId: 'joeengland-apitests-testing-f1-data',
  topicName: 'f1-data',
  bytesPerSecond: 8072,
  activeStreams: 1
}
```

### PackageReceived

Add a listener to `PackageReceived` event to receive data from a `SubscribeToPackages` subscription.

One event is generated each time a package is received in the topic. The package contains:

| Parameter | Description |
|----|----|
| Type | Indicates the Quix client library model used to deserialize the package |
| Value | Deserialized package object represented as a JSON string format |

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

    connection.invoke("SubscribeToPackages", "f1-data");

    connection.on("PackageReceived", (package) => {
        console.log('package -----> ', package);
    });
});

```

Package payload example:

``` shell
{
  topicId: 'joeengland-apitests-testing-f1-data',
  topicName: 'f1-data',
  streamId: '020aee7e-edba-4913-aee3-b1e493c78132',
  type: 'QuixStreams.Telemetry.Models.TimeseriesDataRaw',
  value: '{"Epoch":0,"Timestamps":[1697020374684026880,1697020374737754880],"NumericValues":{"original_timestamp":[1.6871805934271606E+18,1.6871805934782164E+18],"Motion_WorldPositionZ":[-47.103004455566406,-51.53349304199219],"Motion_WorldPositionY":[91.16168212890624,91.1617202758789],"Motion_WorldPositionX":[-386.4772338867188,-386.242431640625],"TotalLapDistance":[7836.7548828125,7841.19189453125],"Steer":[0.0,0.0],"Speed":[312.0,312.0],"LapDistance":[184.69873046875,189.1357421875],"Gear":[8.0,8.0],"EngineTemp":[90.0,90.0],"EngineRPM":[11143.0,11153.0],"Brake":[0.0,0.0]},"StringValues":{},"BinaryValues":{},"TagValues":{"DriverStatus":["Flying_lap","Flying_lap"],"LapNumber":["3","3"],"LapValidity":["Valid","Valid"],"PitStatus":["None","None"],"Sector":["0","0"],"streamId":["5a517ca4-efc3-4166-aedb-a5c57e2b9c59","5a517ca4-efc3-4166-aedb-a5c57e2b9c59"]}}',
  dateTime: '2023-10-11T10:32:54'
}
```
