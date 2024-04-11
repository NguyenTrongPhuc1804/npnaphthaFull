const Message = require("../../models/MessageModel");
const Room = require("../../models/RoomModel");

const getAllRoom = async () => {
  const allRoom = await Room.find();
  return allRoom;
};
const createRoom = async ({ name, email }) => {
  const checkRoom = await Room.findOne({ email });
  if (!checkRoom) {
    const newRoom = await Room.create({
      name,
      email,
      online: true,
      unreadCnt: 0,
    });
    return getAllRoom();
  } else {
    const joinRoom = await Room.findOneAndUpdate(
      { email },
      { online: true, name },
      { new: true }
    );
    return getAllRoom();
  }
};
const updateSeenRoom = async (email) => {
  await Room.findOneAndUpdate({ email }, { unreadCnt: 0 }, { new: true });
  const allRoom = await Room.find();
  return allRoom;
};
const deleteRoom = async (email) => {
  await Room.findOneAndDelete({ email });
  await Message.deleteMany({ room: email });
  return getAllRoom();
};
module.exports = {
  createRoom,
  getAllRoom,
  updateSeenRoom,
  deleteRoom,
};
