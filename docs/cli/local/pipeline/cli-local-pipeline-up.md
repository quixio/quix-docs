# quix local pipeline sync

## Overview

Synchronize your local pipeline to Quix Cloud.

**Aliases:**  sync, deploy

**Usage:**
 
```
quix local pipeline sync [options]
```

**Options:**

- `--workspace-id <workspace-id>`:          Select a concrete workspace-id to sync to
- `--directory <directory>`:                Base directory (defaults to current directory)
- `-u, --update`:                         Update 'quix.yaml' with the new local applications and update the variables of the existing deployments
- `-m, --commit-message <commit-message>`:  The message used for the commit if using `--push`
- `-v, --verbose, --verbosity`:           Display the verbose output
- `-?, -h, --help`:                       Show help and usage information

## Example usage

### Starting the Pipeline with Docker Compose

To start your pipeline, use the following command:

```bash
$ quix local pipeline up
```

This command generates the necessary `compose.yaml` file and deployment configurations:

```
Generating 'compose.yaml'
Generating deployment demo-data-source
✓ Generated deployment demo-data-source
Generating deployment event-detection-transformation
✓ Generated deployment event-detection-transformation
✓ Generated 'compose.yaml'
```

!!! tip

    You can also use the `--dry-run` option to generate the `compose.yaml` file without running it:

    ```bash
    $ quix local pipeline up --dry-run
    ```

Next, it executes `docker compose up --build -d` to build and run the Docker containers:

```text
Executing 'docker compose up --build -d'
```

For more details on how the `docker compose up` command works, refer to the [official Docker documentation](https://docs.docker.com/reference/cli/docker/compose/up/).

#### Running the Containers

Once the images are built, Docker Compose will create and start the containers:

```text
Network githubrepo_default  Creating
Network githubrepo_default  Created
Containers  Creating and Starting
Containers  Started
```

!!! tip
    To update `quix.yaml` with the new local applications and update the variables of existing deployments before running the pipeline, use the following command:

    ```bash
    $ quix local pipeline up --update
    ```

    This command is shorthand for performing both the update and synchronization in one step. Specifically, it executes:

    ```bash
    $ quix local pipeline update
    $ quix local pipeline up
    ```

### Generated `compose.yaml` File

The generated `compose.yaml` file configures the services in your pipeline. Here is the structure and a brief explanation of each section:

```yaml
services:
  demo-data-source:
    volumes:
      - /dev/null:/app/.env
    build:
      context: demo-data-source
      dockerfile: dockerfile
    environment:
      output: f1-data
      Quix__Broker__Address: kafka-broker:9092

  event-detection-transformation:
    volumes:
      - /dev/null:/app/.env
    build:
      context: Event Detection Transformation
      dockerfile: dockerfile
    environment:
      input1: aaa
      output: hard-braking
      Quix__Broker__Address: kafka-broker:9092

  kafka-broker:
    image: docker.redpanda.com/redpandadata/redpanda:v24.1.1
    command: |
      redpanda start
      --smp 1
      --overprovisioned
      --node-id 0
      --kafka-addr internal://0.0.0.0:9092,external://0.0.0.0:19092
      --advertise-kafka-addr internal://kafka-broker:9092,external://localhost:19092
      --pandaproxy-addr internal://0.0.0.0:8082,external://0.0.0.0:18082
      --advertise-pandaproxy-addr internal://kafka-broker:8082,external://localhost:18082
      --schema-registry-addr internal://0.0.0.0:8081,external://0.0.0.0:18081
      --rpc-addr kafka-broker:33145
      --advertise-rpc-addr kafka-broker:33145
      --mode dev-container
      --set auto_create_topics_enabled=true
    ports:
      - 18081:18081
      - 18082:18082
      - 19092:19092
      - 19644:9644

  console:
    image: docker.redpanda.com/redpandadata/console:v2.5.2
    entrypoint: /bin/sh
    command: |-
      -c 'echo "$$CONSOLE_CONFIG_FILE" > /tmp/config.yml; /app/console'
    ports:
      - 8080:8080
    environment:
      CONFIG_FILEPATH: /tmp/config.yml
      CONSOLE_CONFIG_FILE: >
        kafka:
          brokers: ["kafka-broker:9092"]
          schemaRegistry:
            enabled: true
            urls: ["http://kafka-broker:8081"]
        redpanda:
          adminApi:
            enabled: true
            urls: ["http://kafka-broker:9644"]
        connect:
          enabled: true
          clusters:
            - name: local-connect-cluster
              url: http://connect:8083
```

### Explanation of `compose.yaml`

- **demo-data-source** and **event-detection-transformation**:
  - `volumes`: Mounts a null file to `.env`.
  - `build`: Specifies the context and Dockerfile for building the image.
  - `environment`: Sets environment variables for Kafka broker addresses and data inputs/outputs.

- **kafka-broker**:
  - `image`: Uses the Redpanda image.
  - `command`: Configures the Redpanda Kafka broker with specific addresses and ports.
  - `ports`: Maps container ports to host ports for access.

- **console**:
  - `image`: Uses the Redpanda Console image.
  - `entrypoint` and `command`: Sets up the configuration file and runs the console application.
  - `ports`: Maps the console port to the host for access.
  - `environment`: Configures the console to connect to Kafka brokers and schema registry.
