# Build phase
FROM node:22.12.0-alpine3.21 as build

WORKDIR /app

COPY package.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

# Run phase
FROM nginx:stable-alpine-perl

RUN apk add --no-cache certbot certbot-nginx

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist ./

CMD ["nginx", "-g", "daemon off;"]
