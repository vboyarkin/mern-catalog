# stage 1

FROM node as client-build
COPY ./client /home/client
WORKDIR /home/client
RUN rm -rf node_modules && npm install && npm run build

# stage 2

FROM node as production

WORKDIR /home/node/app

COPY ./server/models models/
COPY ./server/routes routes/
COPY ./server/package.json .
COPY ./server/app.js .

COPY --from=client-build /home/client/build /home/client/build

RUN npm install

CMD ["npm", "start"]