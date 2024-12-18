FROM node:22.12.0-alpine3.21

WORKDIR /app

COPY package.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["node", "dist/server.js"]