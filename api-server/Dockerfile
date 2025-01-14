FROM node:slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY index.js /app/index.js
COPY app.js /app/app.js
COPY Config /app/Config
COPY models /app/models
COPY routes /app/routes
COPY middlewares /app/middlewares
COPY controllers /app/controllers


EXPOSE 5001
EXPOSE 10000

CMD ["npm", "run", "start"]