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

### Blob Storage

This service can leverage a blob storage configured on our platform (see [blob storage docs](./blob-storage.md) for setup instructions).

The blob storage configuration is automatically injected only when `contentStore` is set to `file`.

## API Reference

The Dynamic Configuration Manager provides a REST API for managing configurations. The API is available at the service endpoint once deployed.

### Base URL
```
http://<service-name>:<port>/api/v1
```

### Authentication
All API requests require authentication via the `Authorization` header:
```
Authorization: Bearer <your-token>
```

### Create Configuration

Create a new configuration:

```http
POST /api/v1/configurations
Content-Type: application/json

{
  "metadata": {
    "type": "device-config",
    "target_key": "sensor-001",
    "valid_from": "2024-01-01T00:00:00Z",
    "category": "sensors"
  },
  "content": {
    "device": {
      "name": "Temperature Sensor 001",
      "model": "TS-2000",
      "location": "Building A, Floor 2"
    },
    "calibration": {
      "offset": 0.5,
      "scale": 1.02,
      "last_calibrated": "2024-01-01T00:00:00Z"
    },
    "firmware": {
      "version": "2.1.3",
      "features": ["temperature", "humidity"]
    }
  },
  "replace": false
}
```

**Request Body:**
- `metadata.type` (string, required): Configuration type identifier
- `metadata.target_key` (string, required): Target key for configuration matching
- `metadata.valid_from` (ISO8601 datetime, optional): When this configuration becomes valid
- `metadata.category` (string, optional): Category for grouping configurations
- `content` (object, optional): The actual configuration data (JSON object)
- `replace` (boolean, optional): If true, creates a new version if configuration already exists (default: false)

**Note:** The configuration `id` is automatically generated from `type` and `target_key` using SHA-1 hash.

### Update Configuration

Update an existing configuration (creates a new version):

```http
PUT /api/v1/configurations/{id}
Content-Type: application/json

{
  "metadata": {
    "valid_from": "2024-01-15T00:00:00Z",
    "category": "sensors"
  },
  "content": {
    "device": {
      "name": "Temperature Sensor 001",
      "model": "TS-2000",
      "location": "Building A, Floor 3"
    },
    "calibration": {
      "offset": 0.3,
      "scale": 1.01,
      "last_calibrated": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Request Body:**
- `metadata.valid_from` (ISO8601 datetime, optional): Update when this configuration becomes valid
- `metadata.category` (string, optional): Update the category
- `content` (object, optional): Updated configuration data

**Note:** Only fields you provide will be updated. Omitted fields remain unchanged.

### Upload Binary Configuration

For non-JSON configurations (firmware files, calibration data, etc.), use the file upload endpoint:

```http
POST /api/v1/configurations/{id}/versions/{version}/content
Content-Type: multipart/form-data

file: <binary-file-data>
```

**Note:** Binary content must be uploaded separately after creating the configuration metadata. The service automatically detects and stores binary content with appropriate `content_type`.

### Search Configurations

Search for configurations using various criteria:

```http
GET /api/v1/configurations/search?type=device-config&target_key=sensor-001&limit=10&offset=0
```

**Query Parameters:**
- `type` (string, optional): Filter by configuration type
- `target_key` (string, optional): Filter by target key
- `category` (string, optional): Filter by category
- `limit` (integer, optional): Maximum number of results (default: 20)
- `offset` (integer, optional): Number of results to skip (default: 0)

### Get Configuration

Retrieve a specific configuration:

```http
GET /api/v1/configurations/{id}
```

### Get Configuration Version

Retrieve a specific version of a configuration:

```http
GET /api/v1/configurations/{id}/versions/{version}
```

### Delete Configuration

Delete a configuration (all versions):

```http
DELETE /api/v1/configurations/{id}
```

### Storage Modes

#### MongoDB Mode (Default)
- **Content Type**: JSON only
- **Size Limit**: 16 MB per configuration
- **Use Case**: Structured configuration data
- **Setup**: Configure MongoDB connection parameters

#### File Mode (Blob Storage)
- **Content Type**: Any binary data
- **Size Limit**: Depends on blob storage provider
- **Use Case**: Large files, firmware, binary data
- **Setup**: Configure blob storage credentials

To use file mode, set `contentStore: file` in your deployment configuration.

## Using with Quix Streams join_lookup

The Dynamic Configuration Manager integrates seamlessly with Quix Streams' `join_lookup` feature to enrich streaming data with configuration data in real-time.

### Basic Integration

```python
from quixstreams import Application
from quixstreams.dataframe.joins.lookups import QuixConfigurationService

