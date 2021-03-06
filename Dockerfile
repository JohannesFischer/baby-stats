FROM node:9.5-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 8000
ENV MONGO_HOST mongo_db
CMD [ "node", "index.js" ]
