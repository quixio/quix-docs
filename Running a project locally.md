# Running a project locally

If a customers wants to try a project locally, without incurring extra costs, it’s easy to transform each application and create a docker-compose file.

Note that the project will not run 100% locally if any of the applications need *streaming reader* or *streaming writer*, because these need to connect to the internal Kafka (or a public one).

We are using the [Clickstream Analysis - Test Docker](https://portal.platform.quix.io/topics?workspace=demo-clickstreamanalysis-testdocker) project as example (specifically this commit https://github.com/quixio/template-clickstream/commit/1f3de0bfaa3d5738c693dc033b60529bd70b5a18)

## Transforming apps

Transforming an application needs 2 steps. First will be to write a new Dockerfile. Basically the modification we have to do is to remove the `COPY --from=git` because of the way the image is built internally, and modify the installation of requirements (to avoid using internal servers).

<aside>
💡 To build the image internally, the Build Service creates an image called *git*, that downloads the code from git and puts it in /project, then it is copied to /app directory

</aside>

```docker
FROM python:3.11.3-slim-buster

ENV DEBIAN_FRONTEND="noninteractive"
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=UTF-8

WORKDIR /app
COPY . /app
RUN python3 -m pip install -r requirements.txt

ENTRYPOINT ["python3", "main.py"]
```

This is the old file:

```docker
FROM python:3.11.1-slim-buster

ENV DEBIAN_FRONTEND="noninteractive"
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=UTF-8

WORKDIR /app
COPY --from=git /project .
WORKDIR /app/
RUN find | grep requirements.txt | xargs -I '{}' python3 -m pip install -i http://pip-cache.pip-cache.svc.cluster.local/simple --trusted-host pip-cache.pip-cache.svc.cluster.local -r '{}' --extra-index-url https://pypi.org/simple --extra-index-url https://pkgs.dev.azure.com/quix-analytics/53f7fe95-59fe-4307-b479-2473b96de6d1/_packaging/public/pypi/simple/
ENTRYPOINT ["python3", "main.py"]
```

Second transformation, if we want to run locally completely, is to use `KafkaStreamingClient` instead of `QuixStreamingClient` and point to a local Kafka/Redpanda (that we can run in Docker Compose).

## Writing docker-compose.yml

Second step is to write the docker-compose file. This file is similar to the quix.yaml because it contains the definition of the running containers.

The file has a header of:

```docker
version: "3.7"
services:
  ...
```

And then we define the services. First is the Redpanda broker. This was taken from the [Docker Compose Samples](https://docs.redpanda.com/current/reference/docker-compose/) from Redpanda’s docs. The only modification we’ve made here is in the ports section to expose the Redpanda brokers on container port 9092, which enables the container services to locate the broker using the address `redpanda:9092`.

```docker
redpanda:
  container_name: redpanda
  image: docker.redpanda.com/redpandadata/redpanda:v23.2.19
  command:
    - redpanda start
    - --smp 1
    - --overprovisioned
    - --node-id 0
    - --kafka-addr internal://0.0.0.0:9092,external://0.0.0.0:19092
    # Address the broker advertises to clients that connect to the Kafka API.
    - --advertise-kafka-addr internal://redpanda:9092,external://localhost:19092
    - --pandaproxy-addr internal://0.0.0.0:8082,external://0.0.0.0:18082
    # Address the broker advertises to clients that connect to the HTTP Proxy.
    - --advertise-pandaproxy-addr internal://redpanda:8082,external://localhost:18082
    - --schema-registry-addr internal://0.0.0.0:8081,external://0.0.0.0:18081
    # Redpanda brokers use the RPC API to communicate with each other internally.
    - --rpc-addr redpanda:33145
    - --advertise-rpc-addr redpanda:33145
    - --mode dev-container
  ports:
    - 18081:18081
    - 18082:18082
    - 19092:9092
    - 19644:9644
  healthcheck:
    test: ["CMD-SHELL", "rpk cluster health | grep -E 'Healthy:.+true' || exit 1"]
    interval: 15s
    timeout: 3s
    retries: 5
    start_period: 5s
```

Accompanying the Redpanda broker is the Redpanda console. Again, this was taken from the Docker Compose samples without modifications. This console is available at [http://localhost:8080/](http://localhost:8080/topics/enriched-click-data?p=-1&s=50&o=-1#messages)

```docker
console:
  container_name: redpanda-console
  image: docker.redpanda.com/redpandadata/console:v2.3.8
  entrypoint: /bin/sh
  command: -c "echo \"$$CONSOLE_CONFIG_FILE\" > /tmp/config.yml; /app/console"
  environment:
    CONFIG_FILEPATH: /tmp/config.yml
    CONSOLE_CONFIG_FILE: |
      kafka:
        brokers: ["redpanda:9092"]
        schemaRegistry:
          enabled: true
          urls: ["http://redpanda:8081"]
      redpanda:
        adminApi:
          enabled: true
          urls: ["http://redpanda:9644"]
      connect:
        enabled: true
        clusters:
          - name: local-connect-cluster
            url: http://connect:8083
  ports:
    - 8080:8080
  depends_on:
    - redpanda
```

Next we have Redis, which does not need extra parameters because it will listen on port 6379 without authentication (because it is not exposed externally). We have opted for the Alpine Linux variant for an even more lightweight image.

```docker
redis:
	container_name: redis
  image: redis:7.2.3-alpine
  ports:
    - 6379:6379
```

When the Redis container is running, you can run the Redis CLI to check that records are being written to it using `docker exec -it redis redis-cli`. This opens up an interactive interface where you can run commands such as `KEYS *` to view the list of stored keys or `INFO KEYSPACE` to view a count of keys.

Then, we define all other Quix Streams services. We created a `shared.env` file with some environment variables that are shared across all services (`Quix__Sdk__Token`, `Quix__Portal__Api` and `Quix__Workspace__Id`) that is used as `env_file` . For example, this is a normal service that uses one input topic, one output topic and Redis. The name of the pod is `data-enrichment`, the directory of the app is `Data enrichment`. 

```docker
data-enrichment:
	container_name: data-enrichment
  build:
    context: "./Data enrichment"
  env_file:
    - shared.env
  environment:
		- broker_address=redpanda:9092
    - input=click-data
    - output=enriched-click-data
    - redis_host=redis
    - redis_port=6379
    - redis_password=
    - redis_username=
	depends_on:
    - redpanda
    - redis
```

<aside>
💡 We use `redis` as the host name for Redis because it is the pod name.

</aside>

If we have a `Job` instead of a `Service`, we can define it with `restart: no`, like:

```docker
lookup-data-ingestion:
  build:
    context: "./Lookup data ingestion"
  restart: no
  env_file:
    - shared.env
  environment:
    - redis_host=redis
    - redis_port=6379
    - redis_password=
    - redis_username=
	depends_on:
    - redis
```

Finally, if we want to expose the ports, we define them as `- 8085:80`, which means that the port of our machine (host port) `8085` will be redirected to the port of the pod (container port) `80`. In other words, you can open `http://localhost:8085` in your web browser and it will be redirected to the pod. This is the definition of this service:

```docker
demo-real-time-dashboard:
  build:
    context: "./Demo real-time dashboard"
  env_file:
    - shared.env
  environment:
    - redis_host=redis
    - redis_port=6379
    - redis_password=
    - redis_username=
  ports:
    - 8085:80
```

Note that services running in Docker Compose communicate internally using the container port.

## Conclusion

Running the project locally is easy as far as we don’t use *Streaming Reader* and *Streaming Writer.* In the https://github.com/quixio/template-clickstream/commit/1f3de0bfaa3d5738c693dc033b60529bd70b5a18 you can see all files that were modified to make it run.

Finally, you have to execute `docker-compose up` in the same directory and all images will be built and the project will start.
