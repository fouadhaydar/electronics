"use client";
import RatingSysteme from "@/app/products/[category]/components/RatingSysteme";
import React, { useRef, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "react-bootstrap-icons";

const InformationsSection = ({
  sepcification,
  numberOfReviews,
  starsArr,
  productId,
}: {
  sepcification: string;
  numberOfReviews: number;
  starsArr: number[];
  productId: string;
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [heightFull, setHeight] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const translateNgative = () => {
    if (ref?.current) {
      setHeight(false);
      setTranslateX(-ref.current?.offsetWidth);
      setShowReview(true);
    }
  };

  const translatePositive = () => {
    if (ref?.current) {
      setTranslateX(0);
      setShowReview(false);
    }
  };
  const getFullHeight = () => setHeight((prev) => !prev);
  return (
    <section>
      <hr className="bg-black w-full h-[1px]" />
      <div className="flex flex-col gap-6 my-16">
        {/* specification & reviews switcher */}
        <div className="flex gap-4 justify-center">
          <h3
            className={`${
              translateX == 0 ? "font-bold scale-105" : "font-normal"
            } section_title cursor-pointer`}
            onClick={translatePositive}
          >
            Detailed Specification
          </h3>
          <h3
            onClick={translateNgative}
            className={`${
              translateX < 0 ? "font-bold scale-105" : "font-normal"
            } section_title cursor-pointer`}
          >
            Reviews [5]
          </h3>
        </div>
        <div className="overflow-hidden ">
          <div
            className={`flex w-[200%] ${
              !heightFull ? "h-[350px]" : "h-full"
            } relative`}
          >
            {/*  full specification */}
            <div
              className={`overflow-hidden mb-16 w-[100%] transition ease-in-out duration-150 ${
                !heightFull && "gradient"
              }`}
              style={{ transform: `translateX(${translateX}px)` }}
              ref={ref}
            >
              {/* render specification */}
              <div
                dangerouslySetInnerHTML={{
                  __html: sepcification || "",
                }}
              />
            </div>
            {!heightFull ? (
              <ArrowDownCircle
                className="absolute bottom-0 left-[25%]"
                size={20}
                onClick={getFullHeight}
              />
            ) : (
              <ArrowUpCircle
                className="absolute bottom-0 left-[25%]"
                size={20}
                onClick={getFullHeight}
              />
            )}
            {/* reviews */}
            <RatingSysteme
              x={translateX}
              totalNum={numberOfReviews}
              s={starsArr}
              show={showReview}
              productId={productId}
            />
          </div>
        </div>
      </div>
      <hr className="bg-black w-full h-[1px]" />
    </section>
  );
};

export default InformationsSection;
