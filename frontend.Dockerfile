# Build
FROM node:16.13.2-alpine as BUILD
RUN apk add g++ make python
WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

COPY ./frontend/package.json ./
RUN npm install

COPY ./frontend/ ./
COPY ./.env ./
RUN npm run build

# Final image
FROM nginx:1.21.6-alpine

COPY --from=BUILD /src/build /usr/share/nginx/html
COPY ./frontend/nginx.dev.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]