DROP TABLE IF EXISTS product;
CREATE TABLE products (
  "id"            SERIAL       PRIMARY KEY,
  "name"          varchar(50)  NOT NULL,
  "slogan"        varchar(100) NOT NULL,
  "description"   varchar(300) NOT NULL,
  "category"      varchar(50)  NOT NULL,
  "default_price" varchar(50)  NOT NULL,
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  "product_id"  INT         NOT NULL references products(id),
  "feature"     varchar(50) NOT NULL,
  "value"       varchar(50)
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  "product_id"        INT NOT NULL references products(id),
  "related_product"   INT NOT NULL
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  "id"                SERIAL      PRIMARY KEY,
  "product_id"        INT         NOT NULL references products(id),
  "style_id"          INT         NOT NULL,
  "name"              varchar(50) NOT NULL,
  "original_price"    varchar(50) NOT NULL,
  "sale_price"        varchar(50),
  "default?"          boolean     NOT NULL
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
  "product_id"    INT         NOT NULL references products(id),
  "style_id"      INT         NOT NULL references styles(id),
  "sku_id"        varchar(50) NOT NULL,
  "quantity"      INT         NOT NULL,
  "size"          varchar(10) NOT NULL
);


