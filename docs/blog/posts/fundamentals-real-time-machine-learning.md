---
title: "The fundamentals of real-time machine learning"
date: 2023-07-17
authors: [mike-rosam]
slug: fundamentals-real-time-machine-learning
description: >
  What is real-time machine learning? How is it different from batch ML? What are common real-time ML use cases? What are the challenges of building real-time ML capabilities? All these questions and more are answered in this article.
categories:
  - industry-insights
---

# The fundamentals of real-time machine learning

What is real-time machine learning? How is it different from batch ML? What are common real-time ML use cases? What are the challenges of building real-time ML capabilities? All these questions and more are answered in this article.

<!-- more -->

## Introduction

Machine learning is by no means a new concept. [Its origins can be traced back
to 1943](https://www.historyofinformation.com/detail.php?entryid=782), when
neurophysiologist Warren McCulloch and logician Walter Pitts published a paper
describing the mathematical model of the first neural network.

Today, machine learning is nearly ubiquitous in business. It has diverse
applications across IT, manufacturing, retail, healthcare, finance, logistics,
IoT, transportation, sports, media and entertainment, and countless other
industries. Due to continuous technological advancements (e.g., improvements
in ML algorithms) and the growing interest of businesses of all shapes and
sizes in real-time decision-making, we are now witnessing the rise of a new
breed of ML: real-time machine learning.  

## What is real-time machine learning?

Real-time machine learning (also known as online ML) is the approach of using
ML systems to analyze data on-the-fly, as soon as it becomes available, to
make instant predictions and decisions. This is particularly important when
data needs to be acted on within a very short timeframe (seconds or
milliseconds) to benefit businesses and users.

Let's use an e-commerce website as an example to better paint the picture.
Real-time machine learning could power the website's recommendation system.
Say a user adds a camping tent to their shopping cart. The real-time ML
component of the system can analyze this action and predict that the user is
interested in camping gear. Based on this, the recommendation system can
quickly suggest to the user other items related to camping, like sleeping
bags, backpacks, and lanterns.

It’s important to note that there are different stages of real-time ML (we
will discuss them in more detail later in this article):

  * **Online prediction with batch features**. Inference (prediction) is real-time, but features are computed in batch (offline). Model training is also a batch process. 
  * **Online prediction with real-time features**. Both inference and feature computation are real-time. Training is usually done at regular intervals (more frequent time frames than batch training). 

**Online prediction with real-time features and continual learning**. Similar
to the stage above, inference and feature computation are done in real time.
However, model training is done online — the model incrementally
(continuously) learns as new data comes in.

## Batch machine learning vs. real-time machine learning

Batch machine learning involves creating and training ML models that learn
from static, finite datasets collected beforehand. These models undergo
training, validation, and testing using historical (offline) data. Once this
is done, models are deployed to production to make predictions.

As its name indicates, in batch ML, models analyze data in batches — for
instance, you might collect data over the course of a day, and then use your
model to make predictions on all that data at once.

![Traditional ML using batch processing scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0ef0fca2218b2bcaa2617_batch-ml-
architecture-example.webp)

_Traditional ML using batch
processing._[_Source_](https://fennel.ai/blog/challenges-of-building-realtime-
ml-pipelines/) _._

Batch machine learning is a good choice for scenarios where you have a large
amount of data to analyze and don't need immediate results. For example, in
the finance industry, you could use batch ML to analyze a customer's
historical data and predict the likelihood of them defaulting on a loan. Or
you could analyze historical customer behavior and predict which customers are
likely to close their accounts or switch to a competitor.

Unlike batch machine learning, real-time ML models analyze live [streaming
data](/blog/data-streaming-faq), and make instantaneous predictions as fresh
data arrives.

![Real-time \(online\) ML overview.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0ef6548c8615c89c66f82_real-time-
ml-architecture-example.webp)

_Real-time (online) ML overview._[_Source_](https://fennel.ai/blog/challenges-
of-building-realtime-ml-pipelines/) _._

Real-time machine learning models can handle dynamic environments with
quickly-changing data. This means that real-time ML is the ideal choice for
use cases with a limited window of opportunity to analyze and act on data.

For instance, you can use real-time ML to analyze live transaction data and
predict financial fraud. Or you could use it to make sub-second trading
decisions based on live market data. These are use cases you simply couldn’t
handle with traditional, batch ML (what good does it do if you can identify
fraudulent transactions only six hours later or a day after they’ve occurred?
By then, the financial damage can increase tenfold, and customer trust will be
seriously shaken).

## From analyzing historical data to real-time ML

There are a few different maturity stages on the road from batch ML to real-
time machine learning. Each subsequent stage is harder to implement than its
predecessor, but equally, it unlocks new opportunities.

![Machine learning maturity stages: from batch ML to real-time ML
graphic.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64b4debe16222f7b815a9701_From-batch-
to-real-time-ML.jpeg)

_Machine learning maturity stages: from batch ML to real-time ML_

## Stage 1: offline (batch) prediction

In the offline prediction approach, models are batch-trained on large,
historical datasets. Predictions are also made in batches — they are generated
at specific, regular points in time (e.g., at the end of every day or week).
This approach is suitable for scenarios where there’s no low latency
requirement, nor any need for immediate results. For example, forecasting crop
yield based on historical weather conditions and soil quality.

## Stage 2: online prediction with batch features

In this stage, you're making predictions on live data as it comes in (hence,
“online”). However, model training is a batch process, and the features you're
using for prediction are precomputed. This approach is commonly used in
scenarios where the feature generation process is resource-intensive and
cannot (or should not) be done in real time. For instance, if the features of
a user are based on their interaction with each item in a large catalogue,
precomputing these features via batch processing can significantly reduce the
time required to generate recommendations in real time.

