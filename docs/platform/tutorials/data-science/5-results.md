
## 6. Run the model

We have included our trained model artifacts as pickle files in the prediction code project and uploaded it to the open source Code Samples, so let's use them.

### Prediction service code

Get the code for the prediction service.

1. Click on `Code Samples` in the left hand navigation

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
	
		For a new prediction to be generated, the service has to receive data from both bikes (updated often) and weather feeds (only updated every 30 mins).

		When you test the model, you may want to force the weather service to produce some new data (to avoid waiting for 30 mins) by restarting the service: stop it and then re-deploy it. By doing this it will start generating predictions sooner.
		
### Deploy

	With the code running we can deploy it to the Quix serverless environment. Here, it will run continuously, gathering data from the sources and producing predictions.
	
1. Click stop if you haven't already done so.

2. Click `Deploy` in the top right hand corner near `run`

3. On the `Deployment settings`, increase the memory to at least 1.5GB

4. Click `deploy`

	You will be redirected to the home page and the code will be built, deployed and started.
	
## 7. See the models output

Once the prediction service has started you can once more restart the 'Open Weather API' service and view the data.

You should be familiar with some of the following steps, they are very similar to '[Get the data](#get-the-data)' above.

1. Restart the 'Open Weather API' service

2. Click `Persisted streams` in the left hand menu

3. Click the toggle switch next to the `ny-bikes-prediction` topic to persist the data (wait for this to complete)

4. Mouse over the `stream name` of one of the rows in the table

5. Click the `Visualize stream` button

6. Select both of the parameters (`timestamp_ny_prediction` and `forecast_1d`)

7. You can select the `Waveform` tab to see a graphical representation of the forecast or select the `Table` tab to see the raw data.

!!! success
	
	You made it to the end! Give yourself a high five.