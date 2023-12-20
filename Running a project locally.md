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

Second transformation, if we want to run locally completely, is to use `KafkaStreamingClient` instead of `QuixStreamingClient` and point to a local Kafka/Redpanda (that we can run in the docker-compose).

## Writing docker-compose.yml

Second step is to write the docker-compose file. This file is similar to the quix.yaml because it contains the definition of the running containers.

The file has a header of:

```docker
version: "3"
services:
  ...
```

And then we define the services. In our case we have Redis, which does not need extra parameters because it will listen on port 6379 without authentication (because it is not exposed externally).

```docker
version: "3"
services:
  redis:
    image: redislabs/redismod
```

Then, we define all other services. We created a `shared.env` file with some environment variables that are shared across all services (`Quix__Sdk__Token`, `Quix__Portal__Api` and `Quix__Workspace__Id`) that is used as `env_file` . For example, this is a normal service that uses one input topic, one output topic and redis. The name of the pod is `data-enrichment`, the directory of the app is `Data enrichment`. 

```docker
data-enrichment:
    build:
      context: "./Data enrichment"
    env_file:
      - shared.env
    environment:
      - input=click-data
      - output=enriched-click-data
      - redis_host=redis
      - redis_port=6379
      - redis_password=
      - redis_username=
```

<aside>
💡 We use `redis` as host name for redis because it is the pod name.

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
```

Finally, if we want to expose the ports, we define them as `- 8081:80`, which means that the port of our machine `8081` will be redirected to the port `80` of the pod. In other words, you can open `[http://localhost:8081](http://localhost:8081)` in your browser and it will be redirected to the pod. This is the definition of this service:

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
      - 8081:80
```

## Conclusion

Running the project locally is easy as far as we don’t use *Streaming Reader* and *Streaming Writer.* In the https://github.com/quixio/template-clickstream/commit/1f3de0bfaa3d5738c693dc033b60529bd70b5a18 you can see all files that were modified to make it run.

Finally, you have to execute `docker-compose up` in the same directory and all images will be built and the project will start.