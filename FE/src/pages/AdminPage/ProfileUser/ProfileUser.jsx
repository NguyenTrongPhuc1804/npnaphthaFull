import { Button, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { validateMess } from "../../../toolkits/help";
import InputComponent from "../../../components/Input/InputComponent";
import { getDataillUser, updateUser } from "../../../redux/reducer/UserSlice";
export default function ProfileUser() {
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
    console.log(data, "data");
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(updateUser({ id: userInfo._id, payload: formData }));
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

  useEffect(() => {
    dispatch(getDataillUser({ user_id: localStorage.getItem("user_id") })).then(
      (value) => {
        setValue("name", value.payload.name);
        setValue("email", value.payload.email);
        setValue("phone", value.payload.phone);
        setValue("address", value.payload.address);
        // setValue("avatar", value.payload.avatar);
      }
    );
  }, []);
  return (
    <div class="px-5 py-5">
      <p className="text-4xl mb-5">Thông tin và dữ liệu người dùng </p>
      <div class=" w-full max-w-[550px] bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="mb-5">
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
          <div class="mb-5">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputComponent
                  title="Số điện thoại"
                  register={field}
                  messErr={errors.phone?.message}
                />
              )}
            />
          </div>
          <div class="mb-5">
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
          <div class="mb-5">
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

          <div className="mb-5">
            <div className="relative">
              <label
                title="Click to upload"
                htmlFor="button2"
                className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
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
                  <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
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
            <div className="w-full flex justify-center mt-5">
              {selectedImage && (
                <div className="p-2 bg-white shadow-2xl rounded-full">
                  <img
                    className="h-[100px] w-[100px] rounded-full object-cover"
                    src={selectedImage}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
