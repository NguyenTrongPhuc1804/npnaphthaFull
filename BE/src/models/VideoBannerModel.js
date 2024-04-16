const mongoose = require("mongoose");

const videoBannerSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const VideoBanner = mongoose.model("VideoBanner", videoBannerSchema);

module.exports = VideoBanner;
