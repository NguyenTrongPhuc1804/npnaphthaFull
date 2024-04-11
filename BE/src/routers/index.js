const express = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const categoryRouter = require("./categoryRouter.js");
const imageRouter = require("./imgaeRouter.js");
const catalogueRouter = require("./catalogueRouter.js");
const siteMapRouter = require("./sitemapRouter.js");
const blogRouter = require("./blogRouter.js");

const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/image", imageRouter);
rootRouter.use("/catalogue", catalogueRouter);
rootRouter.use("/blog", blogRouter);
rootRouter.use("/map", siteMapRouter);
module.exports = rootRouter;
