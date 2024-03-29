import React from "react";

export default function CardBlogV1() {
  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="news-thumb mb-4">
        <a href="news-detail.html">
          <img
            src={require("../../assets/images/news/pablo-merchan-montes-Orz90t6o0e4-unsplash.jpg")}
            className="img-fluid news-image"
            alt
          />
        </a>
        <div className="news-text-info news-text-info-large">
          <span className="category-tag bg-danger">Featured</span>
          <h5 className="news-title mt-2">
            <p className="news-title-link text-2xl">
              Healthy Lifestyle and happy living tips
            </p>
          </h5>
        </div>
      </div>
    </div>
  );
}
