#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z linkio-db 5432; do
  sleep 1
done
echo "PostgreSQL started"

echo "Running migrations..."
npm run migrate
echo "Migrations finished"

echo "Starting server..."
node dist/src/infra/http/server.js