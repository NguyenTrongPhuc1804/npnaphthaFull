const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  online: { type: Boolean, required: true },
  unreadCnt: { type: Number, require: true },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
