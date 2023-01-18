# 4. Merge streams

In this part of the tutorial you add a service to merge multiple Quix streams into a single Quix stream, before feeding into the UI service. TfL traffic cams generate a stream per camera, and then there is the additional stream from your webcam, and other video streams you may decide to add. These streams can be combined to provide the UI with a single input stream.

Follow these steps to deploy the **merge streams service**:

1.  Navigate to the Library and locate `Stream merge`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `image-processed` topic and streams data to the `image-processed-merged` topic.

[Part 5 - Deploy the UI :material-arrow-right-circle:{ align=right }](deploy-ui.md)
