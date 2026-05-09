#!/usr/bin/env bash
cd ${APP_DIR}

service mysql start
mysql -uroot -e "CREATE USER ${DB_USER}@localhost IDENTIFIED BY ${DB_PASSWORD};"
mysql -uroot -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO ${DB_USER}@localhost;"
mysql -uroot -e "FLUSH PRIVILEGES;"

# add the tables below here: