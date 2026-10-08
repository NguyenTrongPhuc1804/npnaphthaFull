import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  getDetailProduct,
  searchProduct,
} from "../../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../../redux/reducer/CategorySlice";
import BoxComponent from "../../../components/BoxComponent/BoxComponent";
import CardProductV2 from "../../../components/Card/CardProductV2";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { t } = useTranslation();

  const { productDetail, listAllProduct } = useSelector(
    (state) => state.productSlice
  );
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllCategory({ page: 0, limit: 100 }));
  }, []);

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

  const images = productDetail?.thumb_image?.length
    ? productDetail.thumb_image
    : productDetail?.image
    ? [productDetail.image]
    : [];
  const categoryName = listAllCategory?.data?.find(
    (c) => c.slug === productDetail?.type
  )?.name;
  const related =
    listAllProduct?.data?.filter((item) => item.slug !== slug).slice(0, 4) ||
    [];
  const url = `${import.meta.env.VITE_URL_DOMAIN}product/${productDetail?.slug}`;

  return (
    <>
      <Helmet>
        <title>{productDetail?.name}</title>
        <meta name="description" content={productDetail?.name} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={productDetail?.name} />
        <meta name="keywords" content={productDetail?.name} />
        <meta property="og:description" content={productDetail?.name} />
        <meta property="og:image" content={productDetail?.image} />
      </Helmet>

      <div className="border-b border-ink-line bg-ink-soft">
        <nav
          aria-label="Breadcrumb"
          className="wrap flex flex-wrap items-center gap-2 py-4 text-sm text-ink-muted"
        >
          <Link to="/" className="hover:text-brand-700">
            {t("content.home")}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/product" className="hover:text-brand-700">
            {t("content.product")}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="line-clamp-1 font-medium text-ink">
            {productDetail?.name}
          </span>
        </nav>
      </div>

      <section className="section !pb-10 lg:!pb-14">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-ink-line bg-white p-2 shadow-card">
              <Swiper
                key={`main-${slug}-${images.length}`}
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-navigation-size": "22px",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {images.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                      src={item}
                      alt={`${productDetail?.name || ""} ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {images.length > 1 && (
              <Swiper
                key={`thumb-${slug}-${images.length}`}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-3"
              >
                {images.map((item, idx) => (
                  <SwiperSlide key={idx} className="!h-auto cursor-pointer">
                    <img
                      className="aspect-square w-full rounded-xl border border-ink-line object-cover"
                      src={item}
                      alt=""
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="min-w-0 lg:col-span-6">
            {categoryName && (
              <span className="eyebrow">{categoryName}</span>
            )}
            <p className="text-sm font-semibold text-brand-600">
              {t("content.Name-product")}
            </p>
            <h1 className="mt-1 text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
              {productDetail?.name}
            </h1>

            <div className="mt-6 rounded-2xl border border-ink-line bg-white p-5 shadow-card">
              <h2 className="mb-2 text-lg font-bold text-ink">
                {t("content.Description")}
              </h2>
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: productDetail?.description }}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                {t("content.contact-now")}
              </Link>
              <a href="tel:0965383579" className="btn-ghost">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                0965 383 579
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-ink-soft !pt-12">
          <div className="wrap">
            <h2 className="section-title mb-8">
              {t("content.Similar-product")}
            </h2>
            <BoxComponent>
              {related.map((item) => (
                <CardProductV2 key={item._id || item.slug} data={item} />
              ))}
            </BoxComponent>
          </div>
        </section>
      )}
    </>
  );
}
