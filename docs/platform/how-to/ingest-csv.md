# How to ingest data from a CSV file

How to ingest from CSV file.

Using Pandas, but data in CSV **must** have a timestamp:

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

Note, data is a dataframe here.

Without pandas, you add your own timestamp to the data from the CSV file - this data pushes data into Quix using Quix Streams from the command line:

``` python 
# pip install quixstreams
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

    users_file = "users3.csv"
    users = load_csv(users_file)

    # Obtain client library token from portal
    client = qx.QuixStreamingClient(token)

    # Open a topic to publish data to
    topic_producer = client.get_topic_producer("quickstart-users-streams")
    stream = topic_producer.create_stream()
    print('stream_id: -->', stream.stream_id)
    stream.properties.name = "Quickstart CSV using Streams"
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
