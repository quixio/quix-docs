---
title: "Replay Message Transformations"
description: Transform Kafka messages during replay to modify headers, keys, and values on-the-fly using a simple transformation language.
---

# Replay Message Transformations

Transform Kafka messages during replay to modify headers, keys, or JSON values on-the-fly. The transformation language uses simple, English-like syntax to describe operations on message data.

## Purpose

Message transformations let you modify messages as they're replayed from Quix Lake back into Kafka. Common use cases include:

- Update API endpoints when replaying between environments
- Anonymize or mask sensitive data for testing
- Modify configuration values (timeouts, URLs, feature flags)
- Add, modify, or remove message headers

## Quick start

```yaml
deployments:
  - name: Quix Lake - Replay
    application: DataLake.Replay
    version: latest
    configuration:
      sourceTopic: production-events
      destinationTopic: staging-events
      transformations:
        - AT value.apiEndpoint REPLACE TEXT https://api.prod.com WITH https://api.staging.com
        - AT header.x-environment SET TO staging
        - AT value.user.email SET TO test@example.com
        - REMOVE value.user.creditCard
```

This replays production events into staging while updating API endpoints, setting environment headers, replacing user emails, and removing sensitive data.

## Actions

### REPLACE TEXT

Find and replace text within a value. The target is treated as text, and all occurrences are replaced.

**Syntax:** `AT <target> REPLACE TEXT <find> WITH <replacement>`

```yaml
transformations:
  - AT value.apiUrl REPLACE TEXT https://old.api.com WITH https://new.api.com
  - AT value.user.email REPLACE TEXT @old.com WITH @new.com
  - AT header.x-api-version REPLACE TEXT v1 WITH v2
  - AT value.count REPLACE TEXT 100 WITH 200
```

!!! note
    Works on any target (headers, key, or JSON properties) by treating the value as text. Matching is case-sensitive and replaces all occurrences. JSON types are preserved: if the original value is a number or boolean, it remains that type after replacement.

### SET TO

Replace the entire value at a target location.

**Syntax:** `AT <target> SET TO <value>`

```yaml
transformations:
  - AT header.x-environment SET TO staging
  - AT value.user.status SET TO active
  - AT value.user.age SET TO 25
  - AT value.user.verified SET TO true
  - AT value.config SET TO {"enabled":true,"timeout":5000}
```

!!! tip
    `SET TO` creates nested JSON paths if they don't exist. JSON types are preserved: numbers remain numbers, booleans remain booleans, and strings remain strings.

### REMOVE

Delete a header or JSON property completely. Removing a parent property deletes all its children.

**Syntax:** `REMOVE <target>`

```yaml
transformations:
  - REMOVE value.user.ssn
  - REMOVE value.user.address  # Removes entire address object with all nested properties
  - REMOVE header.x-internal-trace
```

!!! warning
    You cannot remove `value` or `key` (root level) - use `SET TO` instead. Removing a non-leaf property deletes the entire subtree.

## Targets

### Headers

Message headers (metadata key-value pairs).

**Syntax:** `header.<header-name>`

```yaml
transformations:
  - AT header.content-type SET TO application/json
  - REMOVE header.x-debug
```

!!! note
    Header names are case-sensitive in Kafka.

### Key

The message key (used for partition routing).

**Syntax:** `key`

```yaml
transformations:
  - AT key SET TO new-device-001
  - AT key REPLACE TEXT device WITH sensor
```

### Value

The message value/payload. Use dot notation to navigate nested JSON properties.

**Syntax:**

- `value` - The entire value (text)
- `value.<property>` - A JSON property
- `value.<nested>.<property>` - Nested JSON (only the last property is transformed)

```yaml
transformations:
  - AT value SET TO "new message content"
  - AT value.status SET TO active
  - AT value.user.email SET TO test@example.com
  - AT value.config.timeout SET TO 5000
```

!!! info
    In nested paths like `value.user.email`, parent properties (`user`) navigate to the target, and only the last property (`email`) is transformed.

**Properties with spaces or dots:**

```yaml
transformations:
  - AT value."user name" SET TO "John Doe"
  - AT value.user\.name SET TO test
```

## Escape sequences

Use escape sequences for special characters in values:

