import React from "react";

export default function SubBanner({ title, subTitle }) {
  return (
    <header className="mt-[5rem] lg:mt-[8rem] site-header bg-cover bg-[url('https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss')]">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 mx-auto">
            <h1 className="text-white lg:text-5xl text-3xl font-bold">
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
