#! /bin/bash

mongoimport --host mongodb --db products --collection products --type json --file /mongo_seed/products.json --jsonArray