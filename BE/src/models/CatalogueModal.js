const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, require: true },
    image: { type: String, require: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Catalogue = mongoose.model("Catalogue", catalogueSchema);

module.exports = Catalogue;
