FROM mongo 

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=test
ENV MONGO_INITDB_DATABASE=catalog

COPY ./dump/ /tmp/dump/
COPY mongo_restore.sh /docker-entrypoint-initdb.d/