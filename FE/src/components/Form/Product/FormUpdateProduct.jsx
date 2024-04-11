import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import { openDialog } from "../../../redux/reducer/DialogSlice";
import InputComponent from "../../../components/Input/InputComponent";
import {
  createProduct,
  updateProduct,
} from "../../../redux/reducer/ProductSlice";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);
export default function FormUpdateProduct({ data, listAllCategory }) {
  const { _id } = data;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState([]);
  const editorRef = useRef(null);

  const schema = yup
    .object({
      name: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
      description: yup.string().required(validateMess.REQUIRE),
      type: yup.string().required(validateMess.REQUIRE),
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
      description: data.description,
      type: data.type,
      slug: data.slug,
    },
  });
  //submit form

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
      if (key === "list_image") {
        for (let i = 0; i < data["list_image"]?.length; i++) {
          formData.append("list_image", data["list_image"][i]);
        }
      }
    }
    dispatch(updateProduct({ id: _id, payload: formData }));
  };
  //event upload image
  const handleChangeFileMultiple = async (e) => {
    if (selectedImage.length > 4) {
      return;
    }
    const selectedFiles = e.target.files[0];
    setSelectedImage([
      ...selectedImage.filter((item) => typeof item !== "string"),
      selectedFiles,
    ]);
  };
  const removeImage = async (index) => {
    setSelectedImage([...selectedImage].filter((item, idx) => idx !== index));
  };
  useEffect(() => {
    setValue("list_image", selectedImage);
  }, [selectedImage]);
  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
    setSelectedImage(data.thumb_image);
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
              name="name"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Tên sản phẩm"
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
          <div className="mt-4 w-full">
            <ReactQuill
              theme="snow"
              defaultValue={data.description}
              onChange={(e) => setValue("description", e)}
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
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
                "image",
                "video",
                "code-block",
              ]}
            />
            {errors.description?.message && (
              <p className="text-base text-red-400">
                {errors.description?.message}
              </p>
            )}
          </div>

          {/* <div>
            <Button type="submit" className="w-full">
              Cập nhật
            </Button>
          </div> */}

          <div className="w-fit">
            <p>Chọn ảnh review sản phẩm</p>
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
                {selectedImage?.map((item, idx) => (
                  <div key={idx} className="mr-2">
                    <img
                      key={idx}
                      onClick={() =>
                        dispatch(
                          openDialog(
                            typeof item !== "string"
                              ? URL.createObjectURL(item)
                              : item
                          )
                        )
                      }
                      className="w-20 h-20 rounded-lg object-cover shadow-2xl cursor-pointer"
                      src={
                        typeof item !== "string"
                          ? URL.createObjectURL(item)
                          : item
                      }
                      alt=""
                    />
                    {typeof item !== "string" && (
                      <Button
                        onClick={() => removeImage(idx)}
                        color="red"
                        className="px-2 py-1 w-full text-[10px]"
                      >
                        X
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {selectedImage.length > 4 && (
                <p className="text-red-400 mt-2">
                  Chỉ được upload tối đa 5 ảnh
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 w-full mt-4">
            <div className="w-full">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Loại sản phẩm">
                    {listAllCategory?.data?.map((item, idx) => (
                      <Option key={idx} value={item.slug}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.type?.message && (
                <p className="text-base text-red-400">{errors.type?.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
