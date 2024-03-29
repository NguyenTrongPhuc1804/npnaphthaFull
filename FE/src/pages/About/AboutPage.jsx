import React, { useEffect } from "react";
import CardTeamMember from "../../components/Card/CardTeamMember";
import SubBanner from "../../components/Banner/SubBanner";
import SlideMember from "../../components/Slider/SlideMember";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";
import { Typography } from "@material-tailwind/react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <div className="">
        <SubBanner title={"Về chúng tôi"} />
        <section className="about section-padding bg-white ">
          <Typography variant="h2" className="text-center mb-10 uppercase">
            Giới thiệu
          </Typography>
          <div className="flex flex-wrap px-[2rem] lg:px-[2rem]  ">
            <div className="col-lg-6 col-12 sm:px-0 lg:px-10">
              <p className="text-2xl font-bold text-blue-400 py-4 ">
                Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA
              </p>
              <p className="text-justify">
                <strong className="text-red-400 font-bold">
                  Công ty TNHH Sản Xuất và Thương Mại NP NAPHTHA
                </strong>{" "}
                là một công ty chuyên sản xuất , gia công cho các Vendor của tập
                đoàn lớn và cung cấp các mặt hàng cao su kỹ thuật. Ngoài ra,
                chúng tôi còn mở rộng thêm các sản phẩm trong ngành cầu cảng,
                cầu đường và các mặt hàng cao su khác chuyên dùng như Slope, giờ
                giảm tốc, đệm chống va đập cầu cảng (Rubber Fender)
              </p>
              <br></br>
              <p className="text-justify">
                Tiền thân công ty{" "}
                <strong className="text-red-400 font-bold">
                  NP NAPHTHA là CTY CAO SU XANH
                </strong>{" "}
                được thành lập vào năm 2008, trong bối cảnh phát triển ngày càng
                lớn mạnh của các tập đoàn siêu thi Nhật, Mỹ và các Vendor, nhu
                cầu liên kết với các đối tác cung cấp dịch vụ, sản phẩm của nhà
                máy, tập đoàn là rất lớn và rất đa dạng. Công ty NP NAPHTHA
                không ngừng cải tiến sản xuất, nâng cao chất lượng và giảm giá
                thành sản phẩm, để cùng các đối tác đưa ra thị trường các sản
                phẩm chất lượng tốt và giá thành thấp
              </p>
            </div>
            <div className="col-lg-6 col-12 mb-2 ">
              <img
                src="https://npnaphtha.com.vn/images/slideshow/nen-cong-ty-da-chinh-sua.jpg"
                className="h-[300px] sm:h-[500px] w-full rounded-lg"
              />
            </div>
          </div>
        </section>
        <section>
          <header className="site-header bg-cover bg-[url('https://images.unsplash.com/photo-1707879487566-ff0852cadd92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss')]">
            <div className="container">
              <div className="row lg:px-20 sm:px-0">
                <div className="col-lg-10 col-12 mx-auto">
                  <h1 className="text-white lg:text-4xl text-3xl font-bold mb-10">
                    ĐỊNH HƯỚNG PHÁT TRIỂN
                  </h1>
                  <p className="text-gray-200 text-base">
                    Tầm nhìn và sứ mệnh NP NAPHTHA đặt ra luôn là kim chỉ nam
                    cho các hoạt động của NPNAPHTHA. chúng tôi luôn cần cù, sáng
                    tạo trong công việc, tận tụy với khách hàng, đối tác và
                    không ngừng nâng cấp máy móc, thiết bị cũng như hệ thống cơ
                    sở vật chất theo hướng hiện đại, hiệu quả và an toàn.
                  </p>
                  <br></br>
                  <p className="text-gray-200 text-base">
                    NP NAPHTHA luôn mang lại sự hài lòng cho các khách hàng, đối
                    tác trong và ngoài nước. Quyết tâm phấn đấu trở thành đơn vị
                    hàng đầu cung cấp dịch vụ trọn gói cho các Vendor và tập
                    đoàn lớn của Nhật và Mỹ
                  </p>
                </div>
              </div>
            </div>
            <div className="overlay" />
          </header>
        </section>
        <section>
          <div className=" w-full grid lg:grid-cols-2  grid-cols-1 ">
            <div className="lg:p-[5rem] p-[2rem] ">
              <p className="text-3xl font-bold text-black uppercase py-3">
                Sứ mệnh
              </p>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  ĐỐI VỚI KHÁCH HÀNG
                </p>
                <p>
                  NP NAPHTHA xác nhận cho mình sứ mệnh trở thành "cánh tay nối
                  dài của khách hàng ", sản phẩm và dịch vụ của chúng tôi luôn
                  giúp khách hàng nâng cao hiệu quả kinh doanh, tiết kiệm chi
                  phí. Từ đó khách hàng chỉ cần tập trung vào công việc phát
                  triển kinh doanh, nâng cao doanh số sản phẩm, và góp phần thúc
                  đẩy nên kinh tế nước nhà
                </p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  ĐỐI VỚI NGƯỜI LAO ĐỘNG
                </p>
                <p>
                  Là cầu nối giữa người lao động và doanh nghiệp, giúp người lao
                  động có việc làm ổn định, nâng cao thu nhập, đặc biệt NP
                  NAPHTHA luôn chú trọng nâng cao chất lượng lao động thông qua
                  đào tạo để đảm bảo mục tiêu phát triển bền vững.
                </p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  ĐỐI VỚI XÃ HỘI
                </p>
                <p>
                  Hoạt động sản xuất của công ty sẽ hỗ trợ giải quyết vấn đề
                  thất nghiệp cho người lao động, xây dựng cơ sở hạ tầng, kết
                  nối nguồn cung và cầu nhằm phát triển sản xuất cho nên kinh tế
                  Việt Nam.
                </p>
              </div>
            </div>
            <div className="lg:p-[5rem] p-[2rem] ">
              <p className="text-3xl font-bold text-black uppercase py-3 ">
                Tầm nhìn
              </p>
              <div className="pb-3">
                <p>
                  Tầm nhìn và sứ mệnh NP NAPHTHA đặt ra luôn là kim chỉ nam cho
                  các hoạt động của NPNAPHTHA. chúng tôi luôn cần cù, sáng tạo
                  trong công việc, tận tụy với khách hàng, đối tác và không
                  ngừng nâng cấp máy móc, thiết bị cũng như hệ thống cơ sở vật
                  chất theo hướng hiện đại, hiệu quả và an toàn.
                </p>
              </div>
              <div className="pb-3">
                <p className=" text-xl font-medium text-black">
                  NỖ LỰC CẢI TIẾN
                </p>
                <p>
                  Là cầu nối giữa người lao động và doanh nghiệp, giúp người lao
                  động có việc làm ổn định, nâng cao thu nhập, đặc biệt NP
                  NAPHTHA luôn chú trọng nâng cao chất lượng lao động thông qua
                  đào tạo để đảm bảo mục tiêu phát triển bền vững.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about section-padding">
          <div className="container">
            <div className="row sm:px-10 lg:px-24  px-[2%]">
              <div className="col-12">
                <h2 className="mb-5 text-4xl font-bold">BAN LÃNH ĐẠO</h2>
              </div>
              <SlideMember />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
