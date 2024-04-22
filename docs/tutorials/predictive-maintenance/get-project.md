# Get the project

Here you learn how to copy the template project. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your copy of the project. 

## Clone the project

See the [clone a project documentation](../../create/clone-project.md) for further information on how to do this.

## Add secrets

You'll need to configure the following credentials for each Quix service that needs them:

| Environment Variable (secret) | Service(s) | Description|
|---|---|---|
| `INFLUXDB_DATABASE` | InfluxDB raw data, InfluxDB alerts | Database name in InfluxDB where data should be stored. |
| `INFLUXDB_HOST` | InfluxDB raw data, InfluxDB alerts | Host address for the InfluxDB instance. Default: `eu-central-1-1.aws.cloud2.influxdata.com`. |
| `INFLUXDB_ORG` | InfluxDB raw data, InfluxDB alerts | Organization name in InfluxDB. |
| `INFLUXDB_TOKEN` | InfluxDB raw data, InfluxDB alerts | Authentication token to access InfluxDB. |
| `INFLUXDB_MEASUREMENT_NAME` | The InfluxDB measurement to read data from. If not specified, the name of the output topic will be used. |
| `TIMESTAMP_COLUMN` | This is the field in your data that represents the timestamp in nanoseconds. If you leave this blank, the message timestamp received from the broker is used. Case sensitive. Optional. |
| `CONSUMER_GROUP_NAME` | The name of the consumer group to use when consuming from Kafka. |
<!--| `bearer_token` | Printers dashboard | A [PAT](../../develop/authentication/personal-access-token.md) that the web app uses to authenticate the Streaming Reader and Streaming Writer APIs. |-->

The above is a list of environment variables that you are going to configure.

For `INFLUXDB_TOKEN`, you need to [create a secret](../../deploy/secrets-management.md) to assign to the corresponding [environment variables](../../deploy/environment-variables.md).

To create the secret:

1. Click on Settings in the botton left-hand corner of the Quix UI.

2. Scroll down to the bottom of the screen and click on `Secrets management`.

3. In the `Secrets management` dialog, click `+ New secret` and use this to create the `INFLUXDB_TOKEN` secret, and assign it to the `INFLUXDB_TOKEN` variable.

<!-->
4. Also create a secret for `bearer_token` - the value will be a PAT. You can learn how to generate a PAT [here](../../develop/authentication/personal-access-token.md).
-->

These secrets are then assigned to their corresponding environment variables.

!!! note

    You will need to restart services (if they are running) where you have just added a secret.

## 🏃‍♀️ Next step

[Part 2 - Data generator service :material-arrow-right-circle:{ align=right }](./data-generator.md)
