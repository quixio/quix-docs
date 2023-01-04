# Create a new Stream

You can create a new stream by specifying a topic to create it in, and
supplying any other additional properties required.

!!! tip

	This method is optional. You can also create a stream implicitly by
	sending data to a stream that doesn’t already exist. But creating a
	stream using the method on this page avoids having to determine a
	unique stream id yourself.

## Before you begin

  - You should have a [Workspace set
    up](../../platform/definitions.md#_workspace) with at least [one
    Topic](../../platform/definitions.md#_topics).

  - [Get a Personal Access
    Token](authenticate.md) to authenticate each
    request.

## Using the /streams endpoint

To create a new stream, send a `POST` request to:

    /topics/${topicName}/streams

You should replace `$\{topicName}` in the endpoint URL with the name of
the [Topic](../../platform/definitions.md#_topics) you wish to create the
stream in. For example, if your topic is named “cars”, your endpoint url
will be `/topics/cars/streams`.

### Example request

You can create a new Stream with an absolute minimum of effort by
passing an empty JSON object in the payload:



  - curl
    
    ``` shell
    curl "https://${domain}.platform.quix.io/topics/${topicName}/streams" \
         -H "Authorization: bearer ${token}" \
         -H "Content-Type: application/json" \
         -d '{}'
    ```

  - Node.js
    
    ``` javascript
    const https = require('https');
    
    const data = "{}";
    
    const options = {
        hostname: domain + '.platform.quix.io',
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



For most real-world cases, you’ll also want to provide some or all of
the following:

  - `name`

  - `location`

  - `metadata`

  - `parents`

  - `timeOfRecording`

For example, here’s a more useful payload:

``` json
{
    "name": "cardata",
    "location": "simulations/trials",
    "metadata": {
        "rain": "light"
    }
}
```

### Example response

The JSON returned is an object with a single property, `streamId`. This
contains the unique identifier of your newly created stream, and will
look something like this:

``` json
{
    "streamId": "66fb0a2f-eb70-494e-9df7-c06d275aeb7c"
}
```

!!! tip

	If you’re following these guides in order, you’ll want to take note of
	that stream id. For curl examples, it’s convenient to keep it in an
	environment variable, e.g.

	``` bash
	$ streamId=66fb0a2f-eb70-494e-9df7-c06d275aeb7c
	```

## Using SignalR

``` javascript
var signalR = require("@microsoft/signalr");
const token = "YOUR_TOKEN"
const workspaceId = "YOUR_WORKSPACE_ID"
const topic = "YOUR_TOPIC_NAME"

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
