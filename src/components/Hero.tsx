"use client";
import Typewriter from "typewriter-effect";
import ProductCategory from "./ProductCategory";

function Hero() {
  return (
    <section className="hero">
      <div className="backdrop-blur-[16px] overlay relative">
        <div className="container relative z-10">
          <div className="flex flex-col gap-16  justify-center items-center h-[100vh] w-full">
            <div className="flex gap-2 items-end py-5 my-4 primary_text_2 xsm:flex-wrap justify-center">
              <h1 className="primary_text">Electonics.</h1>
              <Typewriter
                options={{
                  strings: [
                    "Phones",
                    "Laptops",
                    "Pcs",
                    "Every Thing you need",
                    "All In One Place",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <ProductCategory />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
{
  /* <span className='text-gray-400'>The ultimate way to purchase the products you adore.</span> */
}
