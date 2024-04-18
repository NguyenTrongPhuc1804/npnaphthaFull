import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import { openDialog } from "../../../redux/reducer/DialogSlice";
import InputComponent from "../../Input/InputComponent";

import { updateBanner } from "../../../redux/reducer/BannerSlice";
import { updatePartner } from "../../../redux/reducer/PartnerSlice";
export default function FormUpdatePartner({ data }) {
  const { _id } = data;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const schema = yup
    .object({
      name: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
    })
    .required();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
    },
  });
  //submit form

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(updatePartner({ id: _id, payload: formData }));
  };
  //event upload image
  const handleChangeFileMultiple = async (e) => {
    const selectedFiles = e.target.files[0];
    setSelectedImage(selectedFiles);
    setValue("image", selectedFiles);
  };

  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
    setSelectedImage(data?.image);
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll h-[500px]">
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
                  title="Tên đối tác"
                  register={field}
                  messErr={errors.name?.message}
                />
              )}
            />
          </div>

          <div className="w-fit">
            <p>Chọn ảnh review</p>
            <label className="block">
              <span className="sr-only">Choose profile photo </span>
              <input
                accept="image/*"
                onChange={handleChangeFileMultiple}
                type="file"
                className="block w-full text-sm text-gray-500
                  file:me-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  file:disabled:opacity-50 file:disabled:pointer-events-none
                  dark:file:bg-blue-500
                  dark:hover:file:bg-blue-400
                "
              />
            </label>
            <div className="mt-4">
              <div className="flex mt-4">
                <div className="mr-2">
                  {selectedImage && (
                    <img
                      onClick={() =>
                        dispatch(
                          openDialog(
                            typeof selectedImage !== "string"
                              ? URL.createObjectURL(selectedImage)
                              : selectedImage
                          )
                        )
                      }
                      className="w-20 h-20 rounded-lg object-cover shadow-2xl cursor-pointer"
                      src={
                        typeof selectedImage !== "string"
                          ? URL.createObjectURL(selectedImage)
                          : selectedImage
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            {errors.image?.message && (
              <p className="text-base text-red-400">{errors.image.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
