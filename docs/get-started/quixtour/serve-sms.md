# Serve - send an SMS alert

In this part of the tour you'll learn how to create a simple destination. This destination sends an SMS alert to a systems administrator when a CPU spike data frame arrives.

## Prerequisites

If you've completed this tutorial so far, you should have all the prerequisites already installed.

**Optionally:** You can sign up for a [free Vonage account](https://developer.vonage.com/sign-up), to be able to send an SMS. If you would like to try this, simply set `send_sms_bool = True` in the `main.py` code you create later, to switch this feature **on**.

## Create the destination

To create the SMS alert destination:

1. In your `Develop` environment, click on `Code Samples` in the main left-hand navigation. 
2. Select the `Python`, `Destination`, and `Basic templates` filters.
3. For `Starter destination` click `Preview code`.
4. Click `Edit code`.
5. Name the destination "CPU Alert SMS".
6. Select the input topic `cpu-spike`.
7. In the project view click on `main.py` to edit it.
8. Replace all the code in `main.py` with the following:

    ``` python
    from quixstreams import Application
    import os

    send_sms_bool = False # Set this to True if you want to actually send an SMS (you'll need a free Vonage account)
    if send_sms_bool:
        import vonage # add vonage module to requirements.txt to pip install it
        vonage_key = os.environ["VONAGE_API_KEY"]
        vonage_secret = os.environ["VONAGE_API_SECRET"]
        to_number = os.environ["TO_NUMBER"]

        client = vonage.Client(key=vonage_key, secret=vonage_secret)
        sms = vonage.Sms(client)

    # function to send an SMS
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

    def send_alert(row):
        cpu_load = row['cpu_load']
        print("Warning! CPU spike of {} detected.".format(cpu_load))
        msg = f"Warning! CPU spike of {cpu_load} detected."
        if send_sms_bool is True:
            send_sms(msg)    

    app = Application.Quix("sms-alert-destination", auto_offset_reset = "latest")
    input_topic = app.topic(os.environ["input"])
    
    sdf = app.dataframe(input_topic)
    sdf = sdf.update(send_alert)
    sdf = sdf.update(lambda row: print(row))

    if __name__ == "__main__":
        app.run(sdf)    
    ```

## Send an SMS (optional)

This section is **optional**. 

If you want to send an alert SMS follow these steps:

1. Change the variable `send_sms_bool` to `True` in your `main.py`.
2. In the `Environment variables` panel, click `+ Add`. The `Add Variable` dialog is displayed. 
3. Complete the information for the following environment variables (you obtain these from your Vonage developer dashboard):

    | Variable name | Variable type |
    |----|----|
    | VONAGE_API_KEY | `secret` |
    | VONAGE_API_SECRET | `secret` |
    | TO_NUMBER | `secret` |
               
    See also [how to add environment variables](../../deploy/environment-variables.md).

4. You now need to add the `vonage` module to the `requirements.txt` file in your project. Click to open it and add a line for `vonage`. This ensures the module is built into the deployment.

## Tag and deploy your SMS alert service

You can now tag and deploy your code:

1. Tag the project as `sms-v1` and deploy as a service (watch the video if you're not sure how to do this).
2. Monitor the logs for the deployed process.

## Generate an alert

Again generate a CPU spike by opening several large applications on your laptop. If you have SMS alert enabled, you'll receive an SMS. If not, you can check the logs.

## Conclusion

You've now completed the Quix Tour. You've built a simple but complete stream processing pipeline. You can resuse the transform code, with some modifications, in your own projects. With a small amount of work, the SMS service you created could be turned into a general purpose SMS alaerting module, using the Vonage APIs. It could also be adapted to build out other alerting services, such as [PagerDuty](../../tutorials/influxdb-alerting/add-alerting.md).

## Next steps

To continue your Quix learning journey, you may want to consider some of the following resources:

* [Quix Streams docs](../../quix-streams/quix-streams-intro.md)
* [InfluxDB alerting tutorial](../../tutorials/influxdb-alerting/overview.md)
