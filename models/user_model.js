const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Number,
      defualt: Date.now(),
    },
    todos: {
      type: Array,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("UserModel", UserSchema);
