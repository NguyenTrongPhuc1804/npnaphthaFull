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
import { createProduct } from "../../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../../redux/reducer/CategorySlice";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../../../redux/reducer/BlogSlice";
export default function FormCreateBlog() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const schema = yup
    .object({
      title: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
      content: yup.string().required(validateMess.REQUIRE),
      slug: yup.string().required(validateMess.REQUIRE),
      image: yup.mixed().required(validateMess.REQUIRE),
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
      title: "",
      content: "",
      slug: "",
    },
  });
  //submit form

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(createBlog(formData));
  };
  //event upload image
  const handleChangeFileMultiple = async (e) => {
    const selectedFiles = e.target.files[0];
    setSelectedImage(selectedFiles);
    setValue("image", selectedFiles);
  };

  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
  }, []);
  return (
    <div className=" lg:px-5 px-2 py-2 overflow-y-scroll h-[400px]">
      <div className=" w-full  bg-white">
        <form
          className="grid  grid-cols-1 place-items-start gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 w-full">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Tiêu đề bài viết"
                  register={field}
                  messErr={errors.title?.message}
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

          <div className="mt-4 w-full">
            <ReactQuill
              theme="snow"
              onChange={(e) => setValue("content", e)}
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { align: "" },
                      { align: "center" },
                      { align: "right" },
                      { align: "justify" },
                    ],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                  ],
                },
                imageResize: {
                  parchment: Quill.import("parchment"),
                  modules: ["Resize", "DisplaySize"],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "align",
                "image",
                "video",
                "code-block",
              ]}
            />
            {errors.content?.message && (
              <p className="text-base text-red-400">
                {errors.content?.message}
              </p>
            )}
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
                        dispatch(openDialog(URL.createObjectURL(selectedImage)))
                      }
                      className="w-20 h-20 rounded-lg object-cover shadow-2xl cursor-pointer"
                      src={URL.createObjectURL(selectedImage)}
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
