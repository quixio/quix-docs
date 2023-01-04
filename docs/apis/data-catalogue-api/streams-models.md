# Streams with models

One stream can derive from another, for example, acting as a model in a
pipeline. This relationship can be inspected using the `/streams/models`
endpoint.

## Before you begin

  - If you don’t already have any Stream data in your workspace, you can
    use any Source of our [Quix
    Library](../../platform/samples/samples.md) to set some up.

  - [Get a Personal Access Token](authenticate.md)
    to authenticate each request.

## Fetching model data

The hierarchy is represented as a parent/child structure where a stream
can have an optional parent and any number of children.

The `/streams/models` endpoint will return data in the same structure as
[the `/streams` endpoint](streams-paged.md), with
an additional property for each stream: `children`. This is an array of
stream objects which may have their own children.

The payload requirements are the same as those for `/streams`. You can
fetch model information across all streams with an empty payload:

``` shell
curl "https://${domain}.platform.quix.io/streams/models" \
     -H "Authorization: bearer ${token}" \
     -H "Content-Type: application/json" \
     -d "{}"
```

Here’s an example result for a stream with two children:

``` json
[{
    "children": [{
        "children": [],
        "streamId": "79bbed17-5c71-4b0e-99f6-3596577b46d8",
        "name": "new-child",
        "topic": "cars",
        "createdAt": "2021-04-08T15:27:09.19Z",
        "lastUpdate": "2021-04-13T10:21:52.572Z",
        "status": "Open",
        "metadata": {},
        "parents": [
            "66fb0a2f-eb70-494e-9df7-c06d275aeb7c"
        ],
        "location": "/"
    },{
        "children": [],
        "streamId": "f003c1dd-9abe-49dd-afd2-f194d3d96035",
        "name": "example1",
        "topic": "cars",
        "createdAt": "2021-04-12T11:50:38.504Z",
        "lastUpdate": "2021-04-12T12:00:40.482Z",
        "status": "Interrupted",
        "metadata": {
            "rain": "light"
        },
        "parents": [
            "66fb0a2f-eb70-494e-9df7-c06d275aeb7c"
        ],
        "location": "/examples/first/"
    }],
    "streamId": "66fb0a2f-eb70-494e-9df7-c06d275aeb7c",
    "topic": "cars",
    "createdAt": "2021-04-08T14:12:29.807Z",
    "lastUpdate": "2021-04-12T13:45:08.377Z",
    "timeOfRecording": "2021-04-12T00:00:00Z",
    "dataStart": 0,
    "dataEnd": 1618233869000000000,
    "status": "Interrupted",
    "metadata": {},
    "parents": [],
    "location": "/"
}]
```

And here’s an example with a child and a grandchild:

``` json
[{
    "children": [{
        "children": [{
            "children": [],
            "streamId": "79bbed17-5c71-4b0e-99f6-3596577b46d8",
            "name": "new-child",
            "topic": "cars",
            "createdAt": "2021-04-08T15:27:09.19Z",
            "lastUpdate": "2021-04-13T10:30:11.495Z",
            "status": "Open",
            "metadata": {},
            "parents": [
                "f003c1dd-9abe-49dd-afd2-f194d3d96035"
            ],
            "location": "/"
          }
        ],
        "streamId": "f003c1dd-9abe-49dd-afd2-f194d3d96035",
        "name": "example1",
        "topic": "cars",
        "createdAt": "2021-04-12T11:50:38.504Z",
        "lastUpdate": "2021-04-12T12:00:40.482Z",
        "status": "Interrupted",
        "metadata": {
            "rain": "light"
        },
        "parents": [
            "66fb0a2f-eb70-494e-9df7-c06d275aeb7c"
        ],
        "location": "/examples/first/"
      }
    ],
    "streamId": "66fb0a2f-eb70-494e-9df7-c06d275aeb7c",
    "topic": "cars",
    "createdAt": "2021-04-08T14:12:29.807Z",
    "lastUpdate": "2021-04-12T13:45:08.377Z",
    "timeOfRecording": "2021-04-12T00:00:00Z",
    "dataStart": 0,
    "dataEnd": 1618233869000000000,
    "status": "Interrupted",
    "metadata": {},
    "parents": [],
    "location": "/"
}]
```
