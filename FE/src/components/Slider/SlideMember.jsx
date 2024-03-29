import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CardTeamMember from "../Card/CardTeamMember";
export default function SlideMember() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 2,
        },
        639: {
          slidesPerView: 2,
        },
        865: {
          slidesPerView: 3,
        },
        1000: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 3,
        },
        1700: {
          slidesPerView: 3,
        },
      }}
      grabCursor={true}
      // pagination={{
      //   clickable: true,
      // }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper "
    >
      <SwiperSlide className="place-items-center">
        <div className="w-full h-full flex justify-center">
          <CardTeamMember />
        </div>
      </SwiperSlide>
      <SwiperSlide className="place-items-center">
        <div className="w-full h-full flex justify-center">
          <CardTeamMember />
        </div>
      </SwiperSlide>
      <SwiperSlide className="place-items-center">
        <div className="w-full h-full flex justify-center">
          <CardTeamMember />
        </div>
      </SwiperSlide>
      <SwiperSlide className="place-items-center">
        <div className="w-full h-full flex justify-center">
          <CardTeamMember />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
