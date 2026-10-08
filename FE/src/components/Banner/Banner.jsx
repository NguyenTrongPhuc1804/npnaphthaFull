import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { getAllBanner } from "../../redux/reducer/BannerSlice";
import { getAllVideoBanner } from "../../redux/reducer/VideoBannerSlice";

export default function Banner() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { listAllBanner } = useSelector((state) => state.bannerSlice);
  const { listAllVideo } = useSelector((state) => state.videoBannerSlice);

  useEffect(() => {
    dispatch(getAllBanner());
    dispatch(getAllVideoBanner());
  }, []);

  const banners = listAllBanner?.data || [];
  const videoUrl = listAllVideo?.data?.[0]?.url;

  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/95 via-brand-900/85 to-brand-700/60" />

      <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-5">
          <span className="eyebrow !bg-white/10 !text-brand-100">
            NP NAPHTHA
          </span>
          <h1 className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("content.intro-banner")}
          </h1>
          <p className="mt-5 max-w-md text-lg text-brand-100">
            {t("content.Accompanying")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/product" className="btn-primary">
              {t("content.view-products")}
              <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-outline">
              {t("content.contact-now")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          {banners.length > 0 ? (
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              loop={banners.length > 1}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              style={{
                "--swiper-pagination-color": "#ffffff",
                "--swiper-pagination-bullet-inactive-color": "#ffffff",
              }}
              className="overflow-hidden rounded-3xl shadow-card-hover ring-1 ring-white/20"
            >
              {banners.map((item, idx) => (
                <SwiperSlide key={item._id || idx}>
                  <div className="relative aspect-[16/10] w-full bg-brand-900">
                    <img
                      src={item.image}
                      alt={item.title || "NP NAPHTHA"}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    {(item.title || item.sub_title) && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pb-9 sm:p-7 sm:pb-10">
                        {item.title && (
                          <p className="line-clamp-2 text-lg font-bold text-white sm:text-2xl">
                            {item.title}
                          </p>
                        )}
                        {item.sub_title && (
                          <p className="mt-1 line-clamp-2 text-sm text-slate-200 sm:text-base">
                            {item.sub_title}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="skeleton aspect-[16/10] w-full !rounded-3xl !bg-white/10" />
          )}
        </div>
      </div>
    </section>
  );
}
