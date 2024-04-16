import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardBlogV2({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${item?.slug}`)}
      className="col-lg-4 col-md-4 col-12 cursor-pointer"
    >
      <div className="news-thumb mb-lg-0 mb-lg-4 mb-0">
        <div>
          <img
            src={item?.image}
            className="img-fluid news-image h-[227px] w-full object-cover"
            alt
          />
        </div>
        <div className="news-text-info">
          {/* <span className="category-tag me-3 bg-info">Ngày tạo</span> */}
          <strong className="text-colorPrimary">
            {moment(item?.createdAt).format("DD/MM/YYYY")}
          </strong>
          <h5 className="news-title mt-2">
            <p className="news-title-link text-2xl font-bold">{item?.title}</p>
          </h5>
        </div>
      </div>
    </div>
  );
}
