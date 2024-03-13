# Computer vision

!!! warning

    This tutorial uses a template that is implemented with a deprecated version of Quix Streams (v1.5). For a tutorial that uses [Quix Streams v2](https://quix.io/docs/quix-streams/introduction.html) read the [InfluxDB alerting tutorial](../influxdb-alerting/overview.md).

In this tutorial you learn about a real-time computer vision application, using a [Quix template project](https://github.com/quixio/computer-vision-demo){target=_blank}.

![Computer vision pipeline](../../images/project-templates/computer-vision-pipeline.png)

The project uses the Transport for London (TfL) traffic cameras, known as Jam Cams, as the video input. The [YOLO v8](https://docs.ultralytics.com/) machine learning model is used to identify various objects such as types of vehicles. Additional services count the vehicles and finally the data is displayed on a map which is part of the web UI that has been created for this project. 

You'll fork the complete project from GitHub, and then create a Quix project from the forked repo, so you have a copy of the full application code running in your Quix account. You then examine the data flow through the project's pipeline, using tools provided by Quix.

<div>
<a class="md-button md-button--primary" href="https://portal.platform.quix.io/pipeline?workspace=demo-computervisiondemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg" target="_blank" style="margin-right:.5rem;">See the project running in Quix</a>

<a class="md-button md-button" href="https://app-demo-computervisiondemo-prod.deployments.quix.io/" target="_blank" style="margin-right:.5rem;">See the deployed project</a>
<br/>
</div>

## Technologies used

Some of the technologies used by this template project are listed here.

**Infrastructure:** 

* [Quix](https://quix.io/){target=_blank}
* [Docker](https://www.docker.com/){target=_blank}
* [Kubernetes](https://kubernetes.io/){target=_blank}

**Backend:** 

* [Confluent Cloud](https://www.confluent.io/lp/confluent-cloud/){target=_blank}
* [Quix Streams](https://github.com/quixio/quix-streams){target=_blank}
* [Flask](https://flask.palletsprojects.com/en/2.3.x/#){target=_blank}
* [pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html){target=_blank}

**Video capture:**

* [TfL API](https://api-portal.tfl.gov.uk){target=_blank}
* [OpenCV](https://opencv.org/){target=_blank}

**Object detection:**

* [YOLOv8](https://github.com/ultralytics/ultralytics){target=_blank}

**Frontend:** 

* [Angular](https://angular.io/){target=_blank}
* [Typescript](https://www.typescriptlang.org/){target=_blank}
* [Microsoft SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/){target=_blank}
* [Google Maps](https://developers.google.com/maps){target=_blank}

## GitHub repository

The complete code for this project can be found in the [Quix GitHub repository](https://github.com/quixio/computer-vision-demo){target="_blank"}.

## Getting help

If you need any assistance while following the tutorial, we're here to help in the [Quix Community](https://quix.io/slack-invite){target="_blank"}.

## Prerequisites

To get started make sure you have a [free Quix account](https://portal.platform.quix.io/self-sign-up).

### TfL account and API key

You'll also need a [free TfL account](https://api-portal.tfl.gov.uk){target=_blank}. 

Follow these steps to locate your TfL API key:

  1. Register for a [free TfL account](https://api-portal.tfl.gov.uk){target=_blank}.

  2. Login and click the `Products` menu item.

  3. You should have one product to choose from: `500 Requests per min.`

  4. Click `500 Requests per min.`

  5. Enter a name for your subscription into the box, for example "QuixFeed", and click `Register`.

  6. You can now find your API Keys in the profile page.

Later, you'll need to configure the TfL service with your own TfL API key.

### Git provider

You also need to have a Git account. This could be GitHub, Bitbucket, GitLab, or any other Git provider you are familar with, and that supports SSH keys. The simplest option is to create a free [GitHub account](){target=_blank}.

!!! tip

    While this tutorial uses an external Git account, Quix can also provide a Quix-hosted Git solution using Gitea for your own projects. You can watch a video on [how to create a project using Quix-hosted Git](https://www.loom.com/share/b4488be244834333aec56e1a35faf4db?sid=a9aa124a-a2b0-45f1-a756-11b4395d0efc){target=_blank}.

??? "Transcript"

  0:01 Hi there, welcome to this video on creating a quick project. I should point out before I get into this video that I'm using the beta development environment at Quix and so what you see may be slightly different when you're testing Quicks.

  0:21 Okay, so having said that I'll get straight into creating a new project. You can see this button over here. I'm going to click that to create a new project.

  0:33 The new workflow in Quix starts with creating a project. Everything is done inside a project. Generally speaking, I'm simplifying it quite a lot.

  0:44 A project corresponds to a Git repository. So everything that you create, including your pipeline configuration and so on, will be stored in a Git repository.

  0:59 So I'll give my project a name and I'll call it video project. And the first thing I need to do is specify where this Git repository is going to be.

  1:12 Now, the simplest option is to get quick to do all the work for you and just create the Git repository.

  1:21 And the second thing I need to do is a product called gitty to host the Git repository. So we can do that for you.

  1:27 It all happens in the background. And as you'll see in later videos, you have complete control about what happens in that repository.

  1:37 You can review pull requests and do, merges and all of those normal things that you would do in a Git workflow.

  1:47 The other option is to use an external provider. So for example, you could use GitLab, GitHub, Bitbucket and so on.

  1:57 You can use any provider that supports the use of an SS. H key. For the purposes of this video, I'm going to keep it simple for now and just use the Quix manage Git.

  2:11 So I'm now ready to create the project. Now every project will have at least one environment and usually several environments.

  2:28 So what is an environment? An environment roughly corresponds to a branch in your Git repository, but there's a specific for an environment.

  2:41 As well as you'll see as we go through this dialogue. But the first thing we need to do is give our environment a name.

  2:52 So I'm going to name it. Based on the typical development workflow, so usually we'd have production. Branch or environment and you might have staging and development.

  3:09 So I'm going to create the production environment and as I was saying earlier, that's going to roughly correspond to a branch.

  3:17 So in this next section, we're going to specify the, ,branch that this environment corresponds to and I want production to correspond to the main branch.

  3:30 And so there's nothing really I need to do here. I could create a new branch if I wanted to, ,but I want to use the default branch which is main.

  3:41 The other, thing that I can do here is protect this branch and what that means is that prevents developers from merging or committing content, making changes directly to the main branch.

  3:58 In order to change the main branch you'll have to raise, a pull request, a git pull request and that would have to be reviewed and approved and then merged in the usual way.

  4:13 So we definitely want that because for production we don't want changes being made directly. So I'm protecting that and you'll, We'll see later how we go about taking changes that we've made and say the develop branch or the dev branch and merge those into the main branch.

  4:32 I'll cover that in another video. So for now let's just click continue. Now for each environment that you create you can specify how you want to host Kafka.

  4:45 Now as you probably know Quix uses Kafka as its broker. And you have several options here. You if you want the simplest option and most convenient option is to just let Quix do all the hard work for you.

  5:01 We will create them. Kafka broker and you don't need to do any configuration. We just do it all for you.

  5:08 We make sure that scales nicely as well. We use Kubernetes and you know as I say it's the least. It's it's the quickest option especially.

  5:22 If you're testing things out, but there are other options as you can see here. You can use your own self hosted Kafka or you can connect to a Confluent Cloud and we'll cover those options in later videos.

  5:39 So for now, I'm just going to go with the simplest option and click. Continue. The other thing that you'll need to do here is specify the storage option for the environment.

  5:51 So the key thing to point out at this point is we were talking about environments as corresponding to a branch in get.

  6:02 That is true, but it's also these other things like the Kafka options that you select and also the storage options.

  6:11 Now the storage option that you're selecting here is for any data that you might possess. So in Quix it's possible to persist the data that's published to topics.

  6:27 You can store that using our something called the data catalog and if you store, if you persist your topics and store the messages that are in the topics.

  6:43 In our storage facilities, then there's a small charge associated with that. However, you don't have to persist topics. You can use external database solutions for storage of your data.

  7:01 So you can use. Some of our standard connectors or even write your own connector to connect to more or less any database technology that you want.

  7:11 The other thing that's stored here is metadata associated with messages. So for now, I'm just going to choose the standard option and create.

  7:23 The environment. Okay, that's it. We'll wait for the project and the environment to be created. And then we'll have a look at what's in there in subsequent videos.

  7:42 Okay, thanks for watching. And see you in the next video.

If you want to use the Quix AWS S3 service (optional), you'll need to provide your credentials for accessing AWS S3.

## The pipeline

There are several *main* stages in the [pipeline](https://portal.platform.quix.io/pipeline?workspace=demo-computervisiondemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg){target=_blank}:

1. *TfL camera feed* - TfL Camera feed or "Jam Cams". This service retrieves the raw data from the TfL API endpoint. A list of all JamCams is retrieved, along with the camera data. The camera data contains a link to a video clip from the camera. These video clips are hosted by TfL in MP4 format on AWS S3. A stream is created for each camera, and the camera data published to this stream. Using multiple streams in this way enables a solution capable of horizontal scaling, through additional topic partitions and, optionally, replicated services in a consumer group. Once the camera list has been scanned, the service sleeps for a configurable amount of time, and then repeats the previous code. This reduces the load, and also means the API limit of 500 requests per minute is not exceeded. Messages are passed to the frame grabber.

2. *TfL traffic camera frame grabber* - this service grabs frames from a TfL video file (MP4 format) at the rate specified. By default the grabber extracts one frame every 100 frames, which is typically one per five seconds of video. Messages are passed to the object detection service.

3. *Object detection* - this service uses the YOLOv8 computer vision algorthm to detect objects within a given frame.

4. *Stream merge* - merges the separate data streams (one for each camera) back into one, prior to sending to the UI.

5. *Web UI* - a UI that displays: frames with the objects that have been identified, and a map with a count of objects at each camera's location. The web UI is a web client app that uses the [Quix Streaming Reader API](../../apis/streaming-reader-api/overview.md), to read data from a Quix topic.

There are also some additional services in the pipeline:

1. *Cam vehicles* - calculates the total vehicles, where vehicle is defined as one of: car, 'bus', 'truck', 'motorbike'. This number is published to its utput topic. The *Max vehicle window* service subscribes to this topic.

2. *Max vehicle window* - calculates the total vehicles over a time window of one day. This service publishes messages its output topic. 

3. *Data buffer* - this provides a one second data buffer. This helps reduce load on the Data API service.

4. *Data API* - this REST API service provides the following endpoints: 

    * `max_vehicles` - last known maximum vehicle count for each camera. 24 hour rolling window.
    * `detected_objects` - output from the computer vision service for all cameras. excludes images
    * `vehicles` - the last known vehicle count for each camera
    * `image` - the last image from the specified camera

    This API is called by the UI to obtain useful data.

5. *S3* - stores objects in Amazon Web Services (AWS) S3. This service enables you to persist any data or results you might like to keep more permanently.

More details are provided on all these services later in the tutorial.

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. [Get the project](get-project.md) - you get the project up and running in your Quix account. 

2. [TfL camera feed](tfl-camera-feed.md) service. You examine the code and then see how to view the message data format used in the service, in real time.

3. [Frame grabber](tfl-frame-grabber.md) service. You examine the code and then see how to view the message data format used in the service, in real time.

4. [Object detection](object-detection.md) service. This is the YOLO v8 logic that identifies and annotates the objects identified in the frame. You examine the code and then see how to view the message data format used in the service, in real time.

5. [Web UI](web-ui.md) service. This is a web client app that uses the Quix Streaming Reader API to read data from a Quix topic (the output of the stream merge service). There are various UI components that are beyond the scope of this tutorial.

6. [Other services](other-services.md). The other services are fairly simple so are collected together for discussion. You can optionally investigate the message data format and code. 

7. [Add new service](add-service.md). You add a new service to a feature branch, test it, and then merge to the tutorial branch.

8. [Summary](summary.md). In this concluding part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about Quix.

## 🏃‍♀️ Next step

[Part 1 - Get the project :material-arrow-right-circle:{ align=right }](get-project.md)
