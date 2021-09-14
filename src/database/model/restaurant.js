const mongoose = require('mongoose');
const restaurantSchema = require('../schema/restaurant');

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurant;