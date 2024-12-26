FROM ubuntu:focal

WORKDIR /app


RUN apt-get update && \
    apt-get install -y curl gcc g++ python3-pip

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
