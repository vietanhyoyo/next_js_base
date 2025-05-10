FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --no-parallel

EXPOSE 3001

CMD ["npm", "run", "start"]