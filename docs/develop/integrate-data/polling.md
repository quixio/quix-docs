# Polling

If there's an existing REST API you want to pull data from, you can write a Quix connector that polls the REST API. By way of example, the following code demonstrates the idea:

``` python
import quixstreams as qx
import time
import os
import requests
import pandas as pd

client = qx.QuixStreamingClient()

topic_producer = client.get_topic_producer(topic_id_or_name = os.environ["output"])

stream = topic_producer.create_stream()
stream.properties.name = "Users Stream"

while True:
    response = requests.get("https://random-data-api.com/api/v2/users")
    json_response = response.json()
    df = pd.json_normalize(json_response)
    print(df)
    stream.timeseries.publish(df)
    time.sleep(4)
```

The code requests data from the REST API and then publishes it to a stream.
