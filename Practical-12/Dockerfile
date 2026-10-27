
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY server.js events.js listeners.js notificationService.js ./

EXPOSE 5000

CMD ["node", "server.js"]
