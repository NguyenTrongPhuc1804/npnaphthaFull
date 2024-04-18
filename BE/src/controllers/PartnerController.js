const removeImage = require("../middlewares/upload/removeImageUpload");
const Partner = require("../models/PartnerModel");

const createPartner = async (req, res) => {
  const { file } = req;
  const data = req.body;
  try {
    const newPartner = await Partner.create({
      ...data,
      image: `${process.env.DOMAIN}/${file.path}`,
    });
    res.status(200).json({
      message: "create partner success",
      data: newPartner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updatePartner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { file } = req;
  try {
    const checkPartner = await Partner.findOne({ _id: id });
    if (!checkPartner) {
      return res.status(400).json({ message: "Partner not found!!" });
    }
    if (file) {
      const [handleRemoveImagePartner, PartnerUpdate] = await Promise.all([
        removeImage(checkPartner.image),
        Partner.findByIdAndUpdate(
          id,
          { ...data, image: `${process.env.DOMAIN}/${file.path}` },
          {
            new: true,
          }
        ),
      ]);

      return res.status(200).json({
        message: "update Partner success",
        data: PartnerUpdate,
      });
    }
    const PartnerUpdate = await Partner.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      message: "update Partner success",
      data: PartnerUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllPartner = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Partner.countDocuments();
    if (searchBy) {
      const searchPartner = await Partner.find({
        [searchBy]: { $regex: searchValue },
      })

        .limit(limit)
        .skip(page * limit);
      const totalItemSearch = await Partner.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchPartner,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
      });
    }
    const allPartner = await Partner.find()

      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allPartner,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailPartner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkPartner = await Partner.findOne({ _id: id });
    if (!checkPartner) {
      return res.status(404).json({ message: "Partner not define!!" });
    }
    return res.status(200).json({ data: checkPartner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deletePartner = async (req, res) => {
  const { id } = req.params;
  try {
    const checkPartner = await Partner.findOne({ _id: id });
    if (!checkPartner) {
      return res.status(404).json({ message: "Partner not define" });
    }
    Promise.all([
      await removeImage(checkPartner.image),
      await Partner.findByIdAndDelete(id),
    ]);
    return res.status(200).json({ message: "Delete Partner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllPartner = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const checkPartner = await Partner.findOne({ _id: listDelete[key] });
      await removeImage(checkPartner.image);
    }
    await Partner.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Delete all Partner success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createPartner,
  updatePartner,
  getAllPartner,
  getDetailPartner,
  deletePartner,
  deleteAllPartner,
};
