import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function SlideLogo({ listAllPartner }) {
  const partners = listAllPartner?.data || [];

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={16}
      grabCursor={true}
      loop={partners.length > 6}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        960: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
    >
      {partners.map((item, idx) => (
        <SwiperSlide key={item._id || idx}>
          <div className="flex h-24 items-center justify-center rounded-2xl border border-ink-line bg-white p-4 sm:h-28">
            <img
              src={item.image}
              alt={item.name || "Partner"}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
