# Build
FROM node as BUILD
RUN apt-get update \
&& apt-get -y install libcairo-dev \
 pk-config \
 cairo \
 pango \
 libpng \
 jpeg \
 giflib \
 librsvg *
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