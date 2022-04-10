# How to import data

Get into mongo container

Open mongo shell: 

```
mongo --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD
```

In mongo shell:

```
use catalog
db.createCollection("products")
exit
```

Exit from mongo shell and run:

```
mongoimport -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase "admin" --db catalog --collection products --file /data/db-init/products.json --jsonArray
```
