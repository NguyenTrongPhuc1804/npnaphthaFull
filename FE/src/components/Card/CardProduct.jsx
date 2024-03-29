import React from "react";

export default function CardProduct() {
  return (
    <div className="col-lg-4 col-md-6 col-12 cursor-pointer">
      <div className="menu-thumb">
        <div className="menu-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="img-fluid menu-image object-cover h-[324px] w-full"
            alt
          />
          <span className="menu-tag bg-warning">Breakfast</span>
        </div>
        <div className="menu-info d-flex flex-wrap align-items-center">
          <h4 className="mb-0">Morning Fresh</h4>
          <span className="price-tag bg-white shadow-lg ms-4">
            <small>$</small>12.50
          </span>
          <div className="d-flex flex-wrap align-items-center w-100 mt-2">
            <h6 className="reviews-text mb-0 me-3">4.3/5</h6>
            <div className="reviews-stars">
              <i className="bi-star-fill reviews-icon" />
              <i className="bi-star-fill reviews-icon" />
              <i className="bi-star-fill reviews-icon" />
              <i className="bi-star-fill reviews-icon" />
              <i className="bi-star reviews-icon" />
            </div>
            <p className="reviews-text mb-0 ms-4">102 Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
