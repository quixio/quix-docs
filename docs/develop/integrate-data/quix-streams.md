# Using Quix Streams to ingest data

You can use Quix Streams to push and pull data to and from Quix, as well as use it to transform data.

## Installing Quix Streams

To install Quix Streams with `pip`:

```
python3 -m pip install quixstreams
```

!!! tip

    If you already have Quix Streams installed, make sure you are using the latest version with `python -m pip install quixstreams -U` or `python3 -m pip install quixstreams -U`, depending on how your system is set up.

Note that if you're using Quix Cloud, then make sure the latest version of Quix Streams is available by adding it to the `requirements.txt` file, if it's not already been included as part of the code sample you are using.

## Example code

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

app = Application()

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
