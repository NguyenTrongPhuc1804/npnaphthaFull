const express = require("express");

const {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { authenMiddleware } = require("../middlewares/auth/authMiddleware");
const productRouter = express.Router();
productRouter.post("/create", createProduct);
productRouter.post("/update/:id", authenMiddleware, updateProduct);
productRouter.get("/detail/:id", getDetailProduct);
productRouter.get("/all/", getAllProduct);
productRouter.delete("/delete/:id", deleteProduct);
module.exports = productRouter;
