const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, 'secret'); // Replace 'secret' with your actual secret key
    req.user = verified; // Attach user info to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
module.exports=verifyToken;
