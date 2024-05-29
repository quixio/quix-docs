# Use the official VS Code devcontainer for Python
FROM mcr.microsoft.com/vscode/devcontainers/python

# Set the working directory
WORKDIR /workspaces

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Update the package list and install libcairo2-dev
RUN apt-get update && \
    apt-get install -y libcairo2-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install required Python packages
RUN pip install --no-cache-dir -r requirements.txt