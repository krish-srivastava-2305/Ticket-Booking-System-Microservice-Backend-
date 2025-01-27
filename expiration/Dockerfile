FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm i --only=prod

COPY . .

CMD ["npm", "start"]
