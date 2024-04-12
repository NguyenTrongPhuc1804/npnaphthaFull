const { default: mongoose } = require("mongoose");

const connectDB = mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connect database success");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connectDB;
// mongodb://usernam:password@ip:27017
//`mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@mern.2wzqjhh.mongodb.net/`;
