FROM node:23-alpine
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH

RUN npm i -g expo 
# expo-cli
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 19000 19001 19002
CMD ["npm", "start", "--tunnel"]