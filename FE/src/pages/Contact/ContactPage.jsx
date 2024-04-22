import React, { useEffect } from "react";
import SubBanner from "../../components/Banner/SubBanner";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateMess } from "../../toolkits/help";
import { createContact } from "../../redux/reducer/ContactSlice";
export default function ContactPage() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

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
      message: yup.string().required(validateMess.REQUIRE),
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
      phone: "",
      email: "",
      message: "",
    },
  });
  //submit form

  const onSubmit = (data) => {
    dispatch(createContact(data));
    console.log(data, "data");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <SubBanner title={t("content.contact")} />
      <section className="contact section-padding">
        <div className="container">
          <div className="row lg:px-20 px-10">
            <div className="col-12">
              <h2 className="mb-4 text-3xl font-bold">
                {t("content.contact-form")}
              </h2>
            </div>
            <div className="col-lg-5 col-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="custom-form contact-form row"
                action="#"
                method="post"
                role="form"
              >
                <div className="col-lg-6 col-6">
                  <label htmlFor="contact-name" className="form-label">
                    {t("content.fullname")}
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                  {errors.name?.message && (
                    <p className="text-base text-red-400">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="col-lg-6 col-6">
                  <label htmlFor="contact-phone" className="form-label">
                    {t("content.phone")}
                  </label>
                  <input
                    {...register("phone")}
                    className="form-control"
                    placeholder="123-456-7890"
                  />
                  {errors.phone?.message && (
                    <p className="text-base text-red-400">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="contact-email" className="form-label">
                    {t("content.email")}
                  </label>
                  <input
                    {...register("email")}
                    pattern="[^ @]*@[^ @]*"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                  {errors.email?.message && (
                    <p className="text-base text-red-400">
                      {errors.email?.message}
                    </p>
                  )}
                  <label htmlFor="contact-message" className="form-label">
                    {t("content.message")}
                  </label>
                  <textarea
                    className="form-control"
                    rows={5}
                    {...register("message")}
                    placeholder="Your Message"
                    defaultValue={""}
                  />
                  {errors.message?.message && (
                    <p className="text-base text-red-400">
                      {errors.message?.message}
                    </p>
                  )}
                </div>
                <div className="col-lg-5 col-12 ms-auto">
                  <button type="submit" className="form-control">
                    {t("content.send")}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-5 col-12 mx-auto mt-lg-5 mt-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={require("../../assets/images/image-nph.jpg")}
                alt=""
              />
            </div>
            <div className="col-12">
              <h4 className="mt-5 mb-4">
                Đường số 1, Phường Rạch Rừa, Thành phố Vũng Tầu, Bà Rịa - Vũng
                Tàu, Việt Nam
              </h4>
              <div className="google-map pt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1062341072443!2d107.11225937508347!3d10.403390189723584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31757187c9838bd1%3A0xd1a9bd3c97318714!2zQ8O0bmcgVHkgVE5ISCBT4bqjbiBYdeG6pXQgdsOgIFRoxrDGoW5nIE3huqFpIE5QIC0gTkFQSFRIQQ!5e1!3m2!1svi!2s!4v1712996382242!5m2!1svi!2s"
                  width="100%"
                  height={300}
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="col-12">
              <h4 className="mt-5 mb-4">
                49 Đ số 14, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam
              </h4>
              <div className="google-map pt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d741.2911746017975!2d106.69362869516156!3d10.72690301764311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fb8d596b569%3A0x6f4f2b173f93ca66!2zNDkgxJAgc-G7kSAxNCwgVMOibiBIxrBuZywgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1712996789065!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  loading="lazy"
                ></iframe>
                s
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
