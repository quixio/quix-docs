# 2. Event Detection

In this part of the tutorial you build the event detection service. This service runs an ML model to detect if a vehicle has been involved in an accident.

For the purposes of this tutorial, the ML model you use was trained to detect the difference between a phone shaking and it being used normally. 

Using an ML model is not the only way to create the event detection - you could detect a change in the speed or use the speed and another parameter to determine if an event has occurred.

## The starter template

Follow these steps to create the event detection service:

1. Navigate to `Code Samples` and search for `Starter transformation`.

2. Ensure you have located the Python starter transformation and click `Preview code`.

3. Click `Edit code`.

4. Change the name to `Crash event detection`.

5. Enter `phone-data` into the input field.

6. Enter `phone-out` into the output field.

7. Click `Save as project`.

You now have the basic template for the service saved to your workspace.

## Test the template

At this stage you should test the code to make sure it passes some basic functional tests:

1. Ensure that the data source you deployed earlier is running.

2. Click the `Run` button in the top right of your browser.

3. Explore the `Console` and `Messages` tabs and verify that there is data arriving into the `phone-data` topic.

4. Stop the code from running once you are finished investigating the tabs.

Next you add code to detect the crash events, making use of some code snippets and Python libraries.

## Modify `requirements.txt`

Follow these steps:

1. Open the `requirements.txt` file and add the following lines to ensure all the packages are installed.

	```python
	urllib3
	xgboost==0.90
	scikit-learn 
	```

2. Save the `requirements.txt` file.

## Modify `main.py`

1. Open `main.py` and add these lines to the existing imports.

	```py
	import pickle
	from urllib import request
	```

2.	After the import statements, add the following lines:

	```python
	# download the model with urllib
	f = request.urlopen("https://quixtutorials.blob.core.windows.net/tutorials/event-detection/XGB_model.pkl")
	with open("XGB_model.pkl", "wb") as model_file:
		model_file.write(f.read())

	# load it with pickle
	loaded_model = pickle.load(open("XGB_model.pkl", 'rb'))
	```

	This code downloads the `.pkl` file (the pretrained model) from the Quix storage account and load the model into memory.

3. Modify the `on_dataframe_received_handler` function as follows:

	```python
	def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):

		# Transform data frame here in this method. You can filter data or add new features.
		# Pass modified data frame to output stream using stream producer.
		# Set the output stream id to the same as the input stream or change it,
		# if you grouped or merged data with different key.
		stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)

		if "gForceX" in df:
			df["gForceTotal"] = df["gForceX"].abs() +  df["gForceY"].abs() + df["gForceZ"].abs()
			df["shaking"] = loaded_model.predict(df[["gForceZ", "gForceY", "gForceX", "gForceTotal"]])

			if df["shaking"].max() == 1: 
				print("Crash detected.")

				stream_producer.events.add_timestamp_nanoseconds(df.iloc[0]["timestamp"]) \
					.add_value("crash", "Crash detected.") \
					.publish()
	```

	This code opens the publish stream, and then checks that the required data is in the DataFrame. It then uses the ML model with the g-force data to determine if shaking has occurred.

	If shaking is detected, an event is generated and published to the publisher topic.

4. Save `main.py`.

???- info "The completed `main.py` should look like this"

	```python
	import quixstreams as qx
	import os
	import pandas as pd
	import pickle
	from urllib import request

	# download the model with urllib
	f = request.urlopen("https://quixtutorials.blob.core.windows.net/tutorials/event-detection/XGB_model.pkl")
	with open("XGB_model.pkl", "wb") as model_file:
		model_file.write(f.read())

	# load it with pickle
	loaded_model = pickle.load(open("XGB_model.pkl", 'rb'))

	client = qx.QuixStreamingClient()

	topic_consumer = client.get_topic_consumer(os.environ["input"], consumer_group = "empty-transformation")
	topic_producer = client.get_topic_producer(os.environ["output"])

	def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):

		# Transform data frame here in this method. You can filter data or add new features.
		# Pass modified data frame to output stream using stream producer.
		# Set the output stream id to the same as the input stream or change it,
		# if you grouped or merged data with different key.
		stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)

		if "gForceX" in df:
			df["gForceTotal"] = df["gForceX"].abs() +  df["gForceY"].abs() + df["gForceZ"].abs()
			df["shaking"] = loaded_model.predict(df[["gForceZ", "gForceY", "gForceX", "gForceTotal"]])

			if df["shaking"].max() == 1: 
				print("Crash detected.")

				stream_producer.events.add_timestamp_nanoseconds(df.iloc[0]["timestamp"]) \
					.add_value("crash", "Crash detected.") \
					.publish()

	# Handle event data from samples that emit event data
	def on_event_data_received_handler(stream_consumer: qx.StreamConsumer, data: qx.EventData):
		print(data)
		# handle your event data here

	def on_stream_received_handler(stream_consumer: qx.StreamConsumer):
		# subscribe to new DataFrames being received
		# if you aren't familiar with DataFrames there are other callbacks available
		# refer to the docs here: https://docs.quix.io/sdk/subscribe.html
		stream_consumer.events.on_data_received = on_event_data_received_handler # register the event data callback
		stream_consumer.timeseries.on_dataframe_received = on_dataframe_received_handler


	# subscribe to new streams being received
	topic_consumer.on_stream_received = on_stream_received_handler

	print("Listening to streams. Press CTRL-C to exit.")

	# Handle termination signals and provide a graceful exit
	qx.App.run()
	```

## Test again

You can once again run the code in the development environment to test the functionality:

1. Ensure that the data source you deployed earlier is running.

2. Click `Run` in the top right of the browser to run the event detection code.

3. If you chose to stream live data then gently shake your phone. 

4. If you chose to use CSV data, wait for a crash event to be streamed from the data set, or stop and start the service in another browser tab.

5. Observe the `Console` tab. You should see a message saying "Crash detected".

4. On the `Messages` tab select `output : phone-out` from the first drop-down.

5. Gently shake your phone, or wait for another crash event from the CSV data, and observe that crash events are streamed to the output topic. You can click these rows to investigate the event data, for example:

	```
	[{
		"Timestamp": 1674137774598972000,
		"Tags": {},
		"Id": "crash",
		"Value": "Crash detected."
	}]
	```

6. Stop the code.

!!! success
	The crash detection service is working as expected and can now be deployed

## Deploy crash detection

Now that you have verified the service is working you can go ahead and deploy the service:

1. Tag the code by clicking the `add tag` icon at the top of the code panel.

2. Enter a tag such as `v1`.

3. Now click the `Deploy` button near the top right of the code panel.

4. From the `Version tag` drop-down, select the tag you created.

5. Click `Deploy`.

!!! success
	You now have a data source and the crash detection service running in your workspace. 
	
	Next you’ll deploy a real-time UI to visualize the route being taken, the location of any crash events and also to see some of the sensor data.

[Deploy the UI for this tutorial by following step 3 :material-arrow-right-circle:{ align=right }](crash-detection-ui.md)
