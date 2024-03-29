import React from "react";

export default function BlogDetail() {
  return (
    <main>
      <header className="site-header site-news-detail-header mt-[5rem] lg:mt-[8rem]">
        <div className="container">
          <div className="row">
            <div className="col-12 lg:text-6xl text-4xl font-bold">
              <h2>Learning a fine dining experience</h2>
            </div>
          </div>
        </div>
      </header>
      <section className="news-detail section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <img
                src="https://plus.unsplash.com/premium_photo-1664457233888-523931beef03?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="img-fluid news-detail-image h-[515px] w-full object-cover"
                alt="fine dining experience"
              />
              <div className="col-lg-10 col-10 mx-auto mt-5">
                <h4 className="mb-3">
                  The best fine-dining experience at Crispy Kitchen
                </h4>
                <p>
                  Phasellus in augue at quam ornare malesuada. Sed magna lorem,
                  dapibus nec lorem sed, pretium vulputate ante. In porttitor
                  sapien urna, eu vulputate arcu pharetra non. Vivamus nec nulla
                  quis leo sodales semper. Quisque sed ultricies tortor. Fusce
                  porta pretium tellus, sit amet vulputate orci.
                </p>
                <ul className="list">
                  <li className="list-item">
                    Pasta stats published in the International
                  </li>
                  <li className="list-item">
                    Rice flour, or legumes such as beans
                  </li>
                  <li className="list-item">
                    Belgian family developed major food poisoning symptoms
                  </li>
                </ul>
                <p>
                  Pasta is a type of food typically made from an unleavened
                  dough of wheat flour mixed with water or eggs, and formed into
                  sheets or other shapes, then cooked by boiling or baking. Rice
                  flour, or legumes such as beans or lentils, are sometimes used
                  in place of wheat flour to yield a different taste
                </p>
                <div className="ratio ratio-16x9 my-5">
                  <iframe
                    width={560}
                    height={315}
                    src="https://www.youtube.com/embed/6vebbDZxoKE?controls=0"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p>
                  Crispy Kitchen is free Bootstrap 5 HTML template provided by
                  Tooplate. You are free to use this layout for commercial
                  purposes. You are NOT allowed to redistribute the template ZIP
                  file on any template donwnload website. Please{" "}
                  <a href="https://www.tooplate.com/contact" target="_blank">
                    contact us
                  </a>{" "}
                  for more information.
                </p>
                <h5 className="mt-4 mb-3">Pasta with Cream Sauce Recipe</h5>
                <p>
                  Pasta is a type of food typically made from an unleavened
                  dough of wheat flour mixed with water or eggs, and formed into
                  sheets or other shapes, then cooked by boiling or baking. Rice
                  flour, or legumes such as beans or lentils, are sometimes used
                  in place of wheat flour to yield a different taste
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
