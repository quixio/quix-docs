# Read data from a CSV file

A common source of data is a CSV file. As well as prebuilt code samples that can be modified to suit your own purposes, it is possible to write you own code to load data in from CSV files. 

You may need to load data from a CSV file into a service, as CSV is a very common file format, especially in data science. One possibility is to upload the CSV to be processed into your Quix application, and read the data from there. Another option is to read the CSV file on some other system (perhaps your laptop) and push that data into Quix using the Quix Streams client library.

## Using pandas 

The pandas library enables the contents of a CSV file to be easily loaded into a pandas dataframe. If this data is to be published to a stream it must have a timestamp. If one is not present in the CSV data, it can be added, but that complicated the code a little. The following example demonstrates loading data from an uploaded CSV file where the data contains a timestamp column:

```python
import quixstreams as qx
import pandas as pd
import os
import time

client = qx.QuixStreamingClient()

print("Opening output topic")
producer_topic = client.get_topic_producer(os.environ["output"])

stream_producer = producer_topic.create_stream()
df = pd.read_csv("UserData.csv")
stream_producer.timeseries.publish(df)
```

Note, the data is loaded into a pandas dataframe, and then published to the output stream.

## Without pandas

If you're not using pandas, you can write your own code to load data from a CSV file.

The following code demonstrates loading data from a CSV file and adding the timestamp column, and only adding other data columns of interest. In addition, this code is designed to be run on the command line. This code reads a CSV file on, for example, your laptop, and pushes the data into Quix Platform, using the Quix Streams client library:

``` python 
# pip install quixstreams
# pip install python-dotenv
import quixstreams as qx
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
    token = os.getenv("STREAMING_TOKEN")

    users_file = "user-data.csv"
    users = load_csv(users_file)

    # Obtain client library token from portal
    client = qx.QuixStreamingClient(token)

    # Open a topic to publish data to
    topic_producer = client.get_topic_producer("users-topic")
    stream = topic_producer.create_stream()
    print('stream_id: -->', stream.stream_id)
    stream.properties.name = "CSV using Quix Streams"
    print('Writing CSV data to stream...')

    try:
        for user in users:
            data = qx.TimeseriesData()
            data.add_timestamp(datetime.datetime.utcnow()) \
                .add_value("email", user["email"]) \
                .add_value("date_of_birth", user["date_of_birth"]) \
                .add_value("status", user["status"])
            stream.timeseries.publish(data)
            time.sleep(1)
    except KeyboardInterrupt:        
        print("Closing stream")
    stream.close()
    
if __name__ == '__main__':
    main()
```
