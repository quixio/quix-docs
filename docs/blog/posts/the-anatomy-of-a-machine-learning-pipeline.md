---
title: "The anatomy of a machine learning pipeline"
date: 2023-08-21
authors: [alex-diaconu]
slug: the-anatomy-of-a-machine-learning-pipeline
description: >
  Explore the characteristics, challenges, and benefits of machine learning pipelines, and read about the steps involved in training and deploying ML models to production.
categories:
  - industry-insights
---

# The anatomy of a machine learning pipeline

Explore the characteristics, challenges, and benefits of machine learning pipelines, and read about the steps involved in training and deploying ML models to production.

<!-- more -->

## What is a machine learning pipeline?

A machine learning pipeline is a set of repeatable, linked, and often
automated steps you follow to engineer, train, and deploy ML models to
production. Up to a point, an ML pipeline is quite similar to a data pipeline
— they both have common steps, like data gathering and data preprocessing. In
fact, a data pipeline can be seen as a component of an ML pipeline, handling
the initial stages of collecting and preparing data for the machine learning
process.

However, while the primary purpose of a data pipeline is to transform and move
data between systems, an ML pipeline specifically caters to the needs of
machine learning workflows. It includes extra steps you won’t find in a data
pipeline, such as generating features, training machine learning models, and
deploying them to production. An ML pipeline aims to standardize and speed up
the way ML capabilities are engineered and operationalized to drive business
value.

### Batch vs. real-time ML pipelines

We can broadly group ML pipelines into two main categories: batch ML and real-
time ML. In a batch ML pipeline, ML models learn from static datasets
collected beforehand. Once deployed to production, these models analyze data
in batches — for instance, you might collect data over the course of a day,
and then use your model to make predictions on all that data at once.

Meanwhile, in a real-time ML pipeline, ML models analyze live [streaming
data](/blog/data-streaming-faq), and make instantaneous predictions as fresh
data arrives. There are three different types of real-time ML:

  * **Online prediction with batch features**. Inference (prediction) is real-time, features are computed in batch (offline), and model training is also a batch process. 
  * **Online prediction with real-time features**. Inference and feature computation are real-time. Training is usually done at regular intervals (more frequent time frames than batch training). 
  * **Online prediction with real-time features and continual learning**. Inference and feature computation are done in real time. Model training is done online — the model incrementally (continuously) learns as new data comes in. 

Let’s look at some examples to better understand the differences between batch
and real-time machine learning. For instance, a retail company might use a
batch ML pipeline to analyze historical sales data in batches at the end of
each month and predict sales for the upcoming month. Based on this forecast,
the retailer can determine how much inventory they need to have on hand to
meet expected demand, and adjust staffing levels accordingly.

Meanwhile, a bank could use a real-time ML pipeline to ingest, process, and
analyze transaction data on the fly, instantly predicting if any transactions
are likely to be fraudulent. These predictions can trigger real-time actions
in a banking app, such as sending alerts, freezing accounts, or blocking
dubious transactions from going through.

To learn more about batch vs. real-time ML and the different types of real-
time machine learning, check out “[The fundamentals of machine
learning](/blog/fundamentals-real-time-machine-learning)”.

## How does a machine learning pipeline work?

We’ll now see how a machine learning pipeline works, by looking at its
different constituent stages and steps.

![Schema showing how a machine learning pipeline works.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fcb0698f229d8cd3be6_mn7kyo1WQiXtiELutxoYzrY7Ain4iXE02nuJINVaavn2tUSm1MTs8yS6qs-q3ApeTaTWTd96IelcGGcJ9zqwdPuY1R9XyKoYFE0TRj2B70PpvRAwaQNzjdorQQMYCemCplFkyyX5pYBTNOX4WIJ95cw.jpeg)

_End-to-end overview of a machine learning pipeline architecture_

As shown in the above diagram, an ML pipeline consists of several different
stages, each with its own steps.

‍  

