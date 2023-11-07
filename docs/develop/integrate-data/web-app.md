# Using a web app

You may have a web app, either hosted in Quix, or elsewhere (say on Glitch), that receives data that you want to process in Quix. In either case, data can be posted using HTTP `POST` methods (or other HTTP methods) to the web app, and then this data published to a Quix topic using Quix Streams.

The following example shows a Python Flask web app hosted in Quix. Data is received on an endpoint, in this case `/data`. The data is then published to an output topic. Of course you may have multiple endpoints receiving data, which you can publish to different streams, depending on your use case.

!!! note

    When deploying this service in Quix, it's important to enable public access in the deployment dialog, and make a note of the [service public URL](../../deploy/deploy-public-page.md). 

The following shows the code for a simple web app that enables you to post data using HTTP, and then publish this to a Quix topic using Quix Streams:

```python
import quixstreams as qx
from flask import Flask, request
from datetime import datetime
from waitress import serve
import os
import json

# Quix injects credentials automatically to the client. 
# Alternatively, you can always pass an SDK token manually as an argument.
client = qx.QuixStreamingClient()

# Open the output topic where to write data out
producer_topic = client.get_topic_producer(os.environ["output"])

stream = producer_topic.create_stream()
stream.properties.name = "Post Data"

app = Flask("Post Data")

# this is unauthenticated, anyone could post anything to you!
@app.route("/data", methods=['POST'])
def webhook():
    print('dumps: ',  json.dumps(request.json))

    # post event data
    stream.events.add_timestamp(datetime.now())\
        .add_value("sensor", json.dumps(request.json))\
        .publish()

    return "OK", 200


print("CONNECTED!")

# use waitress for production
serve(app, host='0.0.0.0', port = 80)
```

There may be various devices or apps posting data to your web app. 

A simple test of your web app can be performed with Curl, as shown in the following example:

```shell
curl -X POST -H "Content-Type: application/json"  https://app-workspace-project-branch.deployments.quix.ai/data -d @data.json
```

In this example, `data.json` contains your JSON data, such as:

```json
{
  "id": "device-012-ABC",
  "temp": 123,
  "press": 456
}
```

!!! tip

    You'll need to change the URL in the Curl example to the one provided in the [deployment dialog](../../deploy/deploy-public-page.md) for your service.

Quix can bring real-time web functionality to you client applications. The following types of applications are good candidates to use Quix as their data plane.

  - Dashboard and real-time monitoring applications that show updates as
    they happen to users like cloud/edge monitoring tools.

  - Applications that require data to be pushed from a backend at high
    frequency like games and simulations.

  - Social networking applications that require broadcasting updates to
    many users at high frequency like live sharing of Strava data.