FROM node:18-alpine

ENV CHOKIDAR_USEPOLLING=true
ENV PORT=3000

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

COPY .env .

EXPOSE 3000

CMD ["yarn", "start"]