# build environment
FROM node:19-alpine as build
ENV NODE_VERSION 19.7.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /app/dist /usr/share/nginx/html
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
