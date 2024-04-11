const Message = require("../../models/MessageModel");
const Room = require("../../models/RoomModel");
const { getAllRoom } = require("./RoomChat");
const createMessage = async ({ text, sender, email }) => {
  try {
    const newMessage = await Message.create({
      text,
      sender,
      room: email,
      isSeen: false,
    });
    const room = await Room.findOne({ email });
    if (room && sender !== "admin") {
      await Room.findOneAndUpdate(
        { email },
        { unreadCnt: (room.unreadCnt += 1) },
        { new: true }
      );
      const AllMessage = await Message.find({ room: email });
      return AllMessage;
    } else {
      const AllMessage = await Message.find({ room: email });
      return AllMessage;
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllMessage = async ({ name, email }) => {
  const AllMessage = await Message.find({ room: email });
  return AllMessage;
};

const disconnectRoom = async (email) => {
  const newRoom = await Room.findOneAndUpdate(
    { email },
    { online: false },
    { new: true }
  );
  return getAllRoom();
};
module.exports = {
  createMessage,
  getAllMessage,
  disconnectRoom,
};
