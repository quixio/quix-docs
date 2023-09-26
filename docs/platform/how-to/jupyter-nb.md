# Use Jupyter Notebook

In this documentation, you learn how to use Jupyter Notebook to analyze data persisted in the Quix platform.

## Why this is important

Although Quix is a real-time platform, to build real-time in-memory models and data processing pipelines, you need to understand data first. To help with that, Quix offers the option to persist data in topics. This data can be accessed using the [Query API](../../apis/query-api/intro.md). This helps make data discovery and analysis easier.

## Prerequisites

You'll need some data stored in the Quix platform. You can use any of the Quix [data sources](../connectors/index.md) available in the Quix Code Samples. 

You can also follow the onboarding process when you [sign-up to Quix](https://portal.platform.quix.ai/self-sign-up?xlink=docs){target=_blank}. This process helps you create a source.

You also need Python 3 environment set up in your local environment.

Install Jupyter Notebook as directed [here](https://docs.jupyter.org/en/latest/install/notebook-classic.html){target=_blank}.

### Create a new notebook file

You can now run Jupyter from the Windows start menu, or with the following command in an Anaconda Powershell Prompt, or the equivalent for your operating system:

``` shell
jupyter notebook
```

Then create a new Python 3 notebook:

![how-to/jupyter-wb/new-file.png](../../platform/images/how-to/jupyter-wb/new-file.png)

## Connecting Jupyter Notebook to persisted data

The Quix web application has a Python code generator to help you connect your Jupyter notebook with Quix.

You need to be logged into the platform for this. To import persisted data:

1. Select an environment.

2. In the main left-hand navigation, click `Data explorer`.

3. Add a query to visualize some data. Select parameters, events, aggregation and time range.

4. Select the **Code** tab.

5. Ensure **Python** is the selected language:

	![how-to/jupyter-wb/connect-python.png](../../platform/images/how-to/jupyter-wb/connect-python.png)

6. Copy the Python code to your Jupyter notebook and click `Run`:

	![how-to/jupyter-wb/jupyter-results.png](../../platform/images/how-to/jupyter-wb/jupyter-results.png)

!!! tip

	If you want to use this generated code for a long time, replace the temporary token with **PAT token**. See [authenticate your requests](../../apis/query-api/authenticate.md) for details on how to do that.

## Too much data

If you find that the query results in more data than can be handled by Jupyter Notebook, then try using the aggregation feature to reduce the amount of data returned.

For more info on aggregation you can watch this [short video](https://youtu.be/fnEPnIunyxA).
