# Using Quix Streams to ingest data

You can use Quix Streams to push and pull data to and from Quix, as well as use it to transform data. 

Some example code showing Quix Streams pushing data into Quix is shown here:

```python
import psutil, time, os
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext

from dotenv import load_dotenv
load_dotenv()

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    return {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }

app = Application.Quix(
    consumer_group="cpu_load", 
    auto_create_topics=True,
)

serializer = JSONSerializer()
output_topic = app.topic("cpu-load")
producer = app.get_producer()

def main():
    while True:
        cpu_load = get_cpu_load()
        print("CPU load: ", cpu_load)
        with producer:
            serialized_value = serializer(
                value=cpu_load, ctx=SerializationContext(topic=output_topic.name)
            )
            producer.produce(
                topic=output_topic.name,
                key="server-1-cpu",
                value=serialized_value
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')
```

You need to obtain a [streaming token](../authentication/streaming-token.md) from within Quix.

* [Read more about Quix Streams](https://quix.io/docs/quix-streams/introduction.html)
