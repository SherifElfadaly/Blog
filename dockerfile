FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

RUN apt-get update

CMD npm run migration:run && pm2-runtime ecosystem.config.js
