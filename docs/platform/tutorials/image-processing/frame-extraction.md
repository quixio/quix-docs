# 2. Frame extraction

In this part of the tutorial you add a frame extraction service and a Base64 decoder service to your pipeline. The frame extraction service grabs single frames from the TfL video feeds, so that object detection can be performed in the next stage of the pipeline. The Base64 decoder service decodes the output of the webcam into a raw image feed, suitable for input into the object detection service.

Follow these steps to deploy the **frame extraction service**:

1.  Navigate to the Library and locate `TfL traffic camera frame grabber`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `tfl-cameras` topic and streams data to the `image-raw` topic.

Follow these steps to deploy the **Base64 decoder service**:

1.  Navigate to the Library and locate `Base64 Decoder`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `image-base64` topic and streams data to the `image-raw` topic.

[Part 3 - Object detection :material-arrow-right-circle:{ align=right }](objection-detection.md)
