# 2. Event Detection

Our event detection pipeline is centered around this service, which executes an ML model to detect whether a vehicle has been involved in an accident.

In reality our ML model was trained to detect the difference between a phone being shaken versus just being used normally. You actually don’t have to use an ML model at all! There are various ways this service could have been written, for example, you could detect a change in the speed or use the speed and another parameter to determine if an event has occurred.

## Service template

Follow these steps to start creating the `crash detection service`:

1. Navigate to `Code Samples` and search for `Starter transformation`.

2. Ensure you have located the Python starter transformation and click `Preview code`.

3. Click `Edit code`.

4. Change the name to `Crash event detection`.

5. Enter `phone-data` into the input field.

6. Enter `phone-out` into the output field.

7. Click `Save as project`.

You now have the basic template for the service saved to your workspace.

### Test

At this stage you should test the code to make sure it passes some basic functional tests:

1. Ensure that the data source you deployed earlier is running.

2. Click the `Run` button in the top right of your browser.

3. Explore the `Console` and `Messages` tabs and verify that there is data arriving into the `phone-data` topic.

4. Stop the code from running once you are finished investigating the tabs.

## Adding functionality

Next you will add code to detect the crash events, making use of some code snippets and Python libraries.

### requirements.txt

Follow these steps:

1. Open the `requirements.txt` file and add the following lines to ensure all the packages are installed.

	```py
	urllib3
	xgboost==0.90
	scikit-learn 
	```

2. Save the file.

### main.py

1. Open `main.py` and add these lines to the existing imports.

	```py
	import pickle
	from urllib import request
	```

	Next add these lines which will download the `.pkl` file (the pretrained model) from our storage account and load the model into memory.

	```py
	# download the model with urllib
	f = request.urlopen("https://quixtutorials.blob.core.windows.net/tutorials/event-detection/XGB_model.pkl")
	with open("XGB_model.pkl", "wb") as model_file:
		model_file.write(f.read())

	# load it with pickle
	loaded_model = pickle.load(open("XGB_model.pkl", 'rb'))
	```

2. Next, to ensure that the latest messages are processed instead of any historical data, set the "ConsumerGroup" parameter to `None` when opening the input topic. Look for the line with `open_input_topic`.

	This line:
	```py
	input_topic = client.open_input_topic(os.environ["input"], auto_offset_reset=AutoOffsetReset.Latest)
	```
	Should be changed to this:
	```py
	input_topic = client.open_input_topic(os.environ["input"], None, auto_offset_reset=AutoOffsetReset.Latest)
	```

3. Locate the line that instantiates the `QuixFunction` and pass the `loaded_model` as the last parameter. The QuixFunction class will use this to predict crash events.

	The resulting code should look like this:

	```py
	quix_function = QuixFunction(input_stream, output_stream, loaded_model)
	```

	???- info "The completed `main.py` should look like this"

		```py
		from quixstreaming import QuixStreamingClient, StreamEndType, StreamReader, AutoOffsetReset
		from quixstreaming.app import App
		from quix_function import QuixFunction
		import os
		import pickle
		from urllib import request

		# download the model
		f = request.urlopen("https://quixtutorials.blob.core.windows.net/tutorials/event-detection/XGB_model.pkl")
		with open("XGB_model.pkl", "wb") as model_file:
			model_file.write(f.read())

		# load it with pickle
		loaded_model = pickle.load(open("XGB_model.pkl", 'rb'))

		# Quix injects credentials automatically to the client. Alternatively, you can always pass an SDK token manually as an argument.
		client = QuixStreamingClient()

		# Change consumer group to a different constant if you want to run model locally.
		print("Opening input and output topics")

		input_topic = client.open_input_topic(os.environ["input"], None, auto_offset_reset=AutoOffsetReset.Latest)
		output_topic = client.open_output_topic(os.environ["output"])


		# Callback called for each incoming stream
		def read_stream(input_stream: StreamReader):

			# Create a new stream to output data
			output_stream = output_topic.create_stream(input_stream.stream_id)
			output_stream.properties.parents.append(input_stream.stream_id)

			# handle the data in a function to simplify the example
			quix_function = QuixFunction(input_stream, output_stream, loaded_model)
				
			# React to new data received from input topic.
			input_stream.events.on_read += quix_function.on_event_data_handler
			input_stream.parameters.on_read_pandas += quix_function.on_pandas_frame_handler

			# When input stream closes, we close output stream as well. 
			def on_stream_close(endType: StreamEndType):
				output_stream.close()
				print("Stream closed:" + output_stream.stream_id)

			input_stream.on_stream_closed += on_stream_close

		# Hook up events before initiating read to avoid losing out on any data
		input_topic.on_stream_received += read_stream

		# Hook up to termination signal (for docker image) and CTRL-C
		print("Listening to streams. Press CTRL-C to exit.")

		# Handle graceful exit of the model.
		App.run()

		```

