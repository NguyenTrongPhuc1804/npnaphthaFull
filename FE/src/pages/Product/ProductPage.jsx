import React, { useEffect, useRef, useState } from "react";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import SubBanner from "../../components/Banner/SubBanner";
import CardTailwind from "../../components/Card/CardTailwind";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import { Button, Input } from "@material-tailwind/react";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../redux/reducer/CategorySlice";
import CardProductV2 from "../../components/Card/CardProductV2";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
const arrButton = [
  { id: 0, name: "Chop" },
  { id: 1, name: "Chop2" },
];
export default function ProductPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listAllProduct } = useSelector((state) => state.productSlice);
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const [filterProduct, setFillterProduct] = useState("all");
  const [pagination, setPagination] = useState();

  const search = useRef("");
  const onChange = ({ target }) => (search.current = target.value);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, []);
  return (
    <main>
      <Helmet>
        <title>Sản phẩm - npnaphtha.com.vn</title>

        <link
          rel="canonical"
          href={`${import.meta.env.VITE_URL_DOMAIN}/product`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_URL_DOMAIN}/product`}
        />
        <meta property="og:title" content="Sản phẩm - npnaphtha.com.vn" />
        <meta
          name="keywords"
          content="Sản phẩm NP NAPHTHA, npnaphtha,Sản phẩm Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
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
        <SubBanner title={t("content.product")} />
        <section>
          <div className="w-full mx-auto menu section-padding px-10">
            <div className="lg:pl-6 pl-0 ">
              <h2 className="lg:text-4xl text-2xl font-bold pb-2 uppercase  text-center">
                {t("content.Collection")}
              </h2>
              <div className="flex flex-wrap justify-between items-center">
                <div className="">
                  <Button
                    onClick={() => {
                      setFillterProduct("all");
                      dispatch(dispatch(getAllProduct()));
                    }}
                    color="blue"
                    className="mr-2 text-xs mt-2"
                    variant={filterProduct === "all" ? "gradient" : "outlined"}
                  >
                    Tất cả
                  </Button>
                  {listAllCategory?.data?.map((item, idx) => (
                    <Button
                      key={idx}
                      onClick={() => {
                        setFillterProduct(item.slug);
                        dispatch(
                          searchProduct({
                            searchBy: "type",
                            searchValue: item.slug,
                          })
                        );
                      }}
                      color="blue"
                      className="mr-2 text-xs mt-2"
                      variant={
                        filterProduct === item.slug ? "gradient" : "outlined"
                      }
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
                <div className="relative flex w-full max-w-[24rem]">
                  <Input
                    type="email"
                    label="Tìm kiếm sản phẩm"
                    ref={search}
                    onChange={onChange}
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <Button
                    onClick={() => {
                      console.log(search.current, "search cur");
                      dispatch(
                        searchProduct({
                          searchBy: "name",
                          searchValue: search.current,
                        })
                      );
                      setFillterProduct("all");
                    }}
                    size="sm"
                    color={"blue"}
                    className="!absolute right-1 top-1 rounded"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <BoxComponent>
              {listAllProduct?.data?.map((item, idx) => (
                <CardProductV2 data={item} />
              ))}
            </BoxComponent>
            <div className="w-full flex justify-center">
              {
                <DefaultPagination
                  pageCount={listAllProduct?.totalPage}
                  e={(value) => {
                    dispatch(getAllProduct({ page: value, limit: 8 }));
                    setCurrentPage(value);
                  }}
                />
              }
            </div>
          </div>
        </section>
        {/* <section className="menu section-padding bg-white">
          <div className="container">
            <div className="row px-10 lg:px-28">
              <div className="col-12">
                <h2 className="mb-lg-5 mb-4 text-2xl font-bold">
                  Sản phẩm nổi bật
                </h2>
              </div>
              <CardBlogV1 />
              <CardBlogV1 />
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
}
