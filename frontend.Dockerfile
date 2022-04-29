# Build
FROM node as BUILD
# RUN apk add --no-cache python3 py3-pip make g++ pkgconfig
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
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