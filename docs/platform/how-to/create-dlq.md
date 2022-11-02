# Create a Dead Letter Queue

When your code identifies a dead letter, or unprocessable message,
simply send the message to the dead letter topic and continue processing
other messages.

What you do with messages in the dead letter topic is up to you.

## Example

Take a look at the short example. It describes how to open topics,
create streams and also send messages to a dedicated dead letter topic
or queue.

=== "Python"
    
    ``` python
    # open topics
    input_topic = client.open_input_topic('INPUT_DATA')
    output_topic = client.open_output_topic('OUTPUT_DATA')
    dead_letter_topic = client.open_output_topic('UNPROCESSABLE')
    
    # create streams
    output_stream = output_topic.create_stream()
    dlq_stream = dead_letter_topic.create_stream()
    
    # open the input stream
    # and start handling messages
    def on_stream_received_handler(new_stream: StreamReader):
            def on_parameter_data_handler(data_in: ParameterData):
    
                    try:
                            # get a data value
                            data_to_process = data_in.timestamps[0].parameters['ParameterA'].numeric_value
    
                            # prepare the data packet for onward processing
                            data_out = ParameterData()
                            data_out.add_timestamp_nanoseconds(1) \
                                    .add_value("Speed", data_to_process)
    
                            # it was ok so pass to the output stream
                            # to be processed by the next stage in the pipeline
                            output_stream.parameters.write(data_out)
    
                    except Exception:
                            # There was an error during processing.
                # Print the error and forward data into dead letter queue.
                print(traceback.format_exc())
    
                            dlq_stream.parameters.write(data_in)
    
            # hook up on read handler
            new_stream.on_read += on_parameter_data_handler
    
    input_topic.on_stream_received += on_stream_received_handler
    input_topic.start_reading()
    ```

=== "C\#"
    
    ``` cs
    var inputTopic = client.OpenInputTopic("INPUT_DATA");
    var outputTopic = client.OpenOutputTopic("OUTPUT_DATA");
    var deadLetterTopic = client.OpenOutputTopic("UNPROCESSABLE");
    
    // create streams
    var outputStream = outputTopic.CreateStream();
    var dlqStream = deadLetterTopic.CreateStream();
    
    // open the input stream
    inputTopic.OnStreamReceived += (s, streamReader) =>
    {
        streamReader.Parameters.OnRead += dataIn =>
        {
            try
            {
                // get the data to process
                var numValue = dataIn.Timestamps[0].Parameters['ParameterA'].NumericValue;
    
                // create the data for onward processing
                var data = new ParameterData();
    
                data.AddTimestampNanoseconds(1)
                    .AddValue("Speed", numValue);
    
                // it was ok so pass to the output stream
                // to be processed by the next stage in the pipeline
                outputStream.Parameters.Write(data);
            }
            catch (Exception e)
            {
                // There was an error during processing.
                // Print the error and forward data into dead letter queue.
                System.Console.WriteLine(e);
    
                dlqStream.Parameters.Write(dataIn);
            }
        };
    };
    
    inputTopic.StartReading();
    ```


