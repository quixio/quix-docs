---
title: Deploying Connectors
description: Deploy Connectors to Quix Cloud to integrate with external systems.
---

# Deploying Connectors

[Connectors](../quix-connectors/templates/index.md) allow you to quickly connect with other systems. 

Follow these steps to find and deploy a connector:

1. Ensure that you are logged into Quix Cloud.
2. Click the `Connectors` tab in the nav.
3. Search for the connector you require (e.g. BigQuery)
4. Click `Set up connector`.
5. Populate the connection details required for the connector.
6. Click `Test connection & deploy`


## Customizing Connectors

You may wish to alter how the connector works, for example you might want to prepend data with your own unique values or change the size of each batch pushed to a downstream system.

To do this you can clone the connector code to your own repository.

Follow these steps to clone a connector, ready for modification:

1. Ensure that you are logged into Quix Cloud.
2. Click the `Connectors` tab in the nav.
3. Search for the connector you require (e.g. BigQuery)
4. Click `Set up connector`.
5. Click `Customise connector`.
6. Provide a name for the connector or accept the default.

You can now edit the code in the online IDE or pull the code to your local machine and work there.

Note: You will not affect the code in the Connectors library and no-one outside of your organization will recieve your code updates.

If you'd like to contribute code or fixes to connectors or code samples please contact us.