# Initialize the application
app = Application()

# Create a lookup instance pointing to your configuration topic
lookup = QuixConfigurationService(
    topic=app.topic("device-configurations"),
    app_config=app.config
)

# Create your main data stream
sdf = app.dataframe(app.topic("sensor-data"))

# Enrich sensor data with device configuration
sdf = sdf.join_lookup(
    lookup=lookup,
    fields={
        "device_name": lookup.json_field(
            jsonpath="$.device.name",
            type="device-config"
        ),
        "calibration_params": lookup.json_field(
            jsonpath="$.calibration",
            type="device-config"
        ),
        "firmware_version": lookup.json_field(
            jsonpath="$.firmware.version",
            type="device-config"
        )
    },
    on="device_id"  # The field to match on
)

# Process the enriched data
sdf = sdf.apply(lambda value: {
    **value,
    "device_info": f"{value['device_name']} (v{value['firmware_version']})"
})

# Output to destination topic
sdf.to_topic(app.topic("enriched-sensor-data"))

if __name__ == "__main__":
    app.run()
```

### Advanced Configuration Matching

Use custom key matching logic for complex scenarios:

```python
def custom_key_matcher(value, key):
    """Custom logic to determine configuration key"""
    device_type = value.get("device_type", "unknown")
    location = value.get("location", "default")
    return f"{device_type}-{location}"

# Use custom key matching
sdf = sdf.join_lookup(
    lookup=lookup,
    fields={
        "config": lookup.json_field(
            jsonpath="$",
            type="location-config"
        )
    },
    on=custom_key_matcher
)
```

### Binary Configuration Support

For non-JSON configurations (firmware files, calibration data, etc.):

```python
sdf = sdf.join_lookup(
    lookup=lookup,
    fields={
        "firmware_binary": lookup.bytes_field(
            type="firmware"
        ),
        "calibration_data": lookup.bytes_field(
            type="calibration"
        )
    },
    on="device_id"
)
```

### How join_lookup Works with Dynamic Configuration

1. **Configuration Events**: When configurations are updated via the API, lightweight Kafka events are published to your configuration topic.

2. **Real-time Processing**: The `join_lookup` feature listens to these events, fetches the latest configuration content, and caches it locally.

3. **Stream Enrichment**: As your main data stream processes records, `join_lookup` automatically enriches each record with the appropriate configuration data based on the matching key and timestamp.

4. **Version Management**: The system automatically handles configuration versioning, ensuring that each record is enriched with the configuration version that was valid at the time the record was created.

5. **Performance Optimization**: Local caching minimizes API calls and reduces latency for high-throughput applications.

### Advanced Use Cases

#### Custom Target Key Matching

For complex matching logic that goes beyond simple field matching:

```python
class CustomLookup(QuixConfigurationService):
    def _config_id(self, type: str, key: str) -> str:
        """Override to implement custom ID generation"""
        # Custom logic for generating configuration IDs
        if type == "device-config":
            # Extract device type and location from key
            parts = key.split("-")
            device_type = parts[0]
            location = parts[1] if len(parts) > 1 else "default"
            return f"{device_type}-{location}"
        return super()._config_id(type, key)

# Use custom lookup
custom_lookup = CustomLookup(
    topic=app.topic("device-configurations"),
    app_config=app.config
)
```

#### Multi-Type Configuration Enrichment

Enrich with multiple configuration types:

```python
sdf = sdf.join_lookup(
    lookup=lookup,
    fields={
        # Device configuration
        "device_info": lookup.json_field(
            jsonpath="$.device",
            type="device-config"
        ),
        # Location configuration
        "location_info": lookup.json_field(
            jsonpath="$.location",
            type="location-config"
        ),
        # Calibration data
        "calibration": lookup.json_field(
            jsonpath="$",
            type="calibration-config"
        )
    },
    on="device_id"
)
```

### Benefits

- **Real-time Updates**: Configuration changes are immediately available to your streaming applications
- **Large File Support**: Handle configuration files too large for direct Kafka streaming
- **Version Control**: Automatic versioning ensures data consistency
- **Performance**: Local caching minimizes API calls and latency
- **Flexibility**: Support for both JSON and binary configuration content
- **Scalability**: Efficient handling of high-throughput data streams
