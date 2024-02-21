---
title: Quickstart
description: Get started in under 10 minutes
---

# Quickstart

This Quickstart is designed to show you how to get your data into Quix and display it, in **less than 10 minutes**.

## Peek at the code

If you're just curious, click the box below to see the complete code.

??? example "Push CPU load data to Quix"

    ```python
    # pip install psutil
    # pip install quixstreams
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
            timestamp = int(time.time_ns())
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

## Prerequisites

To complete the Quickstart you'll need the following:

1. [Python installed](https://www.python.org/downloads/){target=_blank} on your machine. Python version >= 3.6 < 4 is required for the Quix Streams client library.
2. A [free Quix account](https://portal.platform.quix.io/self-sign-up).

## 1. Install the Python modules

Once you have Python installed, open up a terminal, and install the following modules using `pip`:

```
pip install quixstreams
pip install psutil
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `pip3` to install your modules. 

You're going to use the [Quix Streams](../quix-streams/quix-streams-intro.md) library to push data into Quix. This is just one of many ways to [integrate your data with Quix](../develop/integrate-data/overview.md). You could for example simply log into Quix and use one of our already available [connectors](../connectors/index.md).

You use the `psutil` module to retrieve the CPU load on your laptop.

## 2. Create your project and environment

You'll need to create a project and an environment. You can watch a video on how to do this:

<div style="position: relative; padding-bottom: 59.726027397260275%; height: 0;"><iframe src="https://www.loom.com/embed/6056fffa4f0e49799ed24a54496ae81a?sid=4475117c-41c3-462b-9550-4c33dae5da2a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

You can also read the documentation on how to [create a project](../create/create-project.md) and [environment](../create/create-environment.md).

## 3. Set your environment variables

First, in order to use Quix Streams on the command line (as opposed to working in Quix Cloud), you need to set the following environment variables:

* `Quix__Sdk__Token`
* `Quix__Portal__Api`

Note, these variables use **double** underscores.

To obtain these values you can go to `Settings` in your environment, and then click on the `APIs and tokens tab`. You can obtain the `Streaming Token` and the Portal API URL from there.

Set the environment variables using the method **recommended for your system**, for example on macOS or Unix you could set the variables as follows:

```
#!/usr/bin/env bash                                                                          
export Quix__Sdk__Token="sdk-12345"
export Quix__Portal__Api="portal-api.platform.quix.io"
echo $Quix__Sdk__Token
echo $Quix__Portal__Api
```

You could add these lines (without the shebang) to your Bash or Zsh resource file, for example, `.bash_profile`, so they are always available during development.

!!! note

    The SDK token and streaming token are the same thing. The SDK token is now called the streaming token in the UI.

## 4. Write your code

You now write the Python code that runs on your computer, and publishes your CPU load into a Quix topic.

Create a new file called `cpu_load.py`, and copy and paste in the following code, and then save the file:

``` python 
# pip install psutil
# pip install quixstreams
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
        timestamp = int(time.time_ns())
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

## 5. Run your code

Run your code with the following command in your terminal:

```
python cpu_load.py
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `python3` to run your code. 

The code runs and, after creating the `cpu-load` topic, displays your CPU load. The code is now publishing data to the Quix topic `cpu-load`.

!!! tip

    If your code exits before the topic is created, simply run the program again.

## 6. See the data in Quix

To view your data in the data explorer in Quix Cloud:

1. Switch back to Quix and enter your `Develop` environment.
2. Click on `Topics` in the main left-hand navigation.
3. You see the `cpu-load` topic. Note the vertical green bars representing inbound data.
4. Hover the mouse over the `Data` column. You see the tool tip text `View live data`.
5. Click the mouse where the tool tip text is displayed. You are taken to the Quix Data Explorer in a new tab.
6. Under `SELECT STREAMS` select the box `Quickstart CPU Load - Server 1`.
7. Under `SELECT PARAMETERS OR EVENTS` select `CPU_Load`. 

Your real-time CPU load is displayed as a waveform. You can also take a look at the table view, and the message view. 

## Conclusion

That concludes the Quickstart! In this Quickstart you've learned the following:

* How to create a project and an environment.
* How to obtain the streaming token (also known as the SDK token) for your environment.
* How to publish data into a Quix topic from the command line using Quix Streams.
* How to view real-time data in a topic using the Quix Data Explorer.

## Next steps

Try the [Quix Tour](../get-started/quixtour/overview.md) and build out a complete CPU overload detection pipeline.
