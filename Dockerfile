FROM node:alpine
COPY package.json package.json
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "start"]