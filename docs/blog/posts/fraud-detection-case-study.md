---
title: "Detect financial fraud in real time to limit losses: A personal case study"
date: 2023-07-19
authors: [mike-rosam]
slug: fraud-detection-case-study
description: >
  Financial fraud is now the most prevalent crime in the UK, costing the industry £190 billion per year. Globally, this figure was an eye-watering $1.45 trillion in 2019. In this case study I show you how I lost thousands and how banks could have avoided most of this through real-time fraud detection.
categories:
  - use-cases
---

# Detect financial fraud in real time to limit losses: A personal case study

Financial fraud is now the most prevalent crime in the UK, costing the industry £190 billion per year. Globally, this figure was an eye-watering $1.45 trillion in 2019. In this case study I show you how I lost thousands and how banks could have avoided most of this through real-time fraud detection.

<!-- more -->

## How I suffered from financial fraud, a real-world case

Many of us have suffered from this “victimless” crime. I myself fell victim to
fraudulent activity just three weeks ago — it went something like this:

  1. I receive a notification on my mobile phone
  2. It’s my company banking app indicating a near £3,000 payment
  3. I know immediately it’s fraud
  4. A second notification comes in whilst I’m looking at my phone
  5. Another £2,500 gone

Then comes the fear, panic, and that horrible knot in your stomach; I log in,
cancel the card, and call customer service. Thirty minutes later, they answer
and finally tell me they’ll look into it.

The good news is that eventually the bank dealt with it and we got our money
back. But there are victims. Firstly, there have been losses somewhere down
the chain of financial transactions. And secondly, I’m a very unhappy customer
who no longer trusts my bank. Why? Because as a human experiencing those
events in real time, it was so obviously a financial crime.  

## Why couldn’t the bank detect and prevent fraud?

The first transaction will be genuinely difficult (but not impossible) to
detect. But the second one should have been easy. Let’s look at the facts:

  1. Both transactions were large
  2. Both were made with new vendors that I’ve never transacted with before
  3. Both were made within a minute of each other

To detect the second transaction, a [level 1 ML
system](https://huyenchip.com/2020/12/27/real-time-machine-learning.html)
would have less than 1 minute to:

  1. Intercept the second transaction
  2. Compare it to the first
  3. Realize that two high-value transactions within seconds of each other to two new vendors are suspicious
  4. Respond with a message to block the transaction

**Step 3 is the critical part.** For a machine to have this realization, it
must be trained on historic data representing a similar set of scenarios. This
is where a level 1 ML system uses huge volumes of historic data stored in a
data warehouse to train the neural network ‘off-line’. The goal is to show the
ML model enough examples of fraud so that it can detect similar situations in
the future. The model is then deployed to an online environment where it
should make accurate predictions on new data streams. If this happens quickly
enough (in less than a minute) then £2,500 of fraud is prevented.  

## What if this pattern of events wasn’t present in the historic training
data?

In this case, there would still be some loss as the ML system has no
experience with the fraudulent pattern. In a level 1 ML system these data sets
would eventually be incorporated into the historic data and the ML model would
be re-trained to detect them automatically, unfortunately, this is where the
losses can mount, as the time it takes the customer service team to report the
fraud to the ML team, to have them re-train, test and deploy their models
could take anything from a day to a month — all the while there’d be a
vulnerability in the system.

A level 2 ML system could dramatically reduce future losses by immediately
incorporating this new information into its training data. Imagine this
scenario occurring after I notice the fraudulent transactions:

  1. I log into my banking app
  2. I click the first transaction and mark it as fraudulent
  3. The app asks me to select any other strange transactions
  4. I select the second one and submit my customer service request

I’ve only made three user inputs across a four-step customer journey, but look
at the potential – the level 2 ML system immediately:

  1. Updates the ML model with the new data
  2. Tests the updated model against a range of similar scenarios
  3. Validates the improvements and incorporates the update in the production system

The world’s best level 2 ML systems can automatically achieve this loop in 10
minutes, dramatically reducing the potential for future losses. And whilst not
all fraud can be eliminated entirely, the second data-driven process also
delivers a better customer experience because their interaction with the app
could result in a rapid-response callback, rather than the customer waiting in
the general customer service queue for 30 mins – a much better outcome than
the one I experienced!  

## How could a bank build a real-time fraud detection system with Quix?

We built Quix to help teams build real-time data processing systems quickly,
even if they don’t have a budget or expert resources in-house. With Quix, a
bank could build a prototype of this fraud detection system in less than an
hour by:

  * **Step 1.** Sign up for a free account and create a workspace.
  * **Step 2.** Create two topics, one to stream all transaction data and a second to stream the results of a real-time model.
  * **Step 3.** Write a service to stream some random transaction events to the first topic
  * **Step 4.** For the prototype model, write a simple application service that looks for incoming transaction events and compares them to subsequent events occurring on the same streamID.

Simple logic will do, for now, just to test the system. Have your model write
a new event to the second topic when two transactions are within 30 seconds of
each other.  

## Quix lets you focus on the business problem

As you can see, any developer in a bank could prototype [a real-time fraud-
detection system quickly with Quix](/use-cases), but the reality is that
putting such a system into production would be considerably harder. The bank
would need to involve compliance teams to understand legal and ethical issues,
product design teams to think about the user experience, product engineering
to implement the new feature, and data scientists to build and maintain the ML
models.

There is a lot of work to do, but Quix takes care of the infrastructure for
this system allowing a bank to focus its resources on value-added activities
like developing the machine-learning models and building an amazing customer
experience, rather than building and maintaining the infrastructure on which
it runs. See it for yourself by [registering today](https://quix.io/signup).





