const mongoose = require("mongoose");
const User = require("../models/user");
const Schema = mongoose.Schema;
const loginSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    disease: {
      type: Array,
    },
    symptom: {
      type: Array,
    },
  },
  { timestamps: true }
);

const LoginDetails = mongoose.model("LoginDetails", loginSchema);
module.exports = LoginDetails;
