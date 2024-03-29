import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer section-padding">
      <div className="container">
        <div className="col-12 flex lg:justify-start justify-center ">
          <div className="sm:w-[120px] w-[100px] " href="index.html">
            <img
              className="w-full h-full block object-cover"
              src="https://npnaphtha.com.vn/images/logo-cty.gif"
            />
          </div>
        </div>
        <div className="flex justify-around flex-wrap">
          <div className="col-lg-4 col-md-7 col-xs-12 tooplate-mt30  text-center text-white">
            <h6 className="text-white mb-lg-4 mb-3 text-2xl font-bold ">
              Liên hệ
            </h6>
            <p className="text-xl font-bold mb-4">
              CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI NP-NAPHTHA
            </p>
            <div className="flex justify-center mb-2 ">
              <i className="fa-solid fa-house mr-2"></i>
              <p>
                Văn phòng : Số 49 Đường số 14, KDC Ven Sông, P Tân Phong, Quận.
                7 Tp. HCM
              </p>
            </div>
            <div className="flex justify-center mb-2 ">
              <i className="fa-solid fa-building mr-2"></i>
              <p>
                Nhà máy : Đường số 1 , KCN Đông Xuyên, TP. Vũng Tàu, Tỉnh Bà Rịa
                Vũng Tàu
              </p>
            </div>
            <div className="flex justify-center mb-2 ">
              <i className="fa-solid fa-phone mr-2"></i>
              <p>
                Điện thoại: 0917 631 632 - 0972 434 849 (A. Nghĩa) ; 0919 498
                129 - 0965 383 579(A. Phong)
              </p>
            </div>
            <div className="flex justify-center mb-2">
              <i className="fa-solid fa-envelope mr-2"></i>
              <p>
                Email: trucphong@npnaphtha.com.vn - trungnghia@npnaphtha.com.vn{" "}
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-xs-12 tooplate-mt30 text-center">
            <h6 className="text-white mb-lg-4 mb-3 text-2xl font-bold">
              Liên kết nhanh
            </h6>
            <ul className="list-none">
              <li className="text-gray-400 text-lg cursor-pointer hover:text-red-400 mb-2">
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li className="text-gray-400 text-lg cursor-pointer hover:text-red-400 mb-2">
                <NavLink to="about">Về chúng tôi</NavLink>
              </li>
              <li className="text-gray-400 text-lg cursor-pointer hover:text-red-400 mb-2">
                <NavLink to="product">Sản phẩm</NavLink>
              </li>
              <li className="text-gray-400 text-lg cursor-pointer hover:text-red-400 mb-2">
                <NavLink to="blog">Bài viết</NavLink>
              </li>
              <li className="text-gray-400 text-lg cursor-pointer hover:text-red-400 mb-2">
                <NavLink to="contact">Liên hệ</NavLink>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12 tooplate-mt30">
            <h6 className="text-white mb-lg-4 mb-3 text-2xl font-bold text-center">
              Bản đồ
            </h6>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2368240724395!2d106.660375026679!3d10.793165195595117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293260a3dc51%3A0x17673bdc7d97b5ff!2zTmhhIEtob2EgVGjhuqltIE3hu7kgxJDhuqFpIE5hbSA1!5e0!3m2!1svi!2s!4v1710615545978!5m2!1svi!2s"
              width="100%"
              height="350"
              // style="border:0;"
              // allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* row ending */}
      </div>
      {/* container ending */}
    </footer>
  );
}
