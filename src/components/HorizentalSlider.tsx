"use client";
import uuid from "react-uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MutableRefObject, ReactNode, useRef } from "react";
import { IconButton } from "@mui/material";
import { Swiper as SwiperType } from "swiper/types";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";

const HorizontalSlider = ({ children }: { children: ReactNode[] }) => {
  const swiperRef: MutableRefObject<SwiperType | undefined> = useRef();

  const slidesPerViewMidScreen = Math.min(children.length, 2);
  const slidesPerViewLargeScreen = Math.min(children.length, 3);

  return (
    <div className="flex justify-center items-center">
      <IconButton
        onClick={() => swiperRef?.current?.slidePrev()}
        sx={{ padding: 0 }}
      >
        <ArrowLeftCircle />
      </IconButton>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={15}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          280: {
            slidesPerView: 1,
          },

          500: {
            slidesPerView: slidesPerViewMidScreen,
          },
          976: {
            slidesPerView: slidesPerViewLargeScreen,
          },
        }}
        style={{
          paddingBlock: "50px",
          overflow: "hidden",
          paddingInline: "10px",
        }}
      >
        {children.map((child) => (
          <SwiperSlide key={uuid()}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        onClick={() => swiperRef?.current?.slideNext()}
        sx={{ padding: 1 }}
      >
        <ArrowRightCircle />
      </IconButton>
    </div>
  );
};

export default HorizontalSlider;
