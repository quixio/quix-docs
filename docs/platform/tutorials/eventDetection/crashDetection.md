# 2. Event Detection

Our event detection pipeline is centered around this service, which executes an ML model to detect whether a vehicle has been involved in an accident.

In reality our ML model was trained to detect the difference between a phone being shaken vs just being used normally. You actually don’t have to use an ML model at all! There are various ways this service could have been written, for example, we could simply detect a change in the speed or use the speed and another parameter to determine if an event has occurred.

## Skeleton service

Follow these steps to create the skeleton for the `crash detection service`:

1. Navigate to the library and search for `Empty template - Transformation`

2. Click `Preview code`

3. Click `Edit code`

4. Change the name to `Crash event detection`

5. Click `Edit code`

6. Enter `phone-data` into the input field

7. Enter `events` into the output field

8. Click `Save as project`

You now have the basic template for the service saved to your workspace.

### Test

At this stage you should test the code to make sure it passes some basic functional tests.

1. Ensure that the data source you deployed earlier is running

2. Click the `Run` button in the top right of your browser

3. Explore the `Console` and `Messages` tabs and verify that there is data arriving into the `phone-data` topic

4. Stop the code from running once you are finished investigating the tabs

## Adding functionality

Next you will add code to detect the crash events, making use of some code snippets and Python libraries.

Follow these steps:

1. Open the `requirements.txt` file and add the following lines to ensure all the packages are installed

	```py
	azure-storage-blob
	xgboost==0.90
	scikit-learn 

	```
2. Save the file

3. Open `main.py` and add these lines

	```py
	from azure.storage.blob import BlobClient
	import pickle
	Next add these lines which will download the pkl file (the pre trained model) from our storage account and load the model into memory.
	blob = BlobClient.from_connection_string(
		"xxxxx",
		"xxxxx",
		"XGB_model.pkl")

	with open("XGB_model.pkl", "wb+") as my_blob:
		blob_data = blob.download_blob()
		blob_data.readinto(my_blob)

	loaded_model = pickle.load(open("XGB_model.pkl", 'rb'))
	```

4. Next, to ensure that the latest messages are processed instead of any historical data, set the "ConsumerGroup" parameter to `None` when opening the input topic. Look for the line with `open_input_topic`

	This line:
	```py
	client.open_input_topic(os.environ["input"], auto_offset_reset=AutoOffsetReset.Latest)
	```
	Should be changed to this:
	```py
	client.open_input_topic(os.environ["input"], None, auto_offset_reset=AutoOffsetReset.Latest)
	```

5. Locate the line that instantiates the `QuixFunction` and pass the `loaded_model` as the last parameter. 	The QuixFunction class will use this to predict crash events.

	The resulting code should look like this:
    ```py
	quix_function = QuixFunction(input_stream, output_stream, loaded_model)
	```

6. Save `main.py` 

7. Open `quix_function.py`
	This file contains handlers for tabular data and event data. You will add code to the `on_pandas_frame_handler` function to handle the input streams tabular data

8. Start by adding `loaded_model` as the last parameter to the `__init__` function definition, this will receive the loaded model from `main.py`

9. Now replace the current `on_pandas_frame_handler` with this code:
   
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

	This code first checks that the required data is in the dataframe then uses the ML model with the g-force data to determine when shaking is occurring.

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
	
### Test again

You can once again run the code in the development environment to test the functionality.

1. Ensure that the data source you deployed earlier is running

2. Click `Run` in the top right of the browser to run the event detection code

3. Gently shake your phone and observe the `Console` tab. You should see a message saying "Crash detected"

4. On the `Messages` tab select `output : events` from the first drop down

5. Gently shake your phone and observe that crash events are streamed to the output topic. You can click these rows to investigate the event data e.g. 

	```
	[{
		"Timestamp": 1674137774598972000,
		"Tags": {},
		"Id": "crash",
		"Value": "Crash detected."
	}]
	```

6. Stop the code

!!! success
	The crash detection service is working as expected and can now be deployed

### Deploy crash detection

Now that you have verified the service is working you can go ahead and deploy the service.

1. Tag the code by clicking the `add tag` icon at the top of the code panel

2. Enter a tag such as `v1`

3. Now click the `Deploy` button near the top right of the code panel

4. From the `Version tag` drop down, select the tag you created

5. Click `Deploy`

!!! success
	You now have a data source and the crash detection service running in your workspace. 
	
	Next you’ll deploy a real-time UI to visualize the route being taken, the location of any crash events and also to see some of the sensor data.

In the next part, deploy the demos '[Crash detection UI](crashDetectionUI.md)'
