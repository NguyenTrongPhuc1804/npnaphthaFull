const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
