const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Number,
      defualt: Date.now(),
    },
    completed: {
      type: Number,
      default: 0,
    },
  },
  {
    autoCreate: false,
  }
);

module.exports = mongoose.model("TodoModel", TodoSchema);
