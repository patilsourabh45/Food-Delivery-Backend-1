const mongoose = require('mongoose');
const DbConfig = require('../config/dbConfig');

function getConnectionString() {
  return `mongodb+srv://${DbConfig.CLUSTER_ADDRESS}/${DbConfig.DATABASE_NAME}?retryWrites=true&w=majority`;
}

function connectToDb() {
  return mongoose.connect(getConnectionString(), { user: DbConfig.USERNAME, pass: DbConfig.PASSWORD });
}

module.exports = {
  connect: connectToDb
};