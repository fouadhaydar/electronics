"use client";

import { memo } from "react";

interface QuantityBtnInterface {
  selectedColor: { color: string };
  handleMinus: () => void;
  handlePlus: (b: boolean) => void;
  counter: number;
}

const QuantityBtn = ({
  handlePlus,
  handleMinus,
  counter,
}: QuantityBtnInterface) => {
  return (
    <div className="border border-black px-2 py-1 max-w-[70px] rounded-[4px] flex items-center justify-center">
      <span onClick={() => handleMinus()} className=" cursor-pointer p-1 ">
        -
      </span>{" "}
      <span className="p-1">{counter}</span>{" "}
      <span onClick={() => handlePlus(false)} className=" p-1 cursor-pointer">
        +
      </span>
    </div>
  );
};

export default memo(QuantityBtn);
