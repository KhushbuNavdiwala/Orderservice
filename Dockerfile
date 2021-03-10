FROM node:12
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
CMD [ "node", "server.js" ]