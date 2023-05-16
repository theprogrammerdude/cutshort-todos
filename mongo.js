const mongoose = require("mongoose");
require("dotenv").config();

initializeDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected at " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
};

module.exports = initializeDB;
