const router = require('express').Router();
const { getProduct, getAll } = require('../controller/products.js');

router.get('/:product_id', (req, res) => {
  const id = req.params.product_id;
  getProduct(id, (product) => {
    const {
      id,
      name,
      slogan,
      description,
      category,
      default_price,
      features,
    } = product[0];
    const result = {
      id: id,
      name: name,
      slogan: slogan,
      description: description,
      category: category,
      default_price: default_price,
      features: features
    }
    res.status(200);
    res.send(result);
  });
});

router.get('/:product_id/related', (req, res) => {
  const id = req.params.product_id;
  getProduct(id, (product) => {
    const {
      related
    } = product[0];
    res.status(200);
    res.send(related || []);
  });
});

router.get('/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  getProduct(id, (product) => {
    const {
      styles
    } = product[0];
    const result = {
      product_id: id.toString(),
      results: styles || [],
    };
    res.status(200);
    res.send(result);
  });
});

router.get('/', (req, res) => {
  const page = req.query.page;
  const count = req.query.count;

  getAll(page, count, (products) => {
    const results = [];
    products.map((product) => {
      const {
        id,
        name,
        slogan,
        description,
        category,
        default_price,
        features,
      } = product;
      const result = {
        id: id,
        name: name,
        slogan: slogan,
        description: description,
        category: category,
        default_price: default_price,
        features: features
      }
      results.push(result);
    })
    res.status(200);
    res.send(results);
  });
});

module.exports = router;
