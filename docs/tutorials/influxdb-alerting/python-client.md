# Write the Python client code

In this part you write a command-line program to read the CPU load of your laptop, and publish that data to Quix.

## Set your environment variables

First, in order to use Quix Streams on the command line (as opposed to working in Quix Cloud), you need to set the following environment variables:

* `Quix__Sdk__Token`
* `Quix__Portal__Api`

Note, these variables use **double** underscores.

To obtain these values you can go to `Settings` in your environment, and then click on the `APIs and tokens tab`. You can obtain the `Streaming Token` and the Portal API URL from there.

Set the environment variables using the method recommended for your system, for example on macOS or Unix you could set the variables as follows:

```
#!/usr/bin/env bash                                                                          
export Quix__Sdk__Token="sdk-12345"
export Quix__Portal__Api="portal-api.platform.quix.io"
echo $Quix__Sdk__Token
echo $Quix__Portal__Api
```

You could add these lines (without the shebang) to your Bash or Zsh resource file, for example, `.bash_profile`, so they are always available during development.

## Add the Python code

Using your editor of choice, create a file called `cpu_load.py`. Add the following code:

```python
import psutil
import time
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    return cpu_load

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
        timestamp = int(time.time_ns()) # Quix timestamp is nano seconds
        message = {"Timestamp": timestamp, "CPULoad": cpu_load}
        with producer:
            serialized_value = serializer(
                value=message, ctx=SerializationContext(topic=output_topic.name)
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

Save the file, and run it using a command similar to the following (the exact command you use depends on your Python set up):

```
python3 cpu_load.py
```

When you run this, the topic `cpu-load` is created for you. If your code exits before the topic is created, simply run the code again.

Here, you're creating a simple JSON object containing a Unix timestamp in nano seconds, and the CPU load (as a percentage). This is then published to the output topic.

!!! note

    The timestamp is added here for convenience - it could have been added later in the pipeline. The Quix data format that can optionally be used expects a timestamp in nano seconds.

If you're monitoring many CPUs, you could use the stream ID to identify the source, in this case the stream ID is set to `server-1-cpu`.

## 🏃‍♀️ Next step

[Part 2 - Add External source :material-arrow-right-circle:{ align=right }](./external-source.md)
