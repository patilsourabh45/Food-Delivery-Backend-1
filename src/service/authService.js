const User = require('../database/model/user');
const TokenService = require('./tokenService');
const AuthErrorCodes = require('./authError');
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'));


function login(email, password) {
  return User.findOne({ email: email })
  .then(user => {
    if (typeof user !== 'undefined' && user !== null) {
      return bcrypt.compareAsync(password, user.password)
      .then(result => {
        if (result) {
          console.log(`user = ${JSON.stringify(user)}`);
          return TokenService.generateToken(user._id);
        }
        else {
          return Promise.reject(AuthErrorCodes.AuthErrorCodes.INVALID_PASSWORD);
        }
      });
    }
    else {
      return Promise.reject(AuthErrorCodes.AuthErrorCodes.INVALID_EMAIL);
    }
  })
}

function checkIfAuthenticated(req, res, next) { //this is middleware function
  const authHeader = req.get('Authorization');
  //we get the token in authHeader in the following format - Bearer Token
  if (typeof authHeader === 'undefined' || authHeader == null) {
    res.status(401).send('Token not found!');
  }
  token = authHeader.split(' ')[1]
  TokenService.verifyToken(token)
  .then(userId => {
    req.userId = userId;
    next();
  })
  .catch(error => {
    console.error(error);
    res.status(401).send(error)
  })
}

module.exports = {
  login: login,
  checkIfAuthenticated: checkIfAuthenticated
};