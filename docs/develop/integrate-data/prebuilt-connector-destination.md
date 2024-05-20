# Using a prebuilt destination connector

This is the easiest method, as no code needs to be written, and there is usually only minor configuration required to get a Quix connector up and running.

You can review the list of connectors in the [connector documentation](../../connectors/index.md). The code for our connectors can be found in the [Quix Code Samples GitHub repository](https://github.com/quixio/quix-samples){target=_blank}. 

Note there are two main types of connector:

1. *Sources*
2. *Destination*

A *source* enables you to get data into Quix, such as data coming from a database or IoT device, to be processed in real time. A source represents an input with respect to Quix. 

A *destination* enables you to get data out of Quix. For example, to store processed data in a relational database for archiving, or to write data to a Streamlit dashboard. A destination represents an output with respect to Quix.

Even if the exact connector you require does not currently exist, it is sometimes possible to adapt one of the existing connectors to suit your needs. For example, the Segment webhook connector could be adapted to suit many different webhook-based services. See the [inbound webhooks page](inbound-webhooks.md) for more information.
