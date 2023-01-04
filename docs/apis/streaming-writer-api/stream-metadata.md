# Add Stream metadata

You can add arbitrary string metadata to any stream. You can also create
a new stream by sending metadata using a stream id that does not already
exist.

## Before you begin

  - You should have a [Workspace set
    up](../../platform/definitions.md#_workspace) with at least [one
    Topic](../../platform/definitions.md#_topics).

  - [Get a Personal Access
    Token](authenticate.md) to authenticate each
    request.

## How to add metadata to a stream

Send a `PUT` request to the following endpoint to update a stream with
the given properties:

    /topics/${topicName}/streams/${streamId}

You should replace `$\{topicName}` with the name of the topic your
stream belongs to, and `$\{streamId}` with the id of the stream you wish
to update. For example:

    /topics/cars/streams/66fb0a2f-eb70-494e-9df7-c06d275aeb7c

!!! tip

	You can create a new stream by supplying a `$\{streamId}` that doesn’t already exist. It will be initialised with the data you provide in the payload, and the id you use in the endpoint. This avoids the need to call the [create stream endpoint](create-stream.md) separately.

Your request should contain a payload consisting of JSON data containing
the desired metadata.

### Example request

Below is an example payload demonstrating how to set a single item of
metadata. Note that the `metadata` property references an object which
contains key/value string-based metadata.



  - curl
    
    ``` shell
    curl "https://${domain}.platform.quix.io/topics/${topicName}/streams/${streamId}" \
         -X PUT \
         -H "Authorization: bearer ${token}" \
         -H "Content-Type: application/json" \
         -d '{"metadata":{"fruit":"apple"}}'
    ```

  - Node.js
    
    ``` javascript
    const https = require('https');
    
    const data = JSON.stringify({ metadata: { fruit: "apple" }});
    
    const options = {
        hostname: domain + '.platform.quix.io',
        path: '/topics/' + topicName + '/streams/' + streamId,
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };
    
    const req = https.request(options);
    
    req.write(data);
    req.end();
    ```



Since this is a PUT request, it will replace all the stream data with
the payload contents. To maintain existing data, you should include it
in the payload alongside your metadata, e.g.

``` json
{
    "name": "Example stream",
    "location": "/sub/dir",
    "metadata": {
        "fruit": "apple"
    }
}
```

### Response

No payload is returned from this call. A 200 HTTP response code
indicates success. If the call fails, you should see either a 4xx or 5xx
response code indicating what went wrong. For example, you’ll see a 405
code if you forget to specify the correct `PUT` method.

## Using SignalR

``` javascript
var signalR = require("@microsoft/signalr");
const token = "YOUR_TOKEN"
const workspaceId = "YOUR_WORKSPACE_ID"
const topic = "YOUR_TOPIC_NAME"
const streamId = "ID_OF_STREAM_TO_UPDATE"

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
    let streamDetails = {
        "name": "Example stream",
        "location": "/sub/dir",
        "metadata": {
            "fruit": "apple"
        }
    }

    // Send stream update details
    console.log("Updating stream");
    await connection.invoke("UpdateStream", topic, streamDetails);
    console.log("Updated stream");
});
```
!!! tip 
	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/ruywnz28/](https://jsfiddle.net/QuixAI/ruywnz28/){target=_blank}