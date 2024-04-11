import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import InputComponent from "../../Input/InputComponent";
import { createCategory } from "../../../redux/reducer/CategorySlice";
import { openDialog } from "../../../redux/reducer/DialogSlice";
import { createCatalogue } from "../../../redux/reducer/CatalogueSlice";

export default function FormCreateCatalogue() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const schema = yup
    .object({
      name: yup.string().required(validateMess.REQUIRE),
      slug: yup.string().required(validateMess.REQUIRE),
      pdf: yup.mixed().required(validateMess.REQUIRE),
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
      name: "",
      slug: "",
    },
  });
  //submit form

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(createCatalogue(formData));
  };
  //event set image
  const handleChangeFileMultiple = async (e) => {
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
          {errors.pdf?.message && (
            <p className="text-base text-red-400">{errors.pdf.message}</p>
          )}

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
