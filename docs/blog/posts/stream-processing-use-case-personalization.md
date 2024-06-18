---
title: "Using streaming data to personalize everything from house hunting to healthcare"
date: 2023-07-19
authors: [mike-rosam]
slug: stream-processing-use-case-personalization
description: >
  How in-memory data processing is improving personalized customer experiences across industries
categories:
  - use-cases
---

# Using streaming data to personalize everything from house hunting to healthcare

How in-memory data processing is improving personalized customer experiences across industries

<!-- more -->

## Real time data processing enables companies to deliver superior
personalized experiences tied to the user’s in-the-moment needs

We live in a world of real time digital interactions: the feeds on our phone,
the magic behind collaboration tools and the apps on our watch that remind us
to squeeze a few more steps into our day.

From smartphones to smart houses, we tailor these digital experiences to fit
like a comfortable pair of jeans. Our personal devices “know” our schedules
and preferences. They anticipate our needs and offer helpful answers even
before we ask the question.

> _“80% of US adults said they want personalization from retailers, according
> to a survey from Epsilon and GBH Insights.”_

People are accustomed to the highly individualized digital experiences that
smart devices deliver. While logically customers might understand that a
brand’s website isn’t going to be as personalized as the app experience on
their phones, personalized experiences still set a high bar.

In fact, 80% of US adults said they want personalization from retailers,
according to a survey from Epsilon and GBH Insights.

To meet the demand for more relevant, personalized experiences, companies need
to change the way they process consumer data. Specifically, they need to stop
collecting data and dumping it into data lakes and warehouses — and start
processing data the moment it is created (when it’s most relevant), in a data
stream.

Let’s look at why current personalization efforts are falling short of
customer expectations, and how real time data processing can help you deliver
better user experiences.

## Why personalization falls short of customer expectations

How you manage customer data plays a huge role in your personalization
capabilities. Traditional methods of personalization rely on batch-processed
data that artificially groups people into personas. Personalization tools use
these personas and historic customer data to add things like name, past orders
and recommendations to pages as they’re built.

There are two main shortcomings with this approach:

  1. **Batch processing relies on historical data and misses data from the person’s current interaction with your site or app.** As people interact with apps and devices, they leave digital fingerprints that offer insights into their mood, preferences and needs in that moment. These are the clues companies need to pick up on, so that a customer doesn’t get a coupon for a product that they just returned or feel the frustration of providing the same information multiple times.
  2. **It misses the opportunity to combine customer data with additional data streams to hyper-personalize the experience.** Some retailers combine personal preferences and customer data with things like real time geolocation and weather data streams to deliver hyper-personalized offers. For example, on a chilly day they can ping nearby customers with an offer for 10% off a bowl of their favorite soup or winter gear.

People are more than their personas. As individuals, they want the brands they
love to meet even unexpressed needs — like a good host anticipating a guest’s
likely desires based on observation in the moment.

Gladly’s 2021 Customer Expectations Report found that 81% of consumers believe
customer service falls below expectations and lack of personalization topped
their list of complaints. “Knowing a customer’s name, their order number, and
their purchase history before the conversation begins are now table stakes
when it comes to delivering great service,” asserts the report.

The report delivers a chilling warning to brands: 51% of people will switch
brands after just one or two bad experiences. But on the positive side, 77% of
people say they will recommend brands that provide more personalized
experiences.  

### Companies are struggling to manage data at the speed and scale needed

Consistently delivering the advanced levels of personalization that customers
want is hard — and the stakes are high.
[McKinsey](https://www.mckinsey.com/industries/retail/our-
insights/personalizing-the-customer-experience-driving-differentiation-in-
retail) identifies these challenges to personalization:

‍**Source: McKinsey  
  
**

## Real time data processing is the future of personalization

Processing customer data in real time enables companies to provide the
personalized experiences people want. It closes the user experience gap
inherent in batch processing.

Here’s the difference:

  * With traditional batch processing applied to personalization, data is collected, then processed, and finally delivered back to company systems on a defined schedule (in a batch), which could be hours, days or weeks.
  * With stream processing, customer data is collected and processed in real time — in a matter of milliseconds — as it streams in from multiple sources.

Real time data processing, also called streaming data processing or in-memory
processing, can help customer service representatives understand why a
customer is calling before they pick up the phone. Combined with machine
learning, it can even help prevent or solve the problem before a customer
calls.

