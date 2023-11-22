FROM node:16.13-slim

ENV REDIS_URL "redis://kvs:6379"
ENV REDIS_PASSWORD ""

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "./bin/www"]
