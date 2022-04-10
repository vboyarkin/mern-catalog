FROM mongo 

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=test

COPY dump/ /tmp/dump/

CMD mongod --fork --logpath /var/log/mongodb.log; \
  mongorestore /tmp/dump/; \
  mongod --shutdown; \
  docker-entrypoint.sh mongod