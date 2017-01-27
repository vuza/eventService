FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080

ENV REDIS_HOST redis
ENV CHANDIMA_PASSWORD ${CHANDIMA_PASSWORD}
ENV MARLON_PASSWORD ${MARLON_PASSWORD}

CMD [ "node", "index.js" ]
