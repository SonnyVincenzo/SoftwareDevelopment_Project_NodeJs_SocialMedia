# node .js 
FROM node:25-slim

# Use Windows Server Core as base image
FROM mysql:latest

# Set environment variables
ENV NODE_ENV=production
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=your_password
ENV MYSQL_DATABASE=your_database

# Start MySQL service and Node.js application
CMD ["node", "."]