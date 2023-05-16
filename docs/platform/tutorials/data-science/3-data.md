# View and store the data

With the Quix Platform it's easy to visualize your data in a powerful and flexible way, you can see the real-time data and view historic data.

Quix Platform was designed for real-time data, so if you want to see data-at-rest for a topic you must turn on data persistence for that topic (You'll do this [below](#historic)).

### Real-time

Follow these steps to view real-time data as it arrives into your topics:

1. On the home page, click on the grey or green arrow coming out of the `New York Bikes` service.

2. Click `Explore live data` on the context menu.

3. Select a stream from the `select streams` list.

4. Select the parameters in the `select parameters or events` list.

5. Select the `Table` tab in the top middle of the page.

6. After a few moments you will see data being shown in the table

	![CitiBike data](data.png)

!!! tip "Be patient"

	If you don't see any `streams`, `parameters` or data, just wait a moment or two. The next time data arrives these will be populated automatically.

Now you know how to see data arriving in the Quix Platform. You can also explore the `Waveform` tab to see numeric data in a graphical form and the `Messages` tab to see the raw, [JSON format](https://en.wikipedia.org/wiki/JSON), messages.

### Historic

In order to train a machine learning model on historical data, the live real-time data being ingested needs to be stored. However topics are real time and therefore not designed for data storage. To solve this, Quix allows you to store the data going through a topic to an efficient real time database if you need it:

1. Navigate to the topics page using the left hand navigation.

2. Locate the topic(s) you want to store data for (in this case `bikes-topic` and `weather-topic`).

3. Click the toggle in the Persistence column to `on`.

4. Finally, go back to the homepage. 
	
	Now stop and then start the OpenWeather API service. This will collect and publish fresh data to the `weather-topic`.

[Part 4 - Train the model :material-arrow-right-circle:{ align=right }](4-train.md)
