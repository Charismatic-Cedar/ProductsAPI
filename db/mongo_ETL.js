const mongoose = require('mongoose');
const fs = require('mz/fs');
// const csv = require('fast-csv');
const csv = require('csvtojson')
const productFile = './samples/product.csv';
const relatedFile = './samples/related.csv';
// const productFile = './SDCdata/product.csv';
// const relatedFile = './SDCdata/related.csv';

const conn = mongoose.connect('mongodb://localhost/products');

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
  id: { type: Number, unique: true, dropDups: true, required: true },
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

let Products = mongoose.model('Products', productsSchema);
csv()
  .fromFile(productFile)
  .subscribe((json)=>{
    return new Promise((resolve,reject)=>{
      // console.log(json);
      let product = {
        id: json.id,
        name: json.name,
        slogan: json.slogan,
        description: json.description,
        category: json.category,
        default_price: json.default_price
      };
      Products.updateOne({id: json.id},product, {upsert: true, setDefaultsOnInsert: true})
              .then((q)=>{
                // console.log(q);
                resolve();
              })
              .catch((err)=>{
                console.log('ERROR:',err);
                reject();
              });
    })})
    .then((res) => {
      csv()
      .fromFile(relatedFile)
      .subscribe((related)=>{
        return new Promise((resolve,reject)=>{
            Products.updateOne({id: related.current_product_id, related: {$ne: related.related_product_id}},{$push: {related: related.related_product_id}})
            .then((q)=>{
              // if (related.current_product_id === "1") {
              //   console.log(related);
              // }
              // console.log(q);
              resolve();
            })
            .catch((err)=>{
              console.log('ERROR:',err);
              reject();
            });
        })
      })
      .then((res) => {
        console.log('related load');
      });
    })

