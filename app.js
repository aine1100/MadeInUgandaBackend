const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/productManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
