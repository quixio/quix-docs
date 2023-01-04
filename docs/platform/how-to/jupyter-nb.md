# Use Jupyter notebooks

In this article, you will learn how to use Jupyter Notebook to analyse
data persisted in the Quix platform

## Why this is important

Although Quix is a realtime platform, to build realtime in-memory models
and data processing pipelines, we need to understand data first. To do
that, Quix offers a Data catalogue that makes data discovery and
analysis so much easier.

## Preparation

You’ll need some data stored in the Quix platform. You can use any of
our Data Sources available in the samples Library, or just follow the
onboarding process when you [sign-up to
Quix](https://portal.platform.quix.io/self-sign-up?xlink=docs){target=_blank}.

You will also need Python 3 environment set up in your local
environment.

Install Jupyter notebooks as directed [here](https://docs.jupyter.org/en/latest/install/notebook-classic.html){target=_blank}.

### Create a new notebook file

You can now run jupyter from the Windows start menu or with the following command in an Anaconda Powershell Prompt, or the equivalent for your operating system.

``` shell
jupyter notebook
```

Then create a new Python3 notebook

![how-to/jupyter-wb/new-file.png](../images/how-to/jupyter-wb/new-file.png)

## Connecting Jupyter notebook to Data Catalogue

The Quix web application has a python code generator to help you connect your Jupyter notebook with Quix.

You need to be logged into the platform for this:

1.  Select workspace (you likley only have one)

2.  Go to the Data Explorer

3.  Add a query to visualize some data. Select parameters, events, aggregation and time range

4.  Select the **Code** tab

5.  Ensure **Python** is the selected language

![how-to/jupyter-wb/connect-python.png](../images/how-to/jupyter-wb/connect-python.png)

Copy the Python code to your Jupyter notebook and execute.

![how-to/jupyter-wb/jupyter-results.png](../images/how-to/jupyter-wb/jupyter-results.png)

!!! tip

	If you want to use this generated code for a long time, replace the temporary token with **PAT token**. See [authenticate your requests](../../apis/data-catalogue-api/authenticate.md) how to do that.

## Too much data

If you find that the query results in more data than can be handled by
Jupyter Notebooks try using the aggregation feature to reduce the amount
of data returned.

For more info on aggregation check out this [short
video](https://youtu.be/fnEPnIunyxA).
