# Alerting

It is possible to add alerting into your InfluxDB processing pipelines using a variety of tools such as:

* PagerDuty
* Vonage APIs
* Twilio
* Pushover

You can write Python code to examine data, detect anomalies, or check thresholds. 

The alerting can be placed in the inbound pipeline, where you can detect issues in the real-time streaming data. You could also query data from InfluxDB, and check for certain conditions in the outbound pipeline, generating alerts as required. This is demonstrated in detail in the [in-depth tutorial on using Quix, Quix Streams, InfluxDB, and PagerDuty](../../../tutorials/influxdb-alerting/overview.md).

## Next steps

* In-depth tutorial that takes you through setting up pipelines using Quix, Quix Streams, InfluxDB, and [PagerDuty for alerting](../../../tutorials/influxdb-alerting/overview.md).
* Quix Cloud Tour demonstrates [building alerting](../../../quix-cloud/quixtour/serve-sms.md) from scratch with the Vonage APIs, which are simple to use.
* Currency alerting tutorial demonstrates using [Pushover to implement alerting](../../../tutorials/currency-alerting/currency-alerting.md#setting-up-the-pushover-destination).
* The Predictive maintrenance project tutorial uses the Pushover service for [sending alerts](../../../tutorials/predictive-maintenance/phone-alerts.md).
