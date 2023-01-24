# 2. Object detection

In this part of the tutorial you add an object detection service into the pipeline. This service detects objects in any video feeds connected to its input. This service uses a [YOLO v3](https://viso.ai/deep-learning/yolov3-overview/) machine learning model for object detection.

In a later stage of the pipeline you add a simple UI which enables you to select the type of object to detect.

Follow these steps to deploy the **object detection service**:

1.  Navigate to the Library and locate `Computer Vision object detection`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `image-raw` topic and streams data to the `image-processed` topic.

[Part 3 - TfL video :material-arrow-right-circle:{ align=right }](connect-video-tfl.md)
