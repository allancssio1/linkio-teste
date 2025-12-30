FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infra/database/drizzle ./dist/src/infra/database/drizzle
COPY start.sh ./

RUN chmod +x start.sh

EXPOSE 3333

CMD ["./start.sh"]