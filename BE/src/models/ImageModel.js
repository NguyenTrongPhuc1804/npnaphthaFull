const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Image", ImageSchema);

module.exports = Category;
