FROM node:17.1-buster-slim

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

COPY ./package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm","start"]