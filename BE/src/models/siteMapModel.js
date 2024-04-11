const mongoose = require("mongoose");

const siteMapSchema = new mongoose.Schema({
  url: { type: String, required: true },
  changefreq: { type: String, required: true },
  priority: { type: Number, required: true, default: 0.5 },
});

const Sitemap = mongoose.model("Sitemap", siteMapSchema);

module.exports = Sitemap;
