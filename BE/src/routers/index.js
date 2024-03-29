const express = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");

const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
module.exports = rootRouter;
