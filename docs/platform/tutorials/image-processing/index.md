# Real-time image processing

In this tutorial you learn how to build a real-time image processing pipeline in Quix, using the Transport for London (TfL) traffic cameras, known as Jam Cams, the webcam on your laptop or phone,  and a [YOLO v3](https://viso.ai/deep-learning/yolov3-overview/) machine learning model. 

You'll use prebuilt Code Samples to build the pipeline. A prebuilt UI is also provided that shows you where the recognized objects are located around London.

The following screenshot shows the pipeline you build in this tutorial:

![pipeline overview](./images/pipeline-overview.png)

## Getting help

If you need any assistance while following the tutorial, we're here to help in [The Stream community](https://join.slack.com/t/stream-processing/shared_invite/zt-13t2qa6ea-9jdiDBXbnE7aHMBOgMt~8g), our public Slack channel.

## Tutorial live stream

If you'd rather watch a live stream, where one of our developers steps through this tutorial, you can view it here:

<!-- Now out of date -->
<div class="video-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Wi-U0Wg3Jf0?start=188" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Prerequisites

To get started make sure you have a [free Quix account](https://portal.platform.quix.ai/self-sign-up).

You'll also need a [free TfL account](https://api-portal.tfl.gov.uk). 

Follow these steps to locate your TfL API key:

  1. Register for an account.

  2. Login and click the `Products` menu item.

  3. You should have one product to choose from: `500 Requests per min.`

  4. Click `500 Requests per min.`

  5. Enter a name for your subscription into the box, for example "QuixFeed", and click `Register`.

  6. You can now find your API Keys in the profile page.

## Code Samples

The Code Samples is a collection of ready-to-use components you can leverage to build your own real-time streaming solutions. Typically these components require minimal configuration.

Most of the code you need for this tutorial has already been written, and is located in the `Code Samples`. 

When you are logged into the Quix Portal, click on the `Code Samples` icon in the left-hand navigation, to access the Code Samples.

## The pipeline you will create

There are four stages to the processing pipeline you build in this tutorial:

1. Video feeds
  
    - Webcam image capture 
    - TfL Camera feed or "Jam Cams"

2. Frame grabber
  
    - Grab frames from TfL video feed

3. Object detection

    - Detect objects within images

4. Web UI configuration

    - A simple UI showing:

        - Images with identified objects    
        - Map with count of objects at each camera's location

Now that you know which components will be needed in the image processing pipeline, the following sections will step through the creation of the required microservices.

## The parts of the tutorial

This tutorial is divided up into several parts, to make it a more manageable learning experience. The parts are summarized here:

1. **Connect the webcam video feed**. You learn how to quickly connect a video feed from your webcam, using a prebuilt sample.

2. **Object detection**. You use a computer vision sample to detect a chosen type of object. You'll preview these events in the live preview. The object type to detect can be selected through a web UI, which is described later.

3. **Connect the TfL video feed**. You learn how to quickly connect the TfL traffic cam feeds, using a prebuilt sample. You can perform object detection across these feeds, as they are all sent into the objection detection service in this tutorial.

4. **Frame grabber**. You use a standard sample to grab frames from the TfL video feed.

5. **Deploy the web UI**. You the deploy a prebuilt web UI. This UI enables you to select an object type to detect across all of your input video feeds. It displays the location pof object detection and object detection count on a map.

6. **Summary**. In this [concluding](summary.md) part you are presented with a summary of the work you have completed, and also some next steps for more advanced learning about the Quix Platform.

[Part 1 - Connect the webcam feed :material-arrow-right-circle:{ align=right }](connect-video-webcam.md)
