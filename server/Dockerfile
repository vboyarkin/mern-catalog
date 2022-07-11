# stage 1

FROM node as client-build
COPY ./client /home/client
WORKDIR /home/client
ARG REACT_APP_API_URL
ARG REACT_APP_IS_DEV
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_IS_DEV=${REACT_APP_IS_DEV}
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