FROM node:14.17.5-alpine3.14

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]