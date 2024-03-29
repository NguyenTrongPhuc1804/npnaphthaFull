import { Button, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getAllUser,
  getDataillUser,
  updateUser,
  userSlice,
} from "../../../redux/reducer/UserSlice";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { notify, validateMess } from "../../../toolkits/help";
import InputComponent from "../../Input/InputComponent";
import { openModal, setCallBack } from "../../../redux/reducer/ModalSlice";
import { openDialog } from "../../../redux/reducer/DialogSlice";
export default function FormCreateUser() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSlice);
  const [selectedImage, setSelectedImage] = useState(null);

  //validate form
  const schema = yup
    .object({
      email: yup
        .string()
        .email(validateMess.INVALID_EMAIL)
        .required(validateMess.REQUIRE),
      name: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
      phone: yup
        .string()
        .test("len", validateMess.INVALID_PHONE, (val) => val.length >= 9)
        .matches(/^[0-9]+$/, "Phải là số 0-9")
        .required(validateMess.REQUIRE),
      password: yup
        .string()
        .test("len", validateMess.LEN, (val) => val.length >= 5)
        .required(validateMess.REQUIRE),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không đúng")
        .required(validateMess.REQUIRE),
      address: yup.string().required(validateMess.REQUIRE),
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
  });
  //submit form
  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(createUser(formData)).then((value) => {
      if (value.payload) {
        dispatch(getAllUser());
      }
    });
  };
  //event upload image
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setValue("avatar", selectedFile);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  //open image on dialog
  const handleSetImageDialog = () => {
    dispatch(openDialog(selectedImage));
  };
  useEffect(() => {
    dispatch(setCallBack({ callBack: handleSubmit(onSubmit) }));
  }, []);
  return (
    <div class=" px-5 py-2 overflow-y-scroll h-[400px]">
      <div class=" w-full  bg-white">
        <form
          className="grid lg:grid-cols-2 grid-cols-1 place-items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Tên người dùng"
                  register={field}
                  messErr={errors.name?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Số điện thoại"
                  register={field}
                  messErr={errors.phone?.message}
                  isNumber
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Email"
                  register={field}
                  messErr={errors.email?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Địa chỉ"
                  register={field}
                  messErr={errors.address?.message}
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Mật khẩu"
                  register={field}
                  messErr={errors.password?.message}
                  isPassword
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Nhập lại mật khẩu"
                  register={field}
                  messErr={errors.confirmPassword?.message}
                  isPassword
                />
              )}
            />
          </div>
          <div className="mb-4 w-full mt-4">
            <div className="w-full">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Loại tài khoản">
                    <Option value="ADMIN">Quản trị</Option>
                    <Option value="CLIENT">Người dùng</Option>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative ">
              <label
                title="Click to upload"
                htmlFor="button2"
                className="cursor-pointer flex items-center gap-4 px-3 py-3 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
              >
                <div className="w-max relative">
                  <img
                    className="w-12 "
                    src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                    alt="file upload icon"
                    width={512}
                    height={512}
                  />
                </div>
                <div className="relative">
                  <span className="block lg:text-base text-xs font-semibold relative text-blue-900 group-hover:text-blue-500">
                    Tải ảnh đại diện
                  </span>
                  <span className="mt-0.5 block text-sm text-gray-500">
                    Max 2 MB
                  </span>
                </div>
              </label>
              <input
                onChange={handleImageChange}
                hidden
                type="file"
                name="button2"
                id="button2"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
          <div className="w-full flex justify-center ">
            {selectedImage && (
              <div
                onClick={handleSetImageDialog}
                className="p-2 bg-white shadow-xl rounded-full cursor-pointer hover:shadow-2xl"
              >
                <img
                  className="h-[100px] w-[100px] rounded-full object-cover"
                  src={selectedImage}
                  alt=""
                />
              </div>
            )}
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
