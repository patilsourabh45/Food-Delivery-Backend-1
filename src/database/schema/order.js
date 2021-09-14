const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  restaurantId: { type: mongoose.ObjectId, required: true },
  userId: { type: mongoose.ObjectId, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, 'default': 'Placed' },
  paymentStatus: { type: String, required: true },
  time: { type: Date, 'default': Date.now() }
});

module.exports = orderSchema;