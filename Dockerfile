FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y lsof
COPY ./src ./src

EXPOSE 3030
CMD ["npm", "start"]