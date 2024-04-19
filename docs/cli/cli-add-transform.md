# Add a transform

Now add a transform using the CLI. In you project directory run the command:

```
quix local app create starter-transformation
```

This creates a starter transformation for you. Alternatively, you could type `quix local app create` and then interactively select the starter transform. You saw an example of this interactivity when adding the demo data source. You can call the transform `transform`, or any other name you like.

## Modify the transform code

Now, you'll modify the starter transform code to do something more useful. Let's say you want to calculate the average speed from the race car. You could do that with a tumbling window with a time window of 30 seconds:

``` python
import os
from quixstreams import Application
from datetime import timedelta

# for local dev, load env vars from a .env file
from dotenv import load_dotenv
load_dotenv()

# create a Quix Streams application
app = Application()

# JSON deserializers/serializers used by default
input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])

# consume from input topic
sdf = app.dataframe(input_topic)

# calculate average speed using a 30 second tumbling window
sdf = sdf.apply(lambda row: row["Speed"]) \
    .tumbling_window(timedelta(seconds=30)).mean().final() \
        .apply(lambda value: {
            'average-speed': value['value'],
            'time': value['end']
            })

# print every row
sdf = sdf.update(lambda row: print(row))

# publish to output topic
sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

This publishes a message to the output topic, with the following format, every 30 seconds:

``` json
{'average-speed': 249.04918032786884, 'time': 1713518340000}
```

## App.yaml file

Now take a look at the `app.yaml` file for your transform:

``` yaml
name: transformer
language: Python
variables:
  - name: input
    inputType: InputTopic
    description: Name of the input topic to listen to.
    defaultValue: csv-data
    required: false
  - name: output
    inputType: OutputTopic
    description: Name of the output topic to write to.
    defaultValue: transform
    required: false
dockerfile: dockerfile
runEntryPoint: main.py
defaultFile: main.py
```

This file defines the application, including its input and output topics.

Note that the default input topic is `csv-data`, but you need your transform to subscribe to the `f1-data` topic. You'll fix this in the next section.

## Local environment variables

There are a couple of ways you can set the input topic of the transform, but a sensible way is to change the environment variable that sets the input topic. But as yet, there are no environment variables created. You can create them with the command you saw in the previous step, `quix local variables export`.

You can then edit the `.env` file so that the input topic is `f1-data`.

## Edit requirements.txt

Check the `requirements.txt` file. Make sure you are using Quix Streams greater than or equal to 2.4.1:

```
quixstreams>=2.4.1
```

## Run your transform

Now run your transform. In the transform application directory:

```
python3 main.py
```

## Testing

There are a couple of ways you can test if this is working. One way is to switch to Quix Cloud, and navigate to the Topics section of the main menu - you will see active data on your topics. Another way is to run a command-line program to read the data on a topic. So, to read the `transform` topic, you could create some code `test.py` in your transform app directory:

``` python
from quixstreams import Application                                                                                
from dotenv import load_dotenv
import os

load_dotenv()
app = Application()
topic = app.topic('transform')
sdf = app.dataframe(topic)
sdf = sdf.update(lambda row: print(row))
app.run(sdf)
```

This reads the `transform` topic (the output of your transformer) and prints out the results. This proves data is being produced into the transform topic, by your transformer.

!!! tip

    In your test program, you could have loaded the topic to read from the local `.env` file, rather than hard coding it. You'd load it with code such as the following: `topic = app.topic(os.environ["output"])`. This would enable you perhaps use the same test code in multiple applications, without needed to edit the code to change the topic name.

## Next step

* [Add a destination](./cli-add-destination.md)
