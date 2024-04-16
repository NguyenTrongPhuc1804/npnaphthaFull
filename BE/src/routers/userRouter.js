const express = require("express");
const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  getRefreshToken,
  deleteAllUser,
  logoutUser,
} = require("../controllers/UserController");

const { listAuth, listAuthLevel2 } = require("../constants/authConstants");
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
  authorMiddleware(listAuthLevel2),
  uploadImage("avatar", "avatarUser"),
  updateUser
);
userRouter.delete(
  "/:id",
  authenMiddleware,
  authorMiddleware(listAuthLevel2),
  deleteUser
);
userRouter.post(
  "/deleteAll",
  authenMiddleware,
  authorMiddleware(listAuthLevel2),
  deleteAllUser
);
userRouter.get("/all", getAllUser);
userRouter.get("/detail/:id", getDetailUser);
userRouter.post("/refresh-token", getRefreshToken);
userRouter.post("/logout", logoutUser);
module.exports = userRouter;