Often, recommendation systems (recsys) use online predictions with batch
features. For example, a music streaming platform could precompute
recommendations for its users (aka, predict what songs they might be
interested in), and then serve those recommendations in real time when they
log in.

## Stage 3: online prediction with real-time (online) features

Similar to Stage 2, in Stage 3, inference (prediction) is real-time. However,
there are some notable differences when it comes to training and the way
features are used. Training usually happens at regular intervals (much more
frequent time frames than batch training). Feature computation can be done:

  * **In real-time**. Feature computation happens in real time, the instant a prediction request is generated.
  * **In near real-time**. Similar to batch features, these are precomputed. However, they are updated much more frequently (e.g., every 30 seconds). 

Online prediction with real-time features is helpful in tackling challenges
like real-time fraud detection. The system can predict whether a transaction
is fraudulent or not based on real-time features such as the location of the
transaction, the amount, the frequency of transactions, and the typical
purchasing habits of the cardholder. This prediction can be used to trigger a
real-time action in a banking app, such as sending an alert, freezing the
account, or blocking the transaction from going through.

## Stage 4: online prediction with real-time features and continual (online)
learning

Stage 4 represents the purest form of real-time ML, but it’s also the most
difficult to implement. It’s similar to Stage 3, in the sense that inference
and features are real-time. The notable difference is around training.
Specifically, in Stage 4, training is stateful and incremental. The model
learns from a stream of data continually over time, adapting and updating its
knowledge, without forgetting previously learned information.

At the time of writing (July 2023), online prediction with real-time features
and continual (online) learning is largely theoretical or experimental in
nature, with real-world applications in some niche use cases.

A potential example is the automotive industry. An autonomous vehicle
constantly generates real-time data (features) such as speed, direction,
[time-series](/blog/time-series-analysis) LIDAR data, surrounding traffic
conditions, pedestrian movements, etc. These real-time features are
immediately used to make predictions — like the probability of a pedestrian
stepping onto the road, or optimal speed. These predictions can be used to
trigger actions like braking, steering, accelerating, or changing lanes.

As the vehicle navigates the world, it encounters a variety of conditions,
such as different traffic scenarios, weather conditions, and road surfaces.
For safety and efficiency, the vehicle needs to be able to quickly adjust to
changing conditions and unforeseen scenarios — this is why the continual
learning component is critical.

To learn more about these real-time ML stages, and their prerequisites and
challenges, check out Chip Huyen’s excellent article, [Real-time machine
learning: challenges and solutions](https://huyenchip.com/2022/01/02/real-
time-machine-learning-challenges-and-solutions.html).  

## Benefits of real-time machine learning

By using real-time machine learning, organizations everywhere can reap many
benefits. Firstly, real-time machine learning systems can _instantly analyze
incoming data to extract valuable insights and identify patterns_. This
capability is particularly valuable in dynamic environments such as finance or
cybersecurity, where decisions must be made quickly.

Secondly, real-time ML models using real-time features can _react to the most
up-to-date data_. Real-time ML models can also be incrementally retrained so
their algorithm is based on the latest data points. This capacity to learn and
adapt to new information in real time enables a level of adaptability and
precision that _greatly enhances predictive accuracy_.

