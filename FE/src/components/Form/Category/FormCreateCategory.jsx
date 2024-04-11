import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";

import InputComponent from "../../Input/InputComponent";

import { createCategory } from "../../../redux/reducer/CategorySlice";

export default function FormCreateCategory() {
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
      name: "",
      slug: "",
    },
  });
  //submit form

  const onSubmit = (data) => {
    dispatch(createCategory(data));
  };

  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll max-h-full">
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
                  messErr={errors.name?.message}
                />
              )}
            />
          </div>
          {/* <div>
            <Button type="submit" className="w-full">
              Cập nhật
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
