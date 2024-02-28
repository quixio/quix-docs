# Reading data from a CSV file

A common source of data is a CSV file. As well as prebuilt code samples that can be modified to suit your own purposes, it is possible to write you own code to load data in from CSV files. 

You may need to load data from a CSV file into a service, as CSV is a very common file format, especially in data science. One possibility is to upload the CSV to be processed into your Quix Cloud application, and read the data from there. Another option is to read the CSV file on some other system (perhaps your laptop) and push that data into Quix using the Quix Streams client library.

The following code demonstrates loading data from a CSV file and adding the timestamp column, and only adding other data columns of interest. This code can be run on the command line, as the [streaming token](../../develop/authentication/streaming-token.md) and Portal API URL can be loaded from a suitable `.env` file:

```
Quix__Sdk__Token="sdk-12345"
Quix__Portal__Api="portal-api.platform.quix.io"
```

!!! tip

    In Quix Cloud, these variables are automatically set in the project environment.

This code reads a CSV file from your laptop, or the Quix Cloud code project, and pushes the data into Quix, using the Quix Streams client library:

``` python 
# pip install quixstreams
# pip install python-dotenv
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext
import time
import datetime
import os
import csv
from dotenv import load_dotenv

def load_csv(csv_file):
    rows = []
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            rows.append(row)
    return rows

def main():
    load_dotenv()
    users_file = "user-data.csv"
    users = load_csv(users_file)

    app = Application.Quix(
        consumer_group="sample_consumer_group",
        auto_create_topics=True,
    )

    serializer = JSONSerializer()
    output_topic = app.topic(os.environ["output"])
    print(output_topic.name)
    producer = app.get_producer()

    print('Writing CSV data to stream...')
    try:
        for user in users:
            # Publish data to output topic
            serialized_value = serializer(
                value=json_response, ctx=SerializationContext(topic=output_topic.name)
            )
            producer.produce(
                topic=output_topic.name,
                key="csv-sample",
                value=serialized_value
            )
            time.sleep(1)
    except KeyboardInterrupt:        
        print("Quitting")
    stream.close()
    
if __name__ == '__main__':
    main()
```
