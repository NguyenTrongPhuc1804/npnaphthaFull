const express = require("express");
const {
  createBanner,
  updateBanner,
  getAllBanner,
  getDetailBanner,
  deleteBanner,
  deleteAllBanner,
} = require("../controllers/BannerController");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const { listAuth } = require("../constants/authConstants");
const { uploadImage } = require("../middlewares/upload/uploadMiddleware");

const bannerRouter = express.Router();
bannerRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "image_banner"),
  createBanner
);
bannerRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "image_blog"),
  updateBanner
);
bannerRouter.get("/all/", getAllBanner);
bannerRouter.get("/detail/:id", getDetailBanner);
bannerRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteBanner
);
bannerRouter.post(
  "/deleteAll/",
  authenMiddleware,
  authorMiddleware(listAuth),
  //   uploadArrayImageMiddleware("list_image", "image_product"),
  deleteAllBanner
);
module.exports = bannerRouter;
