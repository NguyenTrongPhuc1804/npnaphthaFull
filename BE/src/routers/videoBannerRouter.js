const express = require("express");
const {
  uploadImage,
  uploadVideo,
} = require("../middlewares/upload/uploadMiddleware");
const {
  createVideoBanner,
  updateVideoBanner,
  getAllVideoBanner,
  getDetailVideoBanner,
  deleteAllVideoBanner,
  deleteVideoBanner,
} = require("../controllers/VideoBannerController");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const { listAuth } = require("../constants/authConstants");
const videoBannerRouter = express.Router();

videoBannerRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadVideo("video", "videoBanner"),
  createVideoBanner
);
videoBannerRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadVideo("video", "videoBanner"),
  updateVideoBanner
);
videoBannerRouter.get("/all/", getAllVideoBanner);
videoBannerRouter.get("/detail/:id", getDetailVideoBanner);
videoBannerRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteVideoBanner
);
module.exports = videoBannerRouter;
