import React from "react";

export default function CardBlogV2() {
  return (
    <div className="col-lg-4 col-md-4 col-12">
      <div className="news-thumb mb-lg-0 mb-lg-4 mb-0">
        <a href="news-detail.html">
          <img
            src={require("../../assets/images/news/gilles-lambert-S_LhjpfIdm4-unsplash.jpg")}
            className="img-fluid news-image h-[227px] w-full"
            alt
          />
        </a>
        <div className="news-text-info">
          <span className="category-tag me-3 bg-info">Promotions</span>
          <strong>8 April 2022</strong>
          <h5 className="news-title mt-2">
            <p className="news-title-link text-2xl font-bold">
              Is Coconut good for you?
            </p>
          </h5>
        </div>
      </div>
    </div>
  );
}
