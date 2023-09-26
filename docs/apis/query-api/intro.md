# Introduction

The Query API allows you to fetch persisted data stored in the Quix platform. You can use it for exploring the platform, prototyping applications, or working with stored data in any language with HTTP capabilities.

!!! note

    The Query API is primarily designed for **testing purposes only**. For production storage of data, Quix recommends using one of the numerous [connectors](../../platform/connectors/index.md) to persist data in the database technology of your choice.

The API is fully described in our [Swagger documentation](get-swagger.md). Read on for a guide to using the API, including real-world examples you can invoke from your language of choice, or using the command line using `curl`.

## Preparation

Before using any of the endpoints, you’ll need to know how to [authenticate your requests](authenticate.md) and how to [form a typical request to the API](request.md).

You’ll also need to have some data stored in the Quix platform for API use to be meaningful. You can use any Source from our [Code Samples](../../platform/samples/samples.md) to do this using the Quix portal.

## Further documentation

| Documentation                                | Endpoint           | Examples                                  |
| -------------------------------------------- | ------------------ | ----------------------------------------- |
| [Streams, paged](streams-paged.md)           | `/streams`         | Get all streams in groups of ten per page |
| [Streams, filtered](streams-filtered.md)     | `/streams`         | Get a single stream, by ID                |
|                                              |                    | Get only the streams with LapNumber data  |
| [Streams & models](streams-models.md)        | `/streams/models`  | Get stream hierarchy                      |
| [Raw data](raw-data.md)                      | `/parameters/data` | Get all the `Speed` readings              |
|                                              |                    | Get `Speed` data between timestamps       |
| [Aggregated data by time](aggregate-time.md) | `/parameters/data` | Downsample or upsample data               |
| [Aggregated by tags](aggregate-tags.md)      | `/parameters/data` | Show average Speed by LapNumber           |
| [Tag filtering](filter-tags.md)              | `/parameters/data` | Get data for just one Lap                 |
