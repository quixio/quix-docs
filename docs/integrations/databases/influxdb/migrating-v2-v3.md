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

## See also

If you are new to Quix you could try our [Quickstart](../../../get-started/quickstart.md) and then complete the [Quix Tour](../../../get-started/quixtour/overview.md). This gives you a good overview of how to use Quix, for a minimal investment in your time.

There is an [in-depth step-by-step tutorial](../../../tutorials/influxdb-migration/overview.md) available on migrating InfluxDB v2 data to InfluxDB v3.

A tutorial featuring a more complex pipeline is also available. See the [InfluxDB alerting tutorial featuring PagerDuty](../../../tutorials/influxdb-alerting/overview.md).
