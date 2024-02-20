# Add an InfluxDB destination connector

You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). 

Make sure the input topic to the destination is the same as output of the source connector, `influxdb-v2-data`.

Configure the connector with your InfluxDB v3 credentials. Deploy your connector.

Your pipeline now looks like this:

![InfluxDB migration pipeline](./images/influxdb-migration-pipeline.png)

You can now log into your InfluxDB Cloud account and query your bucket for data. 

## 🏃‍♀️ Next step

[Part 5 - Summary and next steps :material-arrow-right-circle:{ align=right }](./summary.md)
