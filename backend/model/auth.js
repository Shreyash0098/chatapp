const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    resetToken: String,
    resetTokenExp: Date,
    messages: [
      {
        message: {
          type: Schema.Types.ObjectId,
          ref: "Chat",
        },
        reciver: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },

  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("User", authSchema);
