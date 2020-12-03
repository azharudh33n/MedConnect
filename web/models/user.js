const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
      fname: {
        type: String,
        required: true,
      },
      lname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: [8, "Password should contain atleast 8 characters"],
      },
      place: {
        type:String,
        required:true
      },
    },
    { timestamps: true }
  );

const User = mongoose.model("User", userSchema);
module.exports = User;