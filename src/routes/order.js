const express = require('express');
const router = express.Router();
const OrderService = require('../service/orderService');

router.get('/', (req, res) => {
  return OrderService.fetchOrders()
  .then(orders => {
    res.send(orders);
  })
  .catch(error => {
    res.error(error);
  })
});

router.post('/', (req, res) => {
  return OrderService.placeOrder(req.query.userId,
  req.query.restaurantId, [], req.query.totalAmount, req.query.paymentStatus)
  .then(() => {
    res.send('Order placed successfully!');
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
});

module.exports = router;