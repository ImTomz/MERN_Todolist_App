const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todos", TodoSchema);
