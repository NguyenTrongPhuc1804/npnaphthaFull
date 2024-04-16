import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import InputComponent from "../../Input/InputComponent";

import { updateCategory } from "../../../redux/reducer/CategorySlice";
import { Textarea } from "@material-tailwind/react";
import { updateContact } from "../../../redux/reducer/ContactSlice";

export default function FormUpdateContact({ data }) {
  console.log(data.message, "mess");
  const { _id } = data;
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required(validateMess.REQUIRE),
      slug: yup.string().required(validateMess.REQUIRE),
    })
    .required();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      messages: data.messages,
    },
  });
  //submit form

  const onSubmit = (data) => {
    dispatch(updateCategory({ id: _id, payload: data }));
  };

  useEffect(() => {
    dispatch(updateContact({ id: _id, isSeen: 0 }));
    dispatch(setCallBack({ callBack: true }));
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll h-full">
      <div className=" w-full  bg-white">
        <form
          className="grid  grid-cols-1 place-items-start gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 w-full">
            <p className="font-semibold">Tên người liên hệ</p>
            <p>{data.name}</p>
          </div>
          <div className="mb-4 w-full">
            <p className="font-semibold">Số điện thoại</p>
            <p>{data.phone}</p>
          </div>
          <div className="mb-4 w-full">
            <p className="font-semibold">Email</p>
            <p>{data.email}</p>
          </div>
          <div className="mb-4 w-full">
            <p className="font-semibold">Lời nhắn</p>
            <p>{data.message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
