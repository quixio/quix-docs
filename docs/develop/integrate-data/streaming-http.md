# Streaming Reader/Writer APIs - HTTP interface

Quix provides two APIs to enable a client (JavaScript or Node.js code) to read from and write to a Quix topic:

1. [Writer API](../../apis/streaming-writer-api/index.md)
2. [Reader API](../../apis/streaming-reader-api/index.md)

The Writer API is used to write data into the Quix Platform, that is, it is used by publishers. The Reader API is used to read data from the Quix Platform, and is therefore used by consumers. These are used typically by external services such as web browser client code, or perhaps IoT devices. 

!!! note

    The Streaming Reader and Streaming Writer APIs also provide a WebSockets interface, which is described in the [next section](#websockets).

The easiest way to try out these HTTP APIs is to use the prebuilt connectors called `External source` and `External destination`. This section looks at using the `External source` connector, but the process is similar for the `External destination` connector. To use the `External source` connector, step through the following procedure:

1. In the Quix Portal click on `Code Samples` in the left-hand sidebar. 

2. Search for `External source`. 

3. Click `Add external source`.

4. Select the output topic that you want to publish data to.

5. Give your source a name.

6. Click `Add external source`.

7. In the Pipeline view click the newly created source and the following is displayed:

    ![External source options](../../images/external-source-options.png){width=80%}

8. For this example, select `HTTP API - JavaScript`. Code is generated for you that uses the Writer HTTP API.

9. Click the `Copy code` button to copy the code to your clipboard. 

You can now paste the code into your JavaScript code, for example, your web browser client code. The code writes data into the Quix topic that you configured.

As you can see there are other options such as generating Curl code that can be run in your shell to also write data into Quix. 

!!! note

    The code samples generated are meant to provide you with a starting point from which you can build your own solutions. They provide a convenient way to see how the API works.

Further information can be found in the [Writer API](../../apis/streaming-writer-api/index.md) and [Reader API](../../apis/streaming-reader-api/index.md) documentation.
