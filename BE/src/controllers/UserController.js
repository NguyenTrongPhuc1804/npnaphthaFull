const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  jwtGenarate,
  refreshToken,
  newToken,
} = require("../services/jwtGenarate");
const removeImage = require("../middlewares/upload/removeImageUpload");
const register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  const { file } = req;
  const checkUserExist = await User.findOne({ email });
  try {
    if (checkUserExist) {
      await removeImage(`${process.env.DOMAIN}/${file.path}`);
      return res.status(404).json({ message: "Email đã tồn tại !! " });
    }
    // const hashPassword = bcrypt.hashSync(password, 10);

    if (file) {
      const createUser = await User.create({
        name,
        email,
        password,
        phone,
        address,
        role,
        avatar: `${process.env.DOMAIN}/${file.path}`,
      });
      return res
        .status(200)
        .json({ message: "register success", data: createUser });
    }
    const createUser = await User.create({
      name,
      email,
      // password: hashPassword,
      password,
      phone,
      address,
      role,
    });
    res.status(200).json({ message: "register success", data: createUser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        message: "Sai email hoặc mật khẩu",
      });
    }
    // const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!password === checkUser.password) {
      return res.status(404).json({
        message: "Sai email hoặc mật khẩu",
      });
    }
    const access_token = await jwtGenarate({
      id: checkUser.id,
      role: checkUser.role,
    });
    const refresh_token = await refreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      data: {
        message: "Login success",
        access_token,
        user_id: checkUser.id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { file } = req;
  try {
    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    if (file) {
      checkUser.avatar && (await removeImage(checkUser.avatar));
      const userUpdate = await User.findByIdAndUpdate(
        id,
        { ...data, avatar: `${process.env.DOMAIN}/${file.path}` },
        { new: true }
      );
      console.log(userUpdate, "domain");

      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: userUpdate });
    }
    const userUpdate = await User.findByIdAndUpdate(id, data, { new: true });
    return res
      .status(200)
      .json({ message: "Cập nhật thành công", data: userUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
      return res.status(404).json({ message: "User not define" });
    }
    checkUser.avatar && (await removeImage(checkUser.avatar));
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete user success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllUser = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const checkUser = await User.findOne({ _id: listDelete[key] });
      checkUser.avatar && (await removeImage(checkUser.avatar));
    }
    await User.deleteMany({ _id: { $in: listDelete } });
    return res
      .status(200)
      .json({ message: "Xóa tất cả user đã chọn thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getAllUser = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    searchBy,
    searchValue,
    sort = "desc",
    sortBy = "_id",
  } = req.query;
  try {
    const totalItem = await User.countDocuments();
    if (searchBy) {
      const totalUser = await User.find({
        [searchBy]: { $regex: searchValue, $options: "i" },
      }).countDocuments();
      const searchUser = await User.find({
        [searchBy]: { $regex: searchValue, $options: "i" },
      })
        .limit(limit)
        .skip(page * limit);
      return res.status(200).json({
        data: searchUser,
        totalUser,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalUser / limit),
      });
    }
    const allUser = await User.find()
      .sort({ [sortBy]: sort })
      .limit(limit)
      .skip(page * limit);
    res.status(200).json({
      data: allUser,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
      return res.status(404).json({ message: "User not define" });
    }
    return res.status(200).json({ data: checkUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getRefreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;
  console.log(token, "refresh token");
  try {
    if (!token) {
      return res.status(404).json({ message: "token is require!!" });
    }
    const newAccessToken = await newToken(token);
    res.status(200).json({ access_token: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  getRefreshToken,
  deleteAllUser,
};
