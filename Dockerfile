FROM node:alpine

WORKDIR /app
#copy server.js  to app.js
COPY . .

EXPOSE 9898 

CMD node server.js
