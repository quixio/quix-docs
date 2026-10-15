---
title: Handling IoT data with MessagePack
description: IoT data is often packed for efficiency using the MessagePack format. This documentation describes how to unpack MessagePack data from IoT sensors.
---

# Handling IoT data with MessagePack

In IoT applications, some smart devices send data serialized in MessagePack format. MessagePack is used in many IoT application for the following reasons:

* **Efficiency**: MessagePack is a binary serialization format that is highly efficient in terms of both size and speed. It can serialize and deserialize data faster than JSON or XML due to its compact binary representation.
* **Reduced Bandwidth**: In IoT applications, devices often have limited bandwidth and resources. Using MessagePack can help reduce the amount of data transmitted over the network by minimizing the size of the payloads compared to text-based formats like JSON or XML.
* **Low Overhead**: MessagePack has minimal overhead compared to other serialization formats. This makes it suitable for resource-constrained devices with limited processing power and memory.
* **Interoperability**: MessagePack is supported by many programming languages and platforms, making it easy to exchange data between different IoT devices, servers, and clients. This interoperability is crucial in heterogeneous IoT environments where devices may use different programming languages and platforms.
* **Schema-less**: MessagePack is schema-less, meaning you don't need to define a schema or schema changes explicitly. This flexibility is beneficial in IoT applications where data formats may evolve over time, and it simplifies the development and maintenance of IoT systems.
* **Built-in Support**: Some IoT platforms and frameworks provide support for MessagePack, making it easier to integrate into IoT applications without the need for additional libraries or dependencies.

## Unpacking MessagePack for further processing

In your processing pipeline you need to unpack the MessagePack data at a suitable point. You can create an unpacking service to do this. The following code shows an example of how to do this:

``` python
import os
from quixstreams import Application
import msgpack

from dotenv import load_dotenv
load_dotenv()

def unpack(row):
    return msgpack.unpackb(row)

app = Application()

input_topic = app.topic(os.environ["input"], value_deserializer="bytes")
output_topic = app.topic(os.environ["output"], value_serializer="json")

sdf = app.dataframe(input_topic)
sdf = sdf.apply(unpack)
sdf = sdf.update(lambda row: print(row))
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Make sure that you add `msgpack` to your `requirements.txt` file.

In the above example messages received on the input topic are serialized in MessagePack format. As they a byte format, the `bytes` deserializer is used. The library is then called to convert the data to text. It is then published on the output topic as JSON.
