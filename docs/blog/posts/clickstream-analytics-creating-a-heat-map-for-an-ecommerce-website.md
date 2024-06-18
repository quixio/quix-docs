---
title: "Clickstream analytics: creating a user interaction heat map for an e-commerce website"
date: 2024-04-18
authors: [jack-murphy]
slug: clickstream-analytics-creating-a-heat-map-for-an-ecommerce-website
description: >
  See Quix Streams in action by vizualizing mouse movement patterns in real-time using hopping windows. A Python data streaming tutorial for web analytics. 
categories:
  - tutorials
---

# Clickstream analytics: creating a user interaction heat map for an e-commerce website

See Quix Streams in action by vizualizing mouse movement patterns in real-time using hopping windows. A Python data streaming tutorial for web analytics. 

<!-- more -->

Your website produces content every hour and you want to respond dynamically,
perhaps with tailored offers and targeted advertising, perhaps by emphasizing
popular content and removing unpopular content.

With all of these cases you need a user interaction heat map, and the optimal
solution is built using a stream processing pipeline. You _could_ use a third-
party solution such as HotJar, but then your data will be stored in a database
and queried afterwards, which creates latency unacceptable for your use case.
Similarly, if you’re processing large quantities of data, you’ll face high
costs from your vendor.

In sum, you’ll be relying on batch processing when your use-case requires
stream processing. In this tutorial you will see how the Quix Streams library
enables you to work dynamically with your live data while reducing both costs
and latency.

After setting up this project within your Quix account you’ll have access to
the Python files within this application. By forking the repo, you’ll be able
to play around with the project and even use it as a template for your own
clickstream analysis.

## Revealing the cursors

The pipeline we’re going to create collects data from a fictional e-commerce
web page and aggregates all users' mouse coordinates to produce a heat map.
The coordinates are gathered four times a second. The heatmap is then overlaid
on the original site which provides a visualization of the 'hottest' areas on
each page.

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662abc67bf8c06959bedc47b_heatmap_contrast.png)

Note: the colors have been made brighter here for illlustrative purposes

Here we see the heat map in action. Now we’re able to glean insights. These
customers were initially interested in the Playstation 5 game before realizing
that the MacBook is being sold for $60.84!

Let’s see how this is built.

### **What you’re going to need**

```py
.update
```

  * A GitHub account
  * A Quix account (which you can sign up for[ here](https://portal.platform.quix.io/self-sign-up) and receive $300 free credit)

### **What you’re going to learn**

```py
.update
```

  * How to string together applications through topics
  * The `.update` and `.to_topic` __ methods within Quix Streams
  * How to re-key a topic
  * How to aggregate a value
  * The concept of a hopping window
  * The `.hopping_window`, `.reduce` and `.final` methods**‍**

## ‍**Getting it up and running**

To get you set up and ready to go, follow this blog:

[https://www.quix.io/blog/how-to-create-a-project-from-a-template#cloning-a-
project-template-into-github](https://www.quix.io/blog/how-to-create-a-
project-from-a-template)

‍

### Key Code Segments

```py
"session_id"
```

Once set up is complete you'll be able to see the pipeline for the
"Clickstream analytics heat map" project:

![__wf_reserved_inherit](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6628383cccc3699f30658ac2_pipeline.png)

In summary, the **Demo Frontend** is where the mouse information is generated.
Through the **Clickstreams Web Sockets** the data enters the pipeline. The
mouse information is then grouped by webpage (**Group By)**. **Heatmap

```py
import os
from quixstreams import Application
from dotenv import load_dotenv
load_dotenv()


app = Application.Quix("group-by-v1", auto_offset_reset="earliest")


input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])


sdf = app.dataframe(input_topic)


sdf = sdf.update(lambda row: print(row))


sdf = sdf.to_topic(output_topic, key=lambda key: key["relative_path"])


if __name__ == "__main__":
   app.run(sdf)
```
aggregator** splits the main webpage into fifty tiles and then**** counts the
number of times any customer’s mouse has appeared in each tile, within the
past five minutes. That data, through the **Heatmap Web Sockets** , is then
sent to **Heatmap frontend** which, you guessed it, displays a heat map over a
webpage, that webpage being identical to **Demo frontend**.

With that understanding in place we can now dig deeper and look at key code
segments.  

### Demo Frontend - Clickstream Web Sockets

```py
"session_id"
```

In order to see the code for **Demo frontend** click on the application:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832db5d9d660265698372_wvUu-
ADQi6lMzXeuXQ7TSJmGKuLy2uvGZDfeOAye6otDnB-J8ldXUlTkB49wiZgWuNqdIu5CzuT1qOTXd_5E8ogwQSfGLLnqRij2eqGq6pLPHIMwJ2tT4-ePVC8jWNjRBO06Y506QxHa5D08T2S17vI.png)

Then click on ‘Edit code’

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832dcd33b96477ec00628_TKiSaifuyZ4QR2EWUocLxJpNvoWtE_lNONU4rtdnhmXXer1_jLK1je1AbbmvVJgV2DTGxKieziVYkK0PP8-2lU9kgFe7heSleT6yHhYmeywAbZ_IrJ82loCAjwm-
aePXe4rfFOlrywV_5HL_6iHA9Xw.png)

