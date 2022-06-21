const mongoose = require("mongoose");

const options = {
  dbName: "billing-system",
  bufferCommands: false,
  autoCreate: false,
  autoIndex: true,
  maxPoolSize: 10,
};

module.exports = mongoose.connect("mongodb://localhost:27017", options);
