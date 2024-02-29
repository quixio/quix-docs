---
title: Quickstart
description: Get started in under 10 minutes
---

# Quickstart

This Quickstart is designed to show you how to get your data into Quix and display it, in **less than 10 minutes**.

## Peek at the code

If you're just curious, click the box below to see the complete code.

??? example "Push CPU load data to Quix"

    ```python
    import psutil, time, os
    from quixstreams import Application
    from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext

    from dotenv import load_dotenv
    load_dotenv()

    def get_cpu_load():
        cpu_load = psutil.cpu_percent(interval=1)
        memory = psutil.swap_memory()
        return {
            "cpu_load": cpu_load,
            "memory": memory._asdict(),
            "timestamp": int(time.time_ns()),
        }

    app = Application.Quix(
        consumer_group="cpu_load", 
        auto_create_topics=True,
    )

    serializer = JSONSerializer()
    output_topic = app.topic("cpu-load")
    producer = app.get_producer()

    def main():
        while True:
            cpu_load = get_cpu_load()
            print("CPU load: ", cpu_load)
            with producer:
                serialized_value = serializer(
                    value=cpu_load, ctx=SerializationContext(topic=output_topic.name)
                )
                producer.produce(
                    topic=output_topic.name,
                    key="server-1-cpu",
                    value=serialized_value
                )

    if __name__ == '__main__':
        try:
            main()
        except KeyboardInterrupt:
            print('Exiting due to keyboard interrupt')    
    ```

## Prerequisites

To complete the Quickstart you'll need the following:

