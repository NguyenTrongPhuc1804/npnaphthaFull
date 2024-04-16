import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";

import { updateVideoBanner } from "../../../redux/reducer/VideoBannerSlice";
export default function FormUpdateVideoBanner({ data }) {
  const { _id } = data;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const schema = yup
    .object({
      video: yup
        .mixed()
        .required("Vui lòng tải lên một file")
        .test(
          "fileSize",
          "File quá lớn ,video phải nhỏ hơn 20mb ",
          (value) => value && value.size <= 20971520
        ),
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
    defaultValues: {},
  });
  //submit form

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(updateVideoBanner({ id: _id, payload: formData }));
  };
  //event upload image
  const handleChangeFileMultiple = async (e) => {
    const selectedFiles = e.target.files[0];
    setSelectedImage(selectedFiles);
    setValue("video", selectedFiles);
  };
  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
  }, [selectedImage]);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll h-[500px]">
      <div className=" w-full  bg-white">
        <form
          className="grid  grid-cols-1 place-items-start gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-fit">
            <p>Chọn video banner ,nên chọn video dưới 30 giây</p>
            <label className="block">
              <span className="sr-only">Choose profile photo </span>
              <input
                accept="video/*"
                max="5000000"
                required
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
              {errors.video?.message && (
                <p className="text-base text-red-400">
                  {errors.video?.message}
                </p>
              )}
            </label>
            {/* <div className="mt-4">
              <div className="flex mt-4">
                <div className="mr-2">
                  {selectedImage && (
                    <video autoPlay loop muted controls>
                      <source
                        className="w-20 h-20 rounded-lg object-cover shadow-2xl cursor-pointer"
                        src={URL.createObjectURL(selectedImage)}
                        alt=""
                      />
                    </video>
                  )}
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="video-wrap z-50">
            <video autoPlay loop muted poster>
              <source src={data.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}
        </form>
      </div>
    </div>
  );
}
