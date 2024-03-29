# Aggregate data by time

You can downsample and upsample persisted data using the `/parameters/data` endpoint.

## Aggregating and interpolating

The JSON payload can include a `groupByTime` property, an object with the following members:

* `timeBucketDuration` - The duration, in nanoseconds, for one aggregated value.
* `interpolationType`  - Specify how additional values should be generated when interpolating.

For example, imagine you have a set of speed data, with values recorded at 1-second intervals. You can group such data into 2-second intervals, aggregated by mean average, with the following:

```json
{
    "groupByTime": {
        "timeBucketDuration": 2000000000,
    },
    "numericParameters": [{
        "parameterName": "Speed",
        "aggregationType": "Mean"
    }]
}
```

You can specify an `interpolationType` to define how any missing values are generated. `Linear` will provide a value in linear proportion, while `Previous` will repeat the value before the one that was missing:

```json
{
    "from": 1612191286000000000,
    "to":   1612191295000000000,
    "numericParameters": [{
        "parameterName": "Speed",
        "aggregationType": "First"
    }],
    "groupByTime": {
        "timeBucketDuration": 2000000000,
        "interpolationType": "None"
    },
    "streamIds": [ "302b1de3-2338-43cb-8148-3f0d6e8c0b8a" ]
}
```
