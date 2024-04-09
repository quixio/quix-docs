---
title: Brokers for Quix
description: Brokers that can be used with Quix.
---

# Overview - Brokers

While Quix has Kafka built in, it is also possible to use a third-party Quix broker, on a per-environment basis. You can have different brokers servicing different environments.

 The following brokers are currently supported:

* Quix managed broker
* Confluent Cloud
* Redpanda
* Aiven
* Upstash

When you create an environment within your project, you can specify the broker you'd like to use for that environment. Given that environments are associated with specific branches of your Git repository (project) you could potentially use, for example, the Quix broker for internal testing (say on a `testing` or `develop` branch) and then use a third-party option for production use.

You can use this feature to easily integrate Quix with your existing infrastructure, so if you already use Upstash (for example) as your Kafka backbone, it is easy to then integrate Quix with that existing system. Quix then adds value by providing powerful, but simple to use, stream processing capabilities in Python.

In addition, Quix supports self-hosted brokers.
