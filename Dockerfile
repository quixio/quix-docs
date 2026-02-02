FROM python:3.11-slim

WORKDIR /docs

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    libcairo2-dev \
    libgdk-pixbuf-2.0-dev \
    libpango1.0-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the docs content
COPY . .

# Expose the port MkDocs runs on
EXPOSE 8000

# Command to run MkDocs
CMD ["mkdocs", "serve", "--no-directory-urls", "--dev-addr=0.0.0.0:8000"] 