| Sequence | Character |
|----------|-----------|
| `\n` | Newline |
| `\r` | Carriage return |
| `\t` | Tab |
| `\"` | Quote |
| `\\` | Backslash |

```yaml
transformations:
  - AT value.message SET TO "Welcome!\n\nYour account is ready."
  - AT value.path SET TO "C:\\Users\\Documents\\file.txt"
```

## JSON transformation examples

These examples show how REPLACE TEXT, SET TO, and REMOVE work on nested JSON structures.

**Original message:**

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@old-domain.com",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Boston",
      "zip": "02101"
    },
    "isActive": true
  },
  "apiUrl": "https://api.old.com/v1"
}
```

**Transformations:**

```yaml
transformations:
  # REPLACE TEXT - finds and replaces text (preserves types)
  - AT value.user.email REPLACE TEXT @old-domain.com WITH @new-domain.com
  - AT value.apiUrl REPLACE TEXT old WITH new
  - AT value.user.age REPLACE TEXT 30 WITH 35

  # SET TO - overwrites entire value
  - AT value.user.name SET TO "Jane Smith"
  - AT value.user.isActive SET TO false

  # REMOVE - deletes property (removes entire subtree for parent properties)
  - REMOVE value.user.address  # Removes entire address object including street, city, zip
```

**Result:**

```json
{
  "user": {
    "name": "Jane Smith",
    "email": "john@new-domain.com",
    "age": 35,
    "isActive": false
  },
  "apiUrl": "https://api.new.com/v1"
}
```

!!! note
    - `REPLACE TEXT` on `user.age` replaced "30" with "35" and kept it as a number
    - `REMOVE` on `user.address` deleted the entire address object with all nested properties (street, city, zip)

## Use cases

### Environment migration

```yaml
transformations:
  - AT value.apiUrl REPLACE TEXT https://api.prod.com WITH https://api.staging.com
  - AT header.x-environment SET TO staging
  - AT value.config.timeout SET TO 30000
```

### Data anonymization

```yaml
transformations:
  - AT value.user.email SET TO test@example.com
  - REMOVE value.user.ssn
  - REMOVE value.user.creditCard
  - REMOVE header.authorization
```

## Execution order

Transformations apply sequentially. Later transformations see the results of earlier ones:

```yaml
transformations:
  - AT value.email REPLACE TEXT @old.com WITH @new.com
  - AT value.email REPLACE TEXT john WITH jane
  # Result: john@old.com → jane@new.com
```

## Constraints

**REPLACE TEXT:**

- Works on: `header.<name>`, `key`, `value`, and JSON properties
- Treats the target value as text (performs literal string find/replace)

**SET TO:**

- Works on: All targets
- Creates nested paths if they don't exist

**REMOVE:**

- Works on: `header.<name>`, nested JSON properties
- Cannot remove `value` or `key` (root level)

## Common errors

**Missing quotes around values with spaces:**

```yaml
# Wrong
- AT value.message SET TO Hello World

# Correct
- AT value.message SET TO "Hello World"
```

**Incorrect escape sequences:**

```yaml
# Wrong
- AT value.path SET TO "C:\Users"

# Correct
- AT value.path SET TO "C:\\Users"
```

**Invalid JSON:**

```yaml
# Wrong
- AT value.config SET TO {enabled:true}

# Correct
- AT value.config SET TO {"enabled":true}
```

## Complete example

```yaml
deployments:
  - name: Production Replay to Staging
    application: DataLake.Replay
    version: latest
    configuration:
      sourceWorkspaceId: prod-workspace
      sourceTopic: user-events
      fromTimestamp: 1719859200000
      toTimestamp: 1719945600000
      destinationTopic: staging-user-events
      timestampsType: Simulated
      replaySpeed: "2"
      transformations:
        - AT header.x-environment SET TO staging
        - AT value.apiEndpoint REPLACE TEXT https://api.prod.com WITH https://api.staging.com
        - AT value.user.email SET TO test-user@example.com
        - REMOVE value.user.phone
        - AT value.config.timeout SET TO 30000
        - REMOVE header.x-internal-trace
```

## See also

- [DataLake.Replay Overview](./replay.md) - Main replay service documentation
- [Quix Lake](../quixlake/overview.md) - Learn about data persistence
