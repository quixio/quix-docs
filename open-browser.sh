#!/bin/bash

# Wait for the service to be ready with a timeout of 2 minutes
timeout=120
interval=1
elapsed=0

echo "Waiting for the documentation server to be ready..."
while [ $elapsed -lt $timeout ]; do
    if curl -s -f http://localhost:8000/docs/ > /dev/null; then
        echo "Server is ready!"
        break
    fi
    sleep $interval
    elapsed=$((elapsed + interval))
    echo "Waiting for docs to be ready... ($elapsed seconds elapsed)"
done

if [ $elapsed -ge $timeout ]; then
    echo "Timeout reached. Docs did not become ready in $timeout seconds."
    exit 1
fi

# Open browser on host machine
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8000/docs/
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8000/docs/
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start http://localhost:8000/docs/
fi 