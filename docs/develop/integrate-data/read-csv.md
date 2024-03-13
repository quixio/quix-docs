# Reading data from a CSV file

A common source of data is a CSV file. As well as using one of the Quix prebuilt [code samples](../code-samples.md), and perhaps modifying it to suit your needs, you can also write your own code to load data in from CSV files. 

When you need to load data from a CSV file into a Quix service, one possibility is to upload the CSV file to be processed directly into your Quix Cloud application, and read the data from there. 

Another option is to read the CSV file on some other system, such as your laptop, and publish that data into a Quix topic using the Quix Streams client library.

## Streaming token

You'll need a streaming token to authenticate with Quix if you're going to run a command-line program that publishes or subscribes to a Quix topic. 

!!! note

    In Quix Cloud, the streaming token is automatically set in the project environment.

Once you [get your streaming token](../../develop/authentication/streaming-token.md), you can subsequently load it from a suitable `.env` file:

```
Quix__Sdk__Token="<your_streaming_token>"
```

!!! tip

    The output topic to publish CSV data to can also loaded from the `.env` file. In this case your `.env` file would be as follows:
    
    ```
    Quix__Sdk__Token="<your_streaming_token>"
    output="<your_topic_name>"
    ```

    See the following code for an example of how to load the output topic.

## Reading a CSV file from the command line

The following code reads a CSV file from your laptop, and publishes the data into a Quix topic, using the Quix Streams client library:

``` python 
# pip install quixstreams python-dotenv
import csv
import os
import time

from dotenv import load_dotenv

from quixstreams import Application

# Load environment variables from the ".env" file
load_dotenv()

# Create an Application to connect to the Quix broker with SDK token
app = Application.Quix(
    consumer_group="sample_consumer_group",
    auto_create_topics=True,
)

# Define an output topic with JSON serialization
output_topic = app.topic(os.environ["output"], value_serializer="json")

# Path to a CSV file with data
USERS_FILE = "user-data.csv"


def load_csv(path: str):
    rows = []
    with open(path, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            rows.append(row)
    return rows


def main():
    # Load data from the CSV file
    users = load_csv(USERS_FILE)

    print(f'Writing CSV data to the "{output_topic.name}" topic ...')
    with app.get_producer() as producer:
        for user in users:
            # Serialize data into bytes before producing
            message = output_topic.serialize(value=user, key="csv-sample")
            # Send data to the output topic
            producer.produce(
                topic=output_topic.name,
                key=message.key,
                value=message.value,
            )
            time.sleep(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Quitting")
```
