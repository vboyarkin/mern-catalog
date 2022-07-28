# MERN-catalog

![Task](img/1.jpg)

![Example](img/2.png)

## Project setup

```
docker compose up
```

Then go to mongodb and check out README.md

## Rebuild docker images

```
REACT_APP_API_URL="/api/" docker compose build --no-cache
```

Or

```
REACT_APP_API_URL="http://localhost:3000/api/" docker compose build --no-cache
```

## Export data from mongo

```
docker exec -i catalog-mongo /usr/bin/mongodump -u root --password test --authenticationDatabase admin --db catalog --out /dump
docker cp catalog-mongo:/dump ./mongodb/dump
```
