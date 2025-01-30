const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