Thirdly, real-time machine learning opens up a world of _personalization
possibilities_. Personalized content, recommendations, or services can be
offered to consumers instantly based on their real-time activities, enhancing
customer satisfaction and engagement. This is especially significant for
e-commerce and streaming platforms, where understanding user preference on-
the-go can lead to better recommendations, _higher user retention_ , and,
ultimately, _increased revenue_.

Another advantage of real-time machine learning is its potential to _improve
operational efficiency_. With ML systems that make instant decisions and
predictions based on real-time data, organizations can automate processes,
speed up operations, and minimize costs. Moreover, real-time ML helps
businesses _identify anomalies or patterns that indicate potential issues or
failures before they escalate_. This enables proactive steps to be taken, such
as triggering alerts, initiating automated actions, or performing preventive
maintenance.

## Applications of real-time machine learning

Earlier in this article, we touched on some real-time machine learning use
cases. But there are many other applications for real-time ML, spanning
numerous industries. Below is a comprehensive list; note that most (if not
all) of these use cases can be delivered via online prediction with batch
features (stage 2 of real-time ML) and online prediction with real-time
features (stage 3):

  * In **finance and** **banking** , real-time ML powers high-frequency trading algorithms and fraud detection. [Learn how to predict load fraud with real-time machine learning](/blog/real-time-machine-learning-quick-guide).  
  * **Online retailers** rely on real-time ML to offer personalized recommendations to shoppers, predict shopping behavior, and adjust prices dynamically. See, for example, how [Zalando uses real-time machine learning for personalization and size recommendation](https://engineering.zalando.com/posts/2022/04/zalando-machine-learning-platform.html).
  * **Factories and manufacturers** use real-time ML to optimize efficiency, update factory schedules based on machine performance, make better predictions for maintenance, and detect any issues in production lines as soon as they occur. [Learn how CloudNC harnesses real-time ML to enhance its manufacturing operations](/blog/case-study-manufacturing-cloudnc).
  * In the **energy** sector, real-time ML helps predict energy demand, and it helps manage grids and identify faulty equipment.  
  * [Threat (anomaly) detection](https://www.projectpro.io/article/anomaly-detection-using-machine-learning-in-python-with-example/555) is a major use case for real-time machine learning, with applications across different industries, from **cybersecurity** to **health monitoring**. 
  * Real-time ML helps optimize routes and predicts vehicle maintenance needs and availability in **transportation**. [Learn how to use ML to predict bicycle availability in real time](https://quix.io/docs/platform/tutorials/data-science/index.html).
  * In **motor racing** , real-time ML is critical for monitoring vehicle performance (e.g., speed or tire pressure) and analyzing weather data like rain, wind, and temperature changes. This way, racing teams can identify trends and patterns, and make data-informed decisions on the go (for instance, if a pit stop is needed to change tires). To learn about more ML use cases in motor racing, [check out how Control Ltd, a race-winning telemetry solutions provider, uses real-time machine learning](/blog/network-connectivity-and-resiliency).  
  * Businesses use real-time ML to track brand mentions and perform sentiment analysis on **social media** , so they can swiftly address customer concerns and emerging trends. [Learn how to build a real-time ML sentiment analysis pipeline](https://quix.io/docs/platform/tutorials/sentiment-analysis/analyze.html). 
  * Similar to online retailers,**video streaming services** use real-time ML for personalization. ML is leveraged to analyze user viewing history, preferences, and behavior so that the system can recommend similar movies and shows. [Check out what Netflix is doing](https://research.netflix.com/research-area/machine-learning) for more details about real-time ML and its applicability in video streaming platforms. 

Real-time machine learning is often used in **surveillance** to analyze videos
and images and identify and classify objects, activities, or behaviors of
interest in real time. For example, in traffic monitoring, real-time ML can be
used to detect incidents or traffic congestion. [Learn how to build a real-
time ML image processing
pipeline](https://quix.io/docs/platform/tutorials/image-
processing/index.html).  

## How does a real-time ML pipeline work?

A real-time machine learning pipeline operates by continuously ingesting,
processing, and analyzing live data. Depending on the use case, real-time data
can be gathered from various sources. Examples include
[telemetry](/blog/telemetry-data-explained) sensors, user interactions in an
app, social media streams, and surveillance systems.

Once gathered, data needs to be preprocessed so it’s suitable for ML analysis.
This step may entail handling missing values, removing duplicates,
transformations, and cleaning.  

Working with features is the next stage of the journey. Note that features
fall into two basic categories:

  * **A pre-existing feature** means data that already exists and that you can directly select and extract from your dataset. For instance, in the case of the stock market, the real-time stock price of a company can be considered a pre-existing feature. 
  * **An engineered feature** doesn’t exist in the original dataset. [Feature engineering](https://quix.io/blog/what-is-real-time-featuring-engineering) involves applying transformations or calculations to existing features to create new ones. For example, you might calculate the moving average of the company’s stock price over a certain time period, like the last 10 minutes, hour, or day. It’s often these “engineered” features that enable a machine learning model to arrive at more accurate predictions than predictions based on pre-existing features alone.

An ML model is then trained to interpret these features, and tested to make
sure it can make accurate predictions. Once the model’s accuracy is deemed
satisfactory, it can be deployed to production to make instant predictions
based on incoming live data. Finally, predictions are consumed by their
intended (destination) applications, triggering actions, informing a decision,
or serving a recommendation in real time.

You have to constantly monitor the performance of the real-time ML model in
production. If the performance deteriorates over time and you notice model
drift, you will have to retrain, retest, and redeploy the ML model to ensure
its predictions remain accurate and relevant.

![High-level overview of a real-time ML pipeline.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64c0f08645e0b0129d4b4201_Overview-of-
real-time-ML-pipeline.webp)

_High-level overview of a real-time ML pipeline_

This was a simplified, high-level overview of how a real-time ML pipeline
works. There are many more aspects and complexities involved in building and
managing a real-time ML pipeline that are worth discussing. To learn about
some of these challenges, check out our other blog posts:

  * [Feature engineering has a language problem](/blog/feature-engineering-language-problem)
  * [Bridging the gap between data scientists and engineers in machine learning workflows](/blog/bridging-the-impedance-gap)

## Real-time machine learning technologies

A diverse technology stack is often needed for real-time machine learning due
to the multiple stages involved, each of which might require specialized
tools. We’d need a separate article (or perhaps a book!) to cover all of these
technologies. For brevity, the table below only lists some of the most
popular, commonly-used ones.

## What makes it hard to build real-time machine learning capabilities?

Building and managing real-time machine learning capabilities in-house is
time-consuming, expensive, and complex. First of all, as a prerequisite for
real-time ML, you need a streaming infrastructure that allows you to collect,
transform, and process data as soon as it arrives. We’re usually talking about
vast volumes of high-frequency data (e.g., financial tick data or car
[telemetry](/blog/telemetry-data-explained) data recorded on a millisecond
basis). To successfully deal with it, the infrastructure needs to display
robust properties:

  * Reliability, availability, and fault tolerance.
  * Low latency.
  * The ability to scale to meet fluctuating demand.
  * Data quality and integrity guarantees. 

If the streaming infrastructure doesn’t exhibit these characteristics, issues
like data loss and system downtime can arise. Data loss leads to poor ML
predictions, missed opportunities, or incorrect actions being taken based on
flawed data. Meanwhile, system downtime is particularly costly, especially for
use cases like high-frequency trading, where it can lead to significant
financial loss.

However, building an efficient stream processing engine that’s able to perform
reliably at scale is a tough nut to crack. This requires a serious time
investment (months), domain-specific knowledge and expertise, and teams of
developers. See, for example, [how hard it is to scale stream processing
infrastructure](/blog/telemetry-data-explained) to deal with vast volumes of
data. Or learn about the [challenges of handling streaming data](/blog/why-is-
streaming-data-so-hard-to-handle).  

Once data is collected and processed, we can think of the next stage of the
journey: the real-time analysis part. This, of course, brings additional
complexity to the table. There are many questions to answer and challenges to
overcome. Here’s but a taste:

  * What ML model is best suited to your use case?
  * What features will you use, and how will you engineer them in real time? 
  * Can your ML model make predictions quickly enough?
  * How frequently will you update your ML model, and how will you handle retraining?
  * How will you monitor model performance, and how will you detect and handle model drift?
  * What mechanisms will you use to deploy, version, and roll back your models?
  * What are the financial implications? Will the benefits of real-time predictions outweigh the costs of developing and maintaining the ML pipeline?

The situation is further complicated by the different skill sets of the main
stakeholders involved in crafting real-time ML capabilities. On the one hand,
we have the data or platform engineer, responsible for developing and managing
the streaming infrastructure needed to collect and process data, so it’s
suitable for analysis. On the other hand, there’s the data scientist, who
designs, builds, and manages real-time ML models that analyze data.

The thing is, solutions used by data engineers to build streaming and stream
processing capabilities (such as Apache Kafka and Apache Flink) are primarily
Java and Scala-based. Meanwhile, data scientists usually work in Python. [This
language barrier is a problem that becomes obvious, for instance, in the case
of feature engineering](/blog/feature-engineering-language-problem). Data
scientists often define their feature computations and build ML models in
Python. Data engineers must then rewrite this logic in Java or Scala to put
the models online. This refactoring ultimately slows down the release of real-
time ML capabilities into production.

## The future of real-time ML

We’ll end this blog post with some predictions about how the field of real-
time machine learning might evolve over the coming years:

**Businesses to transition from offline ML to real-time ML**

It’s safe to expect more and more organizations will switch from traditional
ML approaches to real-time machine learning. This transition to real-time ML
is driven by the need for speedier predictions, responsiveness, and continual
learning, which can lead to faster decision-making, increased efficiency, and
enhanced, personalized user experiences. Furthermore, certain use cases (like
algorithmic trading) can only be satisfied with real-time data analysis,
because they depend on predictions being made in milliseconds. Offline ML is
unsuitable in such scenarios.

**New use cases for real-time ML**

As technology advances, several new real-time ML use cases are likely to
emerge or mature:

  * **Autonomous vehicles**. Real-time ML is expected to play a critical role in navigating complex environments, adjusting to traffic changes in real time, and making immediate decisions to ensure safety.
  * **Smart cities**. Real-time ML can help manage traffic flow, optimize energy usage, and enhance public safety in smart cities by analyzing and responding to data from a myriad of sensors in real time.
  * **AR and VR**. For example, real-time ML can enhance AR and VR training simulations, adjusting difficulty or guidance based on real-time user performance.
  * **Healthcare.**  
One application of real-time ML could be continuous patient monitoring to
predict potential health risks before they become severe. For example, you
could analyze glucose levels for diabetics and heart rhythms for people with
cardiovascular disease, and send real-time alerts if anomalies are detected.
**  **

**Increased automation**

As organizations seek ways to improve their decision-making capabilities,
increase operational efficiency, and decrease costs and reliance on human
intervention, the automation of real-time ML is likely to see significant
growth. Automating real-time ML can help businesses reduce the time and
resources required for tasks like feature engineering, model tuning, and
validation. It can also help them reduce the potential for human error, thus
increasing the reliability of ML models and their predictions.

**MLOps advancements**

MLOps is a key component of ML engineering, focusing on creating and deploying
ML models to production, and then maintaining and monitoring them. However,
it’s worth bearing in mind that MLOps is a rather new, emerging discipline. As
is the case with any new field, there’s a lot of room for improvement. Here
are some ways in which MLOps might evolve in the future:

  * **Standardization:** As MLOps matures, we can expect to see more standardization around ML platforms, tools, and practices. For instance, we might see standards emerging around model training and validation, deployments, and model lifecycle management. 
  * **Improved collaboration:** As organizations recognize the importance of MLOps, we should see a greater emphasis on collaboration between data scientists, ML engineers, operations teams, and business stakeholders. This might involve more cross-functional teams or new roles that span these areas.
  * **Broad adoption of better, more efficient tooling:** As previously mentioned, there’s a language barrier plaguing ML — data engineers use Java and Scala, while data scientists generally use Python. This language barrier creates challenges when deploying real-time machine learning models in production. Models developed by data scientists in Python need to be translated to Java or Scala by data engineers for deployment, which slows down the deployment process. [To overcome this barrier](/blog/bridging-the-impedance-gap), organizations are starting to adopt tooling that makes things easier for data scientists and data engineers alike. One such solution is [Quix](/), a managed Python stream processing platform that uses Kafka and Kubernetes under the hood. With Quix, data scientists are empowered to gather data from various sources and process it in real time. Then they can build real-time ML models to analyze data, test them with Git & CI/CD, and seamlessly deploy them to production​​ — all of this with minimal involvement from data engineers.

To learn more about Quix and how we can help you build real-time ML pipelines,
check out our [documentation](https://quix.io/docs/index.html) and [get
started with a free account](https://portal.platform.quix.ai/self-sign-
up?__hstc=175542013.47788df652e6c40c4f592430dcaa100f.1686578338159.1689418230899.1689568336719.24&__hssc=175542013.45.1689568336719&__hsfp=524412920).





