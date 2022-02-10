# Build
FROM node:16.13.2-alpine as BUILD

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

COPY ./package.json ./
RUN npm install

COPY ./ ./
RUN npm run build

# Final image
FROM nginx:1.21.6-alpine

COPY --from=BUILD /src/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]