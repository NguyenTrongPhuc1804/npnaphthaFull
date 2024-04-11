const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    slug: { type: String, require: true },
    title: { type: String, require: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
