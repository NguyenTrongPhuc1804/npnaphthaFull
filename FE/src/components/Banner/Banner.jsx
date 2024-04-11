import React from "react";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();
  return (
    <>
      <div className="container ">
        <div className="row px-10 lg:px-20">
          <div className="col-lg-5 col-12 m-auto">
            <div className="heroText">
              <h1 className="text-white lg:text-6xl text-4xl font-bold mb-lg-5 mb-3 uppercase">
                {t("content.intro-banner")}
              </h1>
              <div className="c-reviews my-3 d-flex flex-wrap align-items-center">
                <p className="text-white w-100">{t("content.Accompanying")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div
              id="carouselExampleCaptions"
              className="carousel carousel-fade hero-carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item rounded-lg overflow-hidden active">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                      className=" w-full lg:h-[450px] h-[208px] object-cover carousel-image "
                      alt="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                    />
                  </div>
                  <div className="carousel-caption">
                    <span className="text-white">
                      <i className="bi-geo-alt me-2" />
                      Manhattan, New York
                    </span>
                    <h4 className="hero-text">Fine Dining Restaurant</h4>
                  </div>
                </div>
                <div className="carousel-item rounded-lg overflow-hidden">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/hinh_cty_2.jpg"
                      className=" w-full lg:h-[450px] h-[208px] object-cover carousel-image "
                      alt="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                    />
                  </div>
                  <div className="carousel-caption">
                    <div className="d-flex align-items-center">
                      <h4 className="hero-text">Steak</h4>
                    </div>
                    <div className="d-flex flex-wrap align-items-center">
                      <h5 className="reviews-text mb-0 me-3">3.8/5</h5>
                      <div className="reviews-stars">
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star reviews-icon" />
                        <i className="bi-star reviews-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item rounded-lg overflow-hidden">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/11.jpg"
                      className=" w-full lg:h-[450px] h-[208px] object-cover carousel-image "
                      alt="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                    />
                  </div>
                  <div className="carousel-caption">
                    <div className="d-flex align-items-center">
                      <h4 className="hero-text">Sausage Pasta</h4>
                    </div>
                    <div className="d-flex flex-wrap align-items-center">
                      <h5 className="reviews-text mb-0 me-3">4.2/5</h5>
                      <div className="reviews-stars">
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star-fill reviews-icon" />
                        <i className="bi-star reviews-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev bg-colorPrimary"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next bg-green-400 rounded-br-lg"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <i className="fa-solid fa-arrow-right"></i>

                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="video-wrap">
        <video autoPlay loop muted className="custom-video" poster>
          <source
            src={require("../../assets/video/cafe_video.mp4")}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay" />
    </>
  );
}
