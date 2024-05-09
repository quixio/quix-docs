# 👩‍🔬 Lab - Add a new service

!!! danger

    This tutorial is out of date. Please check the [tutorials overview](../overview.md) for our latest tutorials.

In this lab you use everything you've learned so far, to add a new service to the pipeline. Specifically, you add a service to publish the number of cars captured by the TfL cams to a new topic. You will then observe the number of cars change in real time using the waveform view of the Quix Data Explorer. This service could be useful if you want to easily store the number of cars, or perhaps create an alarm if the number of cars rises above a certain threshold. This service is a simple example of filtering - where you filter out data you are not interested in for subsequent processing.

You develop this service on a feature branch, and then you create a PR to merge your new feature into the tutorial branch. This is a common pattern for development - you can test your new service on the feature branch, and then test again, before final integration into the production `main` branch.

## Create an environment

To create a new environment (and branch):

1. Click `+ New environment` to create a new environment (note, your screen will look slightly different to the one shown here):

    ![New environment](./images/new-environment.png)

2. Create a new environment called `Cars Only`.

3. Create a new branch called `cars-only`. To do this, from the branch dropdown click `+ New branch` which displays the New branch dialog.

    !!! important

        Make sure you branch from the `tutorial` branch, not `main`, as you are going to merge your changes back to the `tutorial` branch.

4. Complete creation of the environment using the default options.

5. On the projects screen, click your newly created environment, `Cars Only`.

## Sync the environment

You now see that the Quix environment is out of sync with the Git repository. You need to synchronize the Quix view of the environment, with that stored in the repository. 

To synchronize Quix with the repository:

1. Click `Sync environment`:

    ![Sync environment](./images/sync-environment.png)

    The sync environment dialog is displayed, showing you the changes that are to be made to the `quix.yaml` file, which is the configuration file that defines the pipeline.

2. Click `Sync environment`, and then `Go to pipeline`. 

    In the pipeline view, you see the services building. Ensure all services are "Running" before continuing.

## Add a transform

You now add a transform to the output of the stream merge service. This is a convenient point, as the multiple streams are now merged to one stream (all cameras are merged into one stream), and this will make viewing the number of cars easier in the waveform view of the data explorer, as there is only one stream to examine.

To create the transform:

1. Click the small `+` on the output of the stream merge service, and then select `Transformation` from the dropdown list.

2. Click `Preview code` for the `Starter transformation` in the Code Samples view.

3. Click `Edit code`, and enter an application name of `Cars Only` and leave the path as the default, then click `Save`.

4. Replace the complete `main.py` code with the following:

    ``` python
    import quixstreams as qx
    import os
    import pandas as pd
    import datetime

    client = qx.QuixStreamingClient()

    topic_consumer = client.get_topic_consumer(os.environ["input"], consumer_group = "empty-transformation")
    topic_producer = client.get_topic_producer(os.environ["output"])

    def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):
        d = df.to_dict()
        if 'car' in d:
            # Create a clean data frame
            data = qx.TimeseriesData()
            data.add_timestamp(datetime.datetime.utcnow()) \
                .add_value("Cars", d['car'][0])
        
            stream_producer = topic_producer.get_or_create_stream(stream_id = stream_consumer.stream_id)
            stream_producer.timeseries.buffer.publish(data)

    def on_stream_received_handler(stream_consumer: qx.StreamConsumer):
        stream_consumer.timeseries.on_dataframe_received = on_dataframe_received_handler

    # subscribe to new streams being received
    topic_consumer.on_stream_received = on_stream_received_handler

    print("Listening to streams. Press CTRL-C to exit.")

    # Handle termination signals and provide a graceful exit
    qx.App.run()
    ```

    ??? example "Understand the code"

        The code is a little different to the starter transform. The handler for event data has been removed, along with its registration code, as you are only interested in time series data in this transform. This time series data is received in a pandas dataframe format. For ease of manipulation this is converted to a Python dictionary, so the car data can be simply extracted.

        If you want to check the format of the message processed here, you can use the message view for the stream merge service output, or the Data Explorer message view, to examine it in great detail. You will see something similar to the following:

        ``` json
        {
            "Epoch": 0,
            "Timestamps": [
                1694788651367069200
            ],
            "NumericValues": {
                "truck": [
                1
                ],
                "car": [
                3
                ],
                "lat": [
                51.55164
                ],
                "lon": [
                -0.01853
                ],
                "delta": [
                -0.43226194381713867
                ]
            },
            "StringValues": {
                "image": [
                "iVBOR/snip/QmCC"
                ]
            },
            "BinaryValues": {},
            "TagValues": {
                "parent_streamId": [
                "JamCams_00002.00820"
                ]
            }
        }
        ```

        A new pandas dataframe is then created, as the data published to the output topic is only going to consist of a timestamp and the number of cars on it. This is an example of simple filtering. 

        Once prepared, the dataframe is then published to the output topic.

