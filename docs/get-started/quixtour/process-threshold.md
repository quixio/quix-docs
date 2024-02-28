# Process - threshold detection

In this part of the tour you'll learn how to create a transform. The transform detects if CPU load exceeds a certain threshold, and if so, sends a dataframe to its output topic.

## Create the transform

To create the threshold detection transform:

1. In your `Develop` environment, click on `Code Samples` in the main left-hand navigation. 
2. Select the `Python`, `Transformation`, and `Basic templates` filters.
3. For `Starter transformation` click `Preview code`.
4. Click `Edit code`.
5. Name the transform "CPU Threshold".
6. Select the input topic `cpu-load`.
7. For the output topic, add a new topic called `cpu-spike`.
8. In the project view click on `main.py` to edit it.
9. Replace all the code in `main.py` with the following:

    ``` python
    from quixstreams import Application
    import os

    app = Application.Quix("threshold-transform", auto_offset_reset="latest")
    input_topic = app.topic(os.environ["input"], value_deserializer='json')
    output_topic = app.topic(os.environ["output"], value_serializer='json')

    sdf = app.dataframe(input_topic)
    sdf = sdf[sdf["cpu_load"] > 20]
    sdf = sdf.update(lambda row: print(row))
    sdf = sdf.to_topic(output_topic)

    if __name__ == "__main__":
        app.run(sdf)
    ```

11. Tag the project as `process-v1` and deploy as a service.
12. Monitor the logs for the deployed process.

    ??? example "Understand the code"

        If CPU load exceeds the threshold the row is published to the output topic, for further processing in the next stage of the pipeline. 


## Generate a CPU spike

You can generate a CPU spike by starting up several CPU intensive applications. 

## 🏃‍♀️ Next step

Create a destination to log events and send a notification SMS!

[Serve your data :material-arrow-right-circle:{ align=right }](./serve-sms.md)
