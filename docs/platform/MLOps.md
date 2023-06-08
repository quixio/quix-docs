## MLOps

MLOps stands for Machine Learning Operations. MLOps is a core function of Machine Learning (ML) engineering, focused on streamlining the process of progressing machine learning models to production, and then maintaining and monitoring them.

There are a number of barriers that prevent companies from successfully implementing data and ML projects. It's generally considered to be significantly harder than implementing software projects due to the cross functional complexity of data and ML pipelines.

Solving these challenges is a new field of expertise called [MLOps](https://en.wikipedia.org/wiki/MLOps){target=_blank}

Quix have incorporated MLOps into the Quix Platform so that your data team has a seamless journey from concept to production. The key steps in the MLOps process are:

1. Discover and access data
2. Develop features in historical data
3. Build and train models on historical data
4. Test models on live data
5. Build a production pipeline
6. Deploy production models
7. Monitor production models

Each of these is described in the following sections.

## Discover and access data

Using the Quix Data Catalogue, team members can quickly access data without support from software or regulatory teams.

## Develop features in historical data

Use the Quix Data Explorer to discover, segment, label, and store significant features in the catalogue.

## Build and train models on historical data

In the Quix Portal you can:

* Write model code in Python using the Quix IDE, or download code and work on it in your own development environment.
* Train models on historical data.
* Evaluate results against raw data and results from other models.
* Rapidly iterate models with Git version control.

## Test models on live data

In the Quix Portal you can connect models to live input topics to test them against live data sources. You can then review the results in the Data Explorer.

## Build a production pipeline

In the Quix Portal you can:

* Connect validated models to live output topics.
* Connect models using the UI to form a pipeline. Pipelines consist of transforms connected together using input and output topics.
* Work seamlessly with engineers to connect software services. You can leverage a number of prebuilt [connectors](../platform/connectors/index.md) to connect to common services.

## Deploy production models

in the Quix Portal, with one click of the project's `Deploy` button, and tweaking of the default configuration if required, data engineers can deploy their Python models to production, without support from software engineering or DevOps teams.

## Monitor production models

In the Quix Portal, data teams can:

* Ensure that components in a production pipeline operate correctly through the product lifecycle.
* Build and deploy services that detect data drift or unexpected results.

## Next steps

Here are some suggested next steps to find out more about MLOps in Quix:

* [Platform Quickstart](../platform/tutorials/quick-start/quick-start.md) - get started by building a complete sentiment analysis application without writing code, or optionally, dive deeper and write some code to ingest and transform data.
* [Building real-time ML pipelines tutorial](../platform/tutorials/train-and-deploy-ml/index.md) - train and run an ML model in Quix.
* [Building real-time ML predictions](../platform/tutorials/data-science/index.md) - use data science and ML to predict bicycle availability in New York.
