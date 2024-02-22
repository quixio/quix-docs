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

    ```python
    TODO
    ```

11. Tag the project as `process-v1` and deploy as a service (watch the [video](#watch-the-video) if you're not sure how to do this).
12. Monitor the logs for the deployed process.

## Generate a CPU spike

You can generate a CPU spike by starting up several large applications. In the logs you will see a message similar to the following when a spike is detected:

```
CPU spike of 71% detected!
```

## 🏃‍♀️ Next step

Create a destination to log events and send a notification SMS!

[Serve your data :material-arrow-right-circle:{ align=right }](./serve-sms.md)
