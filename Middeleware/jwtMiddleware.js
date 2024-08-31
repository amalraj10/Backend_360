const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  console.log('inside jwt middleware ');

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json('Authorization header missing. Please Login');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json('Token missing. Please Login');
  }

  console.log(token);

  try {
    const jwtResponse = jwt.verify(token, "superkey2255");
    console.log(jwtResponse);
    req.payload = jwtResponse.userId;  // Assuming jwtResponse contains a userId field
    next();  // Call next() only if verification is successful
  } catch (err) {
    return res.status(401).json('Authorization Failed. Please Login');
  }
};

module.exports = jwtMiddleware;
