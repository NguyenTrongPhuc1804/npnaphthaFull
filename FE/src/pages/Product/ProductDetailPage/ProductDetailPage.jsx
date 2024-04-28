import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner/Banner";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailProduct,
  searchProduct,
} from "../../../redux/reducer/ProductSlice";
import { useParams } from "react-router-dom";
import BoxComponent from "../../../components/BoxComponent/BoxComponent";
import CardProductV2 from "../../../components/Card/CardProductV2";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { t } = useTranslation();

  const { productDetail } = useSelector((state) => state.productSlice);
  const { listAllProduct } = useSelector((state) => state.productSlice);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailProduct({ slug })).then((value) => {
      if (value.payload) {
        dispatch(
          searchProduct({
            searchBy: "type",
            searchValue: value.payload.type,
          })
        );
      }
    });
  }, [slug]);
  return (
    <section className=" mt-[5rem] lg:mt-[8rem] p-6 lg:pt-10 ">
      <Helmet>
        <title>{productDetail?.name}</title>
        <meta name="description" content={productDetail?.name} />

        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}/product/${
            productDetail?.slug
          }`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}/product/${
            productDetail?.slug
          }`}
        />
        <meta property="og:title" content={productDetail?.name} />
        <meta name="keywords" content={productDetail?.name}></meta>
        <meta property="og:description" content={productDetail?.name} />
        <meta property="og:image" content={productDetail?.image} />
        {/* <meta
          property="og:image"
          content={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${detailFilm?.item?.poster_url}`}
        /> */}
      </Helmet>
      <div className="lg:flex flex-wrap w-full   justify-around">
        <div className="w-full lg:w-[35%] mb-4">
          <div className="bg-white shadow-2xl p-2 rounded-xl ">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 "
            >
              {productDetail?.thumb_image?.map((item, idx) => (
                <SwiperSlide>
                  <img
                    className="rounded-xl h-[300px] lg:h-[400px] w-full object-cover"
                    src={item}
                    alt={item}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="bg-white shadow-2xl p-2 mt-2 rounded-xl">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {productDetail?.thumb_image?.map((item, idx) => (
                <SwiperSlide>
                  <img
                    className="rounded-lg h-[70px] lg:h-[100px] w-full object-cover cursor-pointer"
                    src={item}
                    alt={item}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="w-full lg:w-[60%] ">
          <div className="pt-0">
            <div className=" bg-white shadow-xl p-3 rounded-lg  ">
              <p className="text-xl font-semibold text-colorPrimary ">
                {t("content.Name-product")}
              </p>
              <h2 className="text-2xl font-semibold">{productDetail?.name}</h2>
            </div>
            <div className="mt-2 bg-white shadow-xl p-3 rounded-lg overflow-y-scroll  lg:overflow-y-scroll ">
              <p className="text-xl font-semibold text-colorPrimary ">
                {t("content.Description")}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: productDetail?.description }}
              ></div>
            </div>
            <div className="mt-2  bg-white shadow-xl p-2 rounded-lg ">
              <p className="text-xl font-semibold text-colorPrimary">
                {t("content.Similar-product")}
              </p>
              <BoxComponent>
                {listAllProduct?.data?.slice(0, 4)?.map((item, idx) => (
                  <CardProductV2 product data={item} />
                ))}
              </BoxComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
