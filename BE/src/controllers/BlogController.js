const removeImage = require("../middlewares/upload/removeImageUpload");
const Blog = require("../models/BlogModel");
const Sitemap = require("../models/siteMapModel");

const createBlog = async (req, res) => {
  const { file } = req;
  const data = req.body;
  try {
    const checkBlog = await Blog.findOne({ slug: data.slug });
    if (checkBlog) {
      await removeImage(`${process.env.DOMAIN}/${file.path}`);
      return res.status(400).json({ message: "Tên đường dẫn đã tồn tại!!" });
    }
    const newSitemap = await Sitemap.create({
      url: `/blog/${data.slug}`,
      changefreq: "weekly",
      priority: 0.5,
    });
    const newBlog = await Blog.create({
      ...data,
      image: `${process.env.DOMAIN}/${file.path}`,
    });
    res.status(200).json({
      message: "create product success",
      data: newBlog,
      newSitemap,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { file } = req;
  try {
    const checkBlog = await Blog.findOne({ _id: id });
    if (!checkBlog) {
      return res.status(400).json({ message: "Blog not found!!" });
    }
    if (file) {
      const [handleRemoveImageBlog, newSitemap, blogUpdate] = await Promise.all(
        [
          removeImage(checkBlog.image),
          Sitemap.findOneAndUpdate(
            { url: `/blog/${checkBlog.slug}` },
            {
              url: `/blog/${data.slug}`,
            },
            { new: true }
          ),
          Blog.findByIdAndUpdate(
            id,
            { ...data, image: `${process.env.DOMAIN}/${file.path}` },
            {
              new: true,
            }
          ),
        ]
      );
      // await removeImage(checkBlog.image);
      // const newSitemap = await Sitemap.findOneAndUpdate(
      //   { url: `/blog/${checkBlog.slug}` },
      //   {
      //     url: `/blog/${data.slug}`,
      //   },
      //   { new: true }
      // );

      // const blogUpdate = await Blog.findByIdAndUpdate(
      //   id,
      //   { ...data, image: `${process.env.DOMAIN}/${file.path}` },
      //   {
      //     new: true,
      //   }
      // );

      return res
        .status(200)
        .json({ message: "update blog success", data: blogUpdate, newSitemap });
    }
    //update sitemap
    const newSitemap = await Sitemap.findOneAndUpdate(
      { url: `/blog/${checkBlog.slug}` },
      {
        url: `/blog/${data.slug}`,
      },
      { new: true }
    );
    console.log(newSitemap, "data");

    const blogUpdate = await Blog.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "update blog success", data: blogUpdate, newSitemap });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getDetailBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const checkBlog = await Blog.findOne({ slug });
    if (!checkBlog) {
      return res.status(404).json({ message: "Blog not define!!" });
    }
    return res.status(200).json({ data: checkBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const checkBlog = await Blog.findOne({ _id: id });
    if (!checkBlog) {
      return res.status(404).json({ message: "Blog not define" });
    }

    await Sitemap.findOneAndDelete({ url: `/blog/${checkBlog.slug}` });
    await removeImage(checkBlog.image);
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete blog success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const deleteAllBlog = async (req, res) => {
  const { listDelete } = req.body;
  try {
    for (let key in listDelete) {
      const checkBlog = await Blog.findOne({ _id: listDelete[key] });

      await removeImage(checkBlog.image);
      await Sitemap.findOneAndDelete({ url: `/blog/${checkBlog.slug}` });
    }
    await Blog.deleteMany({ _id: { $in: listDelete } });
    return res.status(200).json({ message: "Delete all blog success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getAllBlog = async (req, res) => {
  const {
    page = 0,
    limit = 8,
    sort = "desc",
    sortBy = "_id",
    searchBy,
    searchValue,
  } = req.query;
  try {
    const totalItem = await Blog.countDocuments();
    if (searchBy) {
      const searchBlog = await Blog.find({
        [searchBy]: { $regex: searchValue },
      })

        .limit(limit)
        .skip(page * limit);
      const totalItemSearch = await Blog.find({
        [searchBy]: { $regex: searchValue },
      }).countDocuments();

      return res.status(200).json({
        data: searchBlog,
        totalItemSearch,
        pageCurrent: parseInt(page) + 1,
        totalPage: Math.ceil(totalItemSearch / limit),
      });
    }
    const allBlog = await Blog.find()

      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sort });
    return res.status(200).json({
      data: allBlog,
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
  createBlog,
  updateBlog,
  getAllBlog,
  getDetailBlog,
  deleteBlog,
  deleteAllBlog,
};
