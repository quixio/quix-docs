# InfluxDB - alerts

This service uses the standard Quix InfluxDB 3.0 [connector](../../connectors/index.md). This connector enables the service to subscribe to messages on a Quix topic to be stored in InfluxDB.

![InfluxDB raw data pipeline segment](./images/influxdb-alerts-pipeline-segment.png)

In this pipeline the connector subscribes to the `alerts` topic, and writes these messages into InfluxDB for permanent storage.


## Query the data in InfluxDB

TODO (need working tutorial branch) - show data in InfluxDB


## 🏃‍♀️ Next step

[Part 8 - Printers dashboard :material-arrow-right-circle:{ align=right }](./printers-dashboard.md)
