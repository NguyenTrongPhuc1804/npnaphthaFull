import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import InputComponent from "../../Input/InputComponent";

import { updateCategory } from "../../../redux/reducer/CategorySlice";

export default function FormUpdateCategory({ data }) {
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
      slug: data.slug,
    },
  });
  //submit form

  const onSubmit = (data) => {
    dispatch(updateCategory({ id: _id, payload: data }));
  };

  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll h-full">
      <div className=" w-full  bg-white">
        <form
          className="grid  grid-cols-1 place-items-start gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Tên danh mục"
                  register={field}
                  messErr={errors.name?.message}
                />
              )}
            />
          </div>

          <div className="mb-4 w-full">
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Đường dẫn tĩnh"
                  register={field}
                  messErr={errors.slug?.message}
                />
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
