# Dynamic Configuration Manager

The **Dynamic Configuration Manager** is a managed service for handling
**large, versioned configuration files** related to devices, sensors, or
physical assets.
These configurations often change in real time (e.g., updates to
equipment parameters, IoT sensor mappings, or lab/test system setups),
but are **too large to send through Kafka directly**.

Instead of streaming entire configuration payloads, the service:

- Stores configurations centrally and versions them.
- Publishes a **lightweight Kafka event** with only the URL, version,
and timestamp of the new configuration.
- Works together with the **Quix Streams SDK**, which will
fetch, cache, and enrich data streams with the appropriate configuration
values.

Identifier: `DynamicConfiguration`

## Example YAML

``` yaml
deployments:
- name: Dynamic Configuration Manager
  application: DynamicConfiguration
  version: latest
  deploymentType: Managed
  resources:
    cpu: 200
    memory: 500
    replicas: 1
  configuration:
    # Kafka topic for configuration updates
    topic: config-updates

    # Backing store (MongoDB by default)
    mongoDatabase: quix
    mongoCollection: configuration-api
    mongoHost: mongodb
    mongoPort: 27017
    mongoUser: admin
    mongoPasswordSecret: mongoPasswordSecret

    # Optional settings
    consumerGroup: config-api-v1
    port: 80
    workers: 1
    contentStore: mongo   # mongo | file
```

## Key Capabilities

- Stores and versions large configuration files (JSON or Binary).
- Emits lightweight **Kafka change events** (URL + timestamp +
  version).
- Enables **real-time enrichment** of data streams without sending
  configs through Kafka.
- Designed for **physical asset/device configurations**.
- Provides a simple REST API and embedded UI for browsing/editing
  configs.
- Supports multiple content stores: Mongo (default) or blob/object
  storage (file mode).
- Works seamlessly with the Quix Streams SDK to fetch, cache, and join configs with live data.

## How It Works (High-Level)

1. A new or updated configuration is **persisted and versioned** in the
   service.
2. The service publishes a **Kafka event** containing metadata (URL,
   timestamp, version).
3. Quix Streams SDK consumers subscribe to the topic using join_lookup feature.
4. **Quix Streams SDK downloads the config changes from the API** in realtime, caches it locally, and joins it with incoming data streams using JSONPath or custom join logic.

This design makes it possible to use very large configuration files in
real time without pushing them directly through Kafka.

## Typical Use Cases

- **IoT sensor mappings** that change during operation.
- **Industrial machinery configurations** updated while systems are
  running.
- **Laboratory or testing setups** requiring dynamic parameter
  changes.
- Any scenario where **large configuration files** must be applied in
    real time alongside data streams.

## Embedded View (Plugin)

Dynamic Configuration uses the Plugin system implicitly.
When you open the deployment in the Portal, Deployment Details renders
an embedded view (iframe) for browsing and editing configuration.

Learn more in the [Plugin system](./plugin.md).

![Embedded View](images/dynamic-configuration-embedded-view.png)

## Configuration

Managed services use a simplified configuration block.
At deploy time, Quix maps these keys to environment variables and wiring
required by the managed image.

### Required

- **topic**: Kafka topic for configuration updates
- **mongoHost**: MongoDB host
- **mongoPort**: MongoDB port
- **mongoUser**: MongoDB user
- **mongoPasswordSecret**: Quix secret containing the MongoDB
 password
- **mongoDatabase**: MongoDB database name
- **mongoCollection**: MongoDB collection name

### Optional

- **consumerGroup**: Kafka consumer group identifier (default:
  `config-api-v1`)
- **port**: REST API port (default: `80`)
- **workers**: Number of worker processes (default: `1`)
- **contentStore**: Storage backend for configuration (`mongo` or
  `file`; default: `mongo`).
  - In **file mode**, content is stored in blob/object storage (S3,
      GCS, Azure Blob, etc.).
  - Provider-specific credentials are configured via Quix secrets.
  - In **mongo mode**, only JSON configuration documents are supported and each configuration payload must be ≤ 16 MB. Use `file` (blob) mode for larger or non-JSON artifacts.

## SDK Integration

The **Quix Streams SDK** provides built-in functionality to:

- Subscribe to configuration change events.
- Download and cache the latest configuration from the API.
- Join configuration values with live data streams at the right time.

👉 See [SDK
documentation](../../quix-streams/api-reference/dataframe.html#streamingdataframejoin_lookup)
for details on `join_lookup` and related features.
