const express = require("express");

const imageRouter = express.Router();
imageRouter.get("/all");
module.exports = imageRouter;
