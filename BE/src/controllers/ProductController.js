const Product = require("../models/ProductModels");

const createProduct = async (req, res) => {
  const {
    name,
    image,
    type,
    price,
    countInStock,
    rating,
    description,
    discount,
    selled,
  } = req.body;
  try {
    const checkProduct = await Product.findOne({ name });
    if (checkProduct) {
      return res
        .status(400)
        .json({ message: "The name of product is already!!" });
    }
    const newProduct = await Product.create({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    });
    res
      .status(200)
      .json({ message: "create product success", data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    image,
    type,
    price,
    countInStock,
    rating,
    description,
    discount,
    selled,
  } = req.body;
  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return res.status(400).json({ message: "Product not found!!" });
    }
    const productUpdate = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
        discount,
        selled,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "update product success", data: productUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getDetailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return res.status(404).json({ message: "Product not define!!" });
    }
    return res.status(200).json({ data: checkProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return res.status(404).json({ message: "Product not define" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete product success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getAllProduct = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "asc",
    sortBy = "name",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Product.countDocuments();
    if (searchBy) {
      const searchProduct = await Product.find({
        [searchBy]: { $regex: searchValue },
      })
        .limit(limit)
        .skip(page * limit);
      return res.status(200).json({
        data: searchProduct,
        totalItem,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItem / limit),
      });
    }
    const allProduct = await Product.find()
      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allProduct,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
};
