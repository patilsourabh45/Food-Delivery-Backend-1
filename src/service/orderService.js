const Order = require('../database/model/order');
const User = require('../database/model/user');
const Restaurant = require('../database/model/restaurant');

const UserService = require('./userService')
const RestaurantService = require('./restaurantService');

function fetchOrders() {
   return Order.find();
}

function placeOrder(userId, restaurantId, items, totalAmount,
paymentStatus) {
  let p1 = UserService.fetchUserByUserId(userId);
  let p2 = RestaurantService.fetchRestaurantById(restaurantId);

  return Promise.all([p1, p2]) //prmoise.all means when p1 and p2 both functions are executed then and only it will return promise.If either of one fail it will not return promise
  .then(values => {
    const user = values[0];
    const restaurant  = values[1];//0 and 1 are index 
    console.log(`user = ${JSON.stringify(user)}`);
    console.log(`res = ${JSON.stringify(restaurant)}`);
    if (user.length === 0) {
      console.log('User does not exist!');
      return Promise.reject('User does not exist!');
    }
    if (restaurant.length === 0) {
      console.log('Restaurant does not exist!');
      return Promise.reject('restaurant does not exist!');
    }
    return {
      user: user[0],   //we will get user & restaurant list after promise is fulfilled and 0 menas 0th user and 0 th restaurant its index
      restaurant: restaurant[0]
    };
  })
  .then((values) => {  //returned value of first then will be taken by second then that is values
    let order = Order({
      userId: userId,
      restaurantId: restaurantId,
      items: items,
      totalAmount: totalAmount,
      paymentStatus: paymentStatus
    });

    return order.save()
    .then(() => {
      return User.updateOne({ _id: userId }, { $inc: { noOfOrders: 1 }}); //inc increments the default value by specifed value i.e 1 check this inc in mongodb manual
    })
    .then(() => Restaurant.updateOne({ _id: restaurantId,}, { $inc: { noOfOrders: 1 }}));
  })
}

module.exports = {
  fetchOrders: fetchOrders,
  placeOrder: placeOrder
}