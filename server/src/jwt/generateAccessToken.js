const jwt = require('jsonwebtoken');

// get config vars

// access config var

const generateAccessToken = (id) => {
  return jwt.sign(id, '91EEB587B5AD24411B2AABC439C6F', {
    expiresIn: '86400s',
  });
};

module.exports = generateAccessToken;
