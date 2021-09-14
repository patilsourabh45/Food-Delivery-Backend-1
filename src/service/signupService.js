const User = require('../database/model/user');
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'));

function createSignup(name, email, phonenumber, password) {
  return bcrypt.hash(password, 5)
  .then(hashedPassword => {
    const newSignup = User({ name: name, email: email,phonenumber: phonenumber, password: hashedPassword
  });
  
    return newSignup.save();
  })
  
}



module.exports = {
  createSignup:createSignup

};