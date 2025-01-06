const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  verifyToken  = require('../middleware/verifyToken'); // Adjust the path if necessary


// Middleware to verify JWT


// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const existingUser = await User.findOne({ phoneNumber });
    console.log('Query result:', existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, try to use another phone number' });
    }
    if (phoneNumber.length !== 10) {
      console.log('Phone number must be at least 10 characters');
      return res.status(400).json({ message: 'Invalid phone number' });
    }
    if (password.length <= 5) {
      return res.status(400).json({ message: 'The password must be at least 5 characters' });
    }

    const user = new User({ username, email, phoneNumber, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error in registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Dashboard: Fetch User Info
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Example: Fetch user-specific products (you can adapt this to your schema)
    const products = [
      { title: 'Total Products', amount: user.totalProducts || 0 },
      { title: 'Total Sales', amount: user.totalSales || 0 },
      { title: 'Total Income', amount: user.totalIncome || 0 },
    ];

    res.json({ user, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user info' });
  }
});

module.exports = router;
