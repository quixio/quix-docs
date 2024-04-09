# Write the Python client code

In this part you write a command-line program to read the CPU load of your laptop, and publish that data to Quix.

## Add the Python code

Using your editor of choice, create a file called `cpu_load.py`. Add the following code:

```python
import psutil
import os
import time
import json
from quixstreams import Application

from dotenv import load_dotenv
load_dotenv()

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    return cpu_load

app = Application()
output_topic = app.topic(os.environ["output"])

def main():
    with app.get_producer() as producer:
        while True:        
            cpu_load = get_cpu_load()
            print("CPU load: ", cpu_load)
            timestamp = int(time.time_ns()) # Quix timestamp is nano seconds
            message = {"timestamp": timestamp, "cpu_load": cpu_load}
                
            producer.produce(
                topic=output_topic.name,
                key="server-1-cpu",
                value=json.dumps(message)
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')
```

## Get your SDK token

To obtain your token, go to `Settings` in your default environment, and then click on the `APIs and tokens` tab. You can obtain the `Streaming Token` from there.

## Set your token

You need to set the `Quix__Sdk__Token` environment variable. 

Make a directory for your project and in it create a `.env` file:

```
Quix__Sdk__Token="<your SDK token>"
```

!!! note

    The SDK token and streaming token are the same thing. The SDK token is now called the streaming token in the UI.

## Run the code

Run the code using a command similar to the following (the exact command you use depends on your Python set up):

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
