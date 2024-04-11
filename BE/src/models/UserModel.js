const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "CLIENT",
    },
    phone: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    access_token: {
      type: Number,
      require: true,
    },
    refresh_token: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
