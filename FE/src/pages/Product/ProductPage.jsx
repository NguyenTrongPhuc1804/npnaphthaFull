import React, { useEffect, useState } from "react";
import CardBlogV1 from "../../components/Card/CardBlogV1";
import SubBanner from "../../components/Banner/SubBanner";
import CardTailwind from "../../components/Card/CardTailwind";
import BoxComponent from "../../components/BoxComponent/BoxComponent";
import { Button } from "@material-tailwind/react";
import DefaultPagination from "../../components/Pagination/DefaultPagination";
const arrButton = [
  { id: 0, name: "Chop" },
  { id: 1, name: "Chop2" },
];
export default function ProductPage() {
  const [filterProduct, setFillterProduct] = useState(0);
  const [pagination, setPagination] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <div>
        <SubBanner title={"Sản phẩm"} />

        <section className="menu section-padding">
          <div className="">
            <div className="row px-10 mb-4">
              <h2 className=" text-3xl font-bold">Tất cả sản phẩm</h2>
            </div>
            <div className="flex px-10">
              {arrButton.map((item, idx) => (
                <Button
                  onClick={() => {
                    setFillterProduct(item.id);
                  }}
                  color="red"
                  className="mr-2"
                  variant={filterProduct === idx ? "gradient" : "outlined"}
                >
                  Chan
                </Button>
              ))}
            </div>
            <BoxComponent>
              <CardTailwind />
              <CardTailwind />
              <CardTailwind />
              <CardTailwind />
              <CardTailwind />
            </BoxComponent>
            <DefaultPagination
              itemsPerPage={1}
              pageCount={50}
              e={(value) => console.log(value)}
            />
          </div>
        </section>
        <section className="menu section-padding bg-white">
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
        </section>
      </div>
    </main>
  );
}
