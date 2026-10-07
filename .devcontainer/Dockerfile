FROM squidfunk/mkdocs-material
WORKDIR /workspace
COPY requirements.txt .
RUN apk upgrade --no-cache && apk add --no-cache bash
RUN pip install --no-cache-dir --upgrade pip setuptools wheel gitpython urllib3 \
    && pip install --no-cache-dir -r requirements.txt \
    && pip uninstall -y pip