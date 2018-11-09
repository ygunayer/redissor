FROM mhart/alpine-node:8.12.0

WORKDIR /app
ADD . .

RUN npm install

ENTRYPOINT [ "npm", "start" ]
