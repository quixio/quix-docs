# 3. Connect the TfL video feeds

In this part of the tutorial you connect your pipeline to the TfL traffic cam video feeds.

Follow these steps to deploy the **traffic camera feed service**:

1.  Navigate to the Library and locate `TfL Camera Feed`.

2.  Click `Setup & deploy`.

3.  Paste your TfL API Key into the appropriate input.

4.  Click `Deploy`.

    Deploying will start the service in the Quix pre-provisioned infrastructure. This service will stream data from the TfL cameras to the `tfl-cameras` topic.

    At this point your pipeline view has one service deployed. When it has started the arrow pointing out of the service will be green. This indicates that data is flowing out of the service into a topic. Now, you need to deploy something to consume the data that is streaming into that topic.

5.  Once deployed successfully, stop the service. You will restart it later, but for now it can be stopped.

[Part 4 - Frame grabber :material-arrow-right-circle:{ align=right }](tfl-frame-grabber.md)
