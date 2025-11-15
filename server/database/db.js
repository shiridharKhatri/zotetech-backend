const mongoose = require("mongoose");
const connectToDatabase = (URL) => {
  try {
    let connection = mongoose.connect(URL);
    return connection;
  } catch (error) {
    console.log(`Failed to connect with database with reason : ${error}`);
  }
};
module.exports = connectToDatabase;
