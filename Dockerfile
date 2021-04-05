 ### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run start http://localhost:4200


# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /usr/src/app/dist/b8it148-api /usr/share/nginx/html

### STAGE 2: Run (from old file - we are not using nginx) ###
### FROM nginx:1.17.1-alpine ### 
###EXPOSE 3000??###
### STAGE 2: Run (from old file - we are not using nginx) ###
### FROM nginx:1.17.1-alpine ### 
### COPY --from=build /usr/src/app/dist/application-frontend /usr/share/nginx/html ###
### RUN docker pull mongo ### 
### ARGUMENTS FOR VARIABLE FOR buildAndPush
###--build-arg nodePort=3000
### --build-arg frontEnd
### ARG TAG=nodePort
### FROM node

###RUN app get install
###RUN mongodb start