5. Edit environment variables, so that the input topic is `image-processed-merged` and the output topic is a new topic called `cars-only`, as shown in the following screenshot:

    ![Edit environment variables](./images/edit-env-variables.png)

    !!! tip

        These environment variables are used by the code. For example, the input topic is read by the code with the Python code `os.environ["input"]`.

6. Click the tag icon (see screenshot), and give the code a tag such as `cars-only-v1`:

    ![Tag icon](./images/tag.png)

7. Click the `Deploy` button and select the version tag `cars-only-v1` from the `Version tag` dropdown, and leaving all other values at their defaults, click `Deploy`.

## View the data in real time

You now use the Quix Data Explorer to view the cars data in real time.

1. In the left-hand navigation, click `Data explorer`.

    !!! tip

        While this is the most direct way to access the Data Explorer, it's not the only way. You learn about other methods in other tutorials. You can, for example, click on the topic you want to view in the pipeline view, and then select `View live data` - that takes you into the Data Explorer.

2. Click `Live data` and make sure the `cars-only` topic is selected.

3. Check the `image-feed` stream checkbox, and also the `Cars` parameter data checkbox.

4. Make sure Waveform view is selected. 

    !!! tip

        If no data is visible, stop and start the TFL Camera Feed service, as it may be sleeping.

    You see the waveform showing the number of cars detected:

    ![Cars waveform](./images/cars-waveform.png)

## Merge the feature

Once you are sure that the changes on your feature branch are tested, you can then merge your changes onto the tutorial branch. Here your changes undergo further tests before finally being merged into production. 

To merge your feature branch, `cars-only` into `tutorial`:

1. Select `Merge request` from the menu as shown:

    ![Merge request menu](./images/merge-request-menu.png)

2. In the `Merge request` dialog, set the `cars-only` branch to merge into the `tutorial` branch.

You are going to create a pull request, rather than perform a direct merge. This enables you to have the PR reviewed in GitHub (or other Git provider). You are also going to do a squash and merge, as much of the feature branch history is not required.

To create the pull request:

1. Click `Create pull request`. You are taken to your Git provider, in this case GitHub.

2. Click the `Pull request` button.

3. Add your description, and then click `Create pull request`.

4. Get your PR reviewed and approved. Then squash and merge the commits:

    ![Squash and merge](./images/squash-and-merge.png)

    You can replace the prefilled description by something more succinct. Then click `Confirm squash and merge`.

    !!! tip

        You can just merge, you don't have to squash and merge. You would then retain the complete commit history for your service while it was being developed. Squash and merge is used in this case by way of example, as the commit messages generated while the service was being developed were deemed to be not useful in this case.

## Resync the environment

You have now merged your new feature into the `tutorial` branch in the Git repository. Your Quix view in the Tutorial environment is now out of sync with the Git repository. If you click on your Tutorial environment in Quix, you'll see it is now a commit (the merge commit) behind.

You now need to make sure your Tutorial environment in Quix is synchronized with the Git repository. To do this:

1. Click on `Sync environment`. The `Sync environment` dialog is displayed.

2. Review the changes and click `Sync environment`.

3. Click `Go to pipeline`.

Your new service will build and start in the Tutorial environment, where you can now carry out further testing. When you are satisfied this feature can be released to production, then you would repeat the previous process to merge your changes to Production `main`.

## 🏃‍♀️ Next step

[Part 8 - Summary :material-arrow-right-circle:{ align=right }](summary.md)
 
