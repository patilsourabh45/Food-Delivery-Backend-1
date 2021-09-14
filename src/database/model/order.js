const mongoose = require('mongoose');
const orderSchema = require('../schema/order');

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;