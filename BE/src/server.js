const express = require("express");
const { default: mongoose } = require("mongoose");
const rootRouter = require("./routers");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const path = require("path");
var cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

const publicPathDirectory = path.join(__dirname, "../public");
app.use("/public", express.static(publicPathDirectory));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.DOMAIN,
      "https://npnaphtha-web.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB;
});
