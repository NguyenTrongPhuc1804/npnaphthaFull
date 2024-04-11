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
      <SubBanner title={"E - Catalogue"} />
      <section className="mt-[2rem] mb-4">
        <div className="flex w-full justify-center ">
          <Button
            onClick={() => setButtonSelect("pdf")}
            color="blue"
            className="rounded-full mr-2 text-base"
            variant={buttonSelect === "pdf" ? "gradient" : "outlined"}
          >
            Link pdf
          </Button>
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
