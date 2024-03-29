import React from "react";

export default function Banner() {
  return (
    <>
      <div className="container ">
        <div className="row px-10 lg:px-28">
          <div className="col-lg-5 col-12 m-auto">
            <div className="heroText">
              <h1 className="text-white lg:text-6xl text-4xl font-bold mb-lg-5 mb-3 uppercase">
                Công ty TNHH sx tm np-naphtha
              </h1>
              <div className="c-reviews my-3 d-flex flex-wrap align-items-center">
                {/* <div className="d-flex flex-wrap align-items-center">
                  <h4 className="text-white mb-0 me-3">4.4/5</h4>
                  <div className="reviews-stars">
                    <i className="bi-star-fill reviews-icon" />
                    <i className="bi-star-fill reviews-icon" />
                    <i className="bi-star-fill reviews-icon" />
                    <i className="bi-star-fill reviews-icon" />
                    <i className="bi-star reviews-icon" />
                  </div>
                </div> */}
                <p className="text-white w-100">
                  Đồng hành cùng bạn vươn tới tương lai
                </p>
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
                <div className="carousel-item active">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                      className=" w-[615px] lg:h-[450px] h-[208px] object-cover carousel-image"
                      alt
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
                <div className="carousel-item">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/hinh_cty_2.jpg"
                      className=" w-[615px] lg:h-[450px] h-[208px] object-cover carousel-image"
                      alt
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
                <div className="carousel-item">
                  <div className="carousel-image-wrap">
                    <img
                      src="https://npnaphtha.com.vn/images/slideshow/11.jpg"
                      className=" w-[615px] lg:h-[450px] h-[208px] object-cover carousel-image"
                      alt
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
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
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
