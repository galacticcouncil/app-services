FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "./dist/index.js"]