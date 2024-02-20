# Add an InfluxDB v2 source connector

You learned how to install an Influx connector in the [InfluxDB Quickstart](../../integrations/databases/influxdb/quickstart.md). But instead of installing the InfluxDB v3 source connector, you now need to install the InfluxDB v2 source connector.

## Set the environment variables

## Configure your variables

You'll need to configure the following credentials for your source connector:

| Environment Variable | Service(s) | Description|
|---|---|---|
| `INFLUXDB_DATABASE` | InfluxDB raw data, InfluxDB alerts | Database name in InfluxDB where data should be stored. |
| `INFLUXDB_HOST` | InfluxDB raw data, InfluxDB alerts | Host address for the InfluxDB instance. Default: `eu-central-1-1.aws.cloud2.influxdata.com`. |
| `INFLUXDB_ORG` | InfluxDB raw data, InfluxDB alerts | Organization name in InfluxDB. |
| `INFLUXDB_TOKEN` | InfluxDB raw data, InfluxDB alerts | Authentication token to access InfluxDB. |

TODO - check against against template:

The above is a list of environment variables that are configured as secrets (rather than, for example, free text variables). After you've forked your project, you will see a "missing secret" error for each environment variable that does not have its secret value configured.

You need to [create secrets](../../deploy/secrets-management.md) for these and then assign them to the corresponding [environment variables](../../deploy/environment-variables.md).

To create the secrets:

1. Click on Settings in the botton left-hand corner of the Quix UI.

2. Scroll down to the bottom of the screen and click on `Secrets management`.

3. In the `Secrets management` dialog, click `+ New secret` and use this to create the following secrets (key value pairs) based on your InfluxDB account:

    * `INFLUXDB_DATABASE_V2`
    * `INFLUXDB_HOST_V2`
    * `INFLUXDB_ORG_V2`
    * `INFLUXDB_TOKEN_V2`

These secrets are then automatically assigned to their corresponding environment variables.

If you have named your secrets slightly differently to the environment variable names, you can still assign the secrets to environment variables by using the dropdown in the Deployment dialog:

![Secrets dropdown](./images/assign-secret-dropdown.png)assign

!!! note

    You will need to restart services (if they are running) where you have just added a secret.

Set the `task_interval` - you can set this to `1s` (one second) to ensure you see any new data promptly (this make testing a little easier as you don't need to wait too long for updates). 

Add a new topic `influxdb-v2-data` for the **output topic**.

When you have completed the configuration, deploy the service.

## 🏃‍♀️ Next step

[Part 4 - Install the InfluxDB v3 destination :material-arrow-right-circle:{ align=right }](./TODO)


