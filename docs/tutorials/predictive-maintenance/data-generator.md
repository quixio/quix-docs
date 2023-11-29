# Data generator

This service generates temperature data simulating one or more 3D printers. It simulates three temperature sensors on a fleet of 3D printers.

![data generator pipeline segment](./images/data-generator-pipeline-segment.png)

Each "virtual" printer is continuously printing in 8 hour cycles. For each printer, the enclosure temperature is programmed to drop below the minimum threshold at approximately 1h27m, 3h27m, 5h27m and 7h27m into the print. So each print will have four failure points.

Since the data is running at ten times normal speed, the print lasts 48 minutes and a failure occurs approximately every 00h 08m 50s.

When printing with a heat-sensitive material such as ABS (Acrylonitrile Butadiene Styrene), it’s important to ensure that the temperatures remain stable.

This service simulates real-time data readouts for all three of a 3D printer’s temperature sensors for an 8-hour ABS print.

In this simulation, the enclosure temperature starts to drop below the minimum threshold at 1h27m, 3h27m, 5h27m and 7h27m.

You’ll want to know about this before it drops below the acceptable lower temperature threshold for ABS.

The [forecasting algorithm](./forecast-service.md) that attempts to estimate when this is going to happen, and displays the alert on a dashboard.

## Data published

The generated data is published to the `3d-printer-data` topic:

* Ambient temperature
* Ambient temperature with fluctuations
* Bed temperature
* Hot end temperature
* original_timestamp
* Printer finished printing

This service runs continually.

## Exploring the message format

If you click `Topics` in the main left-hand navigation you see the topics in the environment. Click in the `Data` area to view live data. This takes you into the Quix data explorer. You can then select the stream and parameter data you'd like to explore. You can then view this data in either the `Table` or `Messages` view.

If you look at the messages in the `Messages` view, you'll see data has the following format:

``` json
{
  "Epoch": 0,
  "Timestamps": [
    1701277527000000000
  ],
  "NumericValues": {
    "hotend_temperature": [
      250.8167407832582
    ],
    "bed_temperature": [
      106.9299672495977
    ],
    "ambient_temperature": [
      36.92387946005222
    ],
    "fluctuated_ambient_temperature": [
      36.92387946005222
    ]
  },
  "StringValues": {
    "original_timestamp": [
      "2023-11-29 17:05:27"
    ]
  },
  "BinaryValues": {},
  "TagValues": {
    "printer": [
      "Printer 72"
    ]
  }
}
```

The Quix data explorer is a very useful tool for debugging and monitoring your pipeline.

## Viewing the deployed application

In the left-hand main navigation, click `Deployments` to see all the deployed services and jobs in the environment. Click `Data Generator` to select the deployment. This takes you to an extremely useful screen where you can:

1. View the status of the deployment (such as CPU, memory usage, and replicas assigned).
2. See the live logs for the service.
3. See the topic lineage for the service.
4. Access Build logs (in case of errors when the service is built).
5. Access the Messages tab, where you can then see messages associated with the service in real time.

## Viewing the application code

There are many ways to view the code for the application (which is then deployed as a job or service). The quickest way from the current screen is to click the area shown:

![Go to code view](./images/data-generator-deployment-code-view.png)

You'll now be in the code view with the **version of the deployed code** displayed.

Review the code, you'll see that data is generated for each printer, and each printer has its own stream for generated data:

``` python
tasks = []

for i in range(number_of_printers):
    # Set stream ID or leave parameters empty to get stream ID generated.
    name = f"Printer {i + 1}"  # We don't want a Printer 0, so start at 1

    # Start sending data, each printer will start 5 minutes after the previous one
    tasks.append(asyncio.create_task(generate_data_and_close_stream_async(topic_producer, name, i * 300)))

await asyncio.gather(*tasks)
```

Feel free to explore the code further.

## 🏃‍♀️ Next step

[Part 3 - Downsampling service :material-arrow-right-circle:{ align=right }](./downsampling.md)
