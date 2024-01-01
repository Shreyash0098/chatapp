const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  sender: {
    type: Sche.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("User", chatSchema);
