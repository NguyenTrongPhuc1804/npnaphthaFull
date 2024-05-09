import React from "react";

export default function SubBanner({ title, subTitle, bg }) {
  return (
    <header
      className={`mt-[5rem] lg:mt-[8rem] site-header bg-cover `}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 mx-auto">
            <h1 className="text-white lg:text-5xl text-3xl font-bold uppercase">
              {title}
            </h1>
            <strong className="text-white">{subTitle}</strong>
          </div>
        </div>
      </div>
      <div className="overlay" />
    </header>
  );
}
