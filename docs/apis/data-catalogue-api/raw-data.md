# Raw data

Access persisted raw data by specifyng the parameters you’re interested
in. Add restrictions based on Stream or timings for finer-grained
results.

## Before you begin

  - If you don’t already have any Stream data in your workspace, you can
    use any Source of our [Quix
    Library](../../platform/samples/samples.md) to set some up.

  - [Get a Personal Access Token](authenticate.md)
    to authenticate each request.

## Using the /parameters/data endpoint

Raw telemetry data is available via the `/parameters/data` endpoint.

## Fetching specific parameters

### Request

You can filter by a number of different factors but, at minimum, you’ll
need to supply one or more parameters to fetch:

``` json
{
    "numericParameters": [{
        "parameterName": "Speed"
    }]
}
```

In this example, we’re requesting a single numeric parameter, `Speed`.
Each array of parameters is indexed based on parameter type, which can
be `numericParameters`, `stringParameters` or `binaryParameters`.
Parameters are returned in a union, so if you request several, you’ll
get back all parameters that match.

### Example

``` bash
curl "https://${domain}.platform.quix.io/parameters/data" \
    -H "accept: text/plain" \
    -H "Authorization: bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"numericParameters":[{"parameterName":"Speed"}]}'
```

If you just had a single parameter value in the catalogue, the response
from the above call might look something like this:

``` json
{
    "timestamps": [
        1612191100000000000
    ],
    "numericValues": {
        "Speed": [
            104.22222222222224
        ]
    },
    "stringValues": {},
    "binaryValues": {},
    "tagValues": {},
}
```

### Restricting by Stream or time

In reality, you’ll have far more data in the catalogue, so you’ll want
to filter it. Three remaining properties of the request object allow you
to do so:

  - `streamIds`

  - `from`

  - `to`

Each stream you create has a unique ID. You can view the ID of a
persisted via the Data section of the Quix Portal. Supply a list of
stream IDs to restrict fetched data to just those streams:

``` json
{
    "streamIds": [
        "302b1de3-2338-43cb-8148-3f0d6e8c0b8a",
        "9feb07ac-b0b2-4591-bc7f-8f0c1295ed7c"
    ]
}
```

You can also restrict data to a certain time span using the `from` and
`to` properties. These each expect a timestamp in nanoseconds, for
example:

``` json
{
    "from": 1612191286000000000,
    "to":   1612191386000000000
}
```

These timestamps cover a range of 100 seconds.
