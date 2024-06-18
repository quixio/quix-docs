---
title: "The what, why and how of event-driven programming "
date: 2023-10-06
authors: [tomas-neubauer]
slug: what-why-how-of-event-driven-programming
description: >
  Read about the fundamentals of event-driven programming (EDP): key concepts, advantages, and challenges. Discover EDP use cases and technologies, and learn about the relation between EDP and event-driven architecture (EDA). 
categories:
  - industry-insights
---

# The what, why and how of event-driven programming 

Read about the fundamentals of event-driven programming (EDP): key concepts, advantages, and challenges. Discover EDP use cases and technologies, and learn about the relation between EDP and event-driven architecture (EDA). 

<!-- more -->

## What is event-driven programming?

Event-driven programming (EDP) is a programming paradigm where external events

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
determine the flow of program execution. These events come in different

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
shapes: user actions (e.g., button clicks, keyboard inputs), system events

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
(like a finished file download), messages from other programs, sensor outputs,
etc.

Unlike procedural and sequential programming (which generally follow
predefined execution steps or sequences), in EDP, the program waits (listens)
for events and reacts to them as they occur, by using appropriate event-

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
handling procedures. This allows for greater flexibility and responsiveness in
applications.  

It’s worth noting that event-driven programming is often asynchronous, and
it’s particularly popular in graphical user interfaces (GUIs), real-time apps,
and IoT use cases.

EDP typically goes hand-in-hand with event-driven architectures (EDA). While
EDA defines how multiple (and different) programs interact and communicate via
events, EDP provides the means to implement the specific logic and behaviors

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
within a program in response to events. That’s not to say that all components

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
that comprise an EDA need to follow the EDP paradigm; however, adopting event-
driven programming where suitable can lead to more efficient and responsive
systems within the overarching EDA. I won’t go into more details here, but
please see the “Event-oriented architecture: e-commerce example” section
towards the end of this article to better understand how EDP works as a part
of a wider EDA.

If you’re here because you’re planning to build an event-driven application, I
recommend the “[**Guide to the Event-Driven, Event Streaming
Stack**](https://www.quix.io/event-driven-event-streaming-
guide?_ga=2.244169030.299408049.1706024281-1054807313.1689840321),” which
talks about all the components of EDA and walks you through a reference use
case and decision tree to help you understand where each component fits in.

## Key concepts of event-driven programming

This section walks you through the core components involved in event-driven
programming.

### Events

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

An event refers to a significant occurrence or change in state within a system
or application. In simpler words, an event records that something has
happened. Here are some common examples of events:

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

  * A user clicks a button in the UI.
  * Someone makes an online payment.
  * A user sends a chat message.
  * A smartwatch detects an irregular heartbeat.
  * A sensor reports a vehicle’s location and speed has changed.
  * A record is inserted, updated, or deleted in a database.
  * An application is starting or shutting down.
  * A warning that disk space is running low.

Here’s an event that signifies a vibration recorded by a sensor installed on a
machine used in manufacturing:

In this example:

  * **eventId** is the unique identifier specific to this vibration recording.
  * **eventType** specifies the type of event.
  * **timestamp** indicates the exact date and time when the event occurred.
  * **source** and **sensorLocation** indicate the origin of the event.
  * **data** contains the actual readings from the sensor and other relevant metrics.
  * **metadata** provides additional information about the sensor.
  * **systemMessage** is a human-readable alert or notice about the event. 

