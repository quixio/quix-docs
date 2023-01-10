# Filtered streams

To fetch specific streams, you can include various filters with your
request to the `/streams` endpoint.

## Before you begin

  - If you don’t already have any Stream data in your workspace, you can
    use any Source of our [Quix
    Library](../../platform/samples/samples.html) to set some up.

  - [Get a Personal Access Token](authenticate.md)
    to authenticate each request.

## Fetch a single stream via ID

The most basic filter matches against a stream’s ID.

``` bash
curl "https://${domain}.platform.quix.ai/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"streamIds": ["302b1de3-2338-43cb-8148-3f0d6e8c0b8a"]}'
```

Note that you can supply multiple IDs in the `streamIds` array to match
multiple streams.

## Filtering streams on basic properties

The **location** of a stream defines its position in a hierarchy. A
stream location looks just like a filesystem path. You can filter
streams based on the start of this path, so you can easily find streams
contained within any point in the hierarchy. For example, this query
will find streams with a location of `/one` but it will also find
streams with a `/one/two` location:

``` bash
curl "https://${domain}.platform.quix.ai/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"location": "/one"}'
```

!!! warning

	Since this is just a basic prefix match, filtering on a location named `/one` will also bring back matches for the location `/one111` as well as the location `/one/111`. If you want to strictly filter on an exact *directory* (and below), make sure to 	include a trailing slash, e.g. `/one/`.

!!! note

	Filtering on topic uses a case insensitive *Equals* match. Filtering on a topic named "MyTopic" will match "mytopic" but will not match "MyTopic123"

You can filter streams based on their use of a given **parameter** with
the `parameterIds` property. For example, to find all streams that
contain at least one single occurence of `Gear` data:

``` bash
curl "https://${domain}.platform.quix.ai/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"parameterIds": [ "Gear"] }'
```

You can filter based on the presence or absence of a certain stream
**status**, for example, if the stream is `Open` or was `Interrupted`.
The `includeStatuses` and `excludeStatuses` properties each take an
array of values to act on. So to get all streams that aren’t Interrupted
or Closed, use this query:

``` bash
curl "https://${domain}.platform.quix.ai/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"excludeStatuses": [ "Interrupted", "Closed" ]}'
```

## Filtering streams on metadata

You can associate metadata with your streams. This can be used, for
example, to store the circuit a car has travelled around, or the player
of a particular run of a game.

To filter on metadata, include the `metadata` property in the JSON
object in your request body. This property’s value is an array of
objects, each of which has two properties, `key` and `value`:

  - `key`  
    The exact, case-sensitive key of the metadata you’re interested in.

  - `value`  
    The exact, case-sensitive value of the metadata to match on

If you have a metadata entry keyed as "circuit", you can match against
it for an example value with this payload:

``` json
"metadata": [{
    "key": "circuit",
    "value": "Sakhir Short"
}]
```

As before, the response is an array of Stream objects:

``` json
[{
    "streamId":"e6545c18-d20d-47bd-8997-f3f825c1a45c",
    "name":"cardata",
    "topic":"cardata",
    "createdAt":"2021-03-31T13:04:43.368Z",
    "lastUpdate":"2021-03-31T13:04:44.53Z",
    "dataStart":1612191099000000000,
    "dataEnd":1612191371000000000,
    "status":"Closed",
    "metadata":{
        "circuit":"Sakhir Short",
        "player":"Swal",
        "game":"Codemasters F1 2019"
    },
    "parents":[],
    "location":"/static data/"
}]
```

## Ordering results

Calls to the `/streams` endpoint can include an `ordering` property in
the payload. This references an array of properties to sort on, each one
an object with the following properties:

  - by  
    A string representing the property to order by.

  - direction  
    A string, either "Asc" or "Desc", to define the sort direction.

For example, to sort all streams in ascending order by topic:

``` bash
curl "https://${domain}.platform.quix.ai/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"ordering": [{ "by": "topic", "direction": "asc" }]}'
```
