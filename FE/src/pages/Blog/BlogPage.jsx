import React, { useEffect, useRef } from "react";
import SubBanner from "../../components/Banner/SubBanner";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, searchBlog } from "../../redux/reducer/BlogSlice";
import { Helmet } from "react-helmet-async";

export default function BlogPage() {
  const dispatch = useDispatch();
  const { listAllBlog } = useSelector((state) => state.BlogSlice);
  console.log(listAllBlog, "all");
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllBlog());
  }, []);
  return (
    <main>
      <Helmet>
        <title>Tin tức - npnaphtha.com.vn</title>
        <link rel="canonical" href={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA là một công ty chuyên sản xuất , gia công cho các Vendor của tập đoàn lớn và cung cấp các mặt hàng cao su kỹ thuật"
        />
        <meta property="og:url" content={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:title" content="Tin tức - npnaphtha.com.vn" />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha,Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        ></meta>
        <meta
          property="og:description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA là một công ty chuyên sản xuất , gia công cho các Vendor của tập đoàn lớn và cung cấp các mặt hàng cao su kỹ thuật. Ngoài ra, chúng tôi còn mở rộng thêm các sản phẩm trong ngành cầu cảng, cầu đường và các mặt hàng cao su khác chuyên dùng như Slope, giờ giảm tốc, đệm chống va đập cầu cảng (Rubber Fender)"
        />
        {/* <meta
          property="og:image"
          content={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${detailFilm?.item?.poster_url}`}
        /> */}
      </Helmet>
      <div>
        <SubBanner
          title={t("content.blog")}
          bg={`${import.meta.env.VITE_URL_DOMAIN}blog.png`}
        />

        <section className="news section-padding bg-white">
          <div className="container">
            <div className="row lg:px-28 px-10">
              <h2 className="mb-lg-5 mb-4 text-3xl font-bold">
                {t("content.new-blog")}
              </h2>
              {listAllBlog.data && <CardBlogV1 item={listAllBlog?.data[0]} />}
              {listAllBlog.data && <CardBlogV1 item={listAllBlog?.data[1]} />}
            </div>
          </div>
        </section>
        <section className="news section-padding">
          <div className="container">
            <div className="row lg:px-28 px-10">
              <div className="col-12 flex justify-between">
                <h2 className="mb-lg-5 mb-4 text-3xl font-bold">
                  {t("content.All-blog")}
                </h2>
              </div>
              {listAllBlog?.data?.map((item, idx) => (
                <CardBlogV2 item={item} />
              ))}

              <DefaultPagination
                pageCount={listAllBlog?.totalPage}
                e={(value) => {
                  dispatch(getAllBlog({ page: value, limit: 8 }));
                  setCurrentPage(value);
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