The mouse coordinates are gathered on the UI via the tracking.js file (found
at src//tracking.js.). Within that file the payload variable defines the
properties of the JSON schema. Properties which are relevant downstream
include: the `"session_id"`, `"the page_url"`, the window dictionary:
`{“width” and “height”}`, and the mouse-coordinates dictionary: `{“x” and
“y”}`.

‍

This JSON is sent via the Clickstreams Web Sockets to the “clickstream” output
topic.

If you haven’t already, open the **Demo frontend** and move your mouse around
the web page.**** This will generate a message similar to this:

‍

In order to see messages like this, navigate to the **Topics** tab within the
navigation bar on the left hand side of the screen.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832db393cd90f5b61337d_dbGctSxdIL6Y4h46Bo9pgelX_4u2-T2DdlPegSTd0jLPy4IqG47lohBl__S2LAJDlbTnfTtg230U1yCIy1_Xx47mXMo-X3JuOkbHIwGK8Itvohyx1cDsMxS0YHPggcNj
--fmT8ecDguQrplvrtYGAEY.png)

Click on the “clickstream” topic and once on that page set the offset to
“newest” in order to see your messages:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832dc04a94316d642f37a_MrynBAwqsZAj0Klde36rp6ZmNi55492qFFpASQQdqpReOj6LfIlU8z4ctQZLYn9zGsv4qZqk1Tfkd9ynj41yUwag5-g1KR9w9OuT5XO_Q6vJXc1z97OcSEoSs0g7dele-
SKfucQPSKwDvUMEEtBmknU.png)

(Switching the offset to “Live Messages” is a great way to see the data in
motion if you head back to the Frontend web page and move your mouse)

### Group By

```py
import os
from quixstreams import Application
from dotenv import load_dotenv
load_dotenv()


app = Application.Quix("group-by-v1", auto_offset_reset="earliest")


input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])


sdf = app.dataframe(input_topic)


sdf = sdf.update(lambda row: print(row))


sdf = sdf.to_topic(output_topic, key=lambda key: key["relative_path"])


if __name__ == "__main__":
   app.run(sdf)
```

As it stands the data stream contains all mouse movements from the home page
and from the individual product pages. A user interaction heat map using this
data would provide no insights.

The **Group By** application allows us to repartition the stream using each

```py
import os
from quixstreams import Application
from dotenv import load_dotenv
load_dotenv()


app = Application.Quix("group-by-v1", auto_offset_reset="earliest")


input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])


sdf = app.dataframe(input_topic)


sdf = sdf.update(lambda row: print(row))


sdf = sdf.to_topic(output_topic, key=lambda key: key["relative_path"])


if __name__ == "__main__":
   app.run(sdf)
```
page’s URL. It allows each web page in the heat map frontend to receive only

```py
Application
```
relevant data from the client-facing website.

Let’s look at the code.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832db393cd90f5b613381_ywGDQc1Iad3hw_E84csIj9IniEs21E4Hl9Kzh-
km3pgpd9kJar6XmZG_-gl4RGQp7Xv8ksXl-
TYLl9nRqTLueKd7TTQ72Hh4J13_Gj8Vj5LCbnftHwgo0qVPdyT1mW1ptSjTl_QCjR_jfJZ1fjOnUDg.png)

