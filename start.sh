#!/bin/sh

echo "Waiting for MongoDB..."
while ! nc -z linkio-db 27017; do
  sleep 1
done
echo "MongoDB started"

echo "Starting server..."
node dist/src/infra/http/server.js