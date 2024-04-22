import React, { useEffect, useRef } from "react";
import SubBanner from "../../components/Banner/SubBanner";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, searchBlog } from "../../redux/reducer/BlogSlice";

export default function BlogPage() {
  const dispatch = useDispatch();
  const { listAllBlog } = useSelector((state) => state.BlogSlice);
  console.log(listAllBlog, "all");
  //const { t } = useTranslation();
  const t = (string) => {
    return string;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllBlog());
  }, []);
  return (
    <main>
      <div>
        <SubBanner title={t("content.blog")} />

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
                  Tất cả bài viết
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
