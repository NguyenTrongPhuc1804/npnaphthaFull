const Contact = require("../models/ContactModel");

const createContact = async (req, res) => {
  const data = req.body;
  try {
    const newContact = await Contact.create({ ...data, isSeen: 1 });
    res.status(201).json({
      message: "Gửi lời nhắn thành công",
      newContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllContact = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Contact.countDocuments();
    if (searchBy) {
      const searchContact = await Contact.find({
        [searchBy]: { $regex: searchValue },
      })
        .limit(limit)
        .skip(page * limit);
      return res.status(200).json({
        data: searchContact,
        totalItem,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItem / limit),
      });
    }
    const allContact = await Contact.find()
      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allContact,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const checkContact = await Contact.findOne({ _id: id });
    if (!checkContact) {
      return res.status(404).json({ message: "Không tìm thấy liên hệ!!" });
    }
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa liên hệ thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailContact = async (req, res) => {
  const { id } = req.params;
  try {
    const checkContact = await Contact.findOne({ id });
    if (!checkContact) {
      return res.status(404).json({ message: "Không tìm thấy liên hệ" });
    }
    return res.status(200).json({ data: checkContact });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllContact = async (req, res) => {
  const { listDelete } = req.body;
  try {
    await Contact.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Xóa tất cả liên hệ thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { isSeen } = req.body;

  try {
    const checkContact = await Contact.findOne({ _id: id });
    if (!checkContact) {
      return res.status(400).json({ message: "Không tìm thấy liên hệ" });
    }

    const ContactUpdate = await Contact.findByIdAndUpdate(
      id,
      { isSeen },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Cập nhật thành công", data: ContactUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
module.exports = {
  createContact,
  getAllContact,
  deleteContact,
  getDetailContact,
  deleteAllContact,
  updateContact,
};
