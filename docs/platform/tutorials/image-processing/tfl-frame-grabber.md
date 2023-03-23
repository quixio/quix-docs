# 4. Frame extraction

In this part of the tutorial you add a frame extraction service. 

The frame extraction service grabs single frames from the video feeds, so that object detection can be performed in the next stage of the pipeline. 

Follow these steps to deploy the **frame extraction service**:

1.  Navigate to the Library and locate `TfL traffic camera frame grabber`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `tfl-cameras` topic and streams data to the `image-raw` topic.

[Part 6 - Web UI :material-arrow-right-circle:{ align=right }](web-ui.md)
