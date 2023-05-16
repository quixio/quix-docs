
# Training data

Quix gives you the freedom to train the ML model your own way. If you already have tools and processes for doing that then great, you can train the model and import it into Quix so that you can run it in real-time. 

Follow along and we'll show you how to get data out of Quix so you can train the model.

### Limited data set

We mentioned earlier in [Weather data](#2-openweather.md) that free access to the OpenWeather API only allows us to consume new data every 30 minutes, therefore at this point you will have a limited data set.

You can continue following the tutorial to see how to access the data, however please note that weather data changes slowly and we've used the free OpenWeather API so we are only collecting updates every 30 minutes. After a few hours you will have more data to examine.

#### Get the data

1. Click `Persisted data` in the left hand navigation.

2. Select the `bikes-topic` in the left hand panel.

3. Mouse over a stream name in the table and click the `Visualize stream` icon.

	The page will navigate to the `Data explorer`.

4. In the query builder on the left hand side click the `Add query`.

5. In the Add query dialog select the `New York Total Bikes Real Time` stream.

6. Click `Next`

7. Select `total_num_bikes_available` and `num_docks_available`

8. Click `Done`


	You should be looking at a visualization of the two selected parameters

	![Data explorer](data-explorer.png){width=600px}

8. Switch off `aggregation` to see all of the data

9. Select the `Code` tab to view the code to access this data set from outside of Quix

### Train the model

At this point, you are generating historic data and know how to query it. You can train your ML models as soon as you've gathered enough data.

!!! example "Need help?"

	Follow our "How to train an ML model" tutorial [here](../train-and-deploy-ml/train-ml-model.md)

	We walk you through the process of getting the code to access the data (as described above), running the code in a Jupyter notebook, training the model and uploading your pickle file to Quix.

However, it would take several weeks to accumulate enough historic data to train a model, so let's continue the tutorial with some pre-trained models we have provided. We've done it using the very same data flow you've just built, and can find the Jupyter notebook code we used [here](https://github.com/quixio/NY-bikes-tutorial/blob/1stversion/notebooks-and-sample-data/04%20-%20Train%20ML%20models.ipynb){target=_blank}.

[Part 5 - Run the model :material-arrow-right-circle:{ align=right }](5-results.md)
