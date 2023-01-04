# Paged streams

You can fetch all streams within a
[workspace](../../platform/definitions.md#_workspace), across
[topics](../../platform/definitions.md#_topics) and locations, with a
single call. If you’re working with a large number of streams, you can
use pagination parameters to group the results into smaller pages.

## Before you begin

  - If you don’t already have any Stream data in your workspace, you can
    use any Source of our [Quix
    Library](../../platform/samples/samples.md) to set some up.

  - [Get a Personal Access Token](authenticate.md)
    to authenticate each request.

## Fetching all streams

The [`/streams`](#) endpoint provides read access to all streams within
the workspace. Sending an empty JSON object in your request body will
return all streams.

!!! warning

	Even if you’re not supplying any parameters, you must still send a valid empty object as JSON data in the body of your request.

### Example request

``` shell
curl "https://${domain}.platform.quix.io/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d "{}"
```

### Example response

The JSON returned consists of an array of Stream objects:

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
    "metadata":{},
    "parents":[],
    "location":"/static data/"
}]
```

## Fetching streams page by page

To reduce the size of the response, you should page these results with
the [`paging`](#) property. Include this in the JSON object you send in
the body of your request. The value of this property is an object with
two members, `index` and `length`:

  - `index`  
    The index of the page you want returned.

  - `length`  
    The number of items (i.e. streams) per page.

For example, to group all streams in pages of 10 and receive the 2nd
page, use this value:

``` json
"paging": {
    "index": 1,
    "length": 10
}
```

### Example request

``` shell
curl "https://${domain}.platform.quix.io/streams" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d '{"paging":{"index": 1,"length": 10}}'
```
