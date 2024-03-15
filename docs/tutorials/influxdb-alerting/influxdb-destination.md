# Add an InfluxDB destination connector

Now add an InfluxDB destination. In this case you'll subscribe to data coming from the external source (CPU load data from your laptop in this case) and then write it directly to InfluxDB for persistence.

!!! tip
    
    You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). 

Make sure the input to the destination is the `cpu-load` topic. 

Configure the connector with your InfluxDB credentials. Deploy your connector. Raw CPU load data is stored in InfluxDB.

You can now log into your InfluxDB Cloud account and query your bucket for data. 

## Optional filtering

In this case you connected your InfluxDB destination (sink) directly to the External Source. All inbound data is therefore written to InfluxDB. In some cases you may prefer to filter the data before writing it to InfluxDB. To do this simply add a transform to the output of the External Source, add the filtering code suitable for your use case, and then connect the InfluxDB destination to the output of your transform. See the next step for an [example on how to do a filtering tranasform](./threshold-detection.md), should you need to refilter data before writing it to InfluxDB.

## Optional reading back from InfluxDB

You could optionally add an InfluxDB source connector to your pipeline. You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). This would enable you to read data from your InfluxDB database, and publish it to a topic of your choice. Once data is published to a topic, you can add any additional processing required by connecting transforms you develop in Python to this topic. For a detailed example of this see the [Predictive maintenance tutorial](../predictive-maintenance/overview.md).

## 🏃‍♀️ Next step

[Part 4 - Add threshold detection :material-arrow-right-circle:{ align=right }](./threshold-detection.md)
