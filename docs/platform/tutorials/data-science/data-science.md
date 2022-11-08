# Data Science with Quix: NY Bikes

This guide will take you through the steps to perform CityBikes and OpenWeather API requests using Quix, including getting an OpenWeather account.

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

		If you don't already know how to train an ML model, follow our "How to train an ML model" tutorial [here](../train-and-deploy-ml/train-ml-model.md).

		We walk you through the process of getting the code to access the data, running the code in a Jupyter notebook, training the model and uploading your pickle file to Quix.


2. You will need a Quix account and be logged into the [Portal](https://portal.platform.quix.ai/workspaces){target=_blank}. 

	!!! tip 

		Go [here](https://quix.io){target=_blank} to sign up if you need a free account.
	

### Overview 

This walk through covers the following steps:

1. Create OpenWeather account (third party)

2. Create a bikes data real time stream

3. Create a weather forecast data real time stream

4. Visualize the data

5. Get data to train a model

6. Deploy pre-trained ML models and produce predictions in real time

7. See the models output

## 1. Create OpenWeather account (free)

!!! info

	[OpenWeather](https://openweathermap.org/){target=_blank} is a team of IT experts and data scientists that provides historical, current and forecasted weather data via light-speed APIs.
	
1. Go to the [OpenWeather Sign Up page](https://home.openweathermap.org/users/sign_up/){target=_blank}.

2. Click the "Sign Up" button and complete the dialog. Do the email and text message verifications.

3. Then, go to the [OpenWeather API keys](https://home.openweathermap.org/api_keys){target=_blank} page to copy your key. Keep it safe for later.

## 2. Bikes real time stream

Start by getting the real time bikes stream. Use CityBikes to get real time bikes data (it doesn’t require a sign up or any keys).

Instead of writing a lot of code you will use the Library to deploy a pre-built service that streams data from the New York CitiBikes api.

1. Search the library for `New York` and select the `New York Bikes - Source` tile.

	<img src="../ny-bikes-library-tile.png" width="400px" class="image-center">

	!!! tip 
		The Library is on the left hand menu

2. Click `Setup and deploy`

	a. Leave the Name as it is
	
	b. Ensure the `output` is set to `bikes-topic`
	
3. Click `Deploy`

	The pre-compiled service will be deployed to your workspace and will begin running immediately.


## 3. Weather real time stream

You now have a working real time stream of bike data. Now use the OpenWeather account to create a real time weather stream. The procedure is almost the same, so you should have no problems!

1. Search the library for `weather` and select the `Open Weather API` tile.

2. Click `Setup and deploy`

	a. Leave the Name as it is
	
	b. Ensure the `output` is set to `weather-topic`

	c. Paste the key from your OpenWeather API keys page ([here](https://home.openweathermap.org/api_keys){target=_blank})

	<img src="../open-weather-api.png" width="600px" class="image-center">

3. Click `Deploy`

	The pre-compiled service will be deployed to your workspace and will begin running immediately.

	!!! note "OpenWeather limitation"

		The OpenWeather API has limits on how much data we can access for free and the real weather only changes in real-time (this means slowly). 
		
		In order to prevent your account from being rate limited, we consume updated data every 30 minutes. (see more about this limitation later on in [training data](#training-data))

!!! success 

	At this stage you should have two services running

	<img src="../early-success.png" width="600px" class="image-center">

	One service publishing New York CitiBike data to a topic and another publishing OpenWeather data.

## 4. Visualize the data

With Quix it's easy to visualize your data in a powerful and flexible way, you can see the real-time data and view historic data.

At it's heart Quix is a real-time data platform, so if you want to see data-at-rest for a topic, you must turn on data persistence for that topic (You'll do this [below](#historic)).

### Real-time

1. View the real-time data by clicking on the green arrow coming out of the `New York Bikes` service on the home page.

2. Click `Explore live data` on the context menu

3. Select a stream from the `select streams` list

4. Select the parameters in the `select parameters or events` list

5. Select the `Table` tab in the top middle of the screen

!!! tip "Be patient"

	If you don't see any streams or parameters, just wait a moment or two. The next time data arrives these lists will be automatically populated.

### Historic

We will need historic data stored in the data catalogue for the next steps. So follow these steps to enable it.

1. Navigate to the topics page using the left hand navigation

2. Locate the topic(s) you want to explore data for (in this case `bikes-topic` and `weather-topic`)

3. Click the toggle in the Persistence column to `on`

4. Finally, go back to the homepage. 
	
	Now stop and then start the OpenWeather API service. This will collect and publish fresh data to the weather-topic.

## 5. Train your model

Quix gives you the freedom to train the ML model your way. If you already have tools and processes for doing that then great, you can train the model and import it into Quix so that you can run it in real-time. 

Follow the along and we'll show you how to get data out of Quix so you can train the model.

### Training data

We mentioned earlier in [Weather real time stream](#3-weather-real-time-stream) that free access to the OpenWeather API only allows us to consume new data every 30 minutes therefore, at this point you will have a limited data set.

You can leave the data consumption process running overnight or for a few days to gather more data.

In the mean time continue with the tutorial, just know that having more data to train your model will make it better.

#### Get the data

1. Click `Persisted data` in the left hand navigation

2. Select the `bikes-topic` in the left hand panel

3. Mouse over a stream name in the table and click the `Visualize stream` button

	The page will navigate to the `Data explorer`

4. In the query builder on the left hand side click the `+` under `SELECT (Parameters & Events)`

5. Select `total_num_bikes_available`

6. Click `+` again

7. Select `num_docks_available`

!!! success

	You should be looking at a visualization of the two selected parameters

	<img src="../data-explorer.png" width="600px" class="image-center">

8. Switch off `aggregation` to see all of the data

9. Select the `Code` tab to view the code to access this data set from outside of Quix

Now train a model in your usual way using this data.

!!! example "Need help?"

	Follow our "How to train an ML model" tutorial [here](../train-and-deploy-ml/train-ml-model.md)

	We walk you through the process of getting the code to access the data (as described above), running the code in a Jupyter notebook, training the model and uploading your pickle file to Quix.

## 6. Run the model

At this point you should have a trained ML model. If not we have trained two models for you using the same data sources outlined above. These are available in the code that we'll show you how to access next.

<!-- Download the model from our GitHub [here](https://github.com/quixai/NY-bikes-tutorial/blob/1stversion/notebooks-and-sample-data/ML_1day_Forecast.pickle){target=_blank}

!!! tip "Click the 'download' button" -->

### Prediction service code

Get the code for the prediction service.

1. Click on the Library

2. Search for `New York` and select the `New york Bikes - Prediction` tile

3. Click `Edit code`

	a. Leave the Name as it is
	
	b. Ensure the `bike-input` is set to `bike-topic`

	c. Ensure the `weather-input` is set to `weather-topic`

	d. Ensure the `output` is set to `NY-bikes-prediction`

4. Click `Save as project`

	This will save the code for this service to your workspace

!!! note "Free Models" 

	Look in the `MLModels` folder. We've stashed the pre-trained ML models here for you. You can upload your own and compare them to ours. (Let us know how they compare)

### Run

You can now run the prediction model from this 'dev' environment to make sure it's working before deploying it to an always ready, production environment.

1. Click `run` in the top right hand corner.

2. Observe the `console` tab at the bottom of the screen.

	Any packages that are needed will be installed.
	
	Any topics that didn't previously exist will be created.
	
	Then the code will run.
	
	You will see a line similar to this in the console output.
	
	```shell
	Current n bikes: 23742 Forecast 1h: 23663 Forecast 1 day: 22831
	```
	
	!!! note "Data"
	
		Running the code will consume any data that is waiting in the `bikes-topic` and `weather-topic`.
		
		As previously stated the OpenWeather API free account has limites on the amount of data that can be consumed so we limit the rate to one read every 30 minutes.
		
		To get around this you can stop and then start the OpenWeather API service. This will obviously use more of your free quota so don't do this too many times.
		
### Deploy

	With the code running we can deploy it to the Quix serverless environment. Here, it will run continuously, gathering data from the sources and producing predictions.
	
1. Click stop if you haven't already done so.

2. Click `Deploy` in the top right hand corner near `run`

3. On the `Deployment settings`, increase the memory to at least 1.5GB

4. Click `deploy`

	You will be redirected to the home page and the code will be built, deployed and started.
	
## 7. See the models output

Once the prediction service has started you can once more restart the 'Open Weather API' service and view the data.

You should be familair with some of the following steps, they are very similar to '[Get the data](#get-the-data)' above.

1. Restart the 'Open Weather API' service

2. Click `Persisted streams` in the left hand menu

3. Click the toggle switch next to the `ny-bikes-prediction` topic to persist the data (wait for this to complete)

4. Mouse over the `stream name` of one of the rows in the table

5. Click the `Visualize stream` button

6. Select both of the parameters (`timestamp_ny_prediction` and `forecast_1d`)

7. You can select the `Waveform` tab to see a graphical representation of the forecast or select the `Table` tab to see the raw data.

!!! success
	
	You made it to the end! Give youself a high five.
