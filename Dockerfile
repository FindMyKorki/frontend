FROM node:23-alpine
# Node setup
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# Prepare environment
RUN apk update && apk add --no-cache git
RUN npm i -g expo @expo/ngrok

COPY package.json package-lock.json /frontend/

WORKDIR /frontend

RUN npm ci
# expo-cli

COPY . .
EXPOSE 19000 19001 19002
# CMD ["npm", "start", "--tunnel"]