# Using Quix Streams

You can use Quix Streams to push and pull data to and from Quix, as well as use it to transform data. 

Some example code showing Quix Streams pushing data into Quix is shown here:

```python
import psutil
import quixstreams as qx
from dotenv import load_dotenv
import time
import datetime
import os

load_dotenv()
token = os.getenv("STREAMING_TOKEN")

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    return cpu_load

# Obtain client library token from portal
client = qx.QuixStreamingClient(token)

# Open a topic to publish data to
topic_producer = client.get_topic_producer("cpu-load")

stream = topic_producer.create_stream()
stream.properties.name = "Quickstart CPU Load - Server 1"
stream.timeseries.buffer.time_span_in_milliseconds = 100   # Send data in 100 ms chunks

def main():
    try:
        while True:
            cpu_load = get_cpu_load()
            print(f"CPU Load: {cpu_load}%")
            stream.timeseries \
                .buffer \ 
                .add_timestamp(datetime.datetime.utcnow()) \
                .add_value("CPU_Load", cpu_load) \
                .publish()
    except KeyboardInterrupt:
        print("Closing stream")
        stream.close()

if __name__ == '__main__':
    main()
```

You need to obtain a [streaming token](../authentication/streaming-token.md) from within Quix.

* [Read more about Quix Streams](../../quix-streams-intro.md)
