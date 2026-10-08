import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { PlusIcon } from "@heroicons/react/24/solid";
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
const MAX_IMAGE = 5;
export default function FormUpdateProduct({ data, listAllCategory }) {
  const { _id } = data;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState([]);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const schema = yup
    .object({
      name: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
      description: yup.string().required(validateMess.REQUIRE),
      type: yup.string().required(validateMess.REQUIRE),
      slug: yup
        .string()
        .matches(/^[^\s]*$/, "Không được chứa khoảng trắng")
        .required(validateMess.REQUIRE),
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
    const listImage = data.list_image || [];
    // ảnh cũ còn giữ lại (URL) và ảnh mới chọn (File)
    const keepImages = listImage.filter((item) => typeof item === "string");
    const newFiles = listImage.filter((item) => typeof item !== "string");

    if (keepImages.length + newFiles.length === 0) {
      notify("error", "Sản phẩm phải có ít nhất 1 ảnh");
      return;
    }
    if (keepImages.length + newFiles.length > MAX_IMAGE) {
      notify("error", `Chỉ được upload tối đa ${MAX_IMAGE} ảnh`);
      return;
    }

    const formData = new FormData();
    for (let key in data) {
      if (key === "list_image") continue;
      formData.append(key, data[key]);
    }
    formData.append("keep_images", JSON.stringify(keepImages));
    newFiles.forEach((file) => formData.append("list_image", file));
    dispatch(updateProduct({ id: _id, payload: formData }));
  };
  //event upload image
  const handleChangeFileMultiple = async (e) => {
    const files = Array.from(e.target.files || []);
    // cho phép chọn lại cùng một file
    e.target.value = "";
    const remaining = MAX_IMAGE - selectedImage.length;
    if (remaining <= 0) {
      notify("error", `Chỉ được upload tối đa ${MAX_IMAGE} ảnh`);
      return;
    }
    if (files.length > remaining) {
      notify("warning", `Chỉ được upload tối đa ${MAX_IMAGE} ảnh`);
    }
    setSelectedImage([...selectedImage, ...files.slice(0, remaining)]);
  };
  const removeImage = async (index) => {
    setSelectedImage([...selectedImage].filter((item, idx) => idx !== index));
  };
  useEffect(() => {
    setValue("list_image", selectedImage);
  }, [selectedImage]);
  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
    setSelectedImage(data.thumb_image || []);
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
                  example={"Sản phẩm 1"}
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
                  example={"san-pham-1"}
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
                "image",
                "video",
                "code-block",
                "aligns",
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
            <input
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleChangeFileMultiple}
              type="file"
              className="hidden"
            />
            <div className="mt-4">
              <div className="flex flex-wrap gap-y-2 mt-4">
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
                    <Button
                      onClick={() => removeImage(idx)}
                      color="red"
                      className="px-2 py-1 w-full text-[10px]"
                    >
                      X
                    </Button>
                  </div>
                ))}
                {selectedImage.length < MAX_IMAGE && (
                  <button
                    type="button"
                    title="Thêm ảnh mới"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 text-gray-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <PlusIcon className="h-8 w-8" />
                  </button>
                )}
              </div>
              {selectedImage.length >= MAX_IMAGE && (
                <p className="text-red-400 mt-2">
                  Đã đạt tối đa {MAX_IMAGE} ảnh, hãy xoá bớt ảnh để thêm ảnh mới
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
