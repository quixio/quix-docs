# Examine your data with Quix data explorer

Once your deployed transform is running, you can view the data it publishes in the Quix data explorer. 

In the pipeline view, on the output topic `cpu-load-transform`, click `Explore live data` (or alternatively go to the data explorer). Select the stream you want to view (in this case `server-1-cpu`), and the parameter `CPULoad`. 

The waveform view displays something similar to the following:

![CPU waveform](./images/data-explorer-cpu-waveform.png)

If you examine the format in the `Messages` tab, you'll see the data has the following format:

![Time series raw](./images/timeseries-raw-data.png)

## 🏃‍♀️ Next step

[Part 5 - Add InfluxDB destination (sink) :material-arrow-right-circle:{ align=right }](./influxdb-destination.md)
