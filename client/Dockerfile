FROM node:18-alpine

ENV CHOKIDAR_USEPOLLING=true
ENV REACT_APP_BASE_API_URL=http://localhost:5000/api
ENV PORT=3000

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

COPY .env .

EXPOSE 3000

CMD ["yarn", "start"]