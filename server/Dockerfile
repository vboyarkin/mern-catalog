FROM node

WORKDIR /home/node/app

COPY models models/
COPY routes routes/
COPY package.json .
COPY ecosystem.config.js .
COPY app.js .

COPY ../frontend/build /frontend/build

ENV BACKEND_PORT: 3355
ENV DEBUG: "catalog:*"
ENV MONGO_USERNAME: root
ENV MONGO_PASSWORD: test

RUN npm install

EXPOSE 3000
EXPOSE 3355

CMD ["npm" , "start"]