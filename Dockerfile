# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./src .

EXPOSE 6969
CMD ["npm", "devStart"]