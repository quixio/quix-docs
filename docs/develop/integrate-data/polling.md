# Polling

If there's an existing REST API you want to pull data from, you can write a Quix connector that polls the REST API. By way of example, the following code demonstrates the idea:

``` python
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext
import time, os, requests

app = Application.Quix(
    consumer_group="sample_consumer_group",
    auto_create_topics=True,
)

serializer = JSONSerializer()
output_topic = app.topic(os.environ["output"])
print(output_topic.name)
producer = app.get_producer()

while True:
    response = requests.get("https://random-data-api.com/api/v2/users")
    json_response = response.json()

    with producer:
        serialized_value = serializer(
            value=json_response, ctx=SerializationContext(topic=output_topic.name)
        )
        producer.produce(
            topic=output_topic.name,
            key="polling-sample",
            value=serialized_value
        )
    time.sleep(4)
```

The code requests data from the REST API and then publishes it to a stream.
