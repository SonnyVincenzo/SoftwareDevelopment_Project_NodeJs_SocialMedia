FROM node:20-bookworm
ENV DEBIAN_FRONTEND=noninteractive
EXPOSE 3000

WORKDIR /website
COPY . .
RUN apt-get update && apt-get install mysql-Server
RUN npm install setup
RUN chmod +x setup_MySQL.sh

ENTRYPOINT [ "setup_MySQL.sh" ]