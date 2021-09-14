const bluebird = require('bluebird');

const jwt = bluebird.promisifyAll(require('jsonwebtoken'));

const secretKey = 'SomeRandomSecretKey';

function generateToken(userId) {
  console.log(`userId = ${userId}`);
  const payload = {
    userId: userId,
  }
  return jwt.signAsync(payload, secretKey);
}

function verifyToken(token) {
  return jwt.verifyAsync(token, secretKey)
  .then(payload => payload.userId);
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};