This combination of data stream processing, ML and automation aligns with the
personalization operating model recommended by McKinsey. “At the core of the
personalization tech is a centralized decisioning engine, or ‘brain,’ that is
capable of interacting with each outlying system to consistently make real
time decisions based on consumer signals. This technology can coordinate
content offers across audiences and channels in real time and help teams
adjust them based on feedback.” Read more in McKinsey’s [“No customer left
behind: How to drive growth by putting personalization at the center of your
marketing.”](https://www.mckinsey.com/business-functions/marketing-and-
sales/our-insights/no-customer-left-behind)  

## Real time data processing helps Trulia deliver “personal relevancy” at
scale

[Trulia](https://www.trulia.com/blog/tech/personalization-hub/) faces the
challenge of matching hundreds of millions of individuals with hundreds of
millions of houses that are just as unique as the people who buy them.
Processing all that information on house hunters and houses for sale to
deliver the perfect match requires massive computing resources and complex
data analysis. And the data is constantly changing.

To deliver the most relevant matches, Trulia collects billions of user events
(house views, search criteria, etc.) in real time and processes those into
user traits. This massive undertaking uses a combination of batch processing
and streaming data processing to keep the computed user traits up-to-date in
real time.

“This transformation allows us to view each user’s sequence of activities in
time order, and run data science models and business rules to capture various
personalized consumer insights,” Trulia explains on their blog:
[Personalization Hub](https://www.trulia.com/blog/tech/personalization-hub/).  

## Individualized experiences make people’s lives better

The applications of streaming data processing are exciting for businesses and
for the people they serve. Consider the healthcare industry. The average
person will likely generate more than one million gigabytes of health-related
data from fitness trackers, medical devices, implants and other connected
devices, according to IBM’s report [“The future of health is
cognitive”](https://www.ibm.com/downloads/cas/LQZ0O1WM).

All that data has the potential to transform an overburdened healthcare
industry and improve patient outcomes. Streaming data processing turns data
into actionable insights when every second counts.

At the University of Chicago Medicine, researchers developed a [predictive
algorithm that uses TIBCO’s streaming analytics
platform](https://www.tibco.com/customers/university-chicago-medicine) to
predict when cardiac arrest is likely to happen and alerts the rapid response
team. Within a few hours of going live, the system had already prevented the
first cardiac arrest and is now credited with reducing the number of cardiac
arrests in the hospital by an estimated 15% to 20%.

[Etiometry](https://www.etiometry.com/), a provider of clinical decision-
support software for critical care, is also tapping into data streams to help
prevent adverse events in intensive care settings. The backbone of their
products is a risk analytics engine that uses advanced algorithms to combine
and continuously convert multiple streams of raw data into near real time
clinical information.

This is used to continuously update a dynamic model of the patient as more
information is captured (e.g. vital signs, ventilator information, lab
results). As a result, the software can predict the likelihood of adverse
events to help busy doctors prioritize the patients who need them most. In
some cases, the software can even automate and deploy appropriate protocols to
manage complications and aid recovery.  

![Etiometry’s risk analytics engine uses streaming data processing
scheme.](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/64be8a8d44ad22282e6090ef_etiometry-
diagram.webp)

Etiometry’s risk analytics engine uses streaming data processing to quickly
provide doctors with the information they need to prioritize and treat
patients. Image source: [www.etiometry.com/risk-analytics-
engine](https://www.etiometry.com/risk-analytics-engine/)

## Quix empowers you to using streaming data now

Using streaming data for personalization has applications for every industry.
Just imagine how much better your customer and business outcomes could be if
you operationalized real time data — not just processing but also automating
responses to the data.

Problems could be prevented before they occur, in-product support can
accurately anticipate what the user needs, product recommendation engines
could deliver better results, and hyper-personalized experiences would show
customers they are valued as individuals.

It’s all possible, but building streaming data infrastructure is hard — that’s
why it’s been the sole domain of Big Tech companies until now. In fact, [it
can be prohibitively hard for companies to get started](/blog/why-is-
streaming-data-so-hard-to-handle). That’s where [Quix](/) can help.

Quix is on a mission to democratize access to streaming data processing. We
built our platform to put the power of streaming data into the hands of data
scientists, data engineers and citizen developers so that you can work with
streaming data in the languages you love without worrying about the backend
infrastructure.

Quix includes all the components you need tap into the data stream with Python
or C#. We provide [documentation](https://quix.io/docs) and
[SDKs](https://quix.io/docs/sdk/introduction.html) to speed up the learning
curve so that you can start coding and using streaming data faster.

Give us a test drive today — [sign up for a free Quix
account](https://quix.io/signup) to see how easy it is to build with Quix, or
try our no-code [car racing game demo](/streaming-demo) to see the power of
stream processing in action. You can also join us in our [community
Slack](http://quix.io/slack-invite).





