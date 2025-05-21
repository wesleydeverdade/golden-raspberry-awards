FROM node:22.14.0

WORKDIR /app

COPY package*.json ./
COPY .env .env

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
