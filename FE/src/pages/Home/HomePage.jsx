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
import { Helmet } from "react-helmet-async";
const arrButton = [
  { id: 0, name: "Chop" },
  { id: 1, name: "Chop2" },
];
export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const { listAllProduct } = useSelector((state) => state.productSlice);
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const [filterProduct, setFillterProduct] = useState(0);
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
    localStorage.setItem("lng", "vi");
  }, []);
  return (
    <main>
      <Helmet>
        <title>Trang chủ - npnaphtha.com.vn</title>

        <link rel="canonical" href={import.meta.env.VITE_URL_API} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA là một công ty chuyên sản xuất , gia công cho các Vendor của tập đoàn lớn và cung cấp các mặt hàng cao su kỹ thuật"
        />
        <meta property="og:url" content={import.meta.env.VITE_URL_API} />
        <meta property="og:title" content="Trang chủ - npnaphtha.com.vn" />
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
      <section className="hero mt-[5rem] lg:mt-[8rem]">
        <Banner />
      </section>
      <section>
        <div className="bg-colorPrimary w-full  grid grid-cols-2 lg:grid-cols-4  py-[4rem] px-2 lg:px-[6rem]">
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              4000
            </p>
            <p className="text-base lg:text-lg text-white font-semibold uppercase">
              {t("content.OFFICERS-AND-EMPLOYEES")}
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              16+
            </p>
            <p className="text-base lg:text-lg text-white font-semibold uppercase">
              {t("content.YEARS-AS-A-NATIONAL-BRAND")}
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              70+
            </p>
            <p className="text-base lg:text-lg text-white font-semibold uppercase">
              {t("content.partner-agent")}
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              100
            </p>
            <p className="text-base lg:text-lg text-white font-semibold uppercase">
              {t("content.affiliated-businesses")}
            </p>
          </div>
        </div>
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
      <section className="BgImage bg-[url('https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss')]" />
      <section className="my-10">
        <h2 className="text-center my-5 lg:text-4xl text-2xl font-bold uppercase">
          {t("content.affiliated-businesses")}
        </h2>
        <div className="px-[10%]">
          <SlideLogo />
        </div>
      </section>
      <section className="news section-padding">
        <div className="container lg:px-20 px-10">
          <div className="row">
            <h2 className="text-center mb-lg-5 mb-4 lg:text-4xl text-2xl font-bold uppercase">
              {t("content.NEWS-&-EVENTS")}
            </h2>
            <CardBlogV1 />
            <CardBlogV1 />
            <CardBlogV2 />
            <CardBlogV2 />
            <CardBlogV2 />
          </div>
        </div>
      </section>
    </main>
  );
}
