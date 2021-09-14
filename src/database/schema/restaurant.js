const Schema = require('mongoose').Schema;

const restaurantSchema = new Schema({
  restaurantName: String,
  restaurantAddress: String,
  restaurantPincode: Number,
  restaurantImage: String,
  noOfOrders: { type: Number, "default": 0 },
  restaurantDescription: String,
  restaurantRating : Number,
  restaurantAverageprice: Number
});

module.exports = restaurantSchema;