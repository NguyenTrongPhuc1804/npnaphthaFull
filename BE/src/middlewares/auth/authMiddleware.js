const jwt = require("jsonwebtoken");
const authenMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  try {
    const userInfo = await jwt.verify(token, process.env.KEY_JWT);
    if (userInfo) {
      req.user = userInfo;
      next();
    } else {
      res.status(404).json({ message: "Lỗi xác thực người dùng" });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ message: "Error authentication" });
  }
};
const authorMiddleware = (arrAuth) => async (req, res, next) => {
  const { user } = req;
  console.log(arrAuth.findIndex((role) => user.role === role) !== -1, "role");
  try {
    if (arrAuth.findIndex((role) => user.role === role) !== -1) {
      next();
    } else {
      res.status(404).json({ message: "Bạn không có quyền quản trị" });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ message: "invalid signature" });
  }
};
module.exports = { authenMiddleware, authorMiddleware };