1. [Python installed](https://www.python.org/downloads/){target=_blank} on your machine. Python version >= 3.6 < 4 is required for the Quix Streams client library.
2. A [free Quix account](https://portal.platform.quix.io/self-sign-up).

## 1. Install the Python modules

Once you have Python installed, open up a terminal, and install the following modules using `pip`:

```
pip install quixstreams
pip install psutil
pip install python-dotenv
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `pip3` to install your modules. 

You're going to use the [Quix Streams](https://quix.io/docs/quix-streams/introduction.html) library to push data into Quix. This is just one of [many ways](../develop/integrate-data/overview.md) to get your data into Quix. You could for example simply log into Quix and use one of our already available [connectors](../connectors/index.md), but where's the fun in that!

You use the `psutil` module to retrieve the CPU load on your laptop.

## 2. Create your project and environment

You'll need to create a project and an environment. You can watch a video on how to do this:

<div style="position: relative; padding-bottom: 59.726027397260275%; height: 0;"><iframe src="https://www.loom.com/embed/6056fffa4f0e49799ed24a54496ae81a?sid=4475117c-41c3-462b-9550-4c33dae5da2a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "transcript"

    0:01 Hello, welcome to the Quick Start. In this first video in the series, I'll show you how to get started by creating your project and your first environment.
    
    0:12 Now, in the latest versions of Quick, you can't really get very far or do anything useful without creating a project.

    0:18 For example, if you want to get started by creating a project, you can create a project. Very simply, a project roughly corresponds to a Git repository, and then within that project, you're going to create one or more environments that roughly correspond to a Git branch in that Git repository.

    0:37 Environments also contain other configurations. Information such as your Kafka hosting option and also your storage requirements. So let's get straight into it and create the project.

    0:51 Click on new project and then give your project a name. In this case, I'm going to call it quick start video.

    1:08 Now we specify our git repository. You can use a quicks hosted repository, which uses gitty. However, you can also use an external git repository.

    1:20 Any repository. Repository that supports SSH keys can be used. So, for example, GitLab, GitHub, Bitbucket, and so on, can all be used.
    
    1:30 I'm just going to go for the simple option and get quicks to manage my git repository for me. So having selected that, I will click on create project.
    
    1:45 That takes us into the environment settings wizard. We can specify the environment name. Now, typically, that will be things like develop, production, staging, testing, whatever suits your development processes.

    2:01 So for the purposes of the quick start, I'm just going to call this environment develop, and I need to create a branch for this as well.

    2:13 I don't want to use the main branch from my develop environment. So in here, I'm going to select new branch and create a dev branch.

    2:21 To go with my development environment, I am going to branch off of main for this and go ahead and create the branch.

    2:30 I don't need to protect this branch because I want to make changes directly to the develop branch as part of my development process.

    2:40 If I were to protect branch, I would have to update it using merge requests. So for example, typically your production environment might correspond to the main branch and that may well be protected.

    2:55 And this is to prevent people committing changes directly into production. So having set the environment name and specified the environment branch, I'm going to click continue.

    3:09 Now I can select my Kafka hosting option. The simplest being to just let Quix host and scale everything for you.
    
    3:18 So I'm going to go for that option. You could, however, use your own self hosted Kafka, where you could connect to Confluent Cloud.

    3:28 So I'm ready to click continue on that. Now, if you have topics where you persist the data into a database that requires a storage option.

    3:44 For most purposes, the standard option is sufficient. If you're going to have a lot of persisted topics, you might need to go for the premium option.

    3:56 But for the quick start, I'm just going to go with a standard storage option and click create a environment. Okay, so now that environment will be created.

    4:10 So I will end this video here and see you in the next video where we'll continue the quick start journey.

    4:18 Thanks for watching and see you in the next video.

You can also read the documentation on how to [create a project](../create/create-project.md) and [environment](../create/create-environment.md).

## 3. Set your environment variables

You need to set the following environment variables:

* `Quix__Sdk__Token`
* `Quix__Portal__Api`

Note, these variables use **double** underscores.

To obtain these values you can go to `Settings` in your environment, and then click on the `APIs and tokens tab`. You can obtain the `Streaming Token` and the Portal API URL from there.

Create a `.env` file containing your environment variables:

```
Quix__Sdk__Token="sdk-12345"
Quix__Portal__Api="portal-api.platform.quix.io"
```

!!! note

    The SDK token and streaming token are the same thing. The SDK token is now called the streaming token in the UI.

## 4. Write your code

You now write the Python code that runs on your computer, and publishes your CPU load into a Quix topic.

Create a new file called `cpu_load.py`, and copy and paste in the following code, and then save the file:

``` python 
# pip install psutil
# pip install quixstreams
# pip install python-dotenv
import psutil, time, os
from quixstreams import Application
from quixstreams.models.serializers.quix import JSONSerializer, SerializationContext

from dotenv import load_dotenv
load_dotenv()

def get_cpu_load():
    cpu_load = psutil.cpu_percent(interval=1)
    memory = psutil.swap_memory()
    return {
        "cpu_load": cpu_load,
        "memory": memory._asdict(),
        "timestamp": int(time.time_ns()),
    }

app = Application.Quix(
    consumer_group="cpu_load", 
    auto_create_topics=True,
)

serializer = JSONSerializer()
output_topic = app.topic("cpu-load")
producer = app.get_producer()

def main():
    while True:
        cpu_load = get_cpu_load()
        print("CPU load: ", cpu_load)
        with producer:
            serialized_value = serializer(
                value=cpu_load, ctx=SerializationContext(topic=output_topic.name)
            )
            producer.produce(
                topic=output_topic.name,
                key="server-1-cpu",
                value=serialized_value
            )

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting due to keyboard interrupt')    
```

Note that Quix Streams reads the necessary environment variables for you.

## 5. Run your code

Run your code with the following command in your terminal:

```
python cpu_load.py
```

!!! tip

    If you're on Mac and using Homebrew, you may have multiple Python versions installed. In this case you may have to use the command `python3` to run your code. 

The code runs and, after creating the `cpu-load` topic, displays your CPU load. The code is now publishing data to the Quix topic `cpu-load`.

!!! tip

    If your code exits before the topic is created, simply run the program again.

## 6. See the data in Quix

To view your data in the data explorer in Quix Cloud:

1. Switch back to Quix and enter your `Develop` environment.
2. Click on `Topics` in the main left-hand navigation.
3. You see the `cpu-load` topic. Note the vertical green bars representing inbound data.
4. Hover the mouse over the `Data` column. You see the tool tip text `View live data`.
5. Click the mouse where the tool tip text is displayed. You are taken to the Quix Data Explorer in a new tab.
6. Under `SELECT STREAMS` select the box `server-1-cpu`.
7. Under `SELECT PARAMETERS OR EVENTS` select `CPU_Load`. 

Click the `Messages` tab to see the inbound data. 

## Conclusion

That concludes the Quickstart! In this Quickstart you've learned the following:

* How to create a project and an environment.
* How to obtain the streaming token (also known as the SDK token) for your environment.
* How to publish data into a Quix topic from the command line using Quix Streams.
* How to view real-time data in a topic using the Quix Data Explorer.

## Next steps

Try the [Quix Tour](./quixtour/overview.md) and build out a complete CPU overload detection pipeline.
