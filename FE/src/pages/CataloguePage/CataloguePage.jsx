import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import SubBanner from "../../components/Banner/SubBanner";
import { useTranslation } from "react-i18next";
import { Button } from "@material-tailwind/react";
import { getAllCatalogue } from "../../redux/reducer/CatalogueSlice";
import CardPdf from "../../components/Card/CardPdf";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
import { Helmet } from "react-helmet-async";
export default function CataloguePage() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { listAllCatalogue } = useSelector((state) => state.catalogueSlice);
  console.log(listAllCatalogue, "data");
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [buttonSelect, setButtonSelect] = useState("pdf");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    dispatch(getAllCatalogue());
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>Catalogue - npnaphtha.com.vn</title>

        <link rel="canonical" href={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA là một công ty chuyên sản xuất , gia công cho các Vendor của tập đoàn lớn và cung cấp các mặt hàng cao su kỹ thuật"
        />
        <meta property="og:url" content={import.meta.env.VITE_URL_DOMAIN} />
        <meta property="og:title" content="Catalogue - npnaphtha.com.vn" />
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
      <SubBanner
        title={"E - Catalogue"}
        bg={`${import.meta.env.VITE_URL_DOMAIN}catalogue.png`}
      />
      <section className="mt-[2rem] mb-4">
        <div className="flex w-full justify-center ">
          {/* <Button
            onClick={() => setButtonSelect("pdf")}
            color="blue"
            className="rounded-full mr-2 text-base"
            variant={buttonSelect === "pdf" ? "gradient" : "outlined"}
          >
            Link pdf
          </Button> */}
          {/* <Button
            onClick={() => setButtonSelect("video")}
            color="blue"
            className="rounded-full text-base"
            variant={buttonSelect !== "pdf" ? "gradient" : "outlined"}
          >
            Link video
          </Button> */}
        </div>
        <div className="py-4">
          <BoxComponent>
            {listAllCatalogue?.data?.map((item, idx) => (
              <CardPdf data={item} key={idx} />
            ))}
          </BoxComponent>
        </div>
        <div className="w-full flex justify-center">
          {
            <DefaultPagination
              pageCount={listAllCatalogue?.totalPage}
              e={(value) => {
                dispatch(getAllProduct({ page: value, limit: 8 }));
                setCurrentPage(value);
              }}
            />
          }
        </div>
      </section>
    </div>
  );
}
