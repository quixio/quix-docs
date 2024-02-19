# Add an InfluxDB source connector

You learned how to do this in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). Make sure the input to the destination is the `cpu-load-transform` topic. You can reuse your `INFLUXDB_ORG` and `INFLUXDB_TOKEN`secrets, and set the other variables to the same as you used when setting up the InfluxDB destination connector. 

Set is `task_interval` - you can set this to `1s` (one second) to ensure you see any new data promptly (this make testing a little easier as you don't need to wait too long for updates). 

Add a new topic `influxdb-cpu-load` for the configured output topic. This will help avoid confusion with the topics you created in the Quickstart.

When you have completed the configuration, deploy the service.

## 🏃‍♀️ Next step

[Part 7 - Add threshold detection :material-arrow-right-circle:{ align=right }](./threshold-detection.md)
