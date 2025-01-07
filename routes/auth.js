const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path if necessary

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, try to use another phone number' });
    }

    if (phoneNumber.length !== 10) {
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

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user info', error: err.message });
  }
});

module.exports = router;
