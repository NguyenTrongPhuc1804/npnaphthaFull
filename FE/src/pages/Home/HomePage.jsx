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
import { getAllProduct } from "../../redux/reducer/ProductSlice";
const arrButton = [
  { id: 0, name: "Chop" },
  { id: 1, name: "Chop2" },
];
export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const { listAllProduct } = useSelector((state) => state.productSlice);
  console.log(listAllProduct, "product");
  const [filterProduct, setFillterProduct] = useState(0);
  const { t } = useTranslation();
  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL_API}product/all`);
      return res;
    } catch (error) {
      console.log(error, "err");
    }
  };
  // const query = useQuery({ queryKey: ["todos"], queryFn: getData });
  // console.log(query.data, "quer");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProduct());
    // getData();
  }, []);
  return (
    <main>
      <section className="hero mt-[5rem] lg:mt-[8rem]">
        <Banner />
      </section>
      <section>
        <div className="bg-redct w-full  grid grid-cols-2 lg:grid-cols-4  py-[4rem] px-2 lg:px-[6rem]">
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              4000
            </p>
            <p className="text-base lg:text-lg text-white font-medium">
              CÁN BỘ CÔNG NHÂN VIÊN
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              16+
            </p>
            <p className="text-base lg:text-lg text-white font-medium">
              CÔNG TY THÀNH VIÊN
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              70+
            </p>
            <p className="text-base lg:text-lg text-white font-medium">
              SHOWROOM VÀ KHO HÀNG
            </p>
          </div>
          <div className="text-center py-4 ">
            <p className=" text-2xl lg:text-3xl text-white font-bold mb-2 lg:mb-4">
              100
            </p>
            <p className="text-base lg:text-lg text-white font-medium">
              ĐẠI LÝ ĐỐI TÁC
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full mx-auto menu section-padding px-10">
          <div className="lg:pl-6 pl-0 ">
            <h2 className="lg:text-4xl text-2xl font-bold pb-2 uppercase  ">
              Sản phẩm nổi bật
            </h2>
            <div className="flex flex-wrap">
              {arrButton.map((item, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    setFillterProduct(item.id);
                  }}
                  color="red"
                  className="mr-2 text-xs"
                  variant={filterProduct === idx ? "gradient" : "outlined"}
                >
                  Chan
                </Button>
              ))}
            </div>
          </div>
          <BoxComponent>
            {listAllProduct.map((item, idx) => (
              <CardProductV2 data={item} />
            ))}
          </BoxComponent>
        </div>
      </section>
      <section className="BgImage bg-[url('https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss')]" />
      <section className="my-10">
        <h2 className="text-center my-5 lg:text-4xl text-2xl font-bold uppercase">
          Doanh nghiệp liên kết
        </h2>
        <div className="px-[10%]">
          <SlideLogo />
        </div>
      </section>
      <section className="news section-padding">
        <div className="container lg:px-20 px-10">
          <div className="row">
            <h2 className="text-center mb-lg-5 mb-4 lg:text-4xl text-2xl font-bold uppercase">
              Tin tức &amp; Sự kiện
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
