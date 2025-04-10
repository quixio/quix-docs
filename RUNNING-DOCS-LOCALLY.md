# Running Docs with Docker

This guide explains how to run the Quix documentation locally using Docker Compose. This is an alternative to the native installation method described in [RUNNING-DOCS-LOCALLY.md](./RUNNING-DOCS-LOCALLY.md).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system
- Git client (for cloning the repository)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/quixio/quix-docs.git
   cd quix-docs
   ```

2. Make the browser script executable:
   ```bash
   chmod +x open-browser.sh
   ```

3. Start the documentation server:
   ```bash
   docker compose up --build & ./open-browser.sh
   ```

   Or to run in detached mode:
   ```bash
   docker compose up -d --build && ./open-browser.sh
   ```

4. The documentation will automatically open in your default browser at `http://localhost:8000/docs/`

## Service Management

- Start in detached mode (runs in background):
  ```bash
  docker compose up -d --build && ./open-browser.sh
  ```

- Stop the service:
  ```bash
  docker compose down
  ```

- View logs:
  ```bash
  docker compose logs -f
  ```

- Rebuild the service:
  ```bash
  docker compose build
  ```

- Force rebuild and start:
  ```bash
  docker compose up --build
  ```

## Features

- Live reload: Changes to documentation are reflected in real-time
- Automatic restart: Service restarts automatically on failure
- Volume mounting: Local directory is mounted for immediate updates
- Log streaming: View logs in real-time with `docker compose logs -f`
- Automatic browser opening: Documentation opens in your default browser

## Troubleshooting

If you encounter issues:

1. Port conflicts:
   ```bash
   # Check if port 8000 is in use
   lsof -i :8000
   # Or on Windows:
   netstat -ano | findstr :8000
   ```

2. Docker resource issues:
   ```bash
   # Check Docker system resources
   docker system df
   docker system prune  # Clean up unused resources
   ```

3. Build issues:
   ```bash
   # Clean build with no cache
   docker compose build --no-cache
   # Remove all containers and images
   docker compose down --rmi all
   ```

4. Permission issues:
   ```bash
   # Ensure Docker has proper permissions
   sudo usermod -aG docker $USER
   # Log out and back in for changes to take effect
   ```

5. Network issues:
   ```bash
   # Check Docker network
   docker network ls
   # Inspect network configuration
   docker network inspect quix-docs_default
   ```

6. Service health:
   ```bash
   # Check service status
   docker compose ps
   # View service logs
   docker compose logs
   ``` 