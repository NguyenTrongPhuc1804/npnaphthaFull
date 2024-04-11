const removeImage = require("../middlewares/upload/removeImageUpload");
const Catalogue = require("../models/catalogueModal");
const getAllCatalogue = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Catalogue.countDocuments();
    if (searchBy) {
      const searchCatalogue = await Catalogue.find({
        [searchBy]: { $regex: searchValue },
      })
        .limit(limit)
        .skip(page * limit);
      const totalItemSearch = await Catalogue.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchCatalogue,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
      });
    }

    const allCatalogue = await Catalogue.find()
      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allCatalogue,
      totalItem,
      pageCurrent: parseInt(page) + 1,
      totalPage: Math.ceil(totalItem / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const createCatalogue = async (req, res) => {
  const data = req.body;
  const pdfFile = req.files["pdf"][0];
  const imageFile = req.files["image"][0];
  try {
    const checkCatalogue = await Catalogue.findOne({ slug: data.slug });
    if (checkCatalogue) {
      await Promise.all([
        removeImage(`${process.env.DOMAIN}/${pdfFile.path}`),
        removeImage(`${process.env.DOMAIN}/${imageFile.path}`),
      ]);
      return res.status(404).json({ message: "Tên đường dẫn đã tồn tại" });
    }
    const newCatalogue = await Catalogue.create({
      ...data,
      url: `${process.env.DOMAIN}/${pdfFile.path}`,
      image: `${process.env.DOMAIN}/${imageFile.path}`,
    });
    res.status(201).json({
      message: "Tạo file pdf thành công",
      newCatalogue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateCatalogue = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { files } = req;
  try {
    const checkCatalogue = await Catalogue.findOne({ _id: id });
    if (!checkCatalogue) {
      return res.status(404).json({ message: "Không tìm file" });
    }
    if (files["pdf"] && !files["image"]) {
      checkCatalogue.url && (await removeImage(checkCatalogue.url));
      const CatalogueUpdate = await Catalogue.findByIdAndUpdate(
        id,
        { ...data, url: `${process.env.DOMAIN}/${files["pdf"][0].path}` },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: CatalogueUpdate });
    }
    if (!files["pdf"] && files["image"]) {
      checkCatalogue.image && (await removeImage(checkCatalogue.image));
      const CatalogueUpdate = await Catalogue.findByIdAndUpdate(
        id,
        { ...data, image: `${process.env.DOMAIN}/${files["image"][0].path}` },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: CatalogueUpdate });
    }
    if (files["pdf"] && files["image"]) {
      checkCatalogue.image && (await removeImage(checkCatalogue.image));
      checkCatalogue.url && (await removeImage(checkCatalogue.url));
      const CatalogueUpdate = await Catalogue.findByIdAndUpdate(
        id,
        {
          ...data,
          image: `${process.env.DOMAIN}/${files["image"][0].path}`,
          url: `${process.env.DOMAIN}/${files["pdf"][0].path}`,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: CatalogueUpdate });
    }
    const CatalogueUpdate = await Catalogue.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Cập nhật thành công", data: CatalogueUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const updateCatalogueImage = async (req, res) => {
  const { id } = req.params;
  // const data = req.body;
  const { files } = req;
  try {
    const checkCatalogue = await Catalogue.findOne({ _id: id });
    if (!checkCatalogue) {
      return res.status(404).json({ message: "Không tìm thấy file" });
    }
    if (files["image"]) {
      checkCatalogue.image && (await removeImage(checkCatalogue.image));
      const CatalogueUpdate = await Catalogue.findByIdAndUpdate(
        id,
        { image: `${process.env.DOMAIN}/${files["image"][0].path}` },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Cập nhật thành công", data: CatalogueUpdate });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteCatalogue = async (req, res) => {
  const { id } = req.params;
  try {
    const checkCatalogue = await Catalogue.findOne({ _id: id });
    if (!checkCatalogue) {
      return res.status(404).json({ message: "Không tìm thấy file!!" });
    }
    await removeImage(checkCatalogue.url);
    await removeImage(checkCatalogue.image);
    await Catalogue.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa file thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllCatalogue = async (req, res) => {
  const { listDelete } = req.body;

  try {
    for (let key in listDelete) {
      const checkCatalogue = await Catalogue.findOne({ _id: listDelete[key] });
      await removeImage(checkCatalogue.url);
      await removeImage(checkCatalogue.image);
    }
    await Catalogue.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Xóa tất cả file thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getDetailCatalogue = async (req, res) => {
  const { slug } = req.params;
  try {
    const checkCatalogue = await Catalogue.findOne({ slug });
    if (!checkCatalogue) {
      return res.status(404).json({ message: "Không tìm thấy file" });
    }
    return res.status(200).json({ data: checkCatalogue });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
module.exports = {
  createCatalogue,
  deleteCatalogue,
  getAllCatalogue,
  getDetailCatalogue,
  updateCatalogue,
  updateCatalogueImage,
  deleteAllCatalogue,
};