4. Save `main.py`.


### quix_function.py

1. Open `quix_function.py`
	This file contains handlers for tabular data and event data. You will add code to the `on_pandas_frame_handler` function to handle the input streams tabular data.

2. Start by locating the `__init__` function definition.

3. Add `loaded_model` as the last parameter to the `__init__` function, this will receive the loaded model from `main.py`.

4. Store the `loaded_model` in a class property by adding the following line to the the `__init__` function.

	```py
	self.loaded_model = loaded_model
	```

5. Now replace the current `on_pandas_frame_handler` with this code:

	```py
		def on_pandas_frame_handler(self, df: pd.DataFrame):
			
			if "gForceX" in df:
				df["gForceTotal"] = df["gForceX"].abs() +  df["gForceY"].abs() + df["gForceZ"].abs()
				df["shaking"] = self.loaded_model.predict(df[["gForceZ", "gForceY", "gForceX", "gForceTotal"]])

				if df["shaking"].max() == 1: 
					print("Crash detected.")

					self.output_stream.events.add_timestamp_nanoseconds(df.iloc[0]["time"]) \
						.add_value("crash", "Crash detected.") \
						.write()
	```

	The first thing this code does is check that the required data is in the DataFrame then uses the ML model with the g-force data to determine when shaking is occurring.

	If shaking is occurring an event is generated and streamed to the output topic.

	???- info "The completed `quix_function.py` should look like this"

		```py
		from quixstreaming import StreamReader, StreamWriter, EventData, ParameterData
		import pandas as pd

		class QuixFunction:
			def __init__(self, input_stream: StreamReader, output_stream: StreamWriter, loaded_model):
				self.input_stream = input_stream
				self.output_stream = output_stream
				self.loaded_model = loaded_model

			# Callback triggered for each new event.
			def on_event_data_handler(self, data: EventData):
				print(data.value)
				# Here transform your data.
				self.output_stream.events.write(data)

			# Callback triggered for each new parameter data.
			def on_pandas_frame_handler(self, df: pd.DataFrame):
				
				# if the expected column is in the dataframe
				if "gForceX" in df:
					# calc total g-force
					df["gForceTotal"] = df["gForceX"].abs() +  df["gForceY"].abs() + df["gForceZ"].abs()
					# predict 'shaking'
					df["shaking"] = self.loaded_model.predict(df[["gForceZ", "gForceY", "gForceX", "gForceTotal"]])

					# if 'shaking'
					if df["shaking"].max() == 1: 
						print("Crash detected.")

						# write the event to the output stream
						self.output_stream.events.add_timestamp_nanoseconds(df.iloc[0]["time"]) \
							.add_value("crash", "Crash detected.") \
							.write()
		```

6. Save `quix_function.py`.


### dockerfile

1. Now update the `dockerfile` in the `build` folder.

	Under the line with `COPY --from=git /project .`
	Add

	```sh
	RUN apt-get install libgomp1
	```

	This will install `libgomp1` which a requirement of `XGBoost`

	???- info "The completed `dockerfile` should look like this"

		```sh
		FROM quixpythonbaseimage

		WORKDIR /app
		COPY --from=git /project .
		RUN apt-get install libgomp1
		RUN find | grep requirements.txt | xargs -I '{}' python3 -m pip install -i http://pip-cache.pip-cache.svc.cluster.local/simple --trusted-host pip-cache.pip-cache.svc.cluster.local -r '{}' --extra-index-url https://pypi.org/simple --extra-index-url https://pkgs.dev.azure.com/quix-analytics/53f7fe95-59fe-4307-b479-2473b96de6d1/_packaging/public/pypi/simple/
		ENTRYPOINT python3 main.py
		```

2. Save `dockerfile`. 


### Test again

You can once again run the code in the development environment to test the functionality:

1. Ensure that the data source you deployed earlier is running.

2. Click `Run` in the top right of the browser to run the event detection code.

3. If you chose to stream live data then gently shake your phone. 

4. If you chose to use CSV data, wait for a crash event to be streamed from the data set, or stop and start the service in another browser tab.

5. Observe the `Console` tab. You should see a message saying "Crash detected".

4. On the `Messages` tab select `output : phone-out` from the first drop-down.

5. Gently shake your phone, or wait for another crash event from the CSV data, and observe that crash events are streamed to the output topic. You can click these rows to investigate the event data e.g. 

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

### Deploy crash detection

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