Collecting such [telemetry](https://quix.io/blog/telemetry-data-explained)
events enables the manufacturing company to monitor its machines in real time

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
and detect issues in production lines as soon as they occur. This way, the
manufacturer can quickly react and follow the appropriate course of action
(i.e., investigate the machine and perform maintenance, if needed).  

### Producers and consumers

```py
const button = document.getElementById('myButton');
button.addEventListener('click', handleButtonClick);
```

Producers are sources of events in a system. They generate events to signify

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
that something of interest has occurred. In the example provided in the
previous section of this article, the sensor that measures vibrations is the
event producer.

Meanwhile, consumers listen for events generated by producers. To continue our

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
example, if the vibration sensor is the producer, the consumer could be, for
instance:

  * A monitoring system designed to analyze and visualize real-time vibration data, history, and trends. 
  * An alerting system that sends automated alerts via email, SMS, or other means to maintenance teams.
  * A database or data storage system that stores the vibration readings for historical analysis, reporting, or compliance purposes. 
  * All of the above (you can have multiple and different types of components/systems consuming an event).

It’s also worth mentioning that, depending on the use case, an event producer
can also be a consumer. Think, for example, of chat apps. If you send a chat
message (an event), you are the producer. On the other hand, if you receive a
chat message, you are the event consumer.

### Event listeners, event handlers, and the event loop

```py
const button = document.getElementById('myButton');
button.addEventListener('click', handleButtonClick);
```

An event listener is a procedure or function in a computer program that waits
for an event to occur. Here’s an example in JavaScript:

In the snippet above, we’re attaching an event listener to a button
(‘**myButton** ‘). The **addEventListener** method listens for a ‘**click** ‘
event and associates it with the **handleButtonClick** callback function.

**handleButtonClick** is the event handler — the actual code that gets
executed in response to the ‘**click** ‘ event. Here’s a possible
implementation:

On button click, this trivial event handler will display an alert to the user
saying ‘**Hello world!** ‘

Note that you will often see these two terms (event listener and event
handler) being used interchangeably. However, as we have just seen, there is a
distinction between them:

  * The event listener listens for events and specifies which function to call when an event occurs.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * The event handler is the actual callback function that gets executed in response to the event. 

Being aware of this distinction is important for several reasons:

  * **More efficient troubleshooting.** When debugging, it's essential to know if an issue lies in the event listening mechanism (the event isn't being captured) or the event handler (the response isn't as expected).
  * **Flexibility and modularity**. Multiple event listeners can trigger the same event handler, and vice versa, a single event listener can trigger different event handlers based on certain conditions. Grasping the distinction between handlers and listeners allows for more flexible and modular coding practices.
  * **Clarity in collaboration**. It’s crucial to have clear, shared terminology at a team level. Misunderstandings can arise if one person is discussing a handler while someone else believes they’re talking about a listener.

Before moving on from event listeners and handlers, it’s important to say a
few words about the event loop. Numerous runtimes and frameworks (e.g.,
JavaScript/Node.js or Python’s asyncio library) use an event loop as a sort of
intermediary between event listeners and event handlers. Here’s how it works:

  1. Event listeners detect incoming events and place them in an event queue. 

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  2. The event loop mechanism continually checks for queued events and calls the corresponding event handler for each event. 

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

![Left to right schema showing event's progress.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6526490fbbc463ad1ee6ea3b_Event%20loop%20overview.png)

_Event loop overview_

One of the main benefits of the event loop is that it enables concurrent
execution and non-blocking I/O operations when you’re working with single-
threaded programming languages and runtimes.

### Queues and topics

When dealing with high volumes of data and numerous producers and consumers in

```py
const button = document.getElementById('myButton');
button.addEventListener('click', handleButtonClick);
```
a distributed environment, it’s common practice to use some sort of messaging
middleware to intermediate the flow of events between different components.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
We’ll talk about the different types of messaging middleware later in this
article; for now, suffice to say that messaging middleware technologies
generally use topics and message queues to route events from producers to

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
consumers:

  * **Message queues**. A message queue temporarily stores messages (events) generated by producers, ensuring they are processed in a specific order, often first-in-first-out (FIFO) by a consumer. As events occur, they are added to the back of the queue. Once a consumer processes the event, it’s deleted from the queue. There can be multiple producers publishing events to a queue; however, on the consumer side, there is a single entity consuming each message (point-to-point messaging). _Note_ : _do not confuse message queues with event queues I mentioned earlier when talking about the event loop. While an event queue_ _helps manage and execute tasks (like functions or callbacks) in an event-driven application, a message queue helps manage and transmit events between different instances, applications, and systems._

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Topics**. A topic is a communication channel specific to publish-subscribe (pub/sub) messaging systems. Producers publish events to topics, and multiple consumers can subscribe to topics to receive events. Unlike queues, events sent to a topic can be consumed by multiple consumers, (one-to-many communication). Some messaging middleware solutions allow you to retain events in topics for long periods of time, even after they were delivered to consumers (this is not generally the case with queues).  

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

![Queue and topic schema.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6526493d328e02bdbf4de951_Message%20queues%20vs%20topics.png)

_Message queues vs. topics_

Message queues and topics bring many benefits, such as:

  * **Decoupling**. They introduce a level of decoupling between producers and consumers. This means changes in one won't directly impact the other. Decoupling allows different parts of the system to scale, evolve, and be maintained independently.

```py
const button = document.getElementById('myButton');
button.addEventListener('click', handleButtonClick);
```
  * **Parallel processing**. Multiple consumers can process events concurrently, optimizing throughput, reducing processing times, and improving responsiveness.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Asynchronous communication**. Queues and topics allow non-blocking data exchange between producers and consumers. This means producers aren't held up waiting for a response, which leads to efficient workflows and improved system performance.

```py
const button = document.getElementById('myButton');
button.addEventListener('click', handleButtonClick);
```
  * **Load leveling**. Queues and topics act as buffers, preventing sudden bursts from overwhelming processing units, and ensuring smooth operation.
  * **Reliable event delivery.** Queues generally guarantee the order of delivery, ensuring that sequences of events are processed in the correct chronological order. Meanwhile, topics can guarantee ordering within specific conditions or configurations (e.g., at a partition level, or across events that share the same key). Additionally, topics and queues offer guarantees around event delivery, even during system failures — unprocessed messages can be resent, which helps prevent data loss.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

## Advantages and challenges of event-driven programming

EDP brings significant advantages to developers and organizations. Here are
the key ones:

  * **Responsive applications**. When an event occurs, predefined handlers or callbacks are invoked instantly. This ensures that user inputs or system triggers receive prompt feedback, in real time. In addition, many EDP apps use asynchronous, non-blocking operations, especially for I/O tasks. In other words, instead of waiting for a task to complete, the app can continue processing other events. This ensures the app remains responsive even if it’s handling potentially time-consuming operations.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Concurrency and scalability**. Event-driven systems can process more than one event at a time, which allows them to deal with numerous simultaneous user interactions or system events. Events can be distributed and processed by multiple consumers in parallel. This means it’s possible to handle large volumes of events without relying on a single consumer, who could be a bottleneck that slows down the system.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Modularity**. Event-driven programming creates a framework where software components are modular, with clearly defined responsibilities (for instance, each type of event is usually handled by a corresponding event handler). Due to this separation of concerns, you can add, remove, modify, and reuse components without affecting other parts of the system.  
  * **Efficient resource usage**. By reacting only when events occur, event-driven systems avoid the wastefulness and overhead of constant polling. This leads to more efficient CPU and memory utilization (on-demand resource usage).

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

While EDP offers plenty of benefits, it also comes with challenges, such as:

  * **Code complexity.** Asynchronous code can be hard to understand and debug. In addition, layering multiple events and callbacks can lead to convoluted code.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Testing is non-trivial.** Emulating real-world event sequences for testing can be difficult. 
  * **Ordering issues**. Events may not always execute in the desired order. Race conditions can cause unpredictable results, data corruption, and system instability.**‍**

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * **Steep learning curve**. Developers who are new to EDP may experience a steep learning curve, particularly when learning complex topics like concurrency behaviors.

## Event-driven programming use cases

There are numerous real-world applications for EDP. Here are the most popular
use cases:

## Event-driven programming technologies

The rise of real-time applications, and the need for scalable, responsive
systems has led to the emergence and adoption of a wide range of technologies
optimized for event-driven programming and event-driven architectures.

### Programming languages

You can implement event-driven programs in any programming language. However,
some languages and their ecosystems (e.g., C#, JavaScript, Python, Ruby)
naturally offer more streamlined tools, libraries, and frameworks to simplify
the development of event-driven applications.

  * **Examples** : C# (async/await), JavaScript (Node.js), Python (asyncio, Tornado, Twisted), Ruby (EventMachine).

### Communication protocols

Push-based protocols are generally a good fit for event-driven programming,
because they ensure that as soon as an event is generated, it's immediately
delivered to the consumer without waiting for them to request it. This leads
to reduced latency and efficient resource utilization (there’s no need for
constant polling, which is computationally expensive).

  * **Examples** : WebSockets, Server-Sent Events (SSE), Message Queuing Telemetry Transport (MQTT), Advanced Message Queuing Protocol (AMQP). 

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

### Event streaming platforms

An event streaming platform is a system designed to handle the continuous flow
of data, allowing for the production, persistent storage, and consumption of
streams of events in real time. Event streaming platforms are the backbone of

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
event-driven programming in distributed environments, bridging event producers
with consumers efficiently, and allowing them to react to events as soon as

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
they occur.  Event streaming platforms can generally handle very high volumes
of [streaming data](https://quix.io/blog/data-streaming-faq), allowing the
system to scale up as the event load increases.

  * **Examples** : Apache Kafka, Apache Pulsar, Amazon Kinesis, Redpanda.

Learn how some of these event streaming platforms compare:

  * [Kafka vs. Kinesis](https://quix.io/blog/kafka-kinesis-comparison)
  * [Kafka vs. Pulsar](/blog/kafka-vs-pulsar-comparison)
  * [Kafka vs. Redpanda](/blog/redpanda-vs-kafka-comparison)  

### Stream processing solutions

[Stream processing](/blog/response-gartners-market-event-stream-processing)
complements event streaming. While event streaming platforms continuously
collect, store, and deliver events from producers to consumers, stream

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
processing is a complementary technology that allows you to analyze and
transform (e.g., aggregation, windowing, deduplication, joining) streams of
events in real time.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

  * **Examples** : Quix Streams, Kafka Streams, Amazon Kinesis Data Analytics, Google Dataflow, Apache Beam, Apache Spark, Apache Flink.

See how some of these stream processing solutions compare:

  * [Apache Beam vs. Apache Spark](/blog/beam-vs-spark-big-data-solutions-compared)
  * [Apache Flink vs. Kafka Streams](https://quix.io/blog/kafka-vs-flink-comparison#comparing-flinks-api-with-the-kafka-streams-api)
  * [Apache Spark vs. Apache Flink vs. Quix Streams](/blog/compare-client-libraries-spark-flink-quix)
  * [Spark Structured Streaming vs Kafka Streams](https://quix.io/blog/kafka-vs-spark-comparison)

### Event buses

You can think of an event bus as a routing middleware that receives events and

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
delivers them to one or more destinations. Event buses are generally well-
suited for routing events from many sources (producers) to many targets

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
(consumers). Unlike event streaming platforms, event buses usually deliver
events in a fire-and-forget way (data isn’t stored for long periods of time).

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
Another difference is that event buses allow for better, more efficient event
filtering and routing compared to event streaming platforms. The tradeoff is
that event buses are not generally geared toward the same levels of
scalability and huge data volumes as event streaming solutions.

  * **Examples** : Amazon EventBridge, Eventarc, Azure Event Grid.

### Message queuing services

Message queues help you implement asynchronous, point-to-point communication.
A queue temporarily stores events generated by producers, ensuring they are

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
processed in a specific order, often first-in-first-out (FIFO) by a consumer.
As events occur, they are added to the back of the queue. Once an event is

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
processed by a consumer, it’s deleted from the queue. Message queuing services
are especially vital in environments where multiple events can occur

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
simultaneously or nearly so, and they must be processed in a specific order.

  * **Examples** : RabbitMQ, ActiveMQ, Amazon SQS, Azure Queue Storage.

If you’re curious to see how event queuing services compare to event streaming
platforms, check out the following:

  * [ActiveMQ vs. Kafka](/blog/activemq-vs-kafka-comparison)
  * [RabbitMQ vs. Kafka](/blog/apache-kafka-vs-rabbitmq-comparison)

### Pub/Sub messaging services

Although they both fall within the pub/sub paradigm, a pub/sub messaging
service differs from an event bus. An event bus usually includes centralized
routing rules based on the content of each event (message), whereas a pub/sub
messaging service does not. Instead, a pub/sub service broadcasts the same
event to all subscribers of a specific topic. Message routing is managed
through decentralized subscriptions to topics rather than centralized rules,
and there usually isn't any in-built filtering based on message content.

Note that event streaming platforms like Apache Kafka also belong to the
pub/sub paradigm, but can support more advanced use cases out of the box. In
contrast, pure pub/sub messaging services mainly focus on one simple task:
delivering messages reliably from producers to consumers.

  * **Examples** : Azure Service Bus, Amazon SNS, Google Pub/Sub.

### Event stores

An event store is a specialized database or storage system optimized for
storing and querying event-driven data. Unlike traditional databases that
store the current state of data entities, an event store captures the full
series of state-changing events over time. Each event in the store represents

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
a state transition, carrying information about the change, its cause, and a
timestamp. This sequential log of events enables event sourcing, a pattern

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
where the application state is reconstructed by replaying the events.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

  * **Examples** : DynamoDB, Google Datastore, Azure CosmosDB, EventStoreDB, Axon Server.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

## Event-oriented architecture: e-commerce example

At the beginning of this article, I mentioned that event-driven programming
often goes hand-in-hand with event-driven architecture. We’ll now look at an
example to see how these two concepts work together to deliver a system that
reacts to events as they occur, in real time.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

We’ll use an online shop as an example. When customers (event producers)
submit orders, **OrderPlaced** events are generated. An event streaming

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
platform then ingests these events.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

The event streaming platform then sends **OrderPlaced** events to:

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

  * An event store, for long-term storage. This is useful for event sourcing, analytics (e.g., analyzing historical order data to understand buying patterns), and auditing.    
  * A payment service, which consumes the events to process customer payments. 

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

![Event-oriented architecture schema in e-commerce.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/652649fd328e02bdbf4f284e_Event-
oriented%20architecture%20e-commerce.png)

_Event-oriented architecture in e-commerce_

The payment service has an event listener (**OrderListener**), which listens
for events and triggers an event handler (**PaymentHandler**) to initiate the

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
payment process.  Once a payment is processed, the service emits a
**PaymentProcessed** event, which is sent to the event streaming platform, and
from there, forwarded to the customer, as payment confirmation.

We then have another component, a warehouse service. This service consumes
**PaymentProcessed** events from the event streaming platform. Similar to the

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
payment service, the warehouse service has an event listener
(**ShipmentListener**) that listens for events. The event listener triggers an

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
event handler (**ShipmentHandler**) which initiates the shipping process and
sends a notification to the customer, so they are aware their order will soon
be underway.

In this architecture, as events flow through the system, each service can work

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
asynchronously, improving scalability and resilience. If, for instance, the
payment service goes down, orders can still be placed. Once the payment
service is back, it can pick up from where it left off, ensuring no order is
missed — the event streaming platform can store **OrderPlaced** events as long

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
as needed for the payment service to consume them (plus, they are also stored
in the event store).

Bear in mind that this is a simplified architecture — the point was to
showcase how EDA and EDP work together in an easy-to-understand way. In a
real-life scenario, the architecture would be more complex. We’d likely have:

  * Additional services that follow the EDP paradigm (e.g., fraud detection service, inventory checker service, recommendation engine to send recommendations to shoppers).
  * More types of events (for instance, **FraudCheckCompleted** to signal the result of a fraud detection process, or **InventoryChecked** events, which are fired after verifying product availability). Additionally, all types of events could be pushed to the event store for long-term storage.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * Extra components, such as a stream processing solution (it would allow you, for instance, to join **OrderSubmitted** and **InventoryChecked** events to ensure stock is available before initiating the payment process). 

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```

## Simplify event-driven development with Quix

Quix enables you to develop, release, and observe scalable event-driven apps
without having to worry about complex infrastructure and configuration. Under
the hood, Quix combines containerized microservices with Docker, Kafka, and
Git — all of this is fully managed, so there’s no infrastructure provisioning,
setup, and maintenance nightmare for you to deal with. Instead, you can focus
entirely on writing your apps and deploying them to production. Among other
features, Quix offers:

  * Open source connectors, so you can easily ingest events from different sources and stream them to various destination systems.

```py
{
  "eventId": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "eventType": "VibrationRecorded",
  "timestamp": "2023-09-29T16:30:25Z",
  "source": "VibrationSensor",
  "sensorLocation": "Motor Assembly Line B, Conveyor Unit 4",
  "version": "v1.2",
  "data": {
    "sensorId": "VB-42345",
    "vibrationLevel": 12.5,
    "baselineVibrationLevel": 4.0,
    "unit": "m/s²",
    "difference": 8.5
  },
  "metadata": {
    "model": "VibroMonitor Pro X1",
    "calibrationDate": "2023-06-15"
  },
  "systemMessage": "Vibration level recorded exceeds the acceptable threshold. Immediate inspection required."
}
```
  * Online IDE and open source code samples.
  * Stream processing capabilities.
  * Multi-environment support, baked in CI/CD, and Git integration. 
  * Built-in observability, e.g., dashboards to monitor metrics and logs, a graphical snapshot of your app’s architecture.  

To learn more about what Quix can do for you, [check out the official
documentation](https://quix.io/docs/index.html).




## Guide to the Event-Driven, Event Streaming Stack
Practical insights into event-driven technologies for developers and software architects

[Get the guide](https://www.quix.io/event-driven-event-streaming-guide)


