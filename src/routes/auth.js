const express = require('express');
const router = express.Router();
const AuthService = require('../service/authService');

router.get('/login', (req, res) => {
  if (typeof req.query.email === 'undefined' || typeof req.query.password === 'undefined') {
    res.status(400).send('Invalid parameters');
  }
  else {
    console.log(`query = ${JSON.stringify(req.query)}`);
    AuthService.login(req.query.email, req.query.password)
    .then((token) => {
      res.send(token);
    })
    .catch(errorCode => {
      console.log(`errorCode = ${errorCode}`);
      res.status(401).send(errorCode);
    });
  }
})

module.exports = router;
