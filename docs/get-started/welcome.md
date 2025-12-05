---
title: Welcome
description: Welcome to the Quix documentation. Quix lets you consolidate sensor data, configurations, and test metadata from your test rigs and simulations in a single platform. Process data in real-time or replay historical runs to accelerate R&D.
---

# Welcome

Quix is a data platform for consolidating measurement data, configuration metadata, and test parameters from test rigs, simulations, and sensors. The platform handles high-frequency telemetry data in real-time and provides the ability to replay historical runs for analysis and debugging.

This documentation includes guides, tutorials, and API references for Quix Cloud, Quix Streams (the open-source Python library), and Bring Your Own Cluster (BYOC) deployment options.

## Quix Features

**Data consolidation**: Connect sensors, data acquisition systems, MATLAB/Simulink outputs, and legacy instruments through pre-built connectors or custom Python code. All data streams to a centralized data store. 

* [Learn about data integration →](../develop/integrate-data/overview.md)

**Configuration and measurement linkage**: Store test configurations alongside sensor measurements. Query by test parameters to find specific runs, or trace measurement anomalies back to their exact test setup.

* [Learn about dynamic configuration →](../quix-cloud/managed-services/dynamic-configuration.md)

**Real-time processing and historical replay**: Process live telemetry as it arrives, then replay historical data later to investigate issues or validate changes without re-running physical tests. 

* [Learn about replay →](../quix-cloud/managed-services/replay.md)

**Python-based pipeline development**: Use Quix Streams to build data processing pipelines in Python. Develop and test locally, then deploy to managed infrastructure without requiring Kafka or DevOps expertise.

* [Get started with Quix Streams →](../quix-streams/quickstart.md)

## Typical Workflow

1. **Develop locally**: Build Python data processing pipelines with Quix Streams, your IDE, and the Quix CLI. Test with Docker before deployment.

2. **Debug with replay**: Replay historical test runs locally to reproduce issues or validate fixes.

3. **Deploy to production**: Push pipelines to Quix Cloud for managed infrastructure, monitoring, and data persistence. Alternatively, use BYOC to run on your own Kafka cluster.

<div class="grid cards" markdown>

- __Get started__

    ---

    Install Quix Streams and build your first data processing pipeline.

    [Install Quix Streams :octicons-arrow-right-24:](../quix-streams/quickstart.md)

</div>
