import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Conversation,
  Search,
  ConversationList,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { io } from "socket.io-client";
import { Button } from "@material-tailwind/react";
import InputComponent from "../../components/Input/InputComponent";
import { notify } from "../../toolkits/help";
import { format } from "timeago.js";
import moment from "moment";
export default function ChatPage({ setShowChatBox, roomInfo }) {
  const socketRef = useRef();
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  // socketRef.current = io("http://localhost:3000");
  const socket = useMemo(() => io("http://localhost:3000"), [false]);

  //handle event
  const handelSendMess = (e) => {
    socket.emit("send-message-to-server", {
      text: message,
      sender: roomInfo.name,
      email: roomInfo.email,
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("send-message-to-client", (data) => {
      console.log(data, "mess");
      setListMessage(data.allMessage);
    });
    //join room
    socket.emit("join-room-chat", roomInfo);
    socket.emit("create-room", roomInfo);
    //lay danh sach tin nhan voi admin
    socket.emit("req-all-mess-by-user", { email: roomInfo.email });
    socket.on("res-all-message-by-user", (data) => {
      setListMessage(data);
      console.log(data);
    });
    // //người dùng kết nối
    socket.emit("user-connect", { name: roomInfo.name, email: roomInfo.email });
    // socket.on("user-join-room", (data) => {
    //   notify("success", data);
    // });
    return () => {
      socket.disconnect();
    };
  }, []);

  //handle event box chat

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setShowChatBox(false)}
        className="absolute top-0 z-50 right-0 px-3 py-2 rounded-none bg-colorPrimary text-white font-bold"
        color="blue"
      >
        X
      </button>
      <MainContainer
        responsive
        style={{
          height: "100%",
        }}
      >
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
            <ConversationHeader.Content
              // info="Active 10 mins ago"
              userName={roomInfo.name}
            />
          </ConversationHeader>
          <div className="">
            <form action="">
              <InputComponent title={"Họ và tên"} />
              <InputComponent title={"Địa chỉ email"} />
            </form>
          </div>
          <MessageList>
            <MessageSeparator content="" />
            {listMessage?.map((item, idx) => (
              <div className="">
                <Message
                  key={idx}
                  model={{
                    message: item.text,
                    sentTime: moment(item.createdAt).format("DD/MM/YYYY"),
                    sender: item.sender,
                    direction:
                      item.sender !== "admin" ? "outgoing" : "incoming",
                    position: "single",
                  }}
                />
                <p
                  className={`${
                    item.sender !== "admin" ? "text-right" : "text-left"
                  } text-xs`}
                >
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={message}
            onChange={(e) => setMessage(e)}
            onSend={handelSendMess}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
