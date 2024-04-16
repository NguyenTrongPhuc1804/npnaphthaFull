const removeImage = require("../middlewares/upload/removeImageUpload");
const Banner = require("../models/BannerModel");

const createBanner = async (req, res) => {
  const { file } = req;
  const data = req.body;
  try {
    const newBanner = await Banner.create({
      ...data,
      image: `${process.env.DOMAIN}/${file.path}`,
    });
    res.status(200).json({
      message: "create product success",
      data: newBanner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateBanner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { file } = req;
  try {
    const checkBanner = await Banner.findOne({ _id: id });
    if (!checkBanner) {
      return res.status(400).json({ message: "Banner not found!!" });
    }
    if (file) {
      const [handleRemoveImageBanner, bannerUpdate] = await Promise.all([
        removeImage(checkBanner.image),
        Banner.findByIdAndUpdate(
          id,
          { ...data, image: `${process.env.DOMAIN}/${file.path}` },
          {
            new: true,
          }
        ),
      ]);

      return res.status(200).json({
        message: "update Banner success",
        data: bannerUpdate,
      });
    }
    const bannerUpdate = await Banner.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      message: "update banner success",
      data: bannerUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllBanner = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Banner.countDocuments();
    if (searchBy) {
      const searchBanner = await Banner.find({
        [searchBy]: { $regex: searchValue },
      })

        .limit(limit)
        .skip(page * limit);
      const totalItemSearch = await Banner.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchBanner,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
      });
    }
    const allBanner = await Banner.find()

      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allBanner,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkBanner = await Banner.findOne({ _id: id });
    if (!checkBanner) {
      return res.status(404).json({ message: "Banner not define!!" });
    }
    return res.status(200).json({ data: checkBanner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkBanner = await Banner.findOne({ _id: id });
    if (!checkBanner) {
      return res.status(404).json({ message: "Banner not define" });
    }
    Promise.all([
      await removeImage(checkBanner.image),
      await Banner.findByIdAndDelete(id),
    ]);
    return res.status(200).json({ message: "Delete banner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllBanner = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const checkBanner = await Banner.findOne({ _id: listDelete[key] });
      await removeImage(checkBanner.image);
    }
    await Banner.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Delete all banner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createBanner,
  updateBanner,
  getAllBanner,
  getDetailBanner,
  deleteBanner,
  deleteAllBanner,
};
