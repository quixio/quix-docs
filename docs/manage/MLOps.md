# MLOps

MLOps stands for Machine Learning Operations. MLOps is a core function of Machine Learning (ML) engineering, focused on streamlining the process of progressing machine learning models to production, and then maintaining and monitoring them.

There are a number of barriers that prevent companies from successfully implementing data and ML projects. It's generally considered to be significantly harder than implementing software projects due to the cross functional complexity of data and ML pipelines.

Solving these challenges is a new field of expertise called [MLOps](https://en.wikipedia.org/wiki/MLOps){target=_blank}

Quix have incorporated MLOps into the Quix so that your data team has a seamless journey from concept to production. The key steps in the MLOps process are:

1. Build and train models on historical data
2. Test models on live data
3. Build a production pipeline
4. Deploy production models
5. Monitor production models

Each of these is described in the following sections.

## Build and train models on historical data

In Quix you can:

* Write model code in Python using the Quix IDE, or download code and work on it in your own development environment.
* Train models on historical data.
* Evaluate results against raw data and results from other models.
* Rapidly iterate models with Git version control.

## Test models on live data

In Quix you can connect models to live input topics to test them against live data sources. You can then review the results in the live data monitoring.

## Build a production pipeline

In Quix you can:

* Connect validated models to live output topics.
* Connect models using the UI to form a pipeline. Pipelines consist of transforms connected together using input and output topics.
* Work seamlessly with engineers to connect software services. You can leverage a number of prebuilt [connectors](../quix-connectors/templates/index.md) to connect to common services.

## Deploy production models

In Quix, with one click of the application's `Deploy` button, and tweaking of the default configuration if required, data engineers can deploy their Python models to production, without support from software engineering or DevOps teams.

## Monitor production models

In Quix, data teams can:

* Ensure that components in a production pipeline operate correctly through the product lifecycle.
* Build and deploy services that detect data drift or unexpected results.

## Next steps

Here are some suggested next steps to find out more about MLOps in Quix:

* [Quickstart](../quix-cloud/quickstart.md) - get data into Quix and displayed in real time in under 10 minutes.
* [Predictive maintenance tutorial](../tutorials/predictive-maintenance/overview.md) - build a complete ML pipeline for predicting equipment failures using real-time data.
