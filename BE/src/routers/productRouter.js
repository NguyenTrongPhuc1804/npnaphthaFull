const express = require("express");

const {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
  deleteAllProduct,
} = require("../controllers/ProductController");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const {
  uploadArrayImageMiddleware,
} = require("../middlewares/upload/uploadArrayImgaeMiddleware");
const { listAuth } = require("../constants/authConstants");

const productRouter = express.Router();
productRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadArrayImageMiddleware("list_image", "image_product"),
  createProduct
);
productRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadArrayImageMiddleware("list_image", "image_product"),
  updateProduct
);
productRouter.get("/detail/:slug", getDetailProduct);
productRouter.get("/all/", getAllProduct);
productRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadArrayImageMiddleware("list_image", "image_product"),
  deleteProduct
);
productRouter.post(
  "/deleteAll/",
  authenMiddleware,
  authorMiddleware(listAuth),
  // uploadArrayImageMiddleware("list_image", "image_product"),
  deleteAllProduct
);

module.exports = productRouter;
