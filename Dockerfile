### STAGE 1: Build ###
FROM node:14-alpine AS build
ARG PORT01
ARG PORT02
ARG PORT03
ARG MONGOURL
WORKDIR /usr/src/app
COPY package*json ./
RUN npm install
COPY . .
RUN echo "npm run start $PORT01 $PORT02 $PORT03 $MONGOURL" > serve.sh
EXPOSE 3000
CMD ["sh", "serve.sh"]