‍

‍

From the [Quix Streams library](https://github.com/quixio/quix-streams) we
import the `Applications` module. This module provides methods and classes
which together give you immediate access to your data in Kafka alongside
simplified functionality for working with your data in real time.

The input and output topics are defined within Quix Platform:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832dbf29ac9aa04c761c3_T6XuaqcPUddDWyVAjE4nxTrWj5FdS9PifsNx3VFtM0VEUSWRAl7qtYUSQMEfyCDXJuvwndb1IJ-
vFfVYfgqF8GX0qVBtD9vLuFp2JGTIcEWvM7W85VZjuh8d0ZgtRR9-cRdsbNdR5EdfXkPnIALwxNs.png)

The `sdf`****(streaming dataframe) is a class within the
__`Applications`module. It allows us to interact with the messages within the
clickstream input topic. You can read more about the streaming dataframe
[here](https://quix.io/docs/quix-streams/api-
reference/dataframe.html#streamingseriesabs).

The `sdf.update` method runs code on each row in the dataframe/ message in the
Kafka topic. This line prints every row for debugging purposes.

With the debugging in place, the `sdf.to_topic` method sends the messages to
the predefined output topic. The `"key"` argument applies a lambda function
which alters each message’s key, previously set by the `“session_id”`, but now
set by the message’s `“relative_path”` property.

To see this, go to the Topics tab and switch between "clickstream" and
"clickstream-group-by-page". Notice how the streamID has changed.

We run the application with the `app.run()` method. The streaming dataframe is
passed to the method which will then execute the previous `.update` and
`.to_topic` method for every message arriving from the clickstream topic.  

### **Heatmap aggregator - Grid and Dictionary**

```py
 "value": {
   "3": {
     "2": 1
   },
   "5": {
     "4": 3
```

The **Group By** and **Heatmap aggregator** are connected by the "clickstream-

```py
import os
from quixstreams import Application
from dotenv import load_dotenv
load_dotenv()


app = Application.Quix("group-by-v1", auto_offset_reset="earliest")


input_topic = app.topic(os.environ["input"])
output_topic = app.topic(os.environ["output"])


sdf = app.dataframe(input_topic)


sdf = sdf.update(lambda row: print(row))


sdf = sdf.to_topic(output_topic, key=lambda key: key["relative_path"])


if __name__ == "__main__":
   app.run(sdf)
```
group-by-page topic".

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/662832db398c07cdde1b45e2_Pj18zynupC7cj0TM7wygBD929WGvMX0U1QKzXVNEohKBZx1N3DxyjWJxrcYGKPq23rk810jT2A-cU4jZrLlWIE37UNvAeASBeN3suPnRwbBLCdi1NgSx8SPYe_VreXreMKultUyECRvPwSVA1s1oO0k.png)

What we will focus on within **Heatmap aggregator** is, first, how it updates
the heat map grid statefully through a dictionary. Second, we will see how it
defines the time period in which data is gathered for the heat map, namely
through a hopping window.

‍

Let’s start with a sample output from **Heatmap aggregator** :

‍

Those numbers are locations on the 50x50 grid map. Below is a 5x5 ASCII grid:

      1     2     3     4     5  

  +---+---+---+---+---+

1 |      |      |      |      |      |

  +---+---+---+---+---

2 |      |      |  1  |      |      |

  +---+---+---+---+---+

3 |      |     |      |      |      |

  +---+---+---+---+---+

4 |      |      |      |      |  3  |

  +---+---+---+---+---+

5 |      |      |      |      |      |

  +---+---+---+---+---+

‍

With the value  "3": { “2”: 1:}

  * 3 is on the x axis
  * 2 is on the y axis 
  * 1 mouse was at that location on a user’s browser

It is illuminating to rewrite the second example like so: [3, (5, 4)] – there
are 3 cursors hovering over the location (5,4).  

### **Heatmap aggregator - Hopping Window**

```py
00:00 - 00:05 (window 1)
00:05 - 00:10 (window 2)
```

