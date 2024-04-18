import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CardBlogV1({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${item?.slug}`)}
      className="col-lg-6 col-md-6 col-12 cursor-pointer"
    >
      <div className="news-thumb mb-4">
        <div>
          <img
            src={item?.image}
            className="img-fluid news-image h-[350px] object-cover"
            alt={item?.image}
          />
        </div>
        <div className="news-text-info news-text-info-large">
          <span className="category-tag bg-danger">
            {moment(item?.createdAt).format("DD/MM/YYYY")}
          </span>
          <h5 className="news-title mt-2">
            <p className="news-title-link text-2xl">{item?.title}</p>
          </h5>
        </div>
      </div>
    </div>
  );
}
