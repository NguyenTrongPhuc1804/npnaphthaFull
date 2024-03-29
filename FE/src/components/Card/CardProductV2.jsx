import React from "react";

export default function CardProductV2({ data }) {
  return (
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 lg:w-[90%] w-full  mx-auto mt-12 lg:mt-24">
      <img
        src={"https://images.unsplash.com/photo-1499856871958-5b9627545d1a"}
        alt="University of Southern California"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <h3 className="z-10 mt-3 text-2xl font-bold text-white">{data?.name}</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {data?.description}
      </div>
    </article>
  );
}
