// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

// Set your JWT secret key here
const JWT_SECRET = '9f7b2dd08c7616164dbb08928cf648cd629911ae8bc65809f8ce91d8ca3301dc';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const actualToken = token.split(' ')[1];
  console.log('Actual Token:', actualToken);

  jwt.verify(actualToken, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    console.log('Verified User:', user);

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
