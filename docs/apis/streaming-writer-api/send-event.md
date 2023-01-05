# Send an Event

You can add Events to your stream data to record discrete actions for
future reference.

## Before you begin

  - [Get a Personal Access Token](authenticate.md) to authenticate each
    request.

  - If you don’t already have a Stream in your workspace, [add one using
    the API](create-stream.md).

## Sending event data

To send event data to a stream, use the `POST` method with this
endpoint:

```
/topics/${topicName}/streams/${streamId}/events/data
```

You should replace `${topicName}` with the name of the topic your
stream belongs to, and `${streamId}` with the id of the stream you wish
to send data to. For example:

```
/topics/cars/streams/66fb0a2f-eb70-494e-9df7-c06d275aeb7c/events/data
```

!!! tip
	
	You can create a new stream by supplying a `$\{streamId}` that doesn’t already exist. This avoids the need to call the [create stream endpoint](create-stream.md) separately.

Your payload should be an array of events. Each event is an object
containing the following properties:

  - id  
    a unique identifier for the event

  - timestamp  
    the nanosecond-precise timestamp at which the event occurred

  - tags  
    a object containing key-value string pairs representing tag values

  - value  
    a string value associated with the event

### Example request

This example call adds a single event to a stream. The event has an
example value and demonstrates use of a tag to include additional
information.



=== "curl"
    
    ``` shell
    curl -i "https://${domain}.platform.quix.ai/topics/${topicName}/streams/${streamId}/events/data" \
         -H "Authorization: bearer ${token}" \
         -H "Content-Type: application/json" \
         -d '[{
                 "id": "Alert",
                 "timestamp": 1618133869000000000,
                 "tags": {
                     "capacity": "over"
                 },
                 "value": "Help"
         }]'
    ```

=== "Node.js"
    
    ``` javascript
    const https = require('https');
    
    const data = JSON.stringify({
        "id": "Alert",
        "timestamp": 1618133869000000000,
        "tags": {
            "capacity": "over"
        },
        "value": "Help"
    });
    
    const options = {
        hostname: domain + '.platform.quix.ai',
        path: '/topics/' + topicName + '/streams/' + streamId + '/events/data',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };
    
    const req = https.request(options);
    
    req.write(data);
    req.end();
    ```



### Response

No payload is returned from this call. A 200 HTTP response code
indicates success. If the call fails, you should see either a 4xx or 5xx
response code indicating what went wrong.

## Using SignalR

``` javascript
var signalR = require("@microsoft/signalr");
const token = "YOUR_TOKEN"
const workspaceId = "YOUR_WORKSPACE_ID"
const topic = "YOUR_TOPIC_NAME"
const streamId = "ID_OF_STREAM_TO_WRITE_TO"

const options = {
    accessTokenFactory: () => token
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://writer-" + workspaceId + ".platform.quix.ai/hub", options)
    .build();

// Establish connection
connection.start().then(async () => {
    console.log("Connected to Quix.");

    // Note, SignalR uses the same models as the HTTP endpoints, so if in doubt, check HTTP endpoint samples or Swagger for model.
    let eventData = [
        {
            "timestamp": Date.now() * 1000000, // set now in nanoseconds,
            "tags": {
                "capacity": "over"
            },
            "id": "Alert",
            "value": "Successful sample run"
        }
    ]

    // Send stream update details
    console.log("Sending event data");
    await connection.invoke("SendEventData", topic, streamId, eventData);
    console.log("Sent event data");
});
```
!!! tip 
	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/h4fztrns/](https://jsfiddle.net/QuixAI/h4fztrns/){target=_blank}