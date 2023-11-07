# Overview

The Query API enables you to fetch persisted data stored in the Quix platform. You can use it for exploring the platform, prototyping applications, or working with stored data in any language with HTTP capabilities.

!!! note

    The Query API is primarily designed for **testing purposes only**. For production storage of data, Quix recommends using one of the numerous [connectors](../../connectors/index.md) to persist data in the database technology of your choice.

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
