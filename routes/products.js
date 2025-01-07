const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../model/product');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path if necessary
const mongoose=require('mongoose');
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
    const { name, quantity, category, price, description } = req.body;

    // Check if req.user exists
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: User information missing.' });
    }

    const userId = req.user.userId;

    // Image URL or path after upload
    const imageUrl = req.file ? `/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      description,
      user: userId,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// Fetch products of the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from the token
    const products = await Product.find({ user: userId }); // Fetch only products belonging to the logged-in user
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});
// Update product with image upload
router.put('/updateProduct/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    console.log(req.params.id)
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Check if req.user exists
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: User information missing.' });
    }

    const userId = req.user.userId;

    // Check if product exists
    const product = await Product.findOne({ _id: productId, user: userId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Handle image update
    let imageUrl = product.image; // Keep existing image if no new image is uploaded
    if (req.file) {
      // If a new image is uploaded, update the image URL
      imageUrl = `/${req.file.filename}`;
      // Delete the old image from the server (optional)
      if (product.image) {
        fs.unlinkSync(uploadDirectory + product.image);
      }
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.description = description || product.description;
    product.image = imageUrl;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// Delete a product
router.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if req.user exists
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: User information missing.' });
    }

    const userId = req.user.userId;

    // Find and delete the product
    const product = await Product.findOneAndDelete({ _id: productId, user: userId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Optionally delete the image from the server
    if (product.image) {
      fs.unlinkSync(uploadDirectory + product.image);
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});


module.exports = router;
