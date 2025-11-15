const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    lastLoggedin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", userSchema);
