const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const existingUser = await User.findOne({ phoneNumber });
    console.log("Query result:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists, Try to use another Phone Number" });
    }

    const user = new User({ username, email, phoneNumber, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error in registration" });
  }
});
// Login
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
