const { Products } = require('../../db/db.js');

const getAll = (page = 1, count = 5, cb) => {
  const total = page * count;
  Products.find({}, {
    '_id': 0,
    'features._id': 0,
    'styles._id': 0,
    'styles.style_id': 0,
    'styles.photos._id': 0,
    'styles.skus._id': 0,
    'styles.photos.photos_id': 0,
    'styles.skus.sku_id': 0,
  })
    .limit(total)
    .lean()
    .then((products) => {
      cb(products);
    });
};

const getProduct = (id, cb) => {
  Products.find({id:id}, {
    '_id': 0,
    'features._id': 0,
    'styles._id': 0,
    'styles.style_id': 0,
    'styles.photos._id': 0,
    'styles.skus._id': 0,
    'styles.photos.photos_id': 0,
    'styles.skus.sku_id': 0,
  })
    .limit(1)
    .lean()
    .then((product) => {
      cb(product);
    });
};

module.exports = {
  getProduct,
  getAll
}