const { default: mongoose } = require("mongoose");

const connectDB = mongoose
  .connect("mongodb+srv://ivngg123:phucganoi123@mern.2wzqjhh.mongodb.net/")
  .then(() => {
    console.log("connect database success");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connectDB;
// mongodb://usernam:password@ip:27017
//`mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@mern.2wzqjhh.mongodb.net/`;
