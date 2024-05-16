# Add destination

Now add a destination using the CLI:

```
quix local app create starter-destination
```

This creates a starter destination for you. Alternatively, you could type `quix local app create` and then interactively select the starter destination. You saw an example of this when adding the demo data source. You can call the destination `destination`, or any other name you like.

## Review the destination code

Replace the destination code completely with the following new code:

``` python
from quixstreams import Application
import os

from dotenv import load_dotenv
load_dotenv()

# called for every message
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

The code just prints out the components of the message individually. You could perform any processing you want here, such as persisting the data, or displaying values on a real-time chart.

## Edit requirements.txt

Check the `requirements.txt` file. Make sure you are using Quix Streams greater than or equal to 2.4.2:

```
quixstreams>=2.4.2
```

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