It’s important to note that the steps of an ML pipeline are:

  * **Sequential.** The ML pipeline follows a specific order, with later steps depending on previous ones. For example, you can’t train an ML model without first generating the required features for the training process. ** **
  * **Linked.** Steps are highly interconnected, with the output of one step acting as the input for the next. For example, you could have a script that automatically triggers the data preprocessing step once the previous step — raw data gathering — is finished. 
  * **Repeatable.** When training and testing an ML pipeline, you can run steps multiple times, with each run refining the results of the previous one. This iterative, repeatable process helps to enhance the model's accuracy and reliability over time. Repeatability is equally important once you deploy the pipeline to production. New data will be periodically or continuously available, and the pipeline needs to be able to repeatedly collect, process, and analyze it. 

### Step 1: Data gathering

The first step in any machine learning pipeline is to ingest raw data. Note
that at this stage, data is not yet ready for ML analysis; preparing it for
analysis is handled during the next two steps of the pipeline.

You can collect data from different types of sources, depending on the
specifics of the ML use case. For example, suppose you’re building a real-time
ML pipeline for predictive maintenance in manufacturing. In this case, you
might ingest high-frequency [telemetry data](/blog/telemetry-data-explained)
from sensors attached to production machinery. These sensors could
continuously monitor parameters like temperature, vibration, and pressure. (To
learn more about machine learning in manufacturing, [check out this case study
and learn how CloudNC optimizes manufacturing efficiency with streaming data
and ML](/blog/case-study-manufacturing-cloudnc)).

Another example is sales forecasting. In this scenario, you could collect raw
data from sources like point-of-sale and CRM systems, databases, and online
transaction logs.

### Step 2: Data preprocessing

Once gathered, data has to be preprocessed. This step is needed because the
data you collect is often raw, unstructured, and messy, and therefore,
unsuitable for ML analysis. Preprocessing involves tasks like:

  * **Data cleaning** — removing or correcting inconsistencies, filling missing values, and handling anomalies.
  * **Data integration** — combining data from different sources to create a unified dataset. 

After preprocessing, you have better-quality and more reliable data, which is
suitable for the next stage of the ML pipeline.

### Step 3: Feature generation

The third step of the ML pipeline involves generating features. A feature is a
measurable property or characteristic of the data you're working with. You can
think of it as an individual column on a spreadsheet or a field in a database.

