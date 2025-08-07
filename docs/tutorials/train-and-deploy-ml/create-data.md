# Get your data

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

!!! danger "Legacy feature"

	This feature is not available to new users. However, legacy users may still have access to this functionality.

In this part of the tutorial you learn how to obtain some real-time data to work with in the rest of the tutorial. You use a demo data source that generates Formula 1 race car data from a computer game. You use this data as the basis to build a ML model to predict braking patterns.

## Create a persisted topic

To make things a little easier, first create a **persisted topic** to receive the generated data. 

1. Log in to Quix. 

2. Click `Topics` on the left-hand menu.

3. Click the `Add new`, which is located top right.

4. Enter a topic name of `f1-data`.

5. Leave other values in the `Create new topic` dialog at their defaults.

6. Click `Done`. Now wait while the topic is created for you.


## Generate data from the demo data source

Now generate the actual data for use later in the tutorial by completing the following steps:

1. Click `Code Samples` on the left-hand sidebar.

2. Find the `Demo Data` source. This service streams F1 Telemetry data into a topic from a recorded game session.

3. Click the `Deploy` button in the `Demo Data` panel.

4. You can leave `Name` as the default value.

5. Make sure `Topic` is set to `f1-data` and then click `Deploy`.

Once this service is deployed it will run as a [job](../../kb/glossary.md#job) and generate real-time data to the `f1-data`. 

This data is retrieved later in this tutorial using Python code generated for you by Quix.

[Import data into Jupyter Notebook :material-arrow-right-circle:{ align=right }](./import-data.md)
