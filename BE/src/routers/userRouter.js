const express = require("express");
const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  getRefreshToken,
} = require("../controllers/UserController");

const { listAuth } = require("../constants/authConstants");
const { uploadImage } = require("../middlewares/upload/uploadMiddleware");
const {
  authenMiddleware,
  authorMiddleware,
} = require("../middlewares/auth/authMiddleware");
const userRouter = express.Router();
userRouter.post("/register", uploadImage("avatar", "avatarUser"), register);
userRouter.post("/login", login);
userRouter.put(
  "/:id",
  authenMiddleware,
  authorMiddleware(listAuth),
  uploadImage("avatar", "avatarUser"),
  updateUser
);
userRouter.delete("/:id", authenMiddleware, deleteUser);
userRouter.get("/all", getAllUser);
userRouter.get("/detail/:id", getDetailUser);
userRouter.get("/refresh-token", getRefreshToken);
module.exports = userRouter;
