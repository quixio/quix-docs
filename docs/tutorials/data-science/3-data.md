# View and store the data

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

!!! danger "Legacy feature"

	This feature is not available to new users. However, legacy users may still have access to this functionality.

With Quix it's easy to visualize your data in a powerful and flexible way, you can see the data in real time, as well as viewing historical data.


## Real-time data

Follow these steps to view real-time data as it arrives in your topics:

1. On the `Pipeline` page, click on the arrow coming out of the `New York Bikes` service. If there is data being emitted this arrow is green, otherwise it is gray.

2. Click `Explore live data` on the context menu.

3. Select a stream from the streams listed under `SELECT STREAMS`.

	!!! note 

		If there are no streams under `SELECT STREAMS`, wait a few moments, the New York CitiBike API is queried every few seconds.

4. Select the parameters in the `SELECT PARAMETERS OR EVENTS` list.

5. Select the `Table` tab in the top middle of the page.

6. After a few moments you will see data being shown in the table.

	![CitiBike data](./images/data.png)

!!! tip "Be patient"

	If you don't see any `streams`, `parameters` or data, just wait a moment or two. The next time data arrives these will be populated automatically.

Now you know how to observe data arriving into your topics. You can also explore the `Waveform` tab to see numeric data in a graphical form and the `Messages` tab to see the raw, [JSON format](https://en.wikipedia.org/wiki/JSON){target=_blank}, messages.

## Next step

You will need data in the next section, where you will learn how to retrieve data for training a model. 

[Part 4 - Get data to train a model :material-arrow-right-circle:{ align=right }](4-train.md)
