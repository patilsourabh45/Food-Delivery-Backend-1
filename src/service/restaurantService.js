const Restaurant = require('../database/model/restaurant');

function fetchRestaurants() {
  return Restaurant.find();
}

function fetchRestaurantsbyPincode(pincode) {
  return Restaurant.find({ restaurantPincode: pincode });
}

function createRestaurant(name, pincode, address, image, description, rating, averageprice ) {
  restaurant = new Restaurant({
    restaurantName: name,
    restaurantPincode: pincode,
    restaurantAddress: address,
    restaurantImage: image,
    restaurantDescription: description,
    restaurantRating : rating,
    restaurantAverageprice: averageprice

  });

  return restaurant.save();
}

function fetchRestaurantById(id) {
  return Restaurant.find({ _id: id });
}

module.exports = {
  fetchRestaurants: fetchRestaurants,
  fetchRestaurantsByPincode: fetchRestaurantsbyPincode,
  createRestaurant: createRestaurant,
  fetchRestaurantById: fetchRestaurantById
};

