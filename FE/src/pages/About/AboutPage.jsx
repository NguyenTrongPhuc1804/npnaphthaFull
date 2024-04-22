import React, { useEffect } from "react";
import CardTeamMember from "../../components/Card/CardTeamMember";
import SubBanner from "../../components/Banner/SubBanner";
import SlideMember from "../../components/Slider/SlideMember";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";
import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  //const { t } = useTranslation();
  const t = (string) => {
    return string;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <div className="">
        <Helmet>
          <title>Về chúng tôi - npnaphtha.com.vn</title>

          <link
            rel="canonical"
            href={`${import.meta.env.VITE_URL_DOMAIN}/about`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_URL_DOMAIN}/about`}
          />
          <meta property="og:title" content="Về chúng tôi - npnaphtha.com.vn" />
          <meta
            name="keywords"
            content="Về chúng tôi - npnaphtha.com.vn, npnaphtha.com.vn"
          ></meta>
          <meta
            property="og:description"
            content="Về chúng tôi - npnaphtha.com.vn"
          />
          <meta name="description" content="Về chúng tôi - npnaphtha.com.vn" />
          {/* <meta property="og:image" content={productDetail?.image} /> */}
          {/* <meta
          property="og:image"
          content={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${detailFilm?.item?.poster_url}`}
        /> */}
        </Helmet>
        <SubBanner title={t("content.about")} />
        <section className="about section-padding bg-white ">
          <Typography variant="h2" className="text-center mb-10 uppercase">
            {t("content.INTRODUCE")}
          </Typography>
          <div className="flex flex-wrap px-[2rem] lg:px-[2rem]  ">
            <div className="col-lg-6 col-12 sm:px-0 lg:px-10">
              <p className="text-2xl font-bold text-blue-400 py-4 ">
                {t("content.title-intro")}
              </p>
              <p className="text-justify">{t("content.body-intro1")}</p>
              <br></br>
              <p className="text-justify">{t("content.body-intro2")}</p>
            </div>
            <div className="col-lg-6 col-12 mb-2 ">
              <img
                src={require("../../assets/images/image-nph.jpg")}
                className="h-[300px] sm:h-[500px] w-full rounded-lg"
              />
            </div>
          </div>
        </section>
        <section>
          <header className="site-header bg-cover bg-[url('https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss')]">
            <div className="container">
              <div className="row lg:px-20 sm:px-0">
                <div className="col-lg-10 col-12 mx-auto">
                  <h1 className="text-white lg:text-4xl text-3xl font-bold mb-10">
                    {t("content.ORIENTED-DEVELOPMENT")}
                  </h1>
                  <p className="text-gray-200 text-base">
                    {t("content.ORIENTED-DEVELOPMENT-BODY1")}
                  </p>
                  <br></br>
                  <p className="text-gray-200 text-base">
                    {t("content.ORIENTED-DEVELOPMENT-BODY2")}
                  </p>
                </div>
              </div>
            </div>
            <div className="overlay" />
          </header>
        </section>
        <section>
          <div className=" w-full grid lg:grid-cols-2  grid-cols-1 ">
            <div className="lg:p-[5rem] p-[2rem] ">
              <p className="text-3xl font-bold text-black uppercase py-3">
                {t("content.MISSION")}
              </p>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  {t("content.FOR-CUSTOMERS")}
                </p>
                <p>{t("content.FOR-CUSTOMERS-BODY")}</p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  {t("content.FOR-EMPLOYEES")}
                </p>
                <p>{t("content.FOR-EMPLOYEES-BODY")}</p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  {t("content.FOR-SOCIETY")}
                </p>
                <p>{t("content.FOR-SOCIETY-BODY")}</p>
              </div>
            </div>
            <div className="lg:p-[5rem] p-[2rem] ">
              <p className="text-3xl font-bold text-black uppercase py-3 ">
                {t("content.VISION")}
              </p>
              <div className="pb-3">
                <p>{t("content.VISION-BODY")}</p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  {t("content.IMPROVEMENT-EFFORT")}
                </p>
                <p>{t("content.IMPROVEMENT-EFFORT-BODY")}</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="about section-padding">
          <div className="container">
            <div className="row sm:px-10 lg:px-24  px-[2%]">
              <div className="col-12">
                <h2 className="mb-5 text-4xl font-bold">BAN LÃNH ĐẠO</h2>
              </div>
              <SlideMember />
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
}
