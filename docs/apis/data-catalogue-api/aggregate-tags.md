# Aggregate data by tags

If you need to compare data across different values for a given tag,
you’ll want to group results by that tag. You can do so via the
`/parameters/data` endpoint.

## Before you begin

  - If you don’t already have any Stream data in your workspace, you can
    use any Source of our [Quix
    Library](../../platform/samples/samples.html) to set some up.

  - [Get a Personal Access Token](authenticate.md)
    to authenticate each request.

## Using the groupBy property

You can supply a list of Tags in the `groupBy` array to aggregate
results by. For example, you could group a set of Speed readings by the
LapNumber they occurred on using something like:

``` json
{
    "from": 1612191286000000000,
    "to":   1612191386000000000,
    "numericParameters": [{
        "parameterName": "Speed"
    }],
    "groupBy": [ "LapNumber" ]
}
```

With these settings alone, we’ll get the `LapNumber` tag included in our
results, alongside the existing timestamps and requested parameters,
e.g.

``` json
{
    "timestamps": [
        1612191286000000000,
        1612191287000000000,
        ...
    ],
    "numericValues": {
        "Speed": [
            307.8333333333333,
            313.8421052631579,
            ...
        ]
    },
    "tagValues": {
        "LapNumber": [
            "3.0",
            "4.0",
            ...
        ]
    }
}
```

## Using aggregationType

For meaningful aggregations, you should specify a type of aggregation
function for each parameter. When specifying the parameters to receive,
include the `aggregationType` in each parameter object like so:

``` json
"numericParameters": [{
    "parameterName": "Speed",
    "aggregationType": "mean"
}]
```

Ten standard aggregation functions are provided including `max`,
`count`, and `spread`. When you group by a tag and specify how to
aggregate parameter values, the result will represent that aggregation.
For example, the following results demonstrate the average speed that
was recorded against each lap:

``` json
{
  "timestamps": [
    1612191286000000000,
    1612191286000000000
  ],
  "numericValues": {
    "mean(Speed)": [
      213.36765142704252,
      173.77710595934278
    ]
  },
  "stringValues": {},
  "binaryValues": {},
  "tagValues": {
    "LapNumber": [
      "3.0",
      "4.0"
    ]
  }
}
```
