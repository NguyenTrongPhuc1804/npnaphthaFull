import React, { useEffect } from "react";
import SubBanner from "../../components/Banner/SubBanner";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { useTranslation } from "react-i18next";

export default function BlogPage() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <div>
        <SubBanner title={t("content.blog")} />

        <section className="news section-padding bg-white">
          <div className="container">
            <div className="row lg:px-28 px-10">
              <h2 className="mb-lg-5 mb-4 text-3xl font-bold">
                Bài viết mới nhất
              </h2>
              <CardBlogV1 />
              <CardBlogV1 />
            </div>
          </div>
        </section>
        <section className="news section-padding">
          <div className="container">
            <div className="row lg:px-28 px-10">
              <div className="col-12">
                <h2 className="mb-lg-5 mb-4 text-3xl font-bold">
                  Tất cả bài viết
                </h2>
              </div>
              <CardBlogV2 />
              <CardBlogV2 />
              <CardBlogV2 />
              <CardBlogV2 />
              <CardBlogV2 />
              <DefaultPagination />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
