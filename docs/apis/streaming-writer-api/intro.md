# Introduction

The Streaming Writer API allows you to stream data into the Quix
platform via HTTP endpoints or SignalR. It’s an alternative to using our
C\# and Python SDKs. You can use the Streaming Writer API from any
HTTP-capable language.

The API is fully documented in our [Swagger
documentation](get-swagger.md). Read on for a
guide to using the API, including real-world examples you can execute
from your language of choice, or via the command line using curl.

## Preparation

If you plan on using the HTTP endpoints, then you’ll need to know how to
[authenticate your requests](authenticate.md)
and how to [form a typical request to the API](request.md).

If you would rather use the SignalR api, which is suggested for high
frequency data streaming, then see [SignalR setup](../streaming-reader-api/signalr.md).

## Topics covered

  - Stream
    
      - [Create a new Stream](create-stream.md)
    
      - [Add Stream metadata](stream-metadata.md)

  - Parameters
    
      - [Send Parameter data](send-data.md)

  - Events
    
      - [Send an Event](send-event.md)
