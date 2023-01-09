const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const authenticateToken = async (token, res) => {
  return await jwt.verify(
    token,
    '91EEB587B5AD24411B2AABC439C6F',
    (err, payload) => {
      console.log(
        'authenticateToken',
        `payload: _id: ${payload._id}, exp: ${payload.exp}`,
        `error: ${err}`
      );
      if (err) {
        throw new AuthenticationError('you must be logged in');
      } else {
        return payload._id;
      }
    }
  );
};
module.exports = authenticateToken;
