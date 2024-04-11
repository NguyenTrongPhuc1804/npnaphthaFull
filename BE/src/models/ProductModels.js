const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    thumb_image: { type: [String] },
    type: { type: String, required: true },
    price: { type: Number },
    countInStock: { type: Number },
    rating: { type: Number },
    description: { type: String, required: true },
    discount: { type: Number },
    selled: { type: Boolean },
    slug: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
