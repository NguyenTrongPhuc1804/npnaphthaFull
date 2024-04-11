import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailCategory } from "../../redux/reducer/CategorySlice";
import { useNavigate } from "react-router-dom";

export default function CardProductV2({ data, product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  useEffect(() => {
    dispatch(getDetailCategory(data.type)).then((data) => {
      setCategory(data.payload.data.name);
    });
  }, []);
  return (
    <article
      onClick={() => navigate(`/product/${data.slug}`)}
      className={`relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8   lg:w-[90%] w-full  mx-auto ${
        product ? "mt-2 pt-12" : "mt-12 lg:mt-16  pt-40 "
      } cursor-pointer
    transform transition duration-500 hover:scale-110`}
    >
      <img
        src={
          data.image
            ? data.image
            : "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="University of Southern California"
        className="absolute inset-0 h-full w-full object-cover "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <h3
        className={`z-10 mt-3 ${
          product ? "textxl" : "text-2xl"
        } font-bold text-white truncate`}
      >
        {data?.name}
      </h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {category}
      </div>
    </article>
  );
}
