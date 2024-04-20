import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBlog } from "../../../redux/reducer/BlogSlice";
import { Helmet } from "react-helmet-async";

export default function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blogDetail } = useSelector((state) => state.BlogSlice);

  console.log(blogDetail, "slug");
  useEffect(() => {
    dispatch(getDetailBlog({ slug }));
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <Helmet>
        <title>{blogDetail?.title}</title>

        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}/product/${
            blogDetail?.slug
          }`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}/product/${
            blogDetail?.slug
          }`}
        />
        <meta property="og:title" content={blogDetail?.title} />
        <meta name="keywords" content={blogDetail?.title}></meta>
        <meta property="og:description" content={blogDetail?.title} />
        <meta name="description" content={blogDetail?.title} />
        <meta property="og:image" content={blogDetail?.image} />
        {/* <meta
          property="og:image"
          content={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${detailFilm?.item?.poster_url}`}
        /> */}
      </Helmet>
      <header className="site-header site-news-detail-header mt-[5rem] lg:mt-[8rem]">
        <div className="container">
          <div className="row">
            <div className="col-12 lg:text-6xl text-4xl font-bold">
              <h2>{blogDetail?.title}</h2>
            </div>
          </div>
        </div>
      </header>
      <section className="news-detail section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <img
                src={blogDetail?.image}
                className="img-fluid news-detail-image h-[515px] w-full object-cover"
                alt="fine dining experience"
              />
              <div
                className="col-lg-10 col-10 mx-auto mt-5"
                dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
