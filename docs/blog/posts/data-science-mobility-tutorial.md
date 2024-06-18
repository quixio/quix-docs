---
title: "Build and deploy a data science project (no developer required)"
date: 2023-07-18
authors: [javier-blanco]
slug: data-science-mobility-tutorial
description: >
  An in-depth tutorial on how one data scientist created a real-time predictor of bike availability — a use case you can apply to any fleet or mobility solution.
categories:
  - tutorials
---

# Build and deploy a data science project (no developer required)

An in-depth tutorial on how one data scientist created a real-time predictor of bike availability — a use case you can apply to any fleet or mobility solution.

<!-- more -->

**Alert: This post includes images of the Quix portal that are no longer
accurate. We have updated images**[**here**](/product)**.**

Creating a real time predictor of bike availability in New York

## Stop wandering around in the rain in search of a bike share

There’s nothing worse than wandering around a city in search of a bike share.
Correction: there’s nothing worse than wandering around a city in the rain
while searching for a bike share. The additional time and misery really defeat
the whole point of taking a bike. If you’re in a place like New York City,
where [8.8 million people averaged 72,000 bike
rides](https://www.citibikenyc.com/system-data/operating-reports) in 2020,
this could be a common occurrence.

Thankfully, a large amount of data about bike availability is available and
frequently used in the data-science community. [Kaggle
datasets](https://www.kaggle.com/hmavrodiev/london-bike-sharing-dataset)
predict bike availability, [NYC’s bike-share
map](https://bikesharemap.com/newyork/#/13.737955738077678/-73.9801/40.719/)
offers some real time bike availability information and [Cliff
Kranish](https://towardsdatascience.com/exploring-bike-share-
data-3e3b2f28760c) provides a historical analysis of journey patterns. But
what about predictions?

I want to generate real time predictions about bike availability in the next
hour and in the next day that take weather into account. This requires a
machine learning model and infrastructure to make the model’s insight
constantly available to end users. A one-off API call to get historical data
to train my machine learning model will not be enough. This task of taking ML
to production is one of the primary challenges in any data-science project —
[87% of machine learning projects never make it to
production](https://venturebeat.com/2019/07/19/why-do-87-of-data-science-
projects-never-make-it-into-production/). And it’s even more challenging with
real time data.  

## Deploying models in real time is hard

It’s [generally agreed](https://towardsdatascience.com/why-90-percent-of-all-
machine-learning-models-never-make-it-into-production-ce7e250d5a4a) that the
large and varied group of people needed to deploy ML models makes them
difficult to deploy. They need people working on IT architecture, statistics,
ML model training, and deployment, which form IT, data science and data
engineering teams. That range means there’s some inherent disconnection
between everyone.

Moreover, [streaming data keeps getting harder to handle](/blog/why-data-
scientists-cant-use-streaming-data). These challenges make it usually
[difficult for us data scientists to extract the value of real time
data](/blog/why-data-scientists-cant-use-streaming-data).

This is my skill graph as a data scientist. The purple shows my abilities and
indicates what type of people I need to work with to develop ML models.  

![Data scientist radar.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb5f410e7c4b6b67db9ea_Data-
scientist-radar.webp)

The empty-skill area demonstrates why I can’t deploy ML models by myself. I
mean, I could take a few months to learn Kafka, real time cloud deployment
skills, and generally improve my software engineering skills, but who has time
for that?  

## How to fix my streaming data engineering gap easily with Quix

I could call a data engineer friend and get some help. Someone whose skill
graph fills in my gaps.  

![Data engineer radar.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb624e4f60e523aaabfbb_Data-
engineer-radar.webp)

Working with a data engineer is fine, of course. But it will take a while and
I’ll lose some control of the process. This impacts aspects of the ML model,
including data-transformation strategy architecture.

But what I would love is a tool that generates an efficient real time Kafka
infrastructure with deployment and version control. That’s precisely what Quix
does.

Quix lets me complete all aspects of the ML model projects using Python.
Quix’s real time SDK is faster and more efficient than Kafka and Flink, and
the platform is simpler to use than anything else — the factor that I and
other data scientists care about most. I can now accomplish on my own in just
a few hours what would have taken me and a data engineer friend months. I can
deploy my machine learning model in real time using Quix and my Python skills
alone.

This means that I now have the option to change my machine learning modelling
strategy. I won’t need enormous amounts of data to train a model that learns
what happens every month, week, day and hour.

I can use a feed for the real time number of bikes that already accounts for
most of the variations caused by sporting events, holidays and construction to
help my predictions for the next hour and the next day.  

## How to predict the real time availability of bikes in New York City using
Quix

Quix allows me to build Kafka topics by clicking a single button. I can then
add several streams to that topic to parallelize the data flow if needed for
low latency reasons. Here are the key steps for our bike use case.  

### 1\. Pipeline Creation

The first step was to create streams of real time data. I created one topic
for the bikes and another for the weather data (again, just with a click). You
can read [more about topics here](/blog/set-up-kafka-for-real-time-stream-
processing).

For each topic, I then created a single data stream. It’s possible, but
unnecessary, to parallelize the data traffic to decrease the latency in this
use case. Periodically performing API requests to third-party services feeds
this stream with real time data. I used [CityBikes](http://api.citybik.es/v2/)
for the bike data and [OpenWeather](https://openweathermap.org/current) —
which required a free account — for the weather data. I created a topic with
just a click, but the streams within them are coded in detail.  

![CtyBikes and OpenWeather data source scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb674409f7c7670422438_CityMobility-
blog.webp)

Check out the [bikes API requests](https://github.com/quixai/NY-bikes-
tutorial/tree/1stversion/ny-real-time-bikes/source) and [weather API
requests](https://github.com/quixai/NY-bikes-tutorial/tree/1stversion/ny-real-
time-weather/source) code that I used. You can copy the main functions into
your local IDE and try them out.  

### 2\. Data storage

I stored the streamed data using the persistence feature that is already built
into the Quix workspace. I set the persistence to On and Quix took care of
writing the streamed data into the Quix catalog to maintain the live-stream
context.

It’s great to know that Quix writes each data type to the optimal database
technology in terms of performance and cost efficiency.  

### 3\. ML model training

I decided to train the models locally and then deploy them in the Quix
project. I first queried my historic accumulated data from Quix by specifying
which data to query, and then Quix automatically generated the code that I
need to paste into my IDE.  

![Diagram of a data source and a data catalog. ](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb7082cc46c71a5bf6772_CityMobility-
scheme.webp)

I based my modelling approach on the use of real time data. The current number
of bikes is already a strong predictor for the number of bikes in an hour from
now. I trained the models to predict the residual (difference) between the
current number of bikes and the number of bikes in one hour.

Checking the distribution of this residual vs. the hour of the day, it seemed
clear there were some patterns our model could find.  

![Line graph showing the number of bikes rented from CityBikes over the past 7
days.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb746e4f60e523aac4e14_Jupyter-
graph.webp)

I used the same approach for the one-day-ahead model. While modelling isn’t at
the core of today’s problem, you can still [check out how I trained the two
models](https://github.com/quixai/NY-bikes-tutorial/blob/1stversion/notebooks-
and-sample-data/04%20-%20Train%20ML%20models.ipynb).  

### 4\. ML model real time deployment

After I trained the two ML models (the one-hour-ahead and the one-day-ahead
models), I put them into production. What’s the point of training a model that
never ends up predicting in real time?

With Quix, I created an additional Kafka topic that hosts the model
deployment. This topic listens to both weather and bikes topics. It also
stores the ML models that we trained locally, which produce bike predictions
in real time based on the incoming data from the weather and bikes topics.
Finally, this topic contains three streams, one per output: the one-day ahead
prediction, the one-hour ahead prediction and the actual current number of
bikes.  

![Diagram of a data pipeline.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb7956e3a5a8036fdfaaa_CityMobility-
blog-scheme.webp)

## Accuracy and reactability to model shift of our predictions

Let’s have a look at the quality of the predictions. I won’t go into detail
with specific KPIs here, but an overall look shows how well both models
perform.  

![Data explorer screenshot.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb7cec7c3a0d4663c269a_Data-
explorer-screenshot.webp)

It’s very complicated to achieve this level of accuracy with traditional batch
data processing approaches, and it takes far longer. Once we’ve gathered
enough historical data, we can compare both.

It’s especially interesting to see how quickly our one-hour-ahead model reacts
to an extreme change in conditions such as [Tropical Storm
Henri](https://www.nytimes.com/2021/08/23/nyregion/nyc-rain-storm-flooding-
weather.html), which was not seen in our historic data.  

![Data explorer screenshot graph.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb80695940d4c80d98d4f_Data-
explorer-screenshot-2.webp)

One of the main problems with the batch approach models is shift: their
deterioration in performance with real and changing environmental conditions.

## We’re not just talking about bike predictions

We have now a Kafka topic streaming extremely accurate, real time predictions
about bike availability in New York City. Different mobility apps, government
institutions, and researchers can now connect to it to accurately forecast
demand.

But the bikes are only one example. As great as it is to solve this prediction
problem, I’m excited about more complex challenges that Quix can help me
solve. I’ve been able to work in real time to change my modelling approach,
which opens the door to fantastic things such as [online
learning](https://huyenchip.com/2020/12/27/real-time-machine-learning.html).
And Quix let me do this all on my own. I didn’t train ML models and then pass
the project to someone else. I developed a whole real time data science
project, from inception to production.  

### Improving the project the next time around

Could I have done better? Oh, yes! For example, I could have created a
dashboard to output and track all these predictions. I may tackle this soon.
In the prediction of available bikes, I could focus on the dock stations
rather than the whole city. I could create one stream per dock in the bikes
topic instead of a single overall stream.

Eventually, I could use ML to generate a real time heat map for bike
availability that predicts the next hour or day. Or, perhaps, why not optimize
my future journeys based on the nearest available dock station predictions and
the [Directions
API](https://developers.google.com/maps/documentation/directions/get-
directions) from Google Maps?

To improve my prediction accuracy, I could add real time data on
[events](https://www.predicthq.com/apis) occurring in NYC or holiday
information using the [Holiday API](https://holidayapi.com/uses).

So much to do. 😊 Real time modeling is full of valuable and fun opportunities.  

## Data scientists out there, try Quix!

Data science offers the most value when our models get into production.
Unfortunately, most projects never do. This bike prediction project
demonstrates how easy it is to develop an end-to-end machine learning
solution, while maintaining freedom and control over the entire data science
process.  

![Data scientist using Quix radar.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64bfb858409f7c767044aecb_Data-
scientist-using-Quix.webp)

Maybe you’re working on livestock or crypto predictions, or personal health
care monitors — so many fields exist where data scientists can benefit from
Quix. It’s the tool you need to build real time infrastructure. Stop training
ML models and start creating ML products.

We’re here and ready to help. Feel free to [jump into the Quix platform for
free](https://quix.io/signup), or talk with us [on
Slack](http://quix.io/slack-invite) if you’ve got a problem to try out on
Quix. Let’s go!





