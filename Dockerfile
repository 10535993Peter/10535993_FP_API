### STAGE 1: Build ###
FROM node:14-alpine AS build
ARG PORT01
ARG PORT02
ARG MONGOURL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "npm run start $PORT01 $PORT02 $MONGOURL" > run.sh
EXPOSE 3000
CMD ["sh", "run.sh"]
