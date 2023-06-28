# Serve - send an SMS alert

In this part of the tour you'll learn how to create a simple destination. This destination sends an SMS alert to a systems administrator when a CPU spike data frame arrives.

## Watch the video

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/0281bd6ca44247eca82a3c811d71a999?sid=37afb2f6-451d-4296-8996-a88d3fe53bda" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Prerequisites

**Optionally:** You can sign up for a [free Vonage account](https://developer.vonage.com/sign-up), to be able to send an SMS. If you would like to try this, simply set `send_sms_bool = True` in the `main.py` code you create later, to switch this feature **on**.

## Create the destination

To create the SMS alert destination:

1. Click on `Code Samples` in the main left-hand navigation. 
2. Select the `Python`, `Destination`, and `Basic templates` filters.
3. For `Starter destination` click `Preview code`.
4. Click `Edit code`.
5. Name the destination "CPU Alert SMS".
6. Select the input topic `cpu-spike`.
7. Click `Save as Project`.
8. In the project view click on `main.py` to edit it.
9. Replace all the code in `main.py` with the following:

    ```python
    import quixstreams as qx
    import os
    import pandas as pd
    import vonage # add vonage to requirements.txt to pip install it
    from dotenv import load_dotenv # add python-dotenv to requirement.txt

    load_dotenv()
    vonage_key = os.getenv("VONAGE_API_KEY")
    vonage_secret = os.getenv("VONAGE_API_SECRET")
    to_number = os.getenv("TO_NUMBER")
    send_sms_bool = False # Set this to True if you want to actually send an SMS (you'll need a free Vonage account)

    client = vonage.Client(key=vonage_key, secret=vonage_secret)
    sms = vonage.Sms(client)

    def send_sms(message):
        print("Sending SMS message to admin...")
        responseData = sms.send_message(
            {
                "from": "Vonage APIs",
                "to": to_number,
                "text": message,
            }
        )

        if responseData["messages"][0]["status"] == "0":
            print("Message sent successfully. Admin Alerted.")
        else:
            print(f"Message failed with error: {responseData['messages'][0]['error-text']}")
        return

    client = qx.QuixStreamingClient()

    topic_consumer = client.get_topic_consumer(topic_id_or_name = os.environ["input"],
                                            consumer_group = "empty-destination")

    def on_dataframe_received_handler(stream_consumer: qx.StreamConsumer, df: pd.DataFrame):
        print('Spike dataframe received!')
        cpu_load = df['CPU_Load'][0]
        msg = f"Warning! CPU spike of {cpu_load} detected."
        if send_sms_bool is True:
            send_sms(msg)

    def on_stream_received_handler(stream_consumer: qx.StreamConsumer):
        stream_consumer.timeseries.on_dataframe_received = on_dataframe_received_handler

    topic_consumer.on_stream_received = on_stream_received_handler
    print("Listening to streams. Press CTRL-C to exit.")
    qx.App.run()
    ```

11. Click the add file icon to add a new file to your project - name it `.env`.
12. Add the following to the file:

    ```
    TO_NUMBER=
    VONAGE_API_KEY=
    VONAGE_API_SECRET=
    ```

    !!! tip

        While this example shows you how to use a `.env` file, you could also create environment variables in Quix, and use those rather than load your variables from the `.env` file. To use this approach, open the code view for your service, and in the `Environment variables` panel, click `+ Add`. The `Add Variable` dialog is displayed. Complete the information for the environment variable. You can select properties such as `Text Hidden` for variables that represent API secrets, keys, and passwords. If necessary, you can also make a variable required.
        
        Once the variable has been created, you can then access the variable in your code using `os.environ["variable"]`. For example, to access the environment variable `VONAGE_API_SECRET`, your code would be `vonage_secret = os.environ["VONAGE_API_SECRET"]`.

        See also [how to add environment variables](../how-to/environment-variables.md).

13. If you've enabled the SMS alert feature, then paste your information into the `.env` file (you can get all of this information from your Vonage API dashboard). If you don't want to use this feature, just leave the file as shown.
14. You now need to add your modules to the `requirements.txt` file in your project. Click to open it and add lines for `vonage` and `python-dotenv`. This ensures these modules are built into the deployment.
15. Tag the project as `v1` and deploy as a service (watch the video if you're not sure how to do this).
16. Monitor the logs for the deployed process.

## Generate an alert

Again generate a CPU spike by opening several large applications on your laptop. If you have SMS alert enabled, you'll receive an SMS. If not, you can check the logs.

You can watch a video that shows how to test your service:

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/5b1ac961df2b4c2bae851979050a88ac?sid=250be5ce-8e0c-482a-8c60-b776ab38b95f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Next steps

You've now completed the Quix Tour. You've built a simple but complete stream processing pipeline. To continue your Quix learning journey, you may want to consider some of the following resources:

* [Real-time event detection tutorial](../tutorials/event-detection/index.md)
* [Real-time Machine Learning (ML) predictions tutorial](../tutorials/data-science/index.md)
* [Quix Streams docs](../../client-library-intro.md)
