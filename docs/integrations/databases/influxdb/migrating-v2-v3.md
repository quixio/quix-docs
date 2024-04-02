# Migrating InfluxDB from v2 to v3

If you have data in a v2 InfluxDB database, and you want to migrate it to InfluxDB v3, then Quix can help.

Quix provides the following InfluxDB [connectors](../../../connectors/index.md):

* InfluxDB v2 source
* InfluxDB v3 source
* InfluxDB v3 destination

A summary of the procedure is:

1. Add the Quix InfluxDB v2 connector to Quix, to connect your InfluxDB v2 database to Quix.
2. Add the Quix InfluxDB v3 connector to Quix, on the output of your InfluxDB v2 connector.

You'll have the following pipeline:

![Migration pipeline](../../../tutorials/influxdb-migration/images/influxdb-migration-pipeline.png)

Data is read from InfluxDB v2 and published to InfluxDB v3. 

No coding is required, unless you also want to make changes to data as it is migrated. If you want to do this you can add a transform (or multiple transforms) between the two connectors.

## Configuring the source connector

You'll need to configure the following variables for your source connector:

| Environment Variable | Description|
|---|---|
| `output` | Output topic. Add a new topic called `influxdb-v2-data`. |
| `INFLUXDB_DATABASE` | Database name in InfluxDB where the data is stored. In InfluxDB this is also called a bucket. |
| `INFLUXDB_HOST` | Host address for the InfluxDB instance. Default: `eu-central-1-1.aws.cloud2.influxdata.com`. |
| `INFLUXDB_ORG` | Organization name in InfluxDB. |
| `INFLUXDB_TOKEN` | Authentication token to access InfluxDB. Configure as a secret type, so that your token is never revealed. |
| `INFLUXDB_MEASUREMENT_NAME` | The InfluxDB measurement to read data from. If not specified, the name of the output topic will be used. |
| `task_interval` | The polling period for queries of the database. Set this to `1s` (one second) to ensure you see any new data promptly (this make testing a little easier as you don't need to wait too long for updates). |

!!! tip

    To see more documentation on these variables, and examples, you can refer to the [detailed README](https://github.com/quixio/template-influxv2-to-v3?tab=readme-ov-file#influxdb-v2-source){target=_blank}.

## Configuring the destination connector

You'll need to configure the following variables for your destination connector:

| Environment Variable | Description|
|---|---|
| `input` | Input topic. Example `influxdb-v2-data`. |
| `INFLUXDB_DATABASE` | Database name in InfluxDB where the data is stored. In InfluxDB this is also called a bucket. |
| `INFLUXDB_HOST` | Host address for the InfluxDB instance. Default: `eu-central-1-1.aws.cloud2.influxdata.com`. |
| `INFLUXDB_ORG` | Organization name in InfluxDB. |
| `INFLUXDB_TOKEN` | Authentication token to access InfluxDB. Configure as a secret type, so that your token is never revealed. |
| `INFLUXDB_FIELD_KEYS` | These are the columns of rows of data that you want to write to the InfluxDB v3 database. |
| `INFLUXDB_TAG_KEYS` | The metadata that you want to write to the InfluxDB v3 database. |
| `INFLUXDB_MEASUREMENT_NAME` | The InfluxDB measurement to read data from. If not specified, the name of the output topic will be used. |
| `TIMESTAMP_COLUMN` | This is the field in your data that represents the timestamp in nanoseconds. If you leave this blank, the message timestamp received from the broker is used. Case sensitive. Optional. |
| `CONSUMER_GROUP_NAME` | The name of the consumer group to use when consuming from Kafka. |


!!! tip

    To see more documentation on these variables, and examples, you can refer to the [detailed README](https://github.com/quixio/template-influxv2-to-v3?tab=readme-ov-file#influxdb-v3-sink){target=_blank}.

## See also

If you are new to Quix you could try our [Quickstart](../../../get-started/quickstart.md) and then complete the [Quix Tour](../../../get-started/quixtour/overview.md). This gives you a good overview of how to use Quix, for a minimal investment in your time.

There is an [in-depth step-by-step tutorial](../../../tutorials/influxdb-migration/overview.md) available on migrating InfluxDB v2 data to InfluxDB v3.

A tutorial featuring a more complex pipeline is also available. See the [InfluxDB alerting tutorial featuring PagerDuty](../../../tutorials/influxdb-alerting/overview.md).
