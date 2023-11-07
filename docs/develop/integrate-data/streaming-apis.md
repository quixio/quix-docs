# Streaming APIs

Quix provides two Streaming APIs to enable a client (JavaScript or Node.js code) to read from and write to a Quix topic:

1. [Streaming Writer API](../../apis/streaming-writer-api/overview.md)
2. [Streaming Reader API](../../apis/streaming-reader-api/overview.md)

The Writer API is used to write data into Quix, that is, it is used by publishers. The Reader API is used to read data from Quix, and is therefore used by consumers. These are used typically by external services such as web browser client code, or perhaps IoT devices. 

The Streaming Writer API offers both HTTP interface and a SignalR interface. The Streaming Reader API only offers a SignalR interface.

!!! note

    SignalR uses Long Polling or WebSockets for the transport, depending on client support. Most clients support WebSockets.

The WebSockets interface provides a continuous end-to-end connection suitable for higher speed, real-time data transfer. This is a higher performance alternative to the request-response mode of operation of the HTTP interface. The Writer and Reader APIs both use the [Microsoft SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-5.0&tabs=visual-studio) technology to implement the WebSockets interface.

Some example code that shows how to connect to Quix and write data into a Quix stream using the WebSockets interface is shown here:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello WebSockets</title>
    <link rel="stylesheet" href="/style.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"></script>
  </head>
  <body>
    <hr />
    <canvas
      id="myCanvas"
      width="500"
      height="300"
      style="border: 5px solid #00ff00"
      onmousemove="getCursorPosition(event)"
    >
    </canvas>

    <hr />
    <div>Timestamp: <span id="timestamp"></span>.</div>
    <div>X Mouse position: <span id="c_p_x"></span>.</div>
    <div>Y Mouse position: <span id="c_p_y"></span>.</div>
    <button onclick="clearCanvas()">Clear canvas</button>
    <hr />

    <script>
      const token = "<your_pat_token>"; // Obtain your PAT token from the Quix portal
      const environmentId = "<your_environment>";
      const topic = "websocket-topic";
      const streamId = "mouse-pos";

      var mouseX;
      var mouseY;
      var timestamp;

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#00FF00";

      const options = {
        accessTokenFactory: () => token,
      };

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(
          "https://writer-" + environmentId + ".platform.quix.io/hub",
          options
        )
        .build();

      connection.start().then(async () => {
        console.log("Connected to Quix.");
      });

      async function getCursorPosition(event) {
        timestamp = new Date().getTime();
        mouseX = event.clientX;
        mouseY = event.clientY;

        document.getElementById("timestamp").textContent = timestamp;
        document.getElementById("c_p_x").textContent = mouseX;
        document.getElementById("c_p_y").textContent = mouseY;
        ctx.fillRect(mouseX, mouseY, 10, 10);

        let mousePos = JSON.stringify({ x: mouseX, y: mouseY });

        let mousePacket = [
          {
            timestamp: new Date().getTime(),
            tags: {
              mousestatus: "tracking",
            },
            id: "mouse position",
            value: mousePos,
          },
        ];

        console.log("Sending mouse data");
        await connection.invoke("SendEventData", topic, streamId, mousePacket);
        console.log("Sent mouse data");
      }

      function clearCanvas() {
        ctx.clearRect(0, 0, 500, 300);
      }
    </script>
  </body>
</html>
```

This simple example just sends mouse cursor position to a Quix stream when you draw on a canvas.

Code that could read mouse cursor position from a Quix stream is as follows:

``` html
<!DOCTYPE html>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
<html>
  <body>
    <h2>Quix JavaScript Hello WebSockets</h2>

    <canvas
      id="myCanvas"
      width="500"
      height="300"
      style="border: 5px solid #000000"
    >
    </canvas>
    <hr />
    <button onclick="clearCanvas()">Clear canvas</button>

    <script>
      const token = "<your_pat_token>"; // Obtain your PAT token from the Quix portal

      // Set the environment and Topic
      const environmentId = "<your_environment>";
      const topicName = "transform";
      const streamId = "mouse-pos";
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FF0000";

      const options = {
        accessTokenFactory: () => token,
      };

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://reader-${environmentId}.platform.quix.io/hub`, options)
        .build();

      connection.start().then(() => {
        console.log("Connected to Quix");

        connection.invoke("SubscribeToPackages", topicName);

        connection.on("PackageReceived", (data) => {
          let payload = JSON.parse(data.value);
          console.log("DATA (payload): ---->>>", payload);
          console.log(
            "DATA (payload - timestamp): ---->>>",
            payload[0].Timestamp
          );
          console.log("DATA (payload - value): ---->>>", payload[0].Value);
          let mousePos = JSON.parse(payload[0].Value);
          console.log("DATA (payload - value.x): ---->>>", mousePos.x);
          console.log("DATA (payload - value.y): ---->>>", mousePos.y);
          ctx.fillRect(mousePos.x, mousePos.y, 10, 10);
        });
      });

      function clearCanvas() {
        ctx.clearRect(0, 0, 500, 300);
      }
    </script>
  </body>
</html>
```

This code uses the Streaming Reader API to read data from a Quix stream.
