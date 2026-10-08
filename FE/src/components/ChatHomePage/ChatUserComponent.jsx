import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../toolkits/help";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import InputComponent from "../Input/InputComponent";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { useRef, useState } from "react";

function ChatUserComponent() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [roomInfo, setRoomInfo] = useState();
  const socketRef = useRef();
  //validate form
  const schema = yup.object({
    name: yup.string().required(validateMess.REQUIRE),
    email: yup
      .string()
      .email(validateMess.INVALID_EMAIL)
      .required(validateMess.REQUIRE),
  });
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    setRoomInfo(data);
    setShowChatBox(true);
    setShowForm(false);
  };
  return (
    <div className="">
      <div className="fixed bottom-6 right-4 z-20">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          aria-label="Chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-card transition-transform hover:scale-105 hover:bg-brand-600 lg:h-14 lg:w-14"
        >
          <i className="fa-regular fa-comments text-lg lg:text-2xl"></i>
        </button>
      </div>
      <div
        className={`fixed bottom-6 right-4 z-50 h-[500px] w-[calc(100vw-2rem)] max-w-[320px] overflow-hidden rounded-2xl bg-white p-5 shadow-card-hover ring-1 ring-ink-line ${
          showForm ? "" : "hidden"
        }`}
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-ink-soft text-ink hover:bg-brand-50"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className=" justify-center"
        >
          <p className="py-4">
            Vui lòng điền họ tên và email để nhắn tin trực tiếp với quản trị
            viên{" "}
            <strong className="italic text-colorPrimary">
              Nếu như quản trị viên lâu trả lời bạn có thể liên hệ qua zalo để
              được trả lời nhanh nhất
            </strong>
          </p>
          <div className="mb-4 w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Họ và tên"
                  register={field}
                  messErr={errors.name?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Email"
                  register={field}
                  messErr={errors.email?.message}
                />
              )}
            />
          </div>
          <Button type="submit" size="md" className="mt-4 w-full" color="blue">
            Để lại tin nhắn
          </Button>
        </form>
      </div>
      {showChatBox && (
        <div
          className="fixed bottom-6 right-4 z-[1000] h-[500px] w-[300px] max-w-[calc(100vw-2rem)]"
        >
          <ChatPage setShowChatBox={setShowChatBox} roomInfo={roomInfo} />
        </div>
      )}
    </div>
  );
}

export default ChatUserComponent;
