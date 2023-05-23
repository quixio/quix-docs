# 5. Run the model

Quix has has already trained model artifacts and these have been included as pickle files in the prediction code project. This project is included in the open source Code Samples. You will use the Code Sample to run the model.

## Prediction service code

Get the code for the prediction service:

1. Click on `Code Samples` in the left-hand navigation.

2. Search for `New York` and click the `New York Bikes - Prediction` tile.

3. Click `Edit code`.

4. Leave the `Name` as it is.
	
5. Ensure the `bike_input` is set to `bikes-topic`.

6. Ensure the `weather_input` is set to `weather-topic`.

7. Ensure the `output` is set to `NY-bikes-prediction`.

8. Click `Save as project`.

	This will save the code for this service to your workspace.

!!! note "Free Models" 

	Look in the `MLModels` folder for the Quix pretrained ML models. You can upload your own and compare them to ours. Let us know how they compare.

## Run in the dev environment

You can now run the prediction model from this 'dev' environment to make sure it's working before deploying it to an always ready, production environment.

1. Click `Run` in the top right-hand corner.

2. Observe the `Console` tab at the bottom of the screen.

	 - Any packages that are needed will be installed.
	
	 - Any topics that didn't previously exist will be created.
	
	 - Then the code will run.
	
	 - You will see a line similar to this in the console output.
	
	```shell
	Current n bikes: 23742 Forecast 1h: 23663 Forecast 1 day: 22831
	```
	
	!!! note "Note about data"
	
		For a new prediction to be generated, the service has to receive data from both bikes (updated often) and weather feeds (only updated every 30 mins).

		When you test the model, you may want to force the weather service to produce some new data (to avoid waiting for 30 mins) by restarting the service: stop it and then re-deploy it. By doing this it will start generating predictions sooner.
		
## Deploy the service

Having verified that the code runs, you can now deploy it to the Quix serverless environment. Once deployed, it will run continuously, gathering data from the sources and producing predictions.

1. Click `Running` to stop the code running.

2. Click `Deploy` in the top right-hand corner near `Run`.

3. On the `Deployment settings`, increase the memory to at least 1.5GB.

4. Click `Deploy`.

	You will be redirected to the pipeline page and the code will be built, deployed and started.
	
## See the model output

Once the prediction service has started you can once more restart the `VisualCrossing Weather` service and view the data.

You should be familiar with some of the following steps:

1. Restart the `VisualCrossing Weather` service.

2. Click `Persisted streams` in the left-hand menu.

3. Click the toggle switch next to the `ny-bikes-prediction` topic to persist the data (wait for this to complete).

4. Mouse over the `stream name` of one of the rows in the table.

5. Click the `Visualize stream` button.

6. Select both of the parameters (`timestamp_ny_prediction` and `forecast_1d`).

7. You can select the `Waveform` tab to see a graphical representation of the forecast or select the `Table` tab to see the raw data.

## Summary

Congratulations, you have completed all the steps of this tutorial. The following page summarizes your learning and provides some suggestions for next steps to try.

[Conclusion and next steps :material-arrow-right-circle:{ align=right }](6-conclusion.md)
