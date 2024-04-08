# Add a CPU load threshold detection transform

You now add a transform to detect when CPU threshold is exceeded. Click `Add new` on the output of your external source, and add the `Starter transformation SDF`. 

You can use the defaults, or rename your transform to something like `CPU Threshold`. 

Then click on `Edit code`. You can rename the output topic to `cpu-threshold-transform`.

You'll replace the code in `main.py` with the following:

``` python
import os
from quixstreams import Application

app = Application()

input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])

sdf = app.dataframe(input_topic)

# Filter in all rows where CPU load is over 20.
sdf = sdf.filter(lambda row: row["cpu_load"] > 20)

# Build an alert payload
sdf = sdf.apply(lambda row: {
    "summary": "CPU overload",
    "source": "custom_event",
    "severity": "critical",
    "custom_details": {
        "timestamp": row["timestamp"],
        "message": "CPU value is " + str(row["cpu_load"])
    }
})

sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Here, a very simple filter function checks if the inbound data contains a CPU load above a fixed limit (set to 20 here for ease of testing). The filter filters in all rows where CPU is over the threshold.

You can test the application is running by loading some CPU intensive apps on your laptop. When the threshold is exceeded it will send a message of the following format to the output topic:

``` json
{
  "summary": "CPU overload",
  "source": "custom_event",
  "severity": "critical",
  "custom_details": {
    "timestamp": 1710947291392758000,
    "message": "CPU value is 25.1"
  }
}
```

## Windowing

While CPU spikes might be acceptable in the short term, they might be more concerning if such levels are sustained over a longer period of time. For detecting such a condition, an aggregation using a tumbling window could be implemented. Let's say you want to raise an alert if the CPU level exceeds a certain average level over some time period. You could use a time-based windowing function such as illustrated by the following code example:

``` python
import os
from quixstreams import Application
from datetime import timedelta

app = Application()

input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])

sdf = app.dataframe(input_topic)

sdf = sdf.apply(lambda row: row["cpu_load"]) \
    .tumbling_window(timedelta(seconds=10)).mean().final()

# Filter all rows where CPU load is over 20.
sdf = sdf.filter(lambda row: row["cpu_load"] > 20)

sdf["window_duration_s"] = (sdf["end"] - sdf["start"]) / 1000

# Produce message payload with alert.
sdf = sdf.apply(lambda row: {
    "summary": "Windowed CPU overload",
    "source": "custom_event",
    "severity": "critical",
    "custom_details": {
        "timestamp": row["end"],
        "message": f"CPU {row["cpu_load"]} for duration of {row["window_duration_s"]} seconds."
    }
})

sdf = sdf.to_topic(output_topic)

if __name__ == "__main__":
    app.run(sdf)
```

Replace the code in `main.py` with the windowing code, if you want to test that out.

??? "Advanced version"

    Version of code that sends the alert only once:

    ``` python
    import os
    from quixstreams import Application, State
    from datetime import timedelta

    app = Application()

    input_topic = app.topic(os.environ["input"])
    output_topic = app.topic(os.environ["output"])

    sdf = app.dataframe(input_topic)

    sdf = sdf.apply(lambda row: row["cpu_load"]) \
        .tumbling_window(timedelta(seconds=10)).mean().final()

    sdf["window_duration_s"] = (sdf["end"] - sdf["start"]) / 1000

    def is_alert(row: dict, state: State):
        
        is_alert_sent_state = state.get("is_alert_sent", False)
        
        if row["cpu_load"] > 20:
            if not is_alert_sent_state:
                state.set("is_alert_sent", True)
                return True        
            else:
                return False
        else:
            state.set("is_alert_sent", False)
            return False
            

    sdf = sdf.filter(is_alert, stateful=True)

    # Produce message payload with alert.
    sdf = sdf.apply(lambda row: {
        "summary": "CPU overload",
        "source": "custom_event",
        "severity": "critical",
        "custom_details": {
            "timestamp": row["timestamp"],
            "message": "CPU value is " + str(row["cpu_load"])
        }
    })

    sdf = sdf.to_topic(output_topic)

    if __name__ == "__main__":
        app.run(sdf)
    ```

## 🏃‍♀️ Next step

[Part 5 - Add PagerDuty alerting :material-arrow-right-circle:{ align=right }](./add-alerting.md)
