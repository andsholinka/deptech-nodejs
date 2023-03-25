FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# ENV
ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DBNAME=todo4

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030

CMD [ "npm", "start" ]