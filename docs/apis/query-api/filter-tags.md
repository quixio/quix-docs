# Tag filtering

If you supply Tags with your parameter data, they will act as indexes, so they can be used to efficiently filter data.

## Using tag filters

When calling the `/parameters/data` endpoint, you can include a `tagFilters` property in your payload. This property references an array of objects, each with the following structure:

* tag  - The name of the tag to filter by
* operator - A comparison operator
* value - The value to compare against

For example, to fetch only the data recorded on the second lap, you can filter on a `LapNumber` tag as follows:

```json
{
    "tagFilters": [{
        "tag": "LapNumber",
        "operator": "Equal",
        "value": "2.0"
    }]
}
```

Note that the value can also be an array, in which case data that matches the chosen operator for any value is returned:

```json
{
    "tagFilters": [{
        "tag": "LapNumber",
        "operator": "Equal",
        "value": [ "2.0", "4.0" ]
    }]
}
```

But also note that multiple filters for the same tag apply in combination, so:

```json
{
    "tagFilters": [{
        "tag": "LapNumber",
        "operator": "Equal",
        "value": "2.0"
    },{
        "tag": "LapNumber",
        "operator": "Equal",
        "value": "4.0"
    }]
}
```

Is incorrect because a LapNumber cannot be both "2.0" and "4.0".

### Supported operators

Each object in the `tagFilters` array can support the following `operator` values:

* Equal
* NotEqual
* Like
* NotLike

`Equal` and `NotEqual` test for true/false exact string matches.

`Like` and `NotLike` perform a regular expression match, so you can search by pattern. For example, to get the Speed parameter values tagged with a LapNumber which is either 2 or 4, you can use the expression `^\[24\]\\.` to match values 2.0 and 4.0:

```bash
curl "https://telemetry-query-testing-quickstart.platform.quix.ai/parameters/data" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{
         "tagFilters": [{
             "tag": "LapNumber",
             "operator": "Like",
             "value": "^[24]\\."
         }],
         "numericParameters": [{"parameterName": "Speed"}],
         "from": 1612191182000000000,
         "to": 1612191189000000000
     }'
```
