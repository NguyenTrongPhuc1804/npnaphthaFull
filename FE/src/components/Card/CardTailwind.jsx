import React from "react";

export default function CardTailwind() {
  return (
    <div className=" sm:w-[250px]  w-[300px] rounded-lg overflow-hidden shadow-lg mt-10 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="w-full object-cover h-[200px] hover:scale-110 transition-all duration-500"
          src="https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2  line-clamp-2">
          The Coldest Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aliquam dolorum aut fugiat quidem, neque, dignissimos aliquid
          laboriosam quibusdam odio, rerum sit cumque excepturi deleniti
          recusandae tempore autem quam a architecto.
        </div>
        {/* <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p> */}
      </div>
      <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}
