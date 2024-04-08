# Produce data

Here you'll explore Quix Streams a bit more by creating a producer to publish messages to a topic in your local Kafka broker. You'll then create a consumer that subscribes to messages on that topic and prints the messages.

This page assumes you have already [installed Quix Streams](./install.md).

## Step 1: Set up a local Kafka broker

Set up a local Kafka broker. You can follow [this quickstart](https://kafka.apache.org/quickstart){target=_blank} to install Apache Kafka.

## Step 2: Write your producer code

``` python
import psutil, time, json
from quixstreams import Application

# connect to your local Kafka broker
app = Application(broker_address="localhost:9092", consumer_group="producer-v1")

# define output topic
output_topic = app.topic("cpu-load")

def get_cpu_load():
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

Save the code to a file named `producer.py`.

## Step 3: Run your producer

``` python
python3 producer.py
```

You are now publishing data into the `cpu-load` topic.

## Next step

* [Consume data](./consume.md) - subscribe to data in a Kafka topic.
