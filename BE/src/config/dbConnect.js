const { default: mongoose } = require("mongoose");

const connectDB = mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@mern.2wzqjhh.mongodb.net/`
  )
  .then(() => {
    console.log("connect database success");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connectDB;
// mongodb://admin:123456@3.106.141.127:27017
