const mongoose = require("mongoose");
const faqSchema = mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUpdated: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
