const removeImage = require("../middlewares/upload/removeImageUpload");
const Product = require("../models/ProductModels");
const Sitemap = require("../models/siteMapModel");

const createProduct = async (req, res) => {
  const { files } = req;
  const data = req.body;

  try {
    const checkProduct = await Product.findOne({ name: data.name });
    if (checkProduct) {
      return res.status(400).json({ message: "Tên sản phẩm tồn tại!!" });
    }
    const newSitemap = await Sitemap.create({
      url: `/product/${data.slug}`,
      changefreq: "weekly",
      priority: 0.5,
    });
    const listImage = files.map((item) => `${process.env.DOMAIN}/${item.path}`);
    const newProduct = await Product.create({
      ...data,
      thumb_image: listImage,
      image: listImage[0],
    });
    res.status(200).json({
      message: "create product success",
      data: newProduct,
      newSitemap,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { files } = req;

  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return res.status(400).json({ message: "Product not found!!" });
    }
    if (files.length > 0) {
      const { thumb_image } = checkProduct;
      const listImage = files.map(
        (item) => `${process.env.DOMAIN}/${item.path}`
      );
      for (let key in thumb_image) {
        await removeImage(thumb_image[key]);
      }
      const newSitemap = await Sitemap.findOneAndUpdate(
        { url: `/product/${checkProduct.slug}` },
        {
          url: `/product/${data.slug}`,
        },
        { new: true }
      );
      const productUpdate = await Product.findByIdAndUpdate(
        id,
        { ...data, thumb_image: listImage, image: listImage[0] },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({
          message: "update product success",
          data: productUpdate,
          newSitemap,
        });
    }
    const newSitemap = await Sitemap.findOneAndUpdate(
      { url: `/product/${checkProduct.slug}` },
      {
        url: `/product/${data.slug}`,
      },
      { new: true }
    );
    const productUpdate = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "update product success",
        data: productUpdate,
        newSitemap,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getDetailProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const checkProduct = await Product.findOne({ slug });
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

    await Sitemap.findOneAndDelete({ url: `/product/${checkProduct.slug}` });
    const { thumb_image } = checkProduct;
    for (let key in thumb_image) {
      await removeImage(thumb_image[key]);
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete product success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllProduct = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const product = await Product.findOne({ _id: listDelete[key] });

      const { thumb_image } = product;
      for (let key in thumb_image) {
        await removeImage(thumb_image[key]);
      }
      await Sitemap.findOneAndDelete({ url: `/product/${product.slug}` });
    }
    await Product.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Delete all product success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getAllProduct = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
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
      const totalItemSearch = await Product.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchProduct,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
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
const updateArrImage = (req, res) => {
  const { files } = req;
  console.log(files, "fileImage");
  res.status(200).json({ mess: "success" });
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
  updateArrImage,
  deleteAllProduct,
};
