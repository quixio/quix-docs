# Predictive maintenance

In this tutorial you learn about a project template that demonstrates real-time predictive analytics. It simulates three temperature sensors on a fleet of 3D printers. It predicts temperature for the printers using the `scikit-learn` library.

This tutorial uses the [Quix predictive maintenance template project](https://github.com/quixio/template-predictive-maintenance){target=_blank}.

![Predictive maintenance pipeline](./images/predictive-maintenance-pipeline.png)

You'll fork the complete project from GitHub, and then create a Quix project from the forked repo, so you have a copy of the full application code running in your Quix account. You then examine the data flow through the project's pipeline, using tools provided by Quix.

<div>
<a class="md-button md-button--primary" href="https://portal.platform.quix.io/pipeline?token=pat-7381f57aaee34adf95382c3a60df6306&workspace=demo-predictivemaintenance-production" target="_blank" style="margin-right:.5rem;">See the project running in Quix</a>

<a class="md-button md-button" href="https://dash-demo-predictivemaintenance-production.deployments.quix.io/?_ga=2.114191879.1628320822.1701679251-1544698923.1686060578" target="_blank" style="margin-right:.5rem;">See the deployed project</a>

<br/>
</div>

## Technologies used

Some of the technologies used by this template project are listed here.

**Infrastructure:** 

* [Quix](https://quix.io/){target=_blank}
* [Docker](https://www.docker.com/){target=_blank}
* [Kubernetes](https://kubernetes.io/){target=_blank}

**Backend:** 

* [Aiven Kafka](https://aiven.io/kafka){target=_blank}
* [Quix Streams](https://github.com/quixio/quix-streams){target=_blank}
* [scikit-learn](https://scikit-learn.org/stable/){target=_blank}
* [InfluxDB](https://www.influxdata.com/products/influxdb-cloud/serverless/){target=_blank}

**Frontend:** 

* [Angular](https://angular.io/){target=_blank}
* [Typescript](https://www.typescriptlang.org/){target=_blank}
* [Microsoft SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/){target=_blank}

## GitHub repository

The complete code for this project can be found in the [Quix GitHub repository](https://github.com/quixio/template-predictive-maintenance){target="_blank"}.

## Getting help

If you need any assistance while following the tutorial, we're here to help in the [Quix Community](https://quix.io/slack-invite){target="_blank"}.

## Prerequisites

To get started make sure you have a [free Quix account](https://portal.platform.quix.ai/self-sign-up){target="_blank"}.

### InfluxDB

You'll need a [free InfluxDB](https://www.influxdata.com/products/influxdb-cloud/serverless/){target=_blank} account to try this out in your Quix account.

### Pushover 

If you want to implement the optional lab task to add phone alerts to your pipeline, you will need to sign up for a free [Pushover](https://pushover.net/signup){target=_blank} account. 

Enter your details, and click `Signup`. You will receive a welcome email, and you can log in to Pushover to retrieve your user key and generate an API token. 

This enables you to send notifications to your phone. 

Install the Pushover mobile app from the [Apple App store](https://apps.apple.com/us/app/pushover-notifications/id506088175){target=_blank} or [Google Play](https://play.google.com/store/apps/details?id=net.superblock.pushover&hl=en){target=_blank}.

### Git provider

You also need to have a Git account. This could be GitHub, Bitbucket, GitLab, or any other Git provider you are familar with, and that supports SSH keys. The simplest option is to create a free [GitHub account](){target=_blank}.

!!! tip

    While this tutorial uses an external Git account, Quix can also provide a Quix-hosted Git solution using Gitea for your own projects. You can watch a video on [how to create a project using Quix-hosted Git](https://www.loom.com/share/b4488be244834333aec56e1a35faf4db?sid=a9aa124a-a2b0-45f1-a756-11b4395d0efc){target=_blank}.

## The pipeline

There are several *main* stages in the [pipeline](https://portal.platform.quix.io/pipeline?token=pat-7381f57aaee34adf95382c3a60df6306&workspace=demo-predictivemaintenance-production){target=_blank}:

1. *Data generator* - generates the temperature data for a fleet of 3D printers.
2. *Downsampling* - downsamples data from one second to one minute.
3. *Forecast* - uses the `scikit-learn`library to predict 3D printer temperature.
4. *Alerts* - triggers alerts if thresholds are exceeded for current temperature data, and forecast data.  
5. *InfluxDB - raw data* - writes the downsampled data to InfluxDB for permanent storage.
6. *InfluxDB - alerts* - writes the alert messages to InfluxDB for permanent storage.
7. *Printers dashboard* - dipslays the temperature data for the specified data, including predicted ambient (enclosure) temperature.

More details are provided on all these services later in the tutorial.

## Topics

The following Kafka topics are present in the project:

| Topic | Description | Producer service | Consumer service(s)
|---|---|---|---|
| `3d-printer-data` | The generated 3D printer temperature data  | Data generator | Downsampling, Printers dahsboard |
| `downsampled-3d-printer-data` | Down samples the data from 1 second to 1 minute | Downsampling | Forecast, InfluxDB raw data |
| `forecast` | Forecast temperature | Forecast | Alert, Printers dashboard |
| `alerts` | Temperature alert | Alert | Printers dashboard, InfluxDB alerts |

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. [Get the project](get-project.md) - you get the project up and running in your Quix account. 

2. [Data generator](./data-generator.md) - you explore the data generator service, including generated message format and application code.

3. [Downsampling](./downsampling.md) - you see how data is downsampled from 1 second to 1 minute using buffering and aggregation.

4. [Forecast](./forecast-service.md) - you learn that the `scikit-learn` library is used to make a prediction of ambient temperature using a linear regression algorithm.

5. [Alerts](./alert-service.md) - you learn how this service generates alerts based on thresholds held in environment variables.

6. [InfluxDB - raw data](./influxdb-raw-data.md) - you see how InfluxDB is used to permanently store downsampled printer temperature data.

7. [InfluxDB - alerts](./influxdb-alerts.md) - you see how InfluxDB is used to permanently store alert messages.

8. [Printers dashboard](./printers-dashboard.md) - you learn how Streaming Reader API can enable your web app to subscribe to messages published to Quix topics. 

9. [Lab: add phone alerts](./phone-alerts.md) - you add a phone alerts service to your pipeline, using the Pushover service, and the Quix ready-to-use Pushover connector.

10. [Summary](summary.md) - in this concluding part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about Quix.

## 🏃‍♀️ Next step

[Part 1 - Get the project :material-arrow-right-circle:{ align=right }](get-project.md)
