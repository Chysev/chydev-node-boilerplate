#!/bin/bash

set -e

echo "Starting deployment..."

cd "$(dirname "$0")"

echo "Creating Docker network..."
docker network create dev_network 2>/dev/null || echo "Network already exists"

mkdir -p logs

echo "Stopping existing containers..."
docker compose down

echo "Cleaning up old images..."
docker image prune -f

echo "Building and starting services..."
docker compose up --build -d

echo "Waiting for database to be ready..."
sleep 15

echo "Setting up database schema..."
echo "Using db push to sync schema with database..."
docker compose exec api npx prisma db push

echo "Marking migrations as applied..."
docker compose exec api npx prisma migrate resolve --applied 20250730192637_init || echo "Migration already resolved"
docker compose exec api npx prisma migrate resolve --applied 20250730195235_datenow || echo "Migration already resolved"

echo "Container status:"
docker compose ps

echo "✅ Deployment completed!"
echo "🌐 api is running at: http://localhost:5000"
echo "🗄️  Database is running at: localhost:36457"

echo "📝 Showing recent logs..."
docker compose logs --tail=50