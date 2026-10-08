import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import SubBanner from "../../components/Banner/SubBanner";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { getAllBlog } from "../../redux/reducer/BlogSlice";

const LIMIT = 9;
const DESCRIPTION =
  "Tin tức và sự kiện của Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA về cao su kỹ thuật, sản phẩm cầu đường và cầu cảng.";

export default function BlogPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { listAllBlog } = useSelector((state) => state.BlogSlice);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllBlog({ page, limit: LIMIT })).finally(() =>
      setLoading(false)
    );
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogs = listAllBlog?.data || [];
  // Trang đầu: bài mới nhất hiển thị nổi bật
  const featured = page === 0 ? blogs[0] : null;
  const rest = page === 0 ? blogs.slice(1) : blogs;

  return (
    <>
      <Helmet>
        <title>Tin tức - NP NAPHTHA</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}blog`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta name="description" content={DESCRIPTION} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}blog`}
        />
        <meta property="og:title" content="Tin tức - NP NAPHTHA" />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha,Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta property="og:description" content={DESCRIPTION} />
      </Helmet>

      <SubBanner
        title={t("content.blog")}
        subTitle={t("content.blog-desc")}
        bg={`${import.meta.env.VITE_URL_DOMAIN}blog.png`}
      />

      <section className="section">
        <div className="wrap">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CardSkeleton count={6} />
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <h2 className="mb-5 text-xl font-bold text-ink sm:text-2xl">
                    {t("content.new-blog")}
                  </h2>
                  <CardBlogV1 item={featured} />
                </div>
              )}
              {rest.length > 0 && (
                <>
                  <h2 className="mb-5 text-xl font-bold text-ink sm:text-2xl">
                    {t("content.All-blog")}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((item) => (
                      <CardBlogV2 key={item._id || item.slug} item={item} />
                    ))}
                  </div>
                </>
              )}
              {blogs.length === 0 && (
                <p className="rounded-2xl border border-dashed border-ink-line py-16 text-center text-ink-muted">
                  {t("content.no-posts")}
                </p>
              )}
            </>
          )}

          <DefaultPagination
            pageCount={listAllBlog?.totalPage}
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
