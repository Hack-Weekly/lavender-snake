# build environment
FROM node:19-alpine as build
ENV NODE_VERSION 19.7.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
COPY . ./

EXPOSE 3000
CMD [ "npm", "start" ]
