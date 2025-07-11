# BigQuery

[This project](https://github.com/quixio/quix-samples/tree/main/python/destinations/big_query) gives an example of how to stream data from Quix to a BigQuery database, it handles both parameter and event data.

## How to run

Create a [Quix](https://portal.cloud.quix.io/signup?xlink=github) account or log-in and visit the Samples to use this project.

Clicking `Deploy` on the Sample, deploys a pre-built container in Quix. Complete the environment variables to configure the container.

Clicking `Edit code` on the Sample, forks the project to your own Git repo so you can customize it before deploying.

## Environment variables

The code sample uses the following environment variables:

- **input**: Name of the input topic to read from.
- **PROJECT_ID**: The BigQuery GCP Project ID.
- **DATASET_ID**: The target Bigquery dataset ID.
- **DATASET_LOCATION**: Location of BigQuery dataset.
- **SERVICE_ACCOUNT_JSON**: The service account json string for the BigQuery GCP project. [Tutorial on how to create service account.](https://cloud.google.com/iam/docs/creating-managing-service-accounts#iam-service-accounts-create-console)
- **MAX_QUEUE_SIZE**: Max queue size for the sink ingestion.

## Known limitations 
- BigQuery fails to immediately recognize new Schema changes such as adding a new field when streaming insert data.
- BigQuery doesn't allow deleting data when streaming insert data.

## Contribute

Submit forked projects to the Quix [GitHub](https://github.com/quixio/quix-samples) repo. Any new project that we accept will be attributed to you and you'll receive $200 in Quix credit.

## Open source

This project is open source under the Apache 2.0 license and available in our [GitHub](https://github.com/quixio/quix-samples) repo.

Please star us and mention us on social to show your appreciation.

