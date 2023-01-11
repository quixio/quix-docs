# Run ML model in realtime environment

In this article, you will learn how to use pickle file trained on
historic data in a realtime environment.

Ensure you have completed the previous stage first, if not find it [here](train-ml-model.md).

## Watch
If you prefer watching instead of reading, we've recorded a short video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/8h0jm0q_0PA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why this is important

With the Quix platform, you can run and deploy ML models to the leading
edge reacting to data coming from the source with milliseconds latency.

## End result

At the end of this article, we will end up with a **live model** using the **pickle file** from [How to train ML model](train-ml-model.md) to process live data on the edge.

![What you'll build](run-live.png)

## Preparation

You’ll need to complete the [How to train ML model](train-ml-model.md) article to get pickle file with trained model logic.

## Run the model

Now let's run the model you created in the previous article. If you have your own model and already know how to run the Python to execute it then these steps might also be useful for you.

Ensure you are logged into the Quix Portal

1. Navigate to the Library

2. Filter the library by selecting Python under languages and Transformation under pipeline stage

3. Select the Data Filtering Model

	!!! tip

		If you can't see Data Filtering Model you can also use search to find it
		
	!!! info

		Usually, after clicking on the Data Filtering Model you can look at the code and the readme to ensure it's the correct sample for your needs.

4. Now click Edit code

5. Change the name to "Prediction Model"

6. Ensure the input is "f1-data"

7. Ensure the output is "brake-prediction"

	!!! info

		The platform will automatically create any topics that don't already exist

!!! success

	The code from the Library sample is now saved to your workspace.
	
	You can edit and run the code from here or clone it to your computer and work locally.
	
	See more about setting up your local environment [here](../../../sdk/python-setup.md).

### Upload the model

Now you need to upload the ML model created in the previous article and edit this code to run the model.

1. Click the upload file icon at the top of the file list

2. Find the file saved in the previous article.

	!!! hint
	
		It's called 'decision_tree_5_depth.sav' and should be in "C:\Users\[USER]\" on Windows

	!!! warning
	
		When you click off the file e.g. onto quix_function.py, the editor might prompt you to save the .sav file.
		
		Click "Do not commit"
		
3. Click quix_function.py in the file list (remember do not commit changes to the model file)

### Modify the code

1. Add the following statements to import the required libraries

	``` py
	import pickle
	import math
	```

2. In the `__init__` function add the following lines to load the model

	``` py
	## Import ML model from file
    self.model = pickle.load(open('decision_tree_5_depth.sav', 'rb'))
	```

3. Under the `__init__` function add the following new function

	This will pre-process the data, a necessary step before passing it to the model.

	``` py
	## To get the correct output, we preprocess data before we feed them to the trained model
    def preprocess(self, df):

        signal_limits = {
            "Speed": (0, 400),
            "Steer": (-1, 1),
            "Gear": (0, 8),
            "Motion_WorldPositionX": (-math.pi, math.pi),
            "Brake": (0, 1),
        }

        def clamp(n, minn, maxn):
            return max(min(maxn, n), minn)

        for signal, limits in signal_limits.items():
            df[signal] = df[signal].map(lambda x: clamp(x, limits[0], limits[1]))

        df["Motion_WorldPositionX_sin"] = df["Motion_WorldPositionX"].map(lambda x: math.sin(x))
        df["Motion_WorldPositionX_cos"] = df["Motion_WorldPositionX"].map(lambda x: math.cos(x))

        return df
	```

4. Delete the `on_pandas_frame_handler` function and paste this code in it's place.

	``` py
	# Callback triggered for each new parameter data.
    def on_pandas_frame_handler(self, df: pd.DataFrame):

        # if no speed column, skip this record        
        if not "Speed" in df.columns:
            return df
            
        output_df = pd.DataFrame()

        # Preprocessing
        df = self.preprocess(df)

        features = ["Motion_WorldPositionX_cos", "Motion_WorldPositionX_sin", "Steer", "Speed", "Gear"]
        X = df[features]

        # Lets shift data into the future by 5 seconds. (Note that time column is in nanoseconds).
        output_df["time"] = df["time"].apply(lambda x: int(x) + int((5 * 1000 * 1000 * 1000)))
        output_df["brake-prediction"] = self.model.predict(X)
		
        print("Prediction")
        print(output_df["brake-prediction"])		

		# Merge the original brake value into the output data frame
        output_df = pd.concat([df[["time", "Brake"]], output_df]).sort_values("time", ascending=True)


        self.output_stream.parameters.buffer.write(output_df)  # Send filtered data to output topic
	```

### Update requirements

Click on the requirements.txt file and add `sklearn` on a new line


!!! success

	You have edited the code to load and run the model.
	

### Run the code

The fastest way to run the code is to click Run in the top right hand corner.

This will install any dependencies into a sandboxed environment and then run the code.

In the output console you will see the result of the prediction.

In the next few steps you will deploy the code and then see a visualization of the output.

## Deploy

1. Click Stop if you haven't already done so.

2. To deploy the code, click Deploy.

3. On the dialog that appears click Deploy.

Once the code has been built, deployed it will be started automatically.

!!! success

	Your code is now running in a fully production ready ecosystem.

## Visualize whats happening

To see the output of your model in real time you will use the Data explorer.

1. Click the Data explorer button on the left hand menu.

2. If it's not already selected click the Live data tab at the top

3. Ensure the `brake-prediciton` topic is selected

4. Select a stream (you should only have one)

5. Select `brake-prediction` and `brake` from the parameters list

!!! success 

	You should now see a graphical output for the prediction being output by the model as well as the actual brake value

	![Data explorer](visualize-result.png)


!!! note

	Don't forget this exercise was to deploy an ML model in the Quix platform. 
	
	We didn't promise to train a good model. So the prediciton may not always match the actual brake value.


