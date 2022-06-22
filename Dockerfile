FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start && npm run migrate && npm run test && npm run test:ci



