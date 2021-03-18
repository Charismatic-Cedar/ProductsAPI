const mongoose = require('mongoose');
const fs = require('mz/fs');
// const csv = require('fast-csv');
const csv = require('csvtojson')
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
  "default?": { type: Boolean, required: true },
  photos: [{
    thumbnail_url: String,
    url: String
    }],
  skus: [{
    sku_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true }
  }]
});

let productsSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true },
  features: [{
    feature: { type: String, required: true },
    value: String
    }],
  related: [Number],
  styles: [stylesSchema]
});

let usersSchema = mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true, required: true },
});

let cartsSchema = mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true, required: true },
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'usersSchema'},
  sku_id: { type: String, required: true },
  count: { type: Number, required: true },
});

const Products = mongoose.model('Products', productsSchema);
Products.createIndexes();

csv()
  .fromFile(productFile)
  .then(async (jsons)=>{
    for (let i = 0; i < jsons.length; i ++) {
      const json = jsons[i];
      // console.log(json);
      let product = new Products ({
        id: json.id,
        name: json.name,
        slogan: json.slogan,
        description: json.description,
        category: json.category,
        default_price: json.default_price
      });
      await product.save()
        .then((q)=>{
          // console.log(q);
        })
        .catch((err)=>{
          // console.log('ERROR:',err);
        });
    }
  })
  .then(() => {
      console.log('products load');
      mongoose.connection.close();
    }
  );



