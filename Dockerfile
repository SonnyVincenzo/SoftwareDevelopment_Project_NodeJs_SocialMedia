FROM node:20-bookworm
ENV DEBIAN_FRONTEND=noninteractive
EXPOSE 3000

WORKDIR /website
COPY . .
RUN apt-get update && apt-get install -y mysql-Server
RUN npm install setup
RUN chmod +x setup_MySQL.sh

ENV APP_DIR=/website \
    DB_HOST=localhost \
    DB_USER=user \
    DB_PASSWORD=1234 \
    DB_NAME=website

ENTRYPOINT [ "setup_MySQL.sh" ]
