import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import SubBanner from "../../components/Banner/SubBanner";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import CardProductV2 from "../../components/Card/CardProductV2";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { getAllProduct, searchProduct } from "../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../redux/reducer/CategorySlice";

const LIMIT = 8;
const DESCRIPTION =
  "Danh mục sản phẩm cao su kỹ thuật NP NAPHTHA: Slope, gối giảm tốc, đệm chống va đập cầu cảng và hàng gia công cho vendor.";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function ProductPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listAllProduct } = useSelector((state) => state.productSlice);
  const { listAllCategory } = useSelector((state) => state.categorySlice);

  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllCategory({ page: 0, limit: 100 }));
  }, []);

  useEffect(() => {
    setLoading(true);
    let request;
    if (keyword) {
      request = dispatch(
        searchProduct({
          searchBy: "name",
          searchValue: escapeRegex(keyword),
          page,
          limit: LIMIT,
        })
      );
    } else if (filter !== "all") {
      request = dispatch(
        searchProduct({
          searchBy: "type",
          searchValue: filter,
          page,
          limit: LIMIT,
        })
      );
    } else {
      request = dispatch(getAllProduct({ page, limit: LIMIT }));
    }
    request.finally(() => setLoading(false));
  }, [filter, keyword, page]);

  const handleFilter = (slug) => {
    setInput("");
    setKeyword("");
    setFilter(slug);
    setPage(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter("all");
    setKeyword(input.trim());
    setPage(0);
  };

  const products = listAllProduct?.data || [];

  return (
    <>
      <Helmet>
        <title>Sản phẩm cao su kỹ thuật - NP NAPHTHA</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}product`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta name="description" content={DESCRIPTION} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}product`}
        />
        <meta
          property="og:title"
          content="Sản phẩm cao su kỹ thuật - NP NAPHTHA"
        />
        <meta
          name="keywords"
          content="Sản phẩm NP NAPHTHA, cao su kỹ thuật, Slope, gối giảm tốc, rubber fender"
        />
        <meta property="og:description" content={DESCRIPTION} />
      </Helmet>

      <SubBanner
        title={t("content.product")}
        subTitle={t("content.product-desc")}
        bg={`${import.meta.env.VITE_URL_DOMAIN}product.png`}
      />

      <section className="section">
        <div className="wrap">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              aria-label={t("content.Collection")}
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
            >
              <button
                type="button"
                role="tab"
                aria-selected={filter === "all" && !keyword}
                onClick={() => handleFilter("all")}
                className={`chip ${
                  filter === "all" && !keyword ? "chip-active" : ""
                }`}
              >
                {t("content.all")}
              </button>
              {listAllCategory?.data?.map((item) => (
                <button
                  key={item._id || item.slug}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.slug}
                  onClick={() => handleFilter(item.slug)}
                  className={`chip ${filter === item.slug ? "chip-active" : ""}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSearch}
              role="search"
              className="relative w-full lg:max-w-sm"
            >
              <i
                className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("content.search-product")}
                aria-label={t("content.search-product")}
                className="field-input !rounded-full !pl-10 !pr-24"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
              >
                {t("content.search")}
              </button>
            </form>
          </div>

          <BoxComponent>
            {loading ? (
              <CardSkeleton count={LIMIT} />
            ) : (
              products.map((item) => (
                <CardProductV2 key={item._id || item.slug} data={item} />
              ))
            )}
          </BoxComponent>

          {!loading && products.length === 0 && (
            <p className="rounded-2xl border border-dashed border-ink-line py-16 text-center text-ink-muted">
              {t("content.no-products")}
            </p>
          )}

          <DefaultPagination
            pageCount={listAllProduct?.totalPage}
            forcePage={page}
            e={(value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </section>
    </>
  );
}
