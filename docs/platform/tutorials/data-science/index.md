# Bike Availability Prediction in New York: A Step-by-Step Guide

Throughout this tutorial you will learn how to deploy a real-time data science project from scratch and into a scalable self-maintained solution. We will predict bike availability in New York by building the raw data ingestion pipelines, ETL and predictions. All in real time!

## Introduction

### Aim

Quix allows you to create complex and efficient real time infrastructure in a simple and quick way. To show you that, you are going to build an application that uses real time New York bikes and weather data to predict the future availability of bikes in New York.

In other words, you will complete all the typical phases of a data science project by yourself:

 - Build pipelines to gather bikes and weather data in real time

 - Store the data efficiently

 - Train some ML models with historic data

 - Deploy the ML models into production in real time

This will typically take several people (Data Engineers, Data Scientists) and weeks of work, however you will complete this tutorial in under 90 minutes using Quix.

### Prerequisites

1. You will need to know how to train an ML model.

	???- example "Want to learn it?"

		If you don't already know how to train an ML model, follow our "How to train an ML model" tutorial [here](../../tutorials/train-and-deploy-ml/train-ml-model.md).

		We walk you through the process of getting the code to access the data, running the code in a Jupyter notebook, training the model and uploading your pickle file to Quix.


2. You will need a Quix account and be logged into the [Portal](https://portal.platform.quix.ai/workspaces){target=_blank}. 

	!!! tip 

		Go [here](https://quix.io){target=_blank} to sign up if you need a free account.
	

### Overview 

This walk through covers the following steps:

1. **Create a bikes data real time stream** Access real-time data from New Yorks CitiBikes API using a ready made Code Sample.

2. **Create a weather forecast data stream** Add weather data using OpenWeathers free weather API.

3. **Visualize the data** View real-time and historic data in the visualization tools.

4. **Get data to train a model** Use the built in tools to get training data.

6. **Deploy pre-trained ML models and produce predictions in real time** Use our pre-trained model artifacts to get CitiBike predictions based on historic bicycle availability and weather forecasts.

7. **See the models output** Use the built in visualization tools to view the models prediction.

[Part 1 - CitiBike data stream :material-arrow-right-circle:{ align=right }](1-bikedata.md)
