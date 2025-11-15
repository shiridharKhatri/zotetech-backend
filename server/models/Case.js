const mongoose = require("mongoose");
const caseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      require: true,
    },
    results: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Case", caseSchema);
