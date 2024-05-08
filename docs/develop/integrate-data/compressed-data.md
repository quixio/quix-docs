---
title: Handling compressed data
description: This page describes handling Kafka message too large errors, and how to compress, and decompress data to work around this issue.
---

# Handling compressed data

When handling messages, you might run into a Kafka error message stating your messages are too large. This happens when your messages are greater than 1MB, unless you have configured your broker to support messages larger than this. The Quix-managed broker handles messages up to a maximum of 1MB. The error message is:

```
KafkaError{code=MSG_SIZE_TOO_LARGE,val=10,str="Unable to produce message: Broker: Message size too large"}
```

If you are not able to change your broker configuration to support larger messages, then one option is to compress the messages before they are published to Kafka. You can then decompress the messages at a suitable point in your pipeline. This page looks at how you can compress, and then decompress your data.

## Data compression

There are many compression libraries you can use to compress your messages. Speed is important for real-time applications, but compression levels are also an important consideration. As messages are typically text, such as JSON, they will compress efficiently with most of the common compression algorithms.

For an example, consider compression of a data message using the `zlib` library:

``` python
import psutil, time, os, zlib
from quixstreams import Application

from dotenv import load_dotenv
load_dotenv()

# compress message with zlib
def compress_message(data):
    data = str(data) # convert dict to string before encoding as bytes
    data = zlib.compress(data.encode('utf-8')) # encode as UTF-8 bytes and compress
    return data

app = Application()

output_topic = app.topic(os.environ["output_topic"], value_serializer="bytes")

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    data = {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }
    print(data["cpu_load"])
    return data

def main():
    with app.get_producer() as producer:
        while True:                
            message = get_cpu_load()
            compressed_message = compress_message(message)

            producer.produce(
            topic=output_topic.name,
                key="server-1-cpu",
                value=compressed_message
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')
```

This example shows a method for compressing your messages before publishing to the Kafka topic using `zlib`. As `zlib` compresses bytes, you need to convert the Python dictionary passed to the function into a string, and then into bytes, before compression.

!!! note

    For simplicity, an example is shown where the messages produced are quite small, and would not need compression, as they are well under the 1MB message size constraint of the Quix-managed broker.

## Decompression

To handle these compressed messages it is possible to build a decompression service. You could use the Starter Transformation code sample as a starting point for your new service.

!!! tip

    If you're new to Quix, see the [Quix Tour](../../quix-cloud/quixtour/overview.md) for details on create a service from a sample.

The following example demonstrates the basics of such a decompression service:

``` python
import os, zlib # make sure zlib is imported (you don't need to install it though)
from quixstreams import Application

# for local dev, load env vars from a .env file
from dotenv import load_dotenv
load_dotenv()

def decompress_data(compressed_data):
    data = zlib.decompress(compressed_data)
    data = data.decode("utf-8") # decode UTF-8 packed bytes
    return data

app = Application.Quix("decompress-service", auto_offset_reset="earliest")

# inbound compressed data is a series of bytes so the bytes deserializer is used for this topic
input_topic = app.topic(os.environ["input"], value_deserializer="bytes")
# data is to be published as JSON for onward processing in the pipeline.
# JSON is the default serializer / message format, but is explicitly specified here for clarity
output_topic = app.topic(os.environ["output"], value_serializer="json")

sdf = app.dataframe(input_topic)
sdf = sdf.apply(decompress_data) # call the `decompress_data` function for each message
sdf = sdf.update(lambda msg: print(msg)) # print out each message for debugging
sdf = sdf.to_topic(output_topic) # publish messages to output topic

if __name__ == "__main__":
    app.run(sdf)
```

You don't need to install `zlib` using the `requirements.txt` file as it's included with Python.

!!! tip

    Make sure you are using Quix Streams 2.4.2 or newer. You can check this is specified in the `requirements.txt` file.

## Fast compression algorithms

While `zlib` is a common compression algorithm, there are alternatives. The following table lists a few more libraries that offer fast compression and decompression:

| library | Description |
|---|---|
| blosc | Blosc is a high-performance compressor optimized for binary data. It is particularly efficient for compressing numerical data, such as NumPy arrays. Blosc can provide significantly faster compression and decompression speeds compared to zlib. |
| lz4 | LZ4 is a very fast compression algorithm that offers both fast compression and decompression speeds. It is often used in applications where speed is critical, such as real-time data processing or network communication. |
| zstd (Zstandard) | Zstandard is a modern compression algorithm developed by Facebook. It offers a good balance between compression ratio and speed, often outperforming zlib in both compression and decompression speed while providing better compression ratios. |
| Snappy | Snappy is another fast compression/decompression library developed by Google. It is optimized for speed and is often used in distributed systems and big data processing frameworks where low latency is crucial. |
| bzip2 | While not typically faster than zlib, bzip2 can sometimes achieve better compression ratios, especially for certain types of data. However, it tends to be slower in terms of compression and decompression speed. |

Always take into consideration the type of data being handled, for example text format or binary.
