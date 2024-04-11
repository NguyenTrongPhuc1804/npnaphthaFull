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
const {
  createBlog,
  updateBlog,
  getAllBlog,
  getDetailBlog,
  deleteBlog,
  deleteAllBlog,
} = require("../controllers/BlogController");
const { uploadImage } = require("../middlewares/upload/uploadMiddleware");

const blogRouter = express.Router();
blogRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "image_blog"),
  createBlog
);
blogRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "image_blog"),
  updateBlog
);
blogRouter.get("/detail/:slug", getDetailBlog);
blogRouter.get("/all/", getAllBlog);
blogRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteBlog
);
blogRouter.post(
  "/deleteAll/",
  authenMiddleware,
  authorMiddleware(listAuth),
  //   uploadArrayImageMiddleware("list_image", "image_product"),
  deleteAllBlog
);

module.exports = blogRouter;
