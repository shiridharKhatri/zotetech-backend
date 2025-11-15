const mongoose = require("mongoose");

const productSchema = mongoose.model(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceLabel: {
      type: String,
    },
    features: {
      type: [String],
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
