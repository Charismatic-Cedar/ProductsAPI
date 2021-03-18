const mongoose = require('mongoose');
const fs = require('mz/fs');
// const csv = require('fast-csv');
const csv = require('csvtojson');
const productFile = './samples/product.csv';
const relatedFile = './samples/related.csv';
const featuresFile = './samples/features.csv';
const photosFile = './samples/photos.csv';
const stylesFile = './samples/styles.csv';
// const productFile = './SDCdata/product.csv';
// const relatedFile = './SDCdata/related.csv';

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

csv({
  noheader: true,
  output: 'csv',
})
  .fromFile(featuresFile)
  .subscribe((feature) => {
    console.log(feature);
    return new Promise((resolve, reject) => {
      Products.updateOne(
        { id: feature[1], 'features.feature': { $ne: feature[2] } },
        {
          $addToSet: {
            features: {
              feature: feature[2],
              value: feature[3],
            },
          },
        }
        // { runValidators: true }
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
    console.log('features load');
    mongoose.connection.close();
  });
