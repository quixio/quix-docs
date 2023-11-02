# Publish your data into a Quix topic using Quix Streams 

There are [many ways](../../develop/integrate-data/index.md) to get your data into Quix, a process usually known as ingestion or data integration. Data can be loaded using CSV files, by polling external web services, WebSockets and so on. The option you use depends on your use case.

In this part of the Quix Tour, you'll learn how to send data into Quix using Quix Streams to publish data into a topic hosted in the Quix Platform. 

You'll write a short Python program to retrieve your CPU load and publish that data into a Quix topic in real time. 

!!! tip

    If you've already completed the [Quickstart](../quickstart.md), you can jump down to creating an [external source](./ingest-push.md#5-create-an-external-source).

## 1. Install the Python modules

Once you have Python installed, open up a terminal, and install the following modules using `pip`:

```
pip install quixstreams
pip install psutil
pip install python-dotenv
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `pip3` to install your modules. 

You're going to use the [Quix Streams](../../client-library-intro.md) library to publish data into Quix Platform. This is just one of many ways to get your data into Quix. You could for example simply log into Quix and use one of our already available [connectors](../../connectors/index.md).

You use the `psutil` module to retrieve the CPU load on your laptop.

!!! tip

    You use `python-dotenv` as you securely store your client library token (previously known as the SDK token) in a `.env` file.

## 2. Create your project and environment

You'll need to create a project and an environment. You can watch a video on how to do this:

<div style="position: relative; padding-bottom: 61.98347107438017%; height: 0;"><iframe src="https://www.loom.com/embed/17b17c1e614448419f1f9c0244ed288c?sid=b42634cc-1a2a-44f7-847b-23eb6d626cec" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 3. Get your token

You'll need a streaming token to connect your client code to your Quix environment:

1. Log in to the Quix Portal and enter the `Develop` environment.
2. Click `Settings` and then click `Develop` again to display the environment settings.
3. Click `APIs and tokens`.
4. Click `Streaming Token`.
5. Copy the streaming token to the clipboard using the button provided.

## 4. Create your `.env` file

You'll store your streaming token securely in a `.env` file on your computer in the same directory as your Python code. To create the `.env` file:

1. Open up a terminal on your laptop, make a new directory for your code. 
2. Using your editor, create a `.env` file in your project directory. On the first line add the text `STREAMING_TOKEN=`.
3. Paste the streaming token from the clipboard into the `.env` file _immediately_ after the `=` (there should be no space between the `=` and the token).
4. Save the file.

Your streaming token is now safely stored in your `.env` file for your Python code to use.

## 5. Write your code

You'll now write the Python code that runs on your computer, and publishes your CPU load into a Quix topic.

1. Create a new file `cpu_load.py`.
2. Copy and paste in the following code:

    ```python 
    import psutil
    import quixstreams as qx
    import time
    import datetime
    import os
    from dotenv import load_dotenv

    load_dotenv()
    token = os.getenv("STREAMING_TOKEN")

    def get_cpu_load():
        cpu_load = psutil.cpu_percent(interval=1)
        return cpu_load

    # Obtain streaming token from portal
    client = qx.QuixStreamingClient(token)

    # Open a topic to publish data to
    topic_producer = client.get_topic_producer("cpu-load")

    stream = topic_producer.create_stream()
    stream.properties.name = "Quickstart CPU Load - Server 1"
    stream.timeseries.buffer.time_span_in_milliseconds = 100   # Send data in 100 ms chunks

    def main():
        try:
            while True:
                cpu_load = get_cpu_load()
                print(f"CPU Load: {cpu_load}%")
                stream.timeseries \
                    .buffer \
                    .add_timestamp(datetime.datetime.utcnow()) \
                    .add_value("CPU_Load", cpu_load) \
                    .publish()
        except KeyboardInterrupt:
            print("Closing stream")
            stream.close()

    if __name__ == '__main__':
        main()
    ```

3. Save the file.

## 6. Run your code

Run your code with the following command in your terminal:

```
python cpu_load.py
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `python3` to run your code. 

The code runs and, after creating the `cpu-load` topic, displays your CPU load. The code is now publishing data to the Quix topic `cpu-load`.

## 7. Create an external source

At this point you have an external program sending data into the Quix Platform, and it is writing into a topic. However, you can't currently see this in the Pipeline view. To help you visualize what you've created, you can add an external source component, to provide a visual entity in the pipeline view. To do this:

1. Click on `Code Samples`.
2. Select the `Python`, `Source`, and `Basic templates` filters.
3. On the `External Source` sample, click `Add external source`.
4. Give the component a name, such as "Laptop CPU Load".
5. For output topic select `cpu-load`.
6. Click `Add external source`.

This now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic.

Watch a video on adding an external source:

<div style="position: relative; padding-bottom: 62.24066390041494%; height: 0;"><iframe src="https://www.loom.com/embed/0c9be6ea1f9540618d8bf0c2dabc8533?sid=728b4cad-a224-4ffa-82fe-7f0bbe737779" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 🏃‍♀️ Next step

Build a transform to process your data!

[2. Process your data :material-arrow-right-circle:{ align=right }](./process-threshold.md)