You can obtain features by different means, which fall into two basic
categories: "pre-existing" and "engineered":

  * **A** **pre-existing** feature means already existing data that you can directly select and extract from your dataset. For instance, if you're working with a dataset of stock prices, the closing price each day may be a pre-existing feature.
  * **An** **engineered feature** doesn’t exist in the original dataset. [Feature engineering](https://quix.io/blog/what-is-real-time-featuring-engineering) involves applying transformations or calculations to existing features to create new ones. For example, you might calculate the moving average of the past seven days' closing prices — this is an engineered feature because it's derived from your raw data but doesn't exist as-is in the original dataset. Note that feature engineering can be a time-consuming, error-prone, and complex process. It requires domain expertise and often involves experimentation to identify the features most relevant to your specific use case.

![Table with three columns showing stock price for 10 first days of July
2023.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fca3385bc4cc38aeee9_iySZT4T4O32Dh2QuIyZEmsxehYec6bO_ZSxa5svdiIU5sGflbD3F8dTECyMUGwTgYLZOLd1ZQEBENSCruIL_86AzevuRFsavRBt-6E-dRUNF9o-LAC8vQJbkhilaaHp8BSO2i4OwHggqlq6A2Rkvnd0.png)

_Examples of pre-existing and engineered features_

Features provide the information or input data required to train machine
learning models and make predictions.

### Step 4: Training and testing machine learning models

The purpose of this crucial step is to engineer and select an ML model that’s
capable of making accurate predictions. You start by writing an ML algorithm
that’s fit for the job. For example, if you’re trying to predict stock market
prices (regression problem), you should opt for linear regression algorithms.
In comparison, if you’re trying to detect spam emails (classification
problem), machine learning algorithms like Naive Bayes and K-Nearest Neighbors
(K-NN) are good choices.

Next, you “feed” a training dataset to the ML algorithm. This dataset consists
of features generated in the previous step, together with corresponding labels
(or targets). For instance, if you're building a model to predict house
prices, your features might include the size of the house, its age, and its
location. The labels are the true outcomes or results corresponding to each
feature set. In our example, labels would be actual house prices.

The ML model “learns” by analyzing the relationship between features and
labels. This learning process involves iteratively making predictions on the
training data and adjusting the ML algorithm’s internal parameters based on
the error of its predictions. The goal is to minimize mistakes, therefore
improving prediction accuracy. Model training is concluded when a prediction
accuracy target is reached.

Next, we have model testing — you provide a separate testing dataset to the ML
model for analysis. The testing dataset is similar in nature to the training
data; it contains the same types of features and labels, but with different
values. If the ML model's performance on the test dataset is deemed not good
enough, you can take steps like changing the algorithm used, engineering new
features, and retraining.

In practice, many organizations frequently choose, train, and test multiple ML
models for a given task, and then compare and select the one that performs
best according to chosen metrics and business needs. There are many factors
that can influence the decision, such as:

  * Which model is more accurate?
  * Which model scales best?
  * Which model is the fastest?
  * Which model is easiest to interpret and least complex?
  * Which model is most computationally efficient and cost-effective?

### Step 5: Deploying the ML pipeline to production

After training, testing, and selecting an ML model that best suits your needs,
you package it and deploy it to a production environment where it can start
making predictions on new, real-world data. Predictions can be made by
analyzing historical data in batches, or based on real-time [streaming
data](/blog/data-streaming-faq).

For example, a telecom company might collect data such as call records,
billing history, customer complaints, and service usage over time for each
customer. This data could be analyzed monthly or quarterly (i.e., in batches)
by an ML model to predict which customers are likely to cancel their
subscriptions in the future. Based on this prediction, the telecom company
could proactively address the expected customer churn by offering incentives,
improving customer service, or tailoring more suitable service plans for at-
risk customers.

On the other hand, a bank might use a machine learning pipeline to
continuously ingest streams of transaction data, and analyze transaction
details like amount, location, and merchant type in real time. This enables
the bank to instantly predict whether a transaction is legitimate or
potentially fraudulent. If it’s the latter, the bank can take immediate
action, such as sending an alert, freezing the customer’s card, or blocking
the transaction from going through.

There are different patterns you can use to deploy a model to production:

  * **Model-as-Service**. You wrap the ML model as an independent service. Apps generally interact with it via REST or gRPC APIs.
  * **Precompute Serving Pattern**. You use a trained ML model and precompute predictions for incoming batches of data. Predictions are stored in a DB and retrieved via queries.
  * **Hybrid-Serving (Federated Learning)**.  You start with a global model on a central server. Then you replicate this model across devices (smartphones, IoT devices). Once replicated, models are trained and tested locally. Once in a while, devices send local model data to the global model on the central server so it can be adjusted.  
  * **Model-as-Dependency**. You package the ML model as a dependency within a software app.
  * **Model-on-Demand.** Similar to the Model-as-Dependency approach, in the sense that it treats the ML model as a dependency. However, the ML model has its own release cycle and is published independently. A message broker architecture is often used with this approach. 

![Schema showing how to deploy the ML pipeline to
production.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fcc2a1592dc5f1bab39_lpK-6nLVH-0Z4aJZSgwQYvtmdnqDUuW4D2M8nS7lgypnM0N7PES9YzIg6WipNv6m18_YON3CfCpZzY7OvLDfdRWan8A5ng79tkq1vrQQ5cVgGDeE2trtm7rD6goxs9aOJycNZ7LsqDDXZ-
CMOfmooxo.png)

_The Model-on-Demand deployment pattern._[_Source_](https://ml-
ops.org/content/three-levels-of-ml-software#code-deployment-pipelines) _._

To learn more about these patterns, check out [Three Levels of ML
Software](https://ml-ops.org/content/three-levels-of-ml-software#code-
deployment-pipelines), an excellent article from [ml-ops.org](https://ml-
ops.org/) (see the “Code: Deployment Pipelines” heading).  

### Step 6: Monitoring the machine learning model

The final step involves monitoring the ML model to see how well it behaves in
a real-world environment. Sooner or later, the model's ability to make
accurate predictions will likely decline. This decay of the model’s predictive
power is known as model drift, and it occurs because of changes over time in
the statistical properties of the data being used for analysis.  

For instance, consider ML models used in predictive maintenance. These models
are trained to anticipate equipment failure based on sensor data. However, as
the machinery ages or maintenance procedures and schedules evolve, the
patterns that initially signaled failure can also modify. This represents a
classic case of concept drift (one of the two main types of model drift),
where the relationships between input variables and the target variable evolve
over time.

Data (feature) drift is another type of model drift, where the input data
distribution changes, but the relationship between input and output remains
constant. For example, if a new kind of machinery or sensor is introduced, the
original ML model might not perform well as it wasn't trained on this new
category of data.

Either way, these changes in the underlying data can significantly impede the
ML model's predictive accuracy. That’s why it’s essential to continuously
monitor ML model performance in production. You might track metrics such as:

  * **Accuracy** — the proportion of correct predictions out of total predictions.
  * **Precision** — the proportion of true positive predictions (correctly predicted positives) out of total predicted positives.
  * **Recall (sensitivity)** — the fraction of true positive predictions out of total actual positives.

There’s a variety of technologies you can choose from to monitor machine
learning models. Some common examples include Prometheus + Grafana (the former
is used for collecting metrics, while the latter is for visualizing them on
dashboards), TensorBoard (a visualization toolkit for the TensorFlow ML
library), and ML observability platforms like Evidently and Fiddler AI.

![Model dashboard graphs showing metrics.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fca5dc6318065c8d26e_uQ52Qrt5XLn58Y5pGKXXjXJOA5Nidl5aZCr38H19TBVJwtrcPG5y2J6j69VF_6OaPaUbYboD7lUXkCwCKGwmo6vq3W5DUzsrMCvZokgujLVaEh-9
--b-fgt2Y0DWn5HTqmlVGYHIVho7luVTKwGMzrI.png)

_Example of a Grafana dashboard used for ML
monitoring._[_Source_](https://www.jeremyjordan.me/ml-monitoring/) _._

If the ML model falls below the acceptable threshold for any metrics you
monitor, you must retrain and retest it with fresh data. Then you have to
redeploy the ML model into production to ensure predictions remain accurate
and relevant.

## Benefits of machine learning pipelines

Compared to manual ML approaches, machine learning pipelines reduce the level
of human intervention required throughout the ML workflow, and bring
significant advantages. For example:

  * **Improved productivity**. ML pipelines can automate and speed up repetitive, mundane tasks, like data preprocessing. This saves valuable time and allows data scientists to focus on more complex jobs that actually need human intervention, such as fine-tuning ML models during training. 
  * **Faster time to market**.**** Thanks to automation, reusability of components, and modularity (we’ll talk more about these characteristics later in this article), machine learning pipelines can shorten the process of moving ML models from development to production.
  * **Better quality predictions.** Machine learning pipelines require less human intervention than manual ML, leaving less room for errors. Instead, automated tests and validation steps are implemented at every stage of the pipeline so that any errors or inconsistencies in the data or model are caught early and corrected. This helps improve the quality and accuracy of data, ML models, and predictions.
  * **Broad applicability and new possibilities**. Machine learning pipelines are prevalent across a multitude of industries, such as finance, e-commerce, telecommunications, and manufacturing, to name just a few. In fact, it’s hard to think of an industry that couldn’t benefit in some way from using machine learning pipelines. Plus, unlike manual ML, automated [machine learning pipelines are suitable for real-time use cases](/blog/fundamentals-real-time-machine-learning) like fraud detection.
  * **Standardization.** Manual ML approaches can be ad-hoc and might lack consistency and transparency, especially when performed by different people or different data science teams. In contrast, ML pipelines define a systematic and consistent sequence for collecting and processing data, training ML models, evaluating their performance, and deploying them to production. This standardization brings efficiency, reduces errors, and provides greater visibility into machine learning processes, making it easier to manage, improve, and collaborate on ML projects.

## What to consider when building machine learning pipelines

Machine learning pipelines can serve many different goals. However, regardless
of their purposes, all high-performance ML pipelines have some characteristics
in common. We give a quick overview of these characteristics below — it’s
something to bear in mind if you’re planning to build your own ML pipeline.  

### Reproducibility

Reproducibility refers to the ability to replicate a machine learning
pipeline's operations and achieve the same results consistently. For instance,
suppose you’ve built a machine learning pipeline to predict customer churn.
Your pipeline includes steps like data preprocessing, feature engineering, and
model training. and. Reproducibility in this context would mean that if
another data scientist on your team (or even you at a later date) takes the
same raw customer data and runs it through your pipeline, they should be able
to reproduce the same transformed dataset, train a model with the same
parameters, and obtain similar results and performance metrics.

![Image showing levels of reproducibility in a hierarchy.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fcb19774a15bc315b3b_d_Eke3fDbYevyJqQv5wAzXsnewKB16KkVopTVE63q5J34BVERsflLDCJgdEMn-3Zu4jTuzMvnb9YSq68j5C4QPtQ1yuhNebLmBJlnTDa3j0ATbi0B6_Izm1JMM5J5mk7waEk0_tnyvFwe8-tLbF5z98.png)

_The different levels of ML
reproducibility._[_Source_](https://outerbounds.com/docs/reproducible-ml/) _._

Reproducibility is crucial because if the ML pipeline's results aren't
reproducible, it becomes challenging to understand whether the ML model's
predictions are reliable or not. In other words, a reproducible ML pipeline
ensures that the ML model's performance can be verified, and that it will
behave as expected when implemented in a real-world setting.

### Automation

Automation reduces the manual effort, repetitive tasks, and human intervention
required throughout the stages of an ML pipeline. For example, you can
automate tasks like data collection and preprocessing, feature extraction, and
ML model deployment and monitoring. That’s not to say these are easy to
automate, but it can be done. However, note that some steps can’t be (fully)
automated. For instance, complex feature engineering, or interpreting the
results of ML monitoring and deciding corrective actions.

Automation is undoubtedly desirable for all types of ML pipelines. But it’s
especially critical for real-time use cases, where manual intervention needs
to be kept to a minimum, due to time constraints.

Consider the example of real-time recommendation systems used by online
retailers, which rely heavily on automated ML pipelines. As a user browses the
website and generates clickstream data, an automated ML pipeline can
immediately process this data, use a pre-trained model to recommend products,
and swiftly update recommendations based on the user’s latest activity. This
automated process results in real-time personalization that can improve the
shopping experience, potentially boosting customer satisfaction and sales.
Manual intervention in this workflow would simply be too slow, leading to
missed opportunities.

### Modularity

You should design each step in the machine learning pipeline as a separate
module/component. This approach brings advantages like simplified testing and
maintenance. Modularity also means flexibility — one step can be modified,
improved, or replaced without affecting the other steps. As each component is
limited in scope, it’s also easier to understand, reason about, and iterate.

Finally, one of the key benefits of modularity is that it enables you to reuse
components across multiple pipelines. For instance, let's say you work for a
healthcare company that uses multiple ML pipelines, each serving a different
goal (e.g., predicting disease progression, analyzing medication use patterns,
and estimating hospital stay). Although they serve different purposes, the ML
pipelines rely on patient data. Since the same type of data underpins these
pipelines, you could develop a single data cleaning module that is reused for
all of them.

### Testing

Testing involves embedding checks at each step to see if the machine learning
pipeline operates as intended. Here are just a few examples:

  * Data validation tests to ensure data consistency, completeness, and correctness at the data ingestion and preprocessing stages.
  * ML model training tests to check if the training process completed without errors and if the model parameters are within expected ranges.
  * Pipeline execution tests to ensure that each stage of the pipeline is correctly linked and that the pipeline runs end-to-end without errors.

Testing aids in the early identification and correction of errors, and ensures
reliable model outcomes, thereby improving the ML pipeline's robustness and
quality.

### Scalability and low latency

Scalability and low latency are key for efficiently handling massive volumes
of data and gaining quick insights and predictions. When data volume or task
complexity grows, a scalable machine learning pipeline can help keep running
smoothly, without compromising performance. Low latency is vital for real-time
applications that demand instant responses.

For example, in motor racing, a scalable, low-latency ML pipeline is critical
for monitoring vehicle performance in real time (e.g., speed or tire pressure)
and analyzing weather data like rain, wind, and temperature changes. The
pipeline needs to be able to swiftly collect, process, and analyze streaming
data (in seconds or milliseconds). Equally, the ML pipeline needs to scale to
successfully handle the vast volume of high-frequency telemetry data
continually collected from the racing car.  

## Building production-ready ML pipelines is non-trivial

Building a high-performance ML pipeline that’s able to consistently produce
highly accurate predictions can be daunting. As we have seen, there are
numerous steps involved in any ML pipeline. And each has its own challenges.
For instance, in the case of real-time ML pipelines, [feature engineering is
plagued by a language barrier](/blog/feature-engineering-language-problem):
data scientists often define their feature computations and build ML models in
Python. Data or machine learning engineers must then rewrite this logic in
Java or Scala to put the models online. This refactoring ultimately slows down
the release of ML capabilities into production, adding extra complexity.

This was just an example, but if you take into account all the other steps
(each with its own set of activities and sub-steps), you’re looking at tens or
even hundreds of tasks that need to be done and automated, numerous components
to manage, and countless challenges to overcome.

Building an ML pipeline in-house is difficult, expensive, and time-consuming,
even with an army of data scientists and developers. It’s even more so when
this responsibility falls on the shoulders of a single data scientist, helped
perhaps by a couple of developers. With this in mind, it’s no surprise that
almost [80% of companies encounter delays of more than six
months](https://thenewstack.io/add-it-up-how-long-does-a-machine-learning-
deployment-take/) in deploying ML pipelines into production.

However, just because something is difficult, it doesn’t mean it shouldn't be
done. After all, machine learning brings benefits such as increased
operational efficiency, data-driven decision-making, better, more personalized
user experiences, and even potentially higher revenue.

Part of the solution is to use [tooling that reduces the complexity and time
needed to build and deploy ML pipelines](/blog/real-time-infrastructure-
tooling-data-scientists).  

## Simplify real-time ML pipelines with Quix

Quix is a managed streaming data platform. We empower developers, data
scientists, and data engineers to easily build real-time machine learning
systems powered by Kafka and Kubernetes-based serverless compute environments.
With Quix by your side, you can:

  * Ingest data from different sources into Quix’s managed Kafka topics. Possible sources include HTTP endpoints, MQTT topics, Twitter, Postgres, SQL databases, Google Pub/Sub, Netatmo devices, and even other Kafka deployments.
  * Place data into the Quix Data Catalogue for long-term storage. 
  * Preprocess raw data and generate ML features using pure Python.
  * Build and train ML models on historical data, and test them on live data.
  * Build and deploy ML pipelines to production, and monitor them to ensure they operate correctly. 

![Code samples dashboard.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64e38fcbbe9cb47f68750e64_pW8a2lWIxFvWXgbFd9qOX3xCKaiclRteDjYEoild2zHoiyae7Y3Ne6JTszzofyxpf8VLtFuDz-
AfmP3lVvPvLHrc37L5_1xksYytJSxF3_1-wF5k2hKRk5r_ISXlTw9ilbhiDxt7bUMgCsbnrtwSodc.png)

_Quix offers pre-built, open source_[ _code
samples_](https://github.com/quixio/quix-samples) _that you can use to quickly
create and deploy ML pipelines._

To better understand how Quix can help with MLOps, [get started with a free
Quix account](https://portal.platform.quix.ai/self-sign-up), and follow our ML
tutorials:

  * [Learn how to extract data from Quix to train an ML model in Jupyter Notebook](https://quix.io/docs/platform/tutorials/train-and-deploy-ml/index.html). 
  * [Build and deploy an ML pipeline to predict load fraud in real time.](/blog/real-time-machine-learning-quick-guide)
  * [Use ML to predict real-time bicycle availability](https://quix.io/docs/platform/tutorials/data-science/index.html).
  * [Create a real-time ML sentiment analysis pipeline that works with Twitter data](https://quix.io/docs/platform/tutorials/sentiment-analysis/index.html).
  * [Build a real-time ML pipeline for image recognition](https://quix.io/docs/platform/tutorials/image-processing/index.html).

[Create an ML pipeline to predict email spam in real time](/blog/event-driven-
ml-predictions-python-kafka).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)


