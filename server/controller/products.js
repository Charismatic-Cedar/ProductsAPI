const { Products } = require('../../db/db.js');

const getAll = (page = 1, count = 5, cb) => {
  const total = page * count;
  Products.find({})
    .limit(total)
    .lean()
    .then((products) => {
      cb(products);
    });
};

const getProduct = (id, cb) => {
  Products.find({id:id})
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