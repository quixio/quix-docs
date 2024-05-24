---
title: Quickstart
description: Get started in under 10 minutes
---

# Quickstart

This Quickstart is designed to show you how to get your data into Quix and display it, in **less than 10 minutes**.

If you're just curious, click the box below to see the complete code.

??? example "Push CPU load data to Quix"

    ```python
    import psutil, time, os, json
    from quixstreams import Application

    from dotenv import load_dotenv
    load_dotenv()

    # Create an Application
    # It will use the SDK token from environment variables to connect to Quix Kafka
    # and ensure the topics are created
    app = Application()

    # Define output topic
    output_topic = app.topic("cpu-load")
        
    def get_cpu_load():
        """
        Get the current CPU and memory usage
        """
        cpu_load = psutil.cpu_percent(interval=1)
        memory = psutil.swap_memory()
        return {
            "cpu_load": cpu_load,
            "memory": memory._asdict(),
            "timestamp": int(time.time_ns()),
        }

    def main():
        # Create a Producer to send data to the topic
        with app.get_producer() as producer:
            while True:                
                # Get the current CPU and memory usage
                message = get_cpu_load()
                print("CPU load: ", message["cpu_load"])

                # Produce message to the topic
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

## Prerequisites

To complete the Quickstart you'll need the following:

1. [Python installed](https://www.python.org/downloads/){target=_blank} on your machine. Python version >= 3.6 < 4 is required for the Quix Streams client library.
2. A [free Quix account](https://portal.platform.quix.io/self-sign-up).

## Install the Python modules

Once you have Python installed, open up a terminal, and install the following modules using `pip`:

```
pip install quixstreams psutil python-dotenv
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `pip3` to install your modules. 

You're going to use the [Quix Streams](https://quix.io/docs/quix-streams/introduction.html) library to push data into Quix. 

You use the `psutil` module to retrieve the CPU load on your laptop.

## Get your SDK token

To obtain your token, go to `Settings` in your default environment, and then click on the `APIs and tokens` tab. You can obtain the Streaming Token (SDK Token) from there.

## Set your token

You need to set the `Quix__Sdk__Token` environment variable. 

Make a directory for your project and in it create a `.env` file:

```
Quix__Sdk__Token="<your SDK token>"
```

!!! note

    The SDK token and streaming token are the same thing. The SDK token is now called the streaming token in the UI.

## Write your code

You now write the Python code that runs on your computer, and publishes your CPU load into a Quix topic.

In the same directory as your `.env` file, create a new file called `cpu_load.py` with the following code:

``` python 
import psutil, time, os, json
from quixstreams import Application

from dotenv import load_dotenv
load_dotenv()

# Create an Application
# It will use the SDK token from environment variables to connect to Quix Kafka
# and ensure the topics are created
app = Application()

# Define output topic
output_topic = app.topic("cpu-load")
    
def get_cpu_load():
    """
    Get the current CPU and memory usage
    """
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    return {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }

def main():
    # Create a Producer to send data to the topic
    with app.get_producer() as producer:
        while True:                
            # Get the current CPU and memory usage
            message = get_cpu_load()
            print("CPU load: ", message["cpu_load"])

            # Produce message to the topic
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

## Run your code

Run your code with the following command in your terminal:

```
python cpu_load.py
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `python3` to run your code. 

The code runs and, after creating the `cpu-load` topic, displays your CPU load. The code is now publishing data to the Quix topic `cpu-load`.

!!! tip

    If your code exits before the topic is created, simply run the program again.

## See the data in Quix

To view your data in the data explorer in Quix Cloud:

1. Switch back to Quix and enter your default environment.
2. Click on `Topics` in the main left-hand navigation.
3. You see the `cpu-load` topic. Note the vertical green bars representing inbound data.
4. Click the green bars in the `Data` column. You are taken to a live data view.
5. You can now view the inbound data. 

## Conclusion

That concludes the Quickstart! In this Quickstart you've learned the following:

* How to create a project and an environment.
* How to obtain the streaming token (also known as the SDK token) for your environment.
* How to publish data into a Quix topic from the command line using Quix Streams.
* How to view real-time data.

## Next steps

Try the [Quix Cloud Tour](./quixtour/overview.md) and build out a complete CPU overload detection pipeline.

Read about other ways to [get your data into Quix](../develop/integrate-data/overview.md).

See also the standard [Quix Connectors](../connectors/index.md).
