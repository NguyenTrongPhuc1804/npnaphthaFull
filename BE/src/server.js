const express = require("express");
const { default: mongoose } = require("mongoose");
const rootRouter = require("./routers");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const {
  getAllRoom,
  updateSeenRoom,
  createRoom,
  deleteRoom,
} = require("./services/ChatRealtime/RoomChat");
const {
  getAllMessage,
  disconnectRoom,
  createMessage,
} = require("./services/ChatRealtime/MessageChat");

require("dotenv").config();
const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

const publicPathDirectory = path.join(__dirname, "../public");
app.use("/api/v1/public", express.static(publicPathDirectory));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.DOMAIN_CORS,
      "https://npnaphtha-web.vercel.app",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//chat realtime
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  //user connect and noti to admin
  console.log("client connected" + socket.id);
  socket.on("get-all-room-to-server", async () => {
    const allRoom = await getAllRoom();
    socket.emit("get-all-room-to-client", allRoom);
  });

  //Tham gia phong
  socket.on("join-room-chat", async ({ name, email }) => {
    socket.join(email);
    socket.on("user-connect", ({ name, email }) => {
      socket.broadcast.emit("user-join-room", `người dùng ${name} đang online`);
    });
    //tao phong user client
    socket.on("create-room", async (data) => {
      const newListRoom = await createRoom({ name, email });
      //lay danh sach phong
      io.emit("get-new-all-room", newListRoom);
    });
    //lay danh sach tin nhan
    socket.on("req-all-mess-by-user", async (data) => {
      const allMessage = await getAllMessage({ email: data.email });
      io.to(email).emit("res-all-message-by-user", allMessage);
    });
    //xu ly tin nhan da xem
    socket.on("req-seen-mess", async ({ email }) => {
      const allRoom = await updateSeenRoom(email);
      socket.emit("get-all-room-to-client", allRoom);
    });
    //leave room
    socket.on("leaveRoom", function (roomName) {
      // Sử dụng phương thức leave để ngắt kết nối với phòng
      socket.leave(roomName);
    });
    //xoa phong chat
    socket.on("delete-room", async (data) => {
      const newListRoom = await deleteRoom(data);
      socket.emit("get-all-room-to-client", newListRoom);
    });
    //ngat ket noi phong chat
    socket.on("disconnect", async () => {
      console.log("client disconnect");
      const listRoomDisconnect = await disconnectRoom(email);
      io.emit("get-new-all-room", listRoomDisconnect);
    });
  });

  //xử lý gửi nhận tin nhắn
  socket.on("send-message-to-server", async ({ text, sender, email }) => {
    const allMessage = await createMessage({ text, sender, email });
    io.to(email).emit("send-message-to-client", { allMessage, text });

    sender !== "admin" && io.emit("send-mess-noti", { text, email, sender });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB;
});
