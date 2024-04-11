const express = require("express");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getDetailCategory,
  deleteAllCategory,
} = require("../controllers/CategoryController");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const { listAuth } = require("../constants/authConstants");

const categoryRouter = express.Router();
//create
categoryRouter.post(
  "/create",
  authenMiddleware,
  authorMiddleware(listAuth),
  createCategory
);
//update
categoryRouter.put(
  "/update/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  updateCategory
);
//get all
categoryRouter.get("/all", getAllCategory);
//delete
categoryRouter.delete(
  "/delete/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteCategory
);

categoryRouter.post(
  "/deleteAll",
  authenMiddleware,
  authorMiddleware(listAuth),
  deleteAllCategory
);
//get detail
categoryRouter.get("/detail/:slug", getDetailCategory);

module.exports = categoryRouter;
