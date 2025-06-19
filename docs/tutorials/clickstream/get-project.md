# Get the project

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

While you can see the [deployed project running in Quix](https://portal.cloud.quix.io/pipeline?workspace=demo-clickstreamanalysis-prod&token=pat-b88b3caf912641a1b0fa8b47b262868b){target=_blank}, it can be useful to learn how to get a project up and running in your own Quix account. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your copy of the project. 

## Clone the project

See the [clone a project documentation](../../create/clone-project.md) for further information on how to do this.

## Add secrets

You'll need to add the following secrets:

| Environment Variable (secret) | Service(s) | Description|
|---|---|---|
| `redis_host` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Host URL for Redis Cloud database |
| `redis_port` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Port for the Redis Cloud database |
| `redis_username` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Username for the Redis Cloud database - typically `default`|
| `redis_password` | Data ingestion, Real-time dashboard, Data aggregation, Data enrichment, Event detection | Password for the Redis Cloud database - found from Security section |
| `bearer_token` | Webshop frontend | A [PAT](../../develop/authentication/personal-access-token.md) that the web app uses to authenticate the Streaming Reader and Streaming Writer APIs |

You need to [create secrets](../../deploy/secrets-management.md) for these and then assign them to the corresponding [environment variables](../../deploy/environment-variables.md).

## 🏃‍♀️ Next step

[Part 2 - Clickstream producer :material-arrow-right-circle:{ align=right }](clickstream-producer.md)
