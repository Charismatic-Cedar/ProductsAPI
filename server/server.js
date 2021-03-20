const express = require('express');
const productRoutes = require('./routes/products.js');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

app.listen(3000);
