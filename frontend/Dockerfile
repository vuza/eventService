FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000

RUN ./node_modules/react-scripts/bin/react-scripts.js build
RUN node buildTheme.js
CMD ./node_modules/pushstate-server/bin/pushstate-server build
