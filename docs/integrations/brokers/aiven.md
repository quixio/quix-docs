# Aiven

Aiven for Apache Kafka® is a fully managed distributed data streaming platform, deployable in the cloud of your choice.

Quix fully supports using Aiven for your Kafka broker. Quix adds value by providing powerful, but simple to use, stream processing capabilities in Python.

## Prerequisites

* Log in to your Aiven account, or [sign up](https://aiven.io/kafka){target=_blank}.
* Review the Quix [broker settings documentation](./broker-settings.md).

## Quix setup guide

To obtain the Service URI:

1. Navigate into your Kafka Service.

2. Look for the URI in the `Connection information` section.

Set your `Cluster Size`. This number is used to limit the replication factor of the topics. 

    !!! tip

        You'll find it in the `Services overview` section of your Aiven account.

To complete the SASL authentication information:

1. Make sure that SASL is enabled in the `Advanced Configuration` section.

2. Copy the user and password from the `Connection information` section.

To configure the SSL/TLS encryption section: 

1. You must provide a CA Certificate file (zip, pem or cart) containing the Certification Authority certificate.

!!! note

    You can also choose to synchronize topics. This will make any Aiven topics you might have available in your Quix environment.

When all information has been provided click the `Test Connection` button.
