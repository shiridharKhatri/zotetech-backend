const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    serviceInterest: {
      type: String,
    },
    projectBudget: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
