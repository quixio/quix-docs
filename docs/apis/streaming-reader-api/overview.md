# Overview

Quix supports real-time data streaming over WebSockets (or Long Polling depending on client support). 

Clients can receive updates on data and definitions for parameters and events, as they happen. 

Streaming Reader API is typically used by clients written in languages not supported by Quix Streams (which supports Python only), or by other web services and clients that need to subscribe to data from a Quix topic.

!!! note

    The following examples use the Microsoft [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-5.0){target=_blank} JavaScript client library.
