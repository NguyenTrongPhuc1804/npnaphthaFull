import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardProductV2 from "../../components/Card/CardProductV2";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import SlideLogo from "../../components/Slider/SlideLogo";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import { getAllProduct, searchProduct } from "../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../redux/reducer/CategorySlice";
import { getAllBlog } from "../../redux/reducer/BlogSlice";
import { getAllPartner } from "../../redux/reducer/PartnerSlice";

const DESCRIPTION =
  "Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA chuyên sản xuất, gia công cao su kỹ thuật cho vendor tập đoàn lớn. Cung cấp Slope, gối giảm tốc, đệm chống va đập cầu cảng.";

const STATS = [
  { value: "2011", label: "content.stat-founded", icon: "fa-flag" },
  { value: "100+", label: "content.stat-employees", icon: "fa-users" },
  { value: "6000 m²", label: "content.stat-factory", icon: "fa-industry" },
  { value: "1M USD", label: "content.stat-capital", icon: "fa-coins" },
];

const FEATURES = [
  { text: "content.product-1", icon: "fa-shield-halved" },
  { text: "content.product-2", icon: "fa-layer-group" },
  { text: "content.product-3", icon: "fa-leaf" },
];

function SectionHeading({ eyebrow, title, desc, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="section-title">{title}</h2>
        {desc && <p className="section-desc">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { listAllProduct } = useSelector((state) => state.productSlice);
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const { listAllBlog } = useSelector((state) => state.BlogSlice);
  const { listAllPartner } = useSelector((state) => state.partnerSlice);

  const [filterProduct, setFilterProduct] = useState("all");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProduct()).finally(() => setLoadingProducts(false));
    dispatch(getAllCategory({ page: 0, limit: 100 }));
    dispatch(getAllBlog({ page: 0, limit: 3 }));
    dispatch(getAllPartner());
  }, []);

  const handleFilter = (slug) => {
    setFilterProduct(slug);
    setLoadingProducts(true);
    const request =
      slug === "all"
        ? dispatch(getAllProduct())
        : dispatch(searchProduct({ searchBy: "type", searchValue: slug }));
    request.finally(() => setLoadingProducts(false));
  };

  const products = listAllProduct?.data || [];
  const blogs = listAllBlog?.data?.slice(0, 3) || [];

  return (
    <>
      <Helmet>
        <title>NP NAPHTHA | Cao su kỹ thuật, gia công cho vendor</title>
        <link rel="canonical" href={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:url" content={import.meta.env.VITE_URL_DOMAIN} />
        <meta
          property="og:title"
          content="NP NAPHTHA | Cao su kỹ thuật, gia công cho vendor"
        />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha, cao su kỹ thuật, Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content={`${import.meta.env.VITE_URL_DOMAIN}image-nph.jpg`}
        />
      </Helmet>

      <Banner />

      {/* Số liệu nổi bật */}
      <section className="relative z-10 -mt-8">
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-line shadow-card-hover lg:grid-cols-4">
            {STATS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 bg-white p-5 lg:p-6"
              >
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg text-brand-600 sm:flex">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="text-xs text-ink-muted sm:text-sm">
                    {t(item.label)}
                  </dt>
                  <dd className="text-xl font-bold text-ink sm:text-2xl">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sản phẩm */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow={t("content.product")}
            title={t("content.outstanding-products")}
            desc={t("content.product-desc")}
            action={
              <Link to="/product" className="btn-ghost !py-2.5">
                {t("content.view-all")}
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            }
          />

          <div
            role="tablist"
            aria-label={t("content.product")}
            className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filterProduct === "all"}
              onClick={() => handleFilter("all")}
              className={`chip ${filterProduct === "all" ? "chip-active" : ""}`}
            >
              {t("content.all")}
            </button>
            {listAllCategory?.data?.map((item) => (
              <button
                key={item._id || item.slug}
                type="button"
                role="tab"
                aria-selected={filterProduct === item.slug}
                onClick={() => handleFilter(item.slug)}
                className={`chip ${
                  filterProduct === item.slug ? "chip-active" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <BoxComponent>
            {loadingProducts ? (
              <CardSkeleton count={8} />
            ) : (
              products.map((item) => (
                <CardProductV2 key={item._id || item.slug} data={item} />
              ))
            )}
          </BoxComponent>
          {!loadingProducts && products.length === 0 && (
            <p className="rounded-2xl border border-dashed border-ink-line py-16 text-center text-ink-muted">
              {t("content.no-products")}
            </p>
          )}
        </div>
      </section>

      {/* Giới thiệu & điểm mạnh */}
      <section className="section bg-ink-soft">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">{t("content.why-us")}</span>
            <h2 className="section-title">{t("content.title-intro")}</h2>
            <p className="mt-4 leading-7 text-ink-muted">
              {t("content.body-intro1")}
            </p>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  </span>
                  <p className="pt-1.5 text-sm font-medium text-ink sm:text-base">
                    {t(item.text)}
                  </p>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary mt-8">
              {t("content.about")}
              <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -z-0 rounded-[2rem] bg-gradient-to-br from-brand-200 to-brand-50" />
            <img
              src={`${import.meta.env.VITE_URL_DOMAIN}image-nph.jpg`}
              alt={t("content.title-intro")}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-card-hover"
            />
          </div>
        </div>
      </section>

      {/* Đối tác */}
      <section className="section">
        <div className="wrap">
          <div className="mb-8 text-center">
            <span className="eyebrow">{t("content.partner-agent")}</span>
            <h2 className="section-title">{t("content.affiliated-businesses")}</h2>
          </div>
          <SlideLogo listAllPartner={listAllPartner} />
        </div>
      </section>

      {/* Tin tức */}
      <section className="section bg-ink-soft">
        <div className="wrap">
          <SectionHeading
            eyebrow={t("content.blog")}
            title={t("content.NEWS-&-EVENTS")}
            desc={t("content.blog-desc")}
            action={
              <Link to="/blog" className="btn-ghost !py-2.5">
                {t("content.view-all")}
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((item) => (
              <CardBlogV2 key={item._id || item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Kêu gọi hành động */}
      <section className="section">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-12 text-center shadow-card-hover sm:px-12 lg:py-16">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {t("content.cta-title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-brand-100">
                {t("content.cta-desc")}
              </p>
              <Link
                to="/contact"
                className="btn mt-8 bg-white text-brand-700 hover:bg-brand-50"
              >
                {t("content.contact-now")}
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
