const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../model/product');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path if necessary

// Ensure the 'uploads' folder exists
const uploadDirectory = 'uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory); // Create the folder if it doesn't exist
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Directory where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
  },
});

const upload = multer({ storage: storage });

// Middleware to verify user is logged in
router.use(verifyToken);

// Add new product with image upload
router.post('/newProduct', upload.single('image'), async (req, res) => {
  try {
    const { name,quantity,category, price, description } = req.body;
    const userId = req.user.id;

    // Image URL or path after upload
    const imageUrl = req.file ? `/${req.file.filename}` : null; // Save relative path to image

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      description,
      user: userId, // Associate product with the logged-in user
      image: imageUrl, // Store image URL in the product document
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

// Fetch products of the logged-in user
// Fetch products of the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const products = await Product.find({ user: userId }); // Fetch only products belonging to the logged-in user
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

module.exports = router;
