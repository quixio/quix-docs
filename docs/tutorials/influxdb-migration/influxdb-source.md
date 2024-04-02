# Add an InfluxDB v2 source connector

You learned how to install an Influx connector in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). But instead of installing the InfluxDB v3 source connector, you now need to install the InfluxDB v2 source connector.

This connector will poll your InfluxDB v2 database, and read all data, and publish it to the output topic.

## Set the environment variables

You'll need to configure the following credentials for your source connector:

| Environment Variable | Description|
|---|---|
| `output` | Output topic. Add a new topic called `influxdb-v2-data`. |
| `INFLUXDB_DATABASE` | Database name in InfluxDB where the data is stored. In InfluxDB this is also called a bucket. |
| `INFLUXDB_HOST` | Host address for the InfluxDB instance. Default: `eu-central-1-1.aws.cloud2.influxdata.com`. |
| `INFLUXDB_ORG` | Organization name in InfluxDB. |
| `INFLUXDB_TOKEN` | Authentication token to access InfluxDB. Configure as a secret type, so that your token is never revealed. |
| `INFLUXDB_MEASUREMENT_NAME` | The "table" name, in this case `measurement1`. |
| `task_interval` | The polling period for queries of the database. Set this to `1s` (one second) to ensure you see any new data promptly (this make testing a little easier as you don't need to wait too long for updates). |

To see more documentation on these variables, and examples, you can refer to the [detailed README](https://github.com/quixio/template-influxv2-to-v3?tab=readme-ov-file#influxdb-v2-source){target=_blank}.

??? "InfluxDB terminology"

    | InfluxDB | General database |
    |---|---|
    | Bucket | Database |
    | Measurement | Table |
    | Point | Row |
    | Field | Column |
    | Tag | Metadata |

!!! tip

    If you need help on [configuring environment variables](../../deploy/environment-variables.md) or [secrets](../../deploy/secrets-management.md), the please refer to the documentation.

When you have completed the configuration, deploy the service.

## 🏃‍♀️ Next step

[Part 4 - Install the InfluxDB v3 destination :material-arrow-right-circle:{ align=right }](./influxdb-destination.md)


