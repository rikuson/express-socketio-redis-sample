FROM node:16.13-slim

ENV RDIS_URL "redis://kvs:6379"

COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
