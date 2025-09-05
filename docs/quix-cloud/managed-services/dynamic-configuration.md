# Dynamic Configuration Manager

The Dynamic Configuration Manager is a managed service to store, version, and distribute application configuration at runtime. It provides a simple REST API and lightweight UI, persists configuration in a backing store, and emits change events to Kafka so services can react immediately. It works great with the Quix platform and SDK, and can be used from any HTTP/Kafka client.

Identifier: `DynamicConfiguration`

## Example YAML

```yaml
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

## Key capabilities

- CRUD configuration items with optional metadata
- Versioning and history
- Real-time change notifications on a Kafka topic
- Pluggable content store (Mongo by default; file mode uses blob/object storage such as S3, GCS, or Azure Blob)
- Simple REST API and web UI
- Horizontal scaling via workers
- Optional consumer group for isolated consumption

## How it works (high-level)

1. Create/update requests persist content and produce a new version.
2. The service publishes a change event to the configured Kafka topic.
3. Consumers subscribe to that topic and apply changes.

Note

- Besides defining it in YAML, you can also add this managed service from the Quix UI: open the side panel, go to Services → Add service → Dynamic Configuration Manager, then configure and deploy.

## Configuration

Managed services use a simplified configuration block. At deploy time, Quix maps these keys to the underlying environment variables and wiring required by the managed image.

### Required

- topic: Kafka topic for configuration updates
- mongoHost: MongoDB host
- mongoPort: MongoDB port
- mongoUser: MongoDB user
- mongoPasswordSecret: Name of the Quix secret containing the MongoDB password
- mongoDatabase: MongoDB database name
- mongoCollection: MongoDB collection name

### Optional

- consumerGroup: Kafka consumer group identifier (default: config-api-v1)
- port: Port for the REST API (default: 80)
- workers: Number of worker processes (default: 1)
- contentStore: Storage backend for configuration content (mongo or file; default: mongo). In file mode, content is stored in blob/object storage (e.g., S3/GCS/Azure Blob) and typically requires provider-specific credentials configured via Quix secrets.

