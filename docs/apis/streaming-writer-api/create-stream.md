# Create a new Stream

Data is typicaly published to a stream within a topic. As a stream is confined to a topic partition, order of delivery is guaranteed for a stream.

!!! tip

	This method is optional. You can also create a stream implicitly by sending data to a stream that doesn’t already exist. If a stream does not exist it is created for you.

## Using the `/streams` endpoint

To create a new stream, send a `POST` request to:

    /topics/${topicName}/streams

You should replace `${topicName}` in the endpoint URL with the name of the [Topic](../../platform/glossary.md#topics) you wish to create the stream in. For example, if your topic is named "cars", your endpoint URL will be `/topics/cars/streams`.

### Example request

You can create a new Stream with an absolute minimum of effort by passing an empty JSON object in the payload:

=== "Curl"
    
    ``` shell
    curl "https://${domain}.platform.quix.ai/topics/${topicName}/streams" \
            -X POST \
            -H "Authorization: bearer ${token}" \
            -H "Content-Type: application/json" \
            -d '{}'
    ```

=== "Node.js"
    
    ``` javascript
    const https = require('https');

    const data = "{}";

    const options = {
        hostname: domain + '.platform.quix.ai',
        path: '/topics/' + topicName + '/streams',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, res => {
        res.on('data', d => {
            let streamId = JSON.parse(d).streamId;
            console.log(streamId);
        });
    });

    req.write(data);
    req.end();
    ```

For most real-world cases, you’ll also want to provide some or all of the following:

* `name` - the human friendly name of the stream
* `location` - the location of the stream's persisted data in the data catalogue (retrieved using Query API)
* `metadata` - metadata for the stream (retrieved using Query API, or Data Explorer) 
* `parents` - the list of stream ids of the parent streams
* `timeOfRecording` - the datetime of the stream recording

For example, here’s a more useful payload:

```json
{
    "name": "cardata",
    "location": "simulations/trials",
    "metadata": {
        "rain": "light"
    }
}
```

### Example response

The JSON returned is an object with a single property, `streamId`. This contains the unique identifier of your newly created stream, and resembles the following:

```json
{
    "streamId": "66fb0a2f-eb70-494e-9df7-c06d275aeb7c"
}
```

!!! tip

	If you’re following these guides in order, you’ll want to take note of that stream id. For curl examples, it’s convenient to keep it in an environment variable, for example:

	``` bash
	$ streamId=66fb0a2f-eb70-494e-9df7-c06d275aeb7c
	```

## Using SignalR

```javascript
var signalR = require("@microsoft/signalr");
const token = "YOUR_TOKEN"
const environmentId = "YOUR_ENVIRONMENT_ID"
const topic = "YOUR_TOPIC_NAME"

const options = {
    accessTokenFactory: () => token
};

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://writer-" + environmentId + ".platform.quix.ai/hub", options)
    .build();

// Establish connection
connection.start().then(async () => {
    console.log("Connected to Quix.");

    // Note, SignalR uses the same models as the HTTP endpoints, so if in doubt, check HTTP endpoint samples or Swagger for model.
    let streamDetails = {
        "name": "cardata",
        "location": "simulations/trials",
        "metadata": {
            "rain": "light"
        }
    }

    // Send create details
    console.log("Creating stream");
    let createdDetails = await connection.invoke("CreateStream", topic, streamDetails);
    let streamId = createdDetails.streamId
    console.log("Created stream " + streamId);
});
```

!!! tip

	Also available as JsFiddle at [https://jsfiddle.net/QuixAI/cLno68fs/](https://jsfiddle.net/QuixAI/cLno68fs/){target=_blank}

## 🏃‍♀️ Next step

[Stream metadata :material-arrow-right-circle:{ align=right }](stream-metadata.md)
