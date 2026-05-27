# Get the project

Here you learn how to copy the template project. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your copy of the project. 

## Clone the project

See the [clone a project documentation](../../quix-cloud/projects/clone-project.md) for further information on how to do this.

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
<!--| `bearer_token` | Printers dashboard | A [PAT](../../quix-cloud/access-security/personal-access-token.md) that the web app uses to authenticate the Streaming Reader API. |-->

The above is a list of environment variables that you are going to configure.

For `INFLUXDB_TOKEN`, you need to [create a secret project variable](../../quix-cloud/deployments/project-variables.md) to assign to the corresponding [environment variables](../../quix-cloud/deployments/environment-variables.md).

To create the secret project variable:

1. Click on Settings in the bottom left-hand corner of the Quix UI.

2. Click on `Project variables`.

3. In the `Project variables` panel, click `+ New variable`. Name it `INFLUXDB_TOKEN`, enable the `Secret` toggle, and set the value for each environment.

<!-->
4. Also create a secret project variable for `bearer_token` - the value will be a PAT. You can learn how to generate a PAT [here](../../quix-cloud/access-security/personal-access-token.md).
-->

These project variables are then assigned to their corresponding environment variables on each deployment.

!!! note

    You will need to restart services (if they are running) where you have just added or changed a project variable.

## 🏃‍♀️ Next step

[Part 2 - Data generator service :material-arrow-right-circle:{ align=right }](./data-generator.md)
