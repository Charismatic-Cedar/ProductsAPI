const mongoose = require('mongoose');
const fs = require('mz/fs');
// const csv = require('fast-csv');
const csv = require('csvtojson');
// const stylesFile = './samples/styles.csv';
const stylesFile = './SDCdata/styles.csv';

mongoose.connect('mongodb://localhost/products', { useCreateIndex: true });

let stylesSchema = mongoose.Schema({
  style_id: { type: Number, required: true },
  name: { type: String, required: true },
  original_price: { type: String, required: true },
  sale_price: String,
  'default?': { type: Boolean, required: true },
  photos: [
    {
      thumbnail_url: String,
      url: String,
    },
  ],
  skus: [
    {
      sku_id: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
});

let productsSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true },
  features: [
    {
      feature: { type: String, required: true },
      value: String,
    },
  ],
  related: [Number],
  styles: [stylesSchema],
});

let usersSchema = mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true, required: true },
});

let cartsSchema = mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usersSchema' },
  sku_id: { type: String, required: true },
  count: { type: Number, required: true },
});

const Products = mongoose.model('Products', productsSchema);
Products.createIndexes();

const Styles = mongoose.model('Styles', stylesSchema);

csv()
  .fromFile(stylesFile)
  .subscribe((styles) => {
    return new Promise((resolve, reject) => {
      Products.updateOne(
        {
          id: styles.productId,
          'styles.style_id': { $ne: styles.id },
        },
        {
          $push: {
            styles: new Styles({
              style_id: styles.id,
              name: styles.name,
              original_price: styles.original_price,
              sale_price: styles.sale_price,
              'default?': styles.default_style === '1' ? true : false,
            }),
          },
        }
      )
        .then((q) => {
          resolve();
        })
        .catch((err) => {
          console.log('ERROR:', err);
          reject();
        });
    });
  })
  .then((res) => {
    console.log('styles load');
    mongoose.connection.close();
  });
