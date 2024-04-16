const removeImage = require("../middlewares/upload/removeImageUpload");
const VideoBanner = require("../models/VideoBannerModel");

const createVideoBanner = async (req, res) => {
  const { file } = req;
  try {
    const newVideoBanner = await VideoBanner.create({
      url: `${process.env.DOMAIN}/${file.path}`,
    });
    res.status(200).json({
      message: "create product success",
      data: newVideoBanner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateVideoBanner = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  try {
    const checkVideoBanner = await VideoBanner.findOne({ _id: id });
    if (!checkVideoBanner) {
      return res.status(400).json({ message: "VideoBanner not found!!" });
    }
    if (file) {
      const [handleRemoveImageVideoBanner, VideoBannerUpdate] =
        await Promise.all([
          removeImage(checkVideoBanner.url),
          VideoBanner.findByIdAndUpdate(
            id,
            { url: `${process.env.DOMAIN}/${file.path}` },
            {
              new: true,
            }
          ),
        ]);

      return res.status(200).json({
        message: "update VideoBanner success",
        data: VideoBannerUpdate,
      });
    }
    const VideoBannerUpdate = await VideoBanner.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      message: "update VideoBanner success",
      data: VideoBannerUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllVideoBanner = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await VideoBanner.countDocuments();
    if (searchBy) {
      const searchVideoBanner = await VideoBanner.find({
        [searchBy]: { $regex: searchValue },
      })

        .limit(limit)
        .skip(page * limit);
      const totalItemSearch = await VideoBanner.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchVideoBanner,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
      });
    }
    const allVideoBanner = await VideoBanner.find()

      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allVideoBanner,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailVideoBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkVideoBanner = await VideoBanner.findOne({ _id: id });
    if (!checkVideoBanner) {
      return res.status(404).json({ message: "VideoBanner not define!!" });
    }
    return res.status(200).json({ data: checkVideoBanner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteVideoBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkVideoBanner = await VideoBanner.findOne({ _id: id });
    if (!checkVideoBanner) {
      return res.status(404).json({ message: "VideoBanner not define" });
    }
    Promise.all([
      await removeImage(checkVideoBanner.url),
      await VideoBanner.findByIdAndDelete(id),
    ]);
    return res.status(200).json({ message: "Delete VideoBanner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllVideoBanner = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const checkVideoBanner = await VideoBanner.findOne({
        _id: listDelete[key],
      });
      await removeImage(checkVideoBanner.image);
    }
    await VideoBanner.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Delete all VideoBanner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createVideoBanner,
  updateVideoBanner,
  getAllVideoBanner,
  getDetailVideoBanner,
  deleteVideoBanner,
  deleteAllVideoBanner,
};
