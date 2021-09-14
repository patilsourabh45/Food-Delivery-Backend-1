const express = require('express');
const router = express.Router();
const SignupService = require('../service/signupService');


router.get('/', (req, res) => {
  res.send('Hello end point called for signup');
})


router.post('/', (req, res) => {
  SignupService.createSignup(req.query.name,
  req.query.email, req.query.phonenumber, req.query.password)
    .then(() => {
      console.log('Signup successfully!')
      res.send('SignupUser created successfully!');

    })
    .catch((err) => {
      console.log(`Error in creation ${err}`);
      res.send('signupUser not created, due to error');
    });

});

module.exports = router;