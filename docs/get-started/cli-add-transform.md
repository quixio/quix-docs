# Add a transform

Now add a transform using the CLI:

```
quix local app create starter-transformation
```

This creates a starter transformation for you. Alternatively, you could type `quix local app create` and then interactively select the starter transform. You saw an example of this when adding the demo data source. You can call the transform `transform`, or any other name you like.

## Modify the transform code

Now, you'll modify the starter transform code to do something more useful. Let's say you want to calculate the average speed from the race car. You could do that with a tumbling window with a time window of say 30 seconds:

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

Note that the input topic is `csv-data`, but you need to change that to `f1-data`. Edit the `app.yaml` file so that the input topic section is as follows:

``` yaml
  - name: input
    inputType: InputTopic
    description: Name of the input topic to listen to.
    defaultValue: csv-data
    required: false
```

Save your changes and proceed to the next step.

## Next step

* [Add a destination](./cli-add-destination.md)
