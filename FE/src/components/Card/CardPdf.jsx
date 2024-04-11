import React from "react";
import { useNavigate, redirect } from "react-router-dom";
export default function CardPdf({ data }) {
  const navigate = useNavigate();
  return (
    <a
      href={data.url}
      target="_blank"
      className="rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="w-[300px] h-[200px] overflow-hidden">
        <img
          className="w-full h-full hover:scale-125 transform transition-all duration-500 object-cover"
          src={data.image}
          alt={data.image}
        />
      </div>
      <div className="bg-[#fafafa] p-2">
        <p className="text-center">{data.name}</p>
      </div>
    </a>
  );
}
