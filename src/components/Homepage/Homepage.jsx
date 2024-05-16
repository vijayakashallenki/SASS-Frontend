import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import namstea from "../../assets/images/namstea.mp4";
import Cookies from "js-cookie";
import WhatWeeOffer from "../WhatWeeOffer/WhatWeeOffer";
import Stats from "../Stats/Stats";
import Pricing from "../Pricing/Pricing";
import Guarantee from "../Guarantee/Guarantee";
import Accordion from "../Faq/Faq";
import Reviews from "../Reviews/Reviews";

const Homepage = () => {
  const storeData = useSelector((state) => state?.users);

  const { user } = storeData;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <section>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <p className="mx-auto -mt-4 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
            Welcome to
            <span className="border-b border-dotted border-slate-300 m-2">
              Lazy Shopper
            </span>
          </p>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            <span className="inline-block">
              Ecom
              <span className="relative whitespace-nowrap text-[#a77555]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full fill-[#d3b49d]"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative m-2">Products</span>
              </span>
            </span>
            <span className="inline-block m-2">Made Simple</span>
          </h1>
          <p className="mx-auto mt-9 max-w-4xl text-lg tracking-tight text-slate-700 sm:mt-6">
            <span className="inline-block">
              Bring functionalities and Take a look How you can Test Faster!
            </span>
            <span className="inline-block">
              We give you a complete package to test products in a fast and
              reliable way, meaning we will do the product research and pick out
              the products that are more likely to be winners and create
              high-quality images, creatives, persuasive descriptions, and ad
              copies that make the costumer want to buy
            </span>
          </p>
          <video>
            <source src={namstea} type="video/mp4" />
          </video>
        </div>
      </div>
      <WhatWeeOffer />
      <Stats />
      <Pricing />
      <Guarantee User={user} />
      <Accordion />
      {/* <Reviews/> */}
    </section>
  );
};

export default Homepage;
