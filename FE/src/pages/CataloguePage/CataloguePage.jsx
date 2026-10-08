import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import SubBanner from "../../components/Banner/SubBanner";
import CardPdf from "../../components/Card/CardPdf";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { getAllCatalogue } from "../../redux/reducer/CatalogueSlice";

const LIMIT = 8;
const DESCRIPTION =
  "Tải catalogue sản phẩm cao su kỹ thuật NP NAPHTHA: Slope, gối giảm tốc, đệm chống va đập cầu cảng và các mặt hàng gia công.";

export default function CataloguePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listAllCatalogue } = useSelector((state) => state.catalogueSlice);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllCatalogue({ page, limit: LIMIT })).finally(() =>
      setLoading(false)
    );
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = listAllCatalogue?.data || [];

  return (
    <>
      <Helmet>
        <title>Catalogue - NP NAPHTHA</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}catalogue`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta name="description" content={DESCRIPTION} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}catalogue`}
        />
        <meta property="og:title" content="Catalogue - NP NAPHTHA" />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha,Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta property="og:description" content={DESCRIPTION} />
      </Helmet>

      <SubBanner
        title="E - Catalogue"
        subTitle={t("content.catalogue-desc")}
        bg={`${import.meta.env.VITE_URL_DOMAIN}catalogue.png`}
      />

      <section className="section">
        <div className="wrap">
          <BoxComponent>
            {loading ? (
              <CardSkeleton count={LIMIT} />
            ) : (
              items.map((item) => (
                <CardPdf data={item} key={item._id || item.url} />
              ))
            )}
          </BoxComponent>

          {!loading && items.length === 0 && (
            <p className="rounded-2xl border border-dashed border-ink-line py-16 text-center text-ink-muted">
              {t("content.no-catalogue")}
            </p>
          )}

          <DefaultPagination
            pageCount={listAllCatalogue?.totalPage}
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
