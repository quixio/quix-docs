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
7. Click `Save as Application`.
8. In the project view click on `main.py` to edit it.
9. Replace all the code in `main.py` with the following:

    ```python
    TODO
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

You've now completed the Quix Tour. You've built a simple but complete stream processing pipeline. 

## Next steps

To continue your Quix learning journey, you may want to consider some of the following resources:

* [Quix Streams docs](../../quix-streams/quix-streams-intro.md)
* [InfluxDB alerting tutorial](../../tutorials/influxdb-alerting/overview.md)
