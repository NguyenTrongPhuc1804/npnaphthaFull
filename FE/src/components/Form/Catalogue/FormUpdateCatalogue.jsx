import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import InputComponent from "../../Input/InputComponent";

import {
  updateCatalogue,
  updateCatalogueImage,
} from "../../../redux/reducer/CatalogueSlice";

export default function FormUpdateCatalogue({ data }) {
  const { _id } = data;

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(updateCatalogue({ id: _id, payload: formData }));
  };
  const handleChangeFile = async (e) => {
    const selectedFiles = e.target.files[0];
    setSelectedImage(selectedFiles);
    setValue("image", selectedFiles);
  };
  const handleChangeFilePdf = (e) => {
    const selectedFiles = e.target.files[0];
    setValue("pdf", selectedFiles);
  };
  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
    setSelectedImage(data?.image);
    setSelectedFile(data?.url);
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll max-h-[500px]">
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
          <div className="w-fit">
            <p>Chọn ảnh review</p>
            <label className="block">
              <span className="sr-only">Choose profile photo </span>
              <input
                accept="image/*"
                onChange={handleChangeFile}
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
          </div>
          <div className="w-fit mt-4">
            <p>Chọn file pdf</p>
            <label className="block">
              <span className="sr-only">Choose profile pdf</span>
              <input
                accept="application/pdf"
                onChange={handleChangeFilePdf}
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
          </div>
          <div className="w-full hidden lg:block h-[500px]">
            <iframe
              width={"100%"}
              title="PDF Viewer"
              src={selectedFile}
              className="w-1/2  h-full"
            />
          </div>
          <a href={selectedFile} className="text-red-600" target="_blank">
            Link pdf
          </a>
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
