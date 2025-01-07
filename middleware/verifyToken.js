const jwt = require('jsonwebtoken');

// verifyToken.js

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret'); // Make sure to use the correct secret
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;

module.exports = verifyToken;
