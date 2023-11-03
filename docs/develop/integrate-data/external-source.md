# External source

One simple way to write data into a Quix topic, is to use the prebuilt connector called `External source`. 

To use the `External source` connector, step through the following procedure:

1. In the Quix Portal click on `Code Samples` in the left-hand sidebar. 

2. Search for `External source`. 

3. Click `Add external source`.

4. Select the output topic that you want to publish data to.

5. Give your source a name.

6. Click `Add external source`.

7. In the Pipeline view click the newly created source and the following is displayed:

    ![External source options](../../images/external-source-options.png){width=80%}

8. For this example, select `HTTP API - JavaScript`. Code is generated for you that uses the Streaming Writer API (HTTP interface).

9. Click the `Copy code` button to copy the code to your clipboard. 

You can now paste the code into your JavaScript code, for example, your web browser client code. The code writes data into the Quix topic that you configured.

As you can see there are other options such as generating Curl code that can be run in your shell to also write data into Quix. 

The code samples generated are meant to provide you with a starting point from which you can build your own solutions. They provide a convenient way to see how the API works.

## Next steps

Further information can be found in the [Streaming Writer API](../../apis/streaming-writer-api/index.md) documentation.
