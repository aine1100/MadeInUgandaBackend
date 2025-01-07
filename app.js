const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require("cors")
const path=require('path')


const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const allowedOrigins = ["https://made-in-uganda-ltd.vercel.app"];
// app.use(cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true, // If you're using cookies/authentication
// }));


mongoose.connect('mongodb://localhost:27017/madeInUganda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const dashboardRoutes=require('./routes/auth')

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/dashboard', dashboardRoutes);


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
