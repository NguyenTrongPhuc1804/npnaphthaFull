import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubBanner from "../../components/Banner/SubBanner";
import { validateMess } from "../../toolkits/help";
import { createContact } from "../../redux/reducer/ContactSlice";

const DESCRIPTION =
  "Liên hệ Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA để tư vấn sản xuất, gia công cao su kỹ thuật và các sản phẩm cầu đường, cầu cảng.";

const MAP_FACTORY =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1062341072443!2d107.11225937508347!3d10.403390189723584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31757187c9838bd1%3A0xd1a9bd3c97318714!2zQ8O0bmcgVHkgVE5ISCBT4bqjbiBYdeG6pXQgdsOgIFRoxrDGoW5nIE3huqFpIE5QIC0gTkFQSFRIQQ!5e1!3m2!1svi!2s!4v1712996382242!5m2!1svi!2s";
const MAP_OFFICE =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d741.2911746017975!2d106.69362869516156!3d10.72690301764311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fb8d596b569%3A0x6f4f2b173f93ca66!2zNDkgxJAgc-G7kSAxNCwgVMOibiBIxrBuZywgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1712996789065!5m2!1svi!2s";

const schema = yup
  .object({
    email: yup
      .string()
      .email(validateMess.INVALID_EMAIL)
      .required(validateMess.REQUIRE),
    name: yup
      .string()
      .required(validateMess.REQUIRE)
      .test("len", validateMess.LEN, (val) => (val || "").length >= 5),
    phone: yup
      .string()
      .required(validateMess.REQUIRE)
      .matches(/^[0-9]+$/, "Phải là số 0-9")
      .test("len", validateMess.INVALID_PHONE, (val) => (val || "").length >= 9),
    message: yup.string().required(validateMess.REQUIRE),
  })
  .required();

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await dispatch(createContact(data));
      if (res?.payload) reset();
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const info = [
    { icon: "fa-location-dot", text: t("content.Office") },
    { icon: "fa-industry", text: t("content.Factory") },
    { icon: "fa-phone", text: t("content.Phone") },
    {
      icon: "fa-envelope",
      text: "trucphong@npnaphtha.com.vn - trungnghia@npnaphtha.com.vn",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Liên hệ - NP NAPHTHA</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}contact`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta name="description" content={DESCRIPTION} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}contact`}
        />
        <meta property="og:title" content="Liên hệ - NP NAPHTHA" />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha,Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta property="og:description" content={DESCRIPTION} />
      </Helmet>

      <SubBanner
        title={t("content.contact")}
        subTitle={t("content.contact-desc")}
        bg={`${import.meta.env.VITE_URL_DOMAIN}contact.png`}
      />

      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-3xl border border-ink-line bg-white p-6 shadow-card sm:p-8 lg:col-span-7"
          >
            <h2 className="text-2xl font-bold text-ink">
              {t("content.contact-form")}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contact-name"
                label={t("content.fullname")}
                error={errors.name?.message}
              >
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className="field-input"
                  {...register("name")}
                />
              </Field>
              <Field
                id="contact-phone"
                label={t("content.phone")}
                error={errors.phone?.message}
              >
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  className="field-input"
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field
              id="contact-email"
              label={t("content.email")}
              error={errors.email?.message}
            >
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="field-input"
                {...register("email")}
              />
            </Field>

            <Field
              id="contact-message"
              label={t("content.message")}
              error={errors.message?.message}
            >
              <textarea
                id="contact-message"
                rows={5}
                aria-invalid={!!errors.message}
                className="field-input resize-y"
                {...register("message")}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? t("content.sending") : t("content.send")}
              <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true" />
            </button>
          </form>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-brand-950 p-6 text-slate-300 sm:p-8">
              <h2 className="text-xl font-bold text-white">
                {t("content.contact-info")}
              </h2>
              <ul className="mt-6 space-y-5 text-sm leading-6">
                {info.map((row) => (
                  <li key={row.icon} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                      <i className={`fa-solid ${row.icon}`} aria-hidden="true" />
                    </span>
                    <span className="pt-2">{row.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="wrap mt-12 grid gap-8 lg:grid-cols-2">
          {[
            {
              title:
                "Đường số 1, Phường Rạch Rừa, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu, Việt Nam",
              src: MAP_FACTORY,
            },
            {
              title:
                "49 Đ số 14, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
              src: MAP_OFFICE,
            },
          ].map((map) => (
            <div key={map.src}>
              <h3 className="mb-3 flex items-start gap-2 text-base font-semibold text-ink">
                <i
                  className="fa-solid fa-location-dot mt-1 text-brand-500"
                  aria-hidden="true"
                />
                {map.title}
              </h3>
              <div className="overflow-hidden rounded-2xl border border-ink-line">
                <iframe
                  title={map.title}
                  src={map.src}
                  width="100%"
                  height={320}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
