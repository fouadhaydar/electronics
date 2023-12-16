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

interface HorizontalSliderTypes {
  children: ReactNode[];
  // PrevElement: ComponentType<any>;
  // NextElement: ComponentType<any>;
  // prevShown?: boolean;
  // nextShown?: boolean;
}

// const HorizontalSlider = ({
//   children,
//   PrevElement,
//   NextElement,
// }: HorizontalSliderTypes) => {
//   const [translateX, setTranslateX] = useState(0);
//   const ref1 = useRef<HTMLDivElement>(null);
//   const ref2 = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState(0);
//   //   const [boder,setBoarder] = useState({
//   //     left: false,
//   //     right: false,
//   //   })

//   const sizeOfElements = width * children.length;
//   const isShowNext = translateX == 0 ? false : true;
//   const isShowPrev =
//     ref2?.current &&
//     translateX * -1 >= sizeOfElements - ref2?.current?.offsetWidth
//       ? false
//       : true;

//   useLayoutEffect(() => {
//     if (ref1?.current) {
//       setWidth(ref1.current.offsetWidth);
//     }
//     const handleResize = () => {
//       if (ref1?.current) setWidth(ref1.current.offsetWidth);
//     };
//     // const handleScroll = () => {
//     //     const scrollPosition = window.scrollY;
//     //     const newTranslateX = scrollPosition / 2;
//     //     setTranslateX(newTranslateX);
//     // };

//     // window.addEventListener('scroll', handleScroll);
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       // window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handlePrev = () => {
//     setTranslateX((prev) => {
//       if (ref2?.current?.offsetWidth === undefined) return prev;
//       if (prev * -1 < sizeOfElements - ref2?.current?.offsetWidth) {
//         return (prev -= width + 16);
//       }
//       return prev;
//     });
//   };
//   const handleNext = () => {
//     setTranslateX((prev) => {
//       if (prev < 0) {
//         return (prev += width + 16);
//       }

//       return prev;
//     });
//   };

//   return (
//     <div className="flex justify-between items-center my-8 gap-2">
//       <div className="relative ">
//         {isShowPrev && (
//           <PrevElement
//             onClick={handlePrev}
//             className="sm:text-2xl xsm:text-lg"
//           />
//         )}
//       </div>
//       <div className=" h-full py-10 flex items-center w-full overflow-hidden">
//         <div
//           className="w-full transition duration-400 ease-in-out flex gap-4 mb-1"
//           style={{ transform: `translateX(${translateX}px)` }}
//           ref={ref2}
//         >
//           {children.map((children) => {
//             return (
//               <div className="w-full" ref={ref1} key={uuid()}>
//                 {children}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <div className="relative">
//         {isShowNext && (
//           <NextElement
//             onClick={handleNext}
//             className="sm:text-2xl xsm:text-lg"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

const HorizontalSlider = ({ children }: { children: ReactNode[] }) => {
  const swiperRef: MutableRefObject<SwiperType | undefined> = useRef();
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
            slidesPerView: 2,
          },
          976: {
            slidesPerView: 3,
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
