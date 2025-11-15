const mongoose = require("mongoose");
const bulletinSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    headline: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bulletin", bulletinSchema);
