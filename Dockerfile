FROM node:11.4.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -silent

COPY . .

EXPOSE 8700
CMD ["npm","run","start"]