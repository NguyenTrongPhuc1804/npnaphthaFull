import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../toolkits/help";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import InputComponent from "../Input/InputComponent";
import ChatPage from "../../pages/ChatPage/ChatPage";

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
      <div className="fixed bottom-10 right-10 z-10 ">
        <Button
          onClick={() => setShowForm(true)}
          color="blue"
          className="rounded-full py-4"
        >
          <i class="fa-regular fa-comments text-3xl"></i>
        </Button>
      </div>
      <div
        className={` w-[300px] h-[500px] overflow-hidden fixed bottom-10 right-10 z-50 bg-white rounded-lg shadow-xl p-4 ${
          showForm ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-0 z-50 right-0 px-3 py-2 rounded-none bg-colorPrimary text-white font-bold"
          color="blue"
        >
          X
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className=" justify-center"
        >
          <p className="py-4">
            Vui lòng điền tên và email để nhắn tin trực tiếp với quản trị viên
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
          className={`w-[300px] h-[500px] fixed bottom-10 right-10 z-[1000] 
        
       `}
        >
          <ChatPage setShowChatBox={setShowChatBox} roomInfo={roomInfo} />
        </div>
      )}
    </div>
  );
}

export default ChatUserComponent;
