# Overview

Welcome to the Quix Tour! 

The Quix Tour is designed to help you build a complete stream processing pipeline with Quix **in less than 20 minutes**.

## Prerequisites

To complete the Quix Tour you'll need the following:

1. [Python installed](https://www.python.org/downloads/){target=_blank} on your machine.
2. A [free Quix account](https://portal.platform.quix.io/self-sign-up).
3. Complete the [Quickstart](../quickstart.md).
4. (Optional) A free [Vonage API account](https://developer.vonage.com/sign-up).

## CPU overload detection pipeline

The pipeline you implement in this tour:

1. **Ingest** - you publish data from your laptop into Quix using the Quix client library, Quix Streams. You're going to publish your real-time CPU load. You could alternatively publish data from a CSV file, or any other source required for your use case. If you needed to connect to an external service, you could alternatively use one of Quix's many [connectors](../../connectors/index.md).

    !!! note

        You completed this part already in the [Quickstart](../quickstart.md)**.

2. **Process** - in this step, you process your data. There are many [types of processing](../../develop/process/types-of-processing.md), one of which is the transform. There are many possible [types of transform](../../develop/process/types-of-transform.md). Here you create a transform that performs threshold detection. You publish a message to the transform's output topic. 

3. **Serve** - when you receive a message indicating CPU load has exceeded the threshold you (optionally) send an SMS to the system administrator.

!!! note

    The components in the pipeline are connected together by **topics**.

## 🏃‍♀️ Next step

[Add an external source :material-arrow-right-circle:{ align=right }](./external-source.md)
