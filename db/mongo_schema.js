const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
    sku: { type: String, required: true },
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