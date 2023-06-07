FROM node:18-alpine As build
ENV PORT=3000
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install --only=production --omit=dev
CMD npm run start:prod & npm run start-mail:prod
