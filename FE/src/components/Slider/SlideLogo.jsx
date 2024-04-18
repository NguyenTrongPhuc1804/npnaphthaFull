import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
export default function SlideLogo({ listAllPartner }) {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 3,
          },
          865: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 4,
          },
          1700: {
            slidesPerView: 5,
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {listAllPartner?.data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex-col flex w-full justify-center items-center cursor-grab">
              <img
                className="w-[80%] lg:h-[150px] h-[80px] object-cover rounded-lg"
                src={item.image}
                alt={item.image}
              />
              {/* <p className="mt-2">{item.name}</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
