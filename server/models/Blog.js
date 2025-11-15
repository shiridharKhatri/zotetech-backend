const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Blog", blogSchema);
