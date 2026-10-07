FROM squidfunk/mkdocs-material:9.7.7@sha256:51b87149d227691486b5f08993d28c65ca7e4990010664b697265b8e6fcd5287
WORKDIR /workspace
COPY requirements.txt .
RUN apk upgrade --no-cache && apk add --no-cache bash
RUN pip install --no-cache-dir --upgrade pip setuptools wheel gitpython urllib3 \
    && pip install --no-cache-dir -r requirements.txt \
    && pip uninstall -y pip