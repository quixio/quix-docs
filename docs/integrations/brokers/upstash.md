# Upstash

Upstash Kafka is the only serverless Kafka offering with per request pricing. Use Upstash as much as you need, you'll never pay more than the cap price, guaranteed. 

Quix fully supports using Upstash for your Kafka broker. Quix adds value by providing powerful, but simple to use, stream processing capabilities in Python.

## Prerequisites

* Log in to your Upstash account, or [sign up](https://upstash.com/){target=_blank}.
* Review the Quix [broker settings documentation](./broker-settings.md).

## Quix setup guide

First, access the Upstash console.

To obtain the Service URI:

1. Navigate into your Kafka cluster.

2. Look for the URI in the details section.

Set your Cluster Size. This number is used to limit the replication factor of the topics.

To complete the `SASL authentication` information:

1. Make sure that the credentials have full access permissions.

2. Copy the user and password from the credentials section.

!!! note

    You can also choose to synchronize topics. This will make any Upstash topics you might have available in your Quix environment.

When all information has been provided click the `Test Connection` button.
