# Bike Availability Prediction in New York: A Step-by-Step Guide

Throughout this tutorial you will learn how to deploy a real-time data science project from scratch into a scalable self-maintained solution. We will predict bicycle availability in New York by building the raw data ingestion pipelines, ETL and predictions.

## Introduction

### Aim

The Quix Platform allows you to harness complex, efficient real time infrastructure in a quick and simple way. You are going to build an application that uses real time New York bicycle data and weather data to predict the future availability of bikes in New York.

You will complete all the typical phases of a data science project:

 - Build pipelines to gather bicycle and weather data.

 - Store the data efficiently.

 - Train ML models with historic data.

 - Deploy the ML models into production and create predictions in real time.

This would traditionally take several people with a wide set of different skills (Data Engineers, Data Scientists and Developers) and weeks of work. However, you will complete this tutorial on your own in a fraction of the time using the Quix Platform.

### Prerequisites

1. You will need to know how to train an ML model.

	???- example "Want to learn it?"

		If you don't already know how to train an ML model, follow our "How to train an ML model" tutorial [here](../../tutorials/train-and-deploy-ml/train-ml-model.md).

		We take you through the process of getting the code to access the data, running the code in a Jupyter notebook, training the model and uploading your pickle file to the Quix Platform.


2. You will need a Quix account and be logged into the [Quix Portal](https://portal.platform.quix.ai/workspaces){target=_blank}. 

	!!! tip 

		Go [here](https://quix.io){target=_blank} to sign up if you need a free account.
	

### Overview 

This tutorial covers the following steps:

1. **Create a bikes data real time stream**. Access real-time data from New Yorks CitiBikes API using a ready made Code Sample.

2. **Create a weather forecast data stream**. Add weather data using a free weather API.

3. **Visualize the data**. View real-time and historic data in the visualization tools.

4. **Get data to train a model**. Use the built in tools to get training data.

6. **Deploy pre-trained ML models and produce predictions in real time**. Use our pre-trained model artifacts to get CitiBike predictions based on historic bicycle availability and weather forecasts.

7. **See the models output**. Use the built in visualization tools to view the models prediction.

[Part 1 - CitiBike data stream :material-arrow-right-circle:{ align=right }](1-bikedata.md)