Your website is constantly producing data. How do you set your processing to
give you the last five minutes worth of data as often as you need without
constantly querying a database?

This is where[ windowing](https://www.quix.io/blog/windowing-stream-
processing-guide) comes in. Windowing allows you to include/ exclude messages
from your data stream according to their timestamp.

Within this pipeline we use a[ hopping
window](https://www.quix.io/blog/windowing-stream-processing-guide#hopping-
windows). Hopping windows slice time into overlapping intervals of a fixed
size and with a fixed step.

Say that the fixed size and the fixed step are both five minutes. That would
create these two windows:

‍

If the mouse coordinates [3, (5, 4)] arrive at 00:02 they will fall within
window 1. If they arrive at 00:07 they will fall within window 2.

Our hopping window takes steps every 0.25 seconds; every 0.25 seconds a new
window is created. Our windows look more similar to this:

‍

Note - if our coordinates arrive at 00:07 then they will register in both
window 3 and window 4. What this means within the context of our heatmap is
this – when a grid becomes colored it will stay colored for five minutes.
Those coordinates will register in every window for the next five minutes.

It is complex creating a hopping window with client libraries such as kafka-
python, but this complexity is stripped away in the Quix Streams library, as
we will now see.

Let’s begin with the line with **Heatmap Aggregator** which filters messages
for mouse movement (we do not want to know where inactive cursors are sitting
on the page):

‍

We calculate relative coordinates based on the size of the page. These values
range from 0-1 where 0 = 0% of the height/width, 0.5 = 50% and 1 = 100%. These
become new columns in the dataframe.

‍

Next we transform the float generated above into a tile on the grid, which
will then sit within a `["tile-coordinates"]`__ column.

‍

We create a hopping window using the `.hopping_window` __ method, one which
moves every 0.25 seconds and holds events from the past five minutes.

‍

The reduce method performs two functions. This method calls the heatmap
function which aggregates the mouse movements for a given tile. The reduce
method itself takes a dictionary argument. This dictionary persists through
the entire window and the `heatmap()` function is called on every row,
updating the dictionary. The method is named ‘reduce’ as it reduces the window
data down into this dictionary, and this dictionary represents the heat map
grid.

‍

The `.final` method configures the window to only output the data when the
window has closed. The state of the dictionary halfway through the window does
not concern us. We only want output after five minutes have elapsed.

‍

At the end a column is added containing the grid size. This is for the sake of
the downstream consumer which can then render a grid of the correct size.

‍

For every window, the output of the window is published to the topic:

‍

### ClickStreams Websocket

```py
"value": {
	"3": {
		"2": 1
	},
	"5": {
		"4": 3
```

We can now return to the sample data from before:

‍

Recall that the key for each message is its URL. In other words, different
grids will arrive indexed by their webpage (e.g, homepage, Macbook,
PlayStation game).

The websocket exposes the topic on different broadcast groups, one for each
path on the website. When you open the heat map frontend on the homepage, or

```py
Application
```
on a product page, you will make a call to the websocket and receive the
dictionary representing the heat map grid.  

### Heat map Frontend

```py
Application
```

The heatmap has its own tracking.js file (found at the same path within that
application). That file creates the grid. The tiles are colored relative to
the most popular grid tile. If the greatest number of cursors is three, and
four tiles contain that many cursors, then those four tiles will all be the
same shade of pink. Alternatively, if you had one tile with ten cursors in it,
and the rest had five or under, that one tile will have a far more intense
color. Playing with the demo you have just created will perfectly illustrate
this.  

Now you know the key components of the Clickstream Analysis Heat Map
application! Through the Quix library you have seen how key components of
stream processing such as: producing to a topic, grouping, aggregating, and
windowing can all be achieved with methods from the `Application` module. We
encourage you to play around with the application, to co-opt it for your use
case, and to let us know what incredible things you achieve with it and with
Quix Streams more broadly.

To get in touch join the[ Quix community Slack](https://quix.io/slack-invite).
This is also where you can go if you need help with any part of the tutorial.

  * To learn more Quix Streams, check out the[ relevant section](https://quix.io/docs/client-library-intro.html) in the Quix documentation.
  * To check out more of our tutorials head [here](https://quix.io/blog-category/tutorials).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)


