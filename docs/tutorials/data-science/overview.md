# Real-time Machine Learning (ML) predictions

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

In this tutorial you will learn how to deploy a real-time **data science** application into a scalable self-maintained solution. You create a service that predicts bicycle availability in New York, by building the raw data ingestion pipelines, Extract Transform Load (ETL), and predictions.

## Aim

Quix enables you to harness complex, efficient real-time infrastructure in a quick and simple way. You are going to build an application that uses real-time New York bicycle data and weather data to predict the future availability of bikes in New York.

You will complete all the typical phases of a data science application:

 - Build pipelines to gather bicycle and weather data.

 - Store the data efficiently.

 - Train ML models with historic data.

 - Deploy the ML models into production and create predictions in real time.

This would traditionally take several people with a wide set of different skills (Data Engineers, Data Scientists and Developers) and weeks of work. However, you will complete this tutorial on your own in a fraction of the time using Quix.

## Prerequisites

This tutorial has the following prerequisites:

1. You will need to know how to train an ML model.

	???- example "Want to learn it?"

		If you don't already know how to train an ML model, follow our "How to train an ML model" tutorial [here](../../tutorials/train-and-deploy-ml/overview.md).

		We take you through the process of getting the code to access the data, running the code in a Jupyter notebook, training the model and uploading your pickle file to Quix.

2. You will need a Quix account and be logged into [Quix](https://portal.cloud.quix.io/workspaces){target=_blank}. 

	!!! tip 

		Go [here](https://quix.io){target=_blank} to sign up if you need a free account.
	
## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. **Create a bikes data real-time stream**. Access real-time data from New York's CitiBikes API using a ready made Code Sample.

2. **Create a weather forecast data stream**. Add weather data using a free weather API.

3. **Visualize the data**. View real-time and historic data in the visualization tools.

4. **Get data to train a model**. Use the built in tools to get training data.

5. **Deploy pre-trained ML models and produce predictions in real time**. Use our pre-trained models to get CitiBike predictions based on historical bicycle availability and weather forecasts. You also use the built-in visualization tools to view the models prediction.

6. **Conclusion**. In this [concluding](6-conclusion.md) part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about Quix.

[Part 1 - CitiBike data stream :material-arrow-right-circle:{ align=right }](1-bikedata.md)
