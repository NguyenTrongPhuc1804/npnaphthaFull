import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getDetailBlog } from "../../../redux/reducer/BlogSlice";

export default function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { blogDetail } = useSelector((state) => state.BlogSlice);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailBlog({ slug }));
  }, [slug]);

  const ready = blogDetail?.slug === slug;
  const url = `${import.meta.env.VITE_URL_DOMAIN}blog/${blogDetail?.slug}`;

  return (
    <>
      <Helmet>
        <title>{blogDetail?.title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={blogDetail?.title} />
        <meta name="keywords" content={blogDetail?.title} />
        <meta property="og:description" content={blogDetail?.title} />
        <meta name="description" content={blogDetail?.title} />
        <meta property="og:image" key="og:image" content={blogDetail?.image} />
      </Helmet>

      <article className="section">
        <div className="wrap max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted"
          >
            <Link to="/" className="hover:text-brand-700">
              {t("content.home")}
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog" className="hover:text-brand-700">
              {t("content.blog")}
            </Link>
          </nav>

          {ready ? (
            <>
              <time
                dateTime={blogDetail?.createdAt}
                className="text-sm font-semibold uppercase tracking-wider text-brand-600"
              >
                {moment(blogDetail?.createdAt).format("DD/MM/YYYY")}
              </time>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {blogDetail?.title}
              </h1>
              {blogDetail?.image && (
                <img
                  src={blogDetail.image}
                  alt={blogDetail?.title || ""}
                  className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover shadow-card"
                />
              )}
              <div
                className="rich-content mx-auto mt-10 max-w-3xl text-base"
                dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
              />
            </>
          ) : (
            <div className="space-y-4" aria-hidden="true">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-10 w-3/4" />
              <div className="skeleton aspect-[16/9] w-full !rounded-3xl" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
            </div>
          )}

          <div className="mt-12 border-t border-ink-line pt-6">
            <Link to="/blog" className="btn-ghost">
              <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
              {t("content.back-to-blog")}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
