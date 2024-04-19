# Add destination

Now add a destination using the CLI:

```
quix local app create starter-destination
```

This creates a starter destination for you. Alternatively, you could type `quix local app create` and then interactively select the starter destination. You saw an example of this when adding the demo data source. You can call the destination `destination`, or any other name you like.

## Review the destination code

The destination code is as follows:

``` python
from quixstreams import Application
import os

from dotenv import load_dotenv
load_dotenv()

# you decide what happens here!
def sink(message):
    value = message['mykey']
    # write_to_db(value) # implement your logic to write data or send alerts etc

    # for more help using QuixStreams see the docs:
    # https://quix.io/docs/quix-streams/introduction.html

app = Application.Quix("destination-v1", auto_offset_reset = "latest")

input_topic = app.topic(os.environ["input"])

sdf = app.dataframe(input_topic)

# call the sink function for every message received.
sdf = sdf.update(sink)

# you can print the data row if you want to see what's going on.
sdf = sdf.update(lambda row: print(row))

if __name__ == "__main__":
    app.run(sdf)
```

Modify this as follows:

``` python
from quixstreams import Application
import os

from dotenv import load_dotenv
load_dotenv()

def sink(message):
    print("Average speed is: ", message['average-speed'])
    print("Timestamp at end of window is: ", message['time'])    

app = Application()
input_topic = app.topic(os.environ["input"])
sdf = app.dataframe(input_topic)
sdf = sdf.update(sink)

if __name__ == "__main__":
    app.run(sdf)
```

The code is very simple, it just prints out the components of the message individually. You could perform any processing you want here, such as persisting the data, or displaying values on a real-time chart.

## Test your destination code

Start your source and transform if they are not already running locally. Now run your destination code. It outputs messages such as:

```
Average speed is:  282.27891156462584
Timestamp at end of window is:  1713524910000
```

## Get ready to sync to Cloud

You are now ready to synchronize everything with Quix Cloud, and run your complete pipeline as a set of dockerized services in a cluster managed by Kubernetes, with nothing more than a single command. This is described in the next step.

!!! important

    Before you proceed to the next step, make sure you stop all your local code running.

## Next step

* [Sync to Cloud](./cli-sync-to-cloud.md)
