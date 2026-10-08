import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import SubBanner from "../../components/Banner/SubBanner";

const DESCRIPTION =
  "Giới thiệu Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA: sản xuất, gia công cao su kỹ thuật cho vendor tập đoàn lớn.";

const SCALE = [
  {
    icon: "fa-coins",
    title: "content.Investment-capital",
    body: "content.Investment-content",
  },
  {
    icon: "fa-industry",
    title: "content.Factory-area",
    body: "content.Factory-content",
  },
  {
    icon: "fa-users",
    title: "content.Number-of-employees",
    body: "content.Number-content",
  },
];

const MISSION = [
  {
    icon: "fa-handshake",
    title: "content.FOR-CUSTOMERS",
    body: "content.FOR-CUSTOMERS-BODY",
  },
  {
    icon: "fa-user-group",
    title: "content.FOR-EMPLOYEES",
    body: "content.FOR-EMPLOYEES-BODY",
  },
  {
    icon: "fa-earth-asia",
    title: "content.FOR-SOCIETY",
    body: "content.FOR-SOCIETY-BODY",
  },
];

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Về chúng tôi - NP NAPHTHA</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}about`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}about`}
        />
        <meta property="og:title" content="Về chúng tôi - NP NAPHTHA" />
        <meta
          name="keywords"
          content="Về chúng tôi NP NAPHTHA, Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="description" content={DESCRIPTION} />
      </Helmet>

      <SubBanner
        title={t("content.about")}
        subTitle={t("content.about-desc")}
        bg={`${import.meta.env.VITE_URL_DOMAIN}about.png`}
      />

      {/* Giới thiệu */}
      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">{t("content.INTRODUCE")}</span>
            <h2 className="section-title">{t("content.title-intro")}</h2>
            <p className="mt-5 leading-7 text-ink-muted">
              {t("content.body-intro1")}
            </p>
            <p className="mt-4 leading-7 text-ink-muted">
              {t("content.body-intro2")}
            </p>
          </div>
          <img
            src={`${import.meta.env.VITE_URL_DOMAIN}image-nph.jpg`}
            alt={t("content.title-intro")}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card-hover"
          />
        </div>
      </section>

      {/* Quy mô & đặc điểm sản phẩm */}
      <section className="section bg-ink-soft">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{t("content.company-scale-title")}</span>
            <h2 className="section-title">{t("content.COMPANY-SCALE")}</h2>
            <p className="section-desc mx-auto">
              {t("content.scale-sub-title")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SCALE.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-line bg-white p-6 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-lg text-white">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {t(item.title)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {t(item.body)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-ink-line bg-white p-6 shadow-card sm:p-8">
            <h3 className="text-lg font-bold text-ink">
              {t("content.feature-product")}
            </h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {["product-1", "product-2", "product-3"].map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-ink-muted">
                  <i
                    className="fa-solid fa-circle-check mt-0.5 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>{t(`content.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Định hướng phát triển */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <img
          src={`${import.meta.env.VITE_URL_DOMAIN}about.png`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-900/90 to-brand-800/70" />
        <div className="wrap section">
          <h2 className="section-title !text-white">
            {t("content.ORIENTED-DEVELOPMENT")}
          </h2>
          <div className="mt-8 grid gap-8 text-brand-100 lg:grid-cols-2">
            <p className="leading-7">{t("content.ORIENTED-DEVELOPMENT-BODY1")}</p>
            <p className="leading-7">{t("content.ORIENTED-DEVELOPMENT-BODY2")}</p>
          </div>
        </div>
      </section>

      {/* Sứ mệnh & tầm nhìn */}
      <section className="section">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="section-title">{t("content.MISSION")}</h2>
              <div className="mt-8 space-y-4">
                {MISSION.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-ink-line bg-white p-5 shadow-card"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{t(item.title)}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-muted">
                        {t(item.body)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="section-title">{t("content.VISION")}</h2>
                <p className="mt-4 leading-7 text-ink-muted">
                  {t("content.VISION-BODY")}
                </p>
              </div>
              <div className="rounded-2xl bg-brand-50 p-6">
                <h3 className="text-lg font-bold text-brand-800">
                  {t("content.IMPROVEMENT-EFFORT")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-900/80">
                  {t("content.IMPROVEMENT-EFFORT-BODY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="section bg-ink-soft !pt-12">
        <div className="wrap max-w-4xl space-y-5 leading-7 text-ink-muted">
          <p>{t("content.commited")}</p>
          <p>{t("content.exp")}</p>
          <Link to="/contact" className="btn-primary !mt-8">
            {t("content.contact-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
