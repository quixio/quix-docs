# Send Parameter data

You can send telemetry data using the Streaming Writer API. Select a
topic and a stream to send the data to. In your payload, you can include
numeric, string, or binary parameter data, with nanosecond-level
timestamps.

## Before you begin

  - You should have a [Workspace set
    up](../../platform/definitions.md#_workspace) with at least [one
    Topic](../../platform/definitions.md#_topics).

  - [Get a Personal Access
    Token](authenticate.md) to authenticate each
    request.

## Sending structured data to the endpoint

Send a POST request together with a JSON payload representing the data
you’re sending to:

```
/topics/${topicName}/streams/${streamId}/parameters/data
```

You should replace `$\{topicName}` with the name of the topic your
stream belongs to, and `$\{streamId}` with the id of the stream you wish
to send data to. For example:

```
/topics/cars/streams/66fb0a2f-eb70-494e-9df7-c06d275aeb7c/parameters/data
```

!!! tip

	You can create a new stream by supplying a `$\{streamId}` that doesn’t already exist. This avoids the need to call the [create stream endpoint](create-stream.md) separately.

### Example request

Your payload should include an array of `timestamps` with one timestamp
for each item of data you’re sending. Actual data values should be keyed
on their name, in the object that corresponds to their type, one of
`numericValues`, `stringValues`, or `binaryValues`. The payload is in
this structure:

``` json
{
    "timestamps": [...],
    "numericValues": {...},
    "stringValues": {...},
    "binaryValues": {...},
    "tagValues": {...}
}
```

Any data types that are unused can be omitted. So a final request using
curl might look something like this:



=== "curl"
    
    ``` bash
    curl -X POST "https://${domain}.platform.quix.io/topics/${topicName}/streams/${streamId}/parameters/data" \
         -H "Authorization: Bearer ${token}" \
         -H "Content-Type: application/json" \
         -d '{
                 "timestamps": [1591733989000000000, 1591733990000000000, 1591733991000000000],
                 "numericValues": {
                     "SomeParameter1": [10.01, 202.02, 303.03],
                     "SomeParameter2": [400.04, 50.05, 60.06]
                 }
            }'
    ```

=== "Node.js"
    
    ``` javascript
    const https = require('https');
    
    const data = JSON.stringify({
        "timestamps": [1591733989000000000, 1591733990000000000, 1591733991000000000],
        "numericValues": {
            "SomeParameter1": [10.01, 202.02, 303.03],
            "SomeParameter2": [400.04, 50.05, 60.06]
        }
    });
    
    const options = {
        hostname: domain + '.platform.quix.io',
        path: '/topics/' + topicName + '/streams/' + streamId + '/parameters/data',
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
    .withUrl("https://writer-" + workspaceId + ".platform.quix.io/hub", options)
    .build();

// Establish connection
connection.start().then(async () => {
    console.log("Connected to Quix.");

    // Note, SignalR uses the same models as the HTTP endpoints, so if in doubt, check HTTP endpoint samples or Swagger for model.
    let parameterData = {
      "epoch": Date.now() * 1000000, // set now as time starting point, in nanoseconds
      "timestamps": [
        0,
        5000000000, // 5 seconds from now (see epoch)
        8000000000
      ],
      "numericValues": {
        "NumericParameter1": [
          13.37,
          42,
          24.72
        ]
      },
      "stringValues": {
        "StringParameter1": [
          "Hello",
          "World",
          "!"
        ]
      },
      "binaryValues": {
        "BinaryParameter1": [
          btoa("Hello"), // send binary array as base64
          btoa("World"),
          btoa("!")
        ]
      },
      "tagValues": {
        "Tag1": [
          "A",
          "B",
          null
        ]
      }
    }

    // Send stream update details
    console.log("Sending parameter data");
    await connection.invoke("SendParameterData", topic, streamId, parameterData);
    console.log("Sent parameter data");
});
```
!!! tip 
	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/a41b8x0t/](https://jsfiddle.net/QuixAI/a41b8x0t/){target=_blank}