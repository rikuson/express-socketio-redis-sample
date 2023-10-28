FROM node:16.13-slim

ENV RDIS_URL "redis://kvs:6379"

COPY . /app
WORKDIR /app
RUN npm install
RUN npm install -g nodemon@2.0.19
CMD ["nodemon", "--signal", "SIGTERM", "./bin/www"]
