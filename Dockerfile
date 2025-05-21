FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app
COPY ./.env /app
CMD ["npm", "start"]
