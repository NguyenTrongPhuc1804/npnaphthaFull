import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import CardProduct from "../../components/Card/CardProduct";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import CardBlogV2 from "../../components/Card/CardBlogV2";
import CardTailwind from "../../components/Card/CardTailwind";
import SlideLogo from "../../components/Slider/SlideLogo";
import Rating from "../../components/Rating/RatingComponent";
import { Button } from "@material-tailwind/react";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardProductV2 from "../../components/Card/CardProductV2";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../../redux/reducer/ProductSlice";
import { getAllCategory } from "../../redux/reducer/CategorySlice";
import { getAllBlog } from "../../redux/reducer/BlogSlice";
import { Helmet } from "react-helmet-async";
import { getAllPartner } from "../../redux/reducer/PartnerSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const { listAllProduct } = useSelector((state) => state.productSlice);
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const { listAllBlog } = useSelector((state) => state.BlogSlice);
  const { listAllVideo } = useSelector((state) => state.videoBannerSlice);
  const { listAllPartner } = useSelector((state) => state.partnerSlice);

  const [filterProduct, setFillterProduct] = useState("all");
  const { t } = useTranslation();

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_URL_API}product/all`);
  //     return res;
  //   } catch (error) {
  //     console.log(error, "err");
  //   }
  // };
  // const query = useQuery({ queryKey: ["todos"], queryFn: getData });
  // console.log(query.data, "quer");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllBlog());
    dispatch(getAllPartner());
    localStorage.setItem("lng", "vi");
  }, []);
  return (
    <main>
      <Helmet>
        <title>NP NAPHTHA | Cao su kỹ thuật, gia công cho vendor</title>
        <link rel="canonical" href={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:site_name" content="NP NAPHTHA" />
        <meta
          name="description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA chuyên sản xuất, gia công cao su kỹ thuật cho vendor tập đoàn lớn. Cung cấp Slope, gối giảm tốc, đệm chống va đập cầu cảng."
        />
        <meta property="og:url" content={import.meta.env.VITE_URL_DOMAIN} />
        <meta
          property="og:title"
          content="NP NAPHTHA | Cao su kỹ thuật, gia công cho vendor"
        />
        <meta
          name="keywords"
          content="NP NAPHTHA, npnaphtha, cao su kỹ thuật, Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA"
        />
        <meta
          property="og:description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA chuyên sản xuất, gia công cao su kỹ thuật cho vendor tập đoàn lớn. Cung cấp Slope, gối giảm tốc, đệm chống va đập cầu cảng."
        />
        <meta
          property="og:image"
          content={`${import.meta.env.VITE_URL_DOMAIN}image-nph.jpg`}
        />
      </Helmet>
      <h1 className="sr-only">
        Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA
      </h1>
      <section className="hero mt-[5rem] lg:mt-[8rem]">
        <Banner data={listAllVideo} />
      </section>

      <section>
        <div className="w-full mx-auto menu section-padding px-10">
          <div className="lg:pl-6 pl-0 ">
            <h2 className="lg:text-4xl text-2xl font-bold pb-2 uppercase  ">
              {t("content.outstanding-products")}
            </h2>
            <div className="flex flex-wrap">
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
          </div>
          <BoxComponent>
            {listAllProduct?.data?.map((item, idx) => (
              <CardProductV2 key={idx} data={item} />
            ))}
          </BoxComponent>
        </div>
      </section>
      <section
        className={`BgImage bg-[url('https://npnaphtha.com.vn/image-nph.jpg')]`}
      />
      <section className="my-10">
        <h2 className="text-center my-5 lg:text-4xl text-2xl font-bold uppercase">
          {t("content.affiliated-businesses")}
        </h2>
        <div className="px-[10%]">
          <SlideLogo listAllPartner={listAllPartner} />
        </div>
      </section>
      <section className="news section-padding">
        <div className="container   px-10">
          <div className="row">
            <h2 className="text-center mb-lg-5 mb-4 lg:text-4xl text-2xl font-bold uppercase">
              {t("content.NEWS-&-EVENTS")}
            </h2>
            {/* {listAllBlog.data && <CardBlogV1 item={listAllBlog?.data[0]} />}
            {listAllBlog.data && <CardBlogV1 item={listAllBlog?.data[1]} />} */}
            {listAllBlog?.data?.map((item, idx) => (
              <CardBlogV2 key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
