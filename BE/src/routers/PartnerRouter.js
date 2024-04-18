const express = require("express");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const { listAuth } = require("../constants/authConstants");
const {
  createPartner,
  updatePartner,
  getAllPartner,
  getDetailPartner,
  deletePartner,
  deleteAllPartner,
} = require("../controllers/PartnerController");
const { uploadImage } = require("../middlewares/upload/uploadMiddleware");
const partnerRouter = express.Router();
partnerRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "partner_image"),
  createPartner
);
partnerRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("image", "partner_image"),
  updatePartner
);
partnerRouter.get("/all/", getAllPartner);
partnerRouter.get("/detail/:id", getDetailPartner);
partnerRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deletePartner
);
partnerRouter.post(
  "/deleteAll/",
  authenMiddleware,
  authorMiddleware(listAuth),
  //   uploadArrayImageMiddleware("list_image", "image_product"),
  deleteAllPartner
);
module.exports = partnerRouter;
