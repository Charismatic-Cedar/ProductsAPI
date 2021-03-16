DROP TABLE IF EXISTS product;
CREATE TABLE products (
  "id"            SERIAL PRIMARY KEY,
  "name"          varchar(50),
  "slogan"        varchar(100),
  "description"   varchar(300),
  "category"      varchar(50),
  "default_price" real,
  "related"       JSON
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  "product_id"  INT NOT NULL references products(id),
  "feature"     varchar(50),
  "value"       varchar(50)
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  "product_id"        INT NOT NULL references products(id),
  "related_product"   INT
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  "id"                SERIAL PRIMARY KEY,
  "product_id"        INT  NOT NULL references products(id),
  "style_id"          INT,
  "name"              varchar(50),
  "original_price"    real,
  "sale_price"        real,
  "default?"          boolean
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  "product_id"     INT NOT NULL references products(id),
  "style_id"       INT NOT NULL references styles(id),
  "thumbnail_url"  varchar(100),
  "url"            varchar(100)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  "product_id"    INT NOT NULL references products(id),
  "style_id"      INT NOT NULL references styles(id),
  "sku_id"        varchar(50),
  "quantity"      INT,
  "size"          varchar(10)
);


