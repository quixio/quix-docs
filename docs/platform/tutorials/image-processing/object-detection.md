# 2. Object detection

In this part of the tutorial you add an object detection service into the pipeline. This service detects objects in any video feeds connected to its input. This service uses a [YOLO v3](https://viso.ai/deep-learning/yolov3-overview/) machine learning model for object detection.

In a later stage of the pipeline you add a simple UI which enables you to select the type of object to detect.

Follow these steps to deploy the **object detection service**:

1.  Navigate to the code samples and locate `Computer Vision object detection`.

2.  Click `Setup & deploy`.

3.  Click `Deploy`.

    This service receives data from the `image-raw` topic and streams data to the `image-processed` topic.

??? example "Understand the code"

    Here's the code in the file `quix_function.py`:

    ```python
    # Callback triggered for each new parameter data. (1)
    def on_parameter_data_handler(self, data: ParameterData):
        
        # Loop every row in incoming data. (2)
        for timestamp in data.timestamps:

            binary_value = timestamp.parameters['image'].binary_value
            source_img = self.image_processor.img_from_base64(binary_value)
            start = time.time()

            # We call YOLO3 model with binary values of the image
            # and receive objects with confidence values. (3)
            img, class_ids, confidences = self.image_processor.process_image(source_img)
            delta = start - time.time() # (4)

            # We count how many times each class ID is present in the picture. (5)
            counter = Counter(class_ids)

            print("New image in {0} at {1}".format(self.input_stream.stream_id, timestamp.timestamp))

            # Starts by creating new row with timestamp that we carry from input. (6)
            row = self.output_stream.parameters.buffer.add_timestamp_nanoseconds(timestamp.timestamp_nanoseconds) 

            # For each class ID we sent column with number of occurrences in the picture. (7)
            for key, value in counter.items():
                print("Key:{}".format(key))
                row = row.add_value(key, value)

            # Attach image column with binary data, GPS coordinates and model performance metrics. (8)
            row.add_value("image", self.image_processor.img_to_binary(img)) \
                .add_value("lat", timestamp.parameters["lat"].numeric_value) \
                .add_value("lon", timestamp.parameters["lon"].numeric_value) \
                .add_value("delta", delta) \
                .write()
    ```

    1. Each time a new parameter data arrives, this callback is invoked.
    2. Parameter data can be thought of as data in a tabular form. This code loops over all rows in the table.
    3. The object detection model is called with the source image. It returns an annoted image, an array containing the ids of the types of objects detected (for example: ['bus', 'car', 'truck', 'car', 'car', 'person', 'car', 'car', 'person', 'car', 'car', 'car', 'person', 'car', 'person', 'person']), and the confidence of the detection.
    4. The `delta` is a variable used to record how long it takes for the object detection. This is used as a measure of performance. 
    5. `Counter` is a dictionary that object type counts, for example, `{'truck': 3, 'car': 3}`.
    6. Timestamp TDB
    7. Add the class ID (object type detected) and the count for that object type. 
    8. The row is written out. The row includes the image binary, geolocation, and delta as a measure of performance for object detection.

[Part 4 - TfL video :material-arrow-right-circle:{ align=right }](connect-video-tfl.md)
