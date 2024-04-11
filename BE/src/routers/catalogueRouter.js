const express = require("express");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getDetailCategory,
} = require("../controllers/CategoryController");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const { listAuth } = require("../constants/authConstants");
const {
  uploadFilePdfMiddleware,
} = require("../middlewares/upload/uploadFilePDFMiddleware");
const {
  createCatalogue,
  deleteCatalogue,
  getAllCatalogue,
  getDetailCatalogue,
  updateCatalogue,
  updateCatalogueImage,
  deleteAllCatalogue,
} = require("../controllers/CatalogueController");
const {
  uploadImage,
  uploadImagePDF,
} = require("../middlewares/upload/uploadMiddleware");

const catalogueRouter = express.Router();
//create
catalogueRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImagePDF("image", "pdf", "pdfFolder"),
  createCatalogue
);
//update
catalogueRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImagePDF("image", "pdf", "pdfFolder"),
  updateCatalogue
);
catalogueRouter.put(
  "/update/image/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImagePDF("image", "pdf", "pdfFolder"),
  updateCatalogueImage
);
//get all
catalogueRouter.get("/all", getAllCatalogue);
//delete
catalogueRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteCatalogue
);

catalogueRouter.post(
  "/deleteAll/",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteAllCatalogue
);
//get detail
catalogueRouter.get("/detail/:slug", getDetailCatalogue);

module.exports = catalogueRouter;
