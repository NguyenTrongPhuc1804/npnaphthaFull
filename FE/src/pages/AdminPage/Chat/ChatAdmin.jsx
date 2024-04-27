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
import { notify } from "../../../toolkits/help";
import moment from "moment/moment";
import { format } from "timeago.js";
import { notifySonner } from "../../../toolkits/notiMessage";
export default function ChatAdmin() {
  const socketRef = useRef();
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [emailUser, setEmailUser] = useState("");
  const [nameUSer, setNameUSer] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  //handle event
  const socket = useMemo(() => io(import.meta.env.VITE_URL_SOCKET), [false]);
  const handelSendMess = (e) => {
    socket.emit("send-message-to-server", {
      text: message,
      sender: "admin",
      email: emailUser,
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("send-message-to-client", (data) => {
      setListMessage(data.allMessage);
      // notify("success", data.text);
    });

    //tham gia phong

    //người dùng kết nối
    socket.on("user-join-room", (data) => {
      console.log(data, "user join room");
      notify("message", data);
    });
    //lay danh sach phong
    socket.emit("get-all-room-to-server");
    socket.on("get-all-room-to-client", (data) => {
      setListRoom(data);
      // setListMessage(allMessage);
    });
    //lay danh sach tin nhan voi user
    socket.on("res-all-message-by-user", (data) => {
      setListMessage(data);
    });
    //sự kiện online user
    socket.on("get-new-all-room", (data) => {
      setListRoom(data);
    });
    socket.on("send-mess-noti", ({ text, email, sender }) => {
      notify("message", `${sender}:${text}`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {}, [listRoom]);

  //handle event box chat
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(
    (item) => {
      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    },
    [sidebarVisible, setSidebarVisible]
  );
  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });

      setConversationContentStyle({
        display: "flex",
      });

      setConversationAvatarStyle({
        marginRight: "1em",
      });

      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);
  return (
    <div className="py-2" style={{ position: "relative", height: "600px" }}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={sidebarStyle}>
          <ConversationList>
            {listRoom?.length === 0 ? (
              <div className="text-center mt-4">
                <p>Không có tin nhắn !!</p>
              </div>
            ) : (
              listRoom?.map((item, idx) => (
                <Conversation
                  active={emailUser === item.email ? true : false}
                  key={idx}
                  unreadCnt={item.unreadCnt}
                  onClick={() => {
                    handleConversationClick();
                    socket.emit("leaveRoom", emailUser);
                    //tham gia phong
                    socket.emit("join-room-chat", {
                      name: "admin",
                      email: item.email,
                    });
                    socket.emit("user-connect", {
                      name: "admin",
                      email: userInfo.email,
                    });
                    //lay danh sach tin nhan trong phong
                    socket.emit("req-all-mess-by-user", { email: item.email });
                    //seen tin nhan
                    socket.emit("req-seen-mess", { email: item.email });
                    setEmailUser(item.email);
                    setNameUSer(item.name);
                  }}
                >
                  <Avatar
                    src={
                      "https://plus.unsplash.com/premium_photo-1682309761340-3f8b1cbaa655?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    name={item.name}
                    status={item.online ? "available" : "dnd"}
                    style={conversationAvatarStyle}
                  />
                  <Conversation.Content
                    name={item.name}
                    lastSenderName={item.name}
                    info={item.email}
                    style={conversationContentStyle}
                  />
                </Conversation>
              ))
            )}
          </ConversationList>
        </Sidebar>
        <ChatContainer style={chatContainerStyle}>
          <ConversationHeader>
            <ConversationHeader.Back onClick={handleBackClick} />
            <Avatar
              src={
                "https://plus.unsplash.com/premium_photo-1682309761340-3f8b1cbaa655?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              name="Zoe"
            />
            <ConversationHeader.Content
              userName={nameUSer}
              // info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              {emailUser && (
                <Button
                  color="blue"
                  onClick={() => {
                    socket.emit("delete-room", emailUser);
                    setListMessage([]);
                  }}
                >
                  Xóa tin nhắn
                </Button>
              )}
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            <MessageSeparator content="" />

            {listMessage?.map((item, idx) => (
              <div key={idx} className="">
                <Message
                  model={{
                    message: item.text,
                    sentTime: moment(item.createdAt).format("DD/MM/YYYY"),
                    sender: item.sender,
                    direction:
                      item.sender === "admin" ? "outgoing" : "incoming",
                    position: "single",
                  }}
                />
                <p
                  className={`${
                    item.sender == "admin" ? "text-right" : "text-left"
                  } text-xs`}
                >
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onChange={(e) => setMessage(e)}
            value={message}
            onSend={handelSendMess}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
