require('dotenv').config();

const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token",token); 
  jwt.verify(token, accessTokenSecret, (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Invalid token' });
      
    }
    console.log('Decoded Token:', decodedToken);
   

    req.user = decodedToken;
    next();
  });
};

module.exports = verifyToken;
