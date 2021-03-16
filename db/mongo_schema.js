const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let stylesSchema = mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  "default?": Boolean,
  photos: [{
    thumbnail_url: String,
    url: String
    }],
  skus: [{
    sku:String,
    quantity: Number,
    size: String
  }]
});

let productsSchema = mongoose.Schema({
  id: { type: Number, unique: true, dropDups: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{
    feature: String,
    value: String
    }],
  related: [Number],
  styles: [stylesSchema]
});