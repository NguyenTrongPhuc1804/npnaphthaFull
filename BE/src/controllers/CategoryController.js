const Category = require("../models/CategoryModel");

const createCategory = async (req, res) => {
  const data = req.body;
  try {
    const checkCategory = await Category.findOne({ name: data.name });
    if (checkCategory) {
      console.log(checkCategory, "check cate");
      return res.status(404).json({ message: "Tên danh mục đã tồn tại" });
    }
    const newCategory = await Category.create(data);
    res.status(201).json({
      message: "Tạo danh mục thành công",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllCategory = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Category.countDocuments();
    if (searchBy) {
      const searchCategory = await Category.find({
        [searchBy]: { $regex: searchValue },
      })
        .limit(limit)
        .skip(page * limit);
      return res.status(200).json({
        data: searchCategory,
        totalItem,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItem / limit),
      });
    }
    const allCategory = await Category.find()
      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allCategory,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const checkCate = await Category.findOne({ _id: id });
    if (!checkCate) {
      return res.status(400).json({ message: "Không tìm thấy danh mục" });
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Cập nhật thành công", data: categoryUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const checkCategory = await Category.findOne({ _id: id });
    if (!checkCategory) {
      return res.status(404).json({ message: "Không tìm thấy danh mục!!" });
    }
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const checkCategory = await Category.findOne({ slug });
    if (!checkCategory) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(200).json({ data: checkCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllCategory = async (req, res) => {
  const { listDelete } = req.body;
  try {
    await Category.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Xóa tất cả danh mục thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getDetailCategory,
  deleteAllCategory,
};
