"use client";
import Image from "next/image";
import img from "../../../../public/assets/phones/Imgs.png";
import { useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { useSelectore } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeFromeCart } from "@/redux/features/product-slice";
import { ProductInCart } from "@/types";
import Link from "next/link";

const CardInCart = ({
  name,
  price,
  imageUrl,
  quantity,
  variationId,
  productId,
  category,
  color,
  ramStorage,
}: ProductInCart) => {
  // const quantity = useSelectore(
  //   (state) => state.CartSliceSliceReducer.cart
  // );
  const dispatch = useDispatch();
  // const handlePlus = () => dispatch(increase("123"));
  // const handleMinus = () => dispatch(decrease("123"));

  const handleDelete = () => {
    dispatch(removeFromeCart({ id: variationId, price }));
  };
  return (
    // <Link href={`/products/${category.toLowerCase()}/${productId}`}>
    <div className="w-full">
      <div className="flex justify-between gap-6 w-full h-[150px] mb-4">
        <div className=" w-1/4 my-auto">
          <Image src={img} alt="phone" />
        </div>
        <div className="flex flex-col  justify-around h-full w-3/4 px-2 gap-[4px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full items-center">
                <span className="text-xl">{name}</span>
                <XCircle size={20} onClick={handleDelete} />
              </div>
              <span className="text-sm">{ramStorage}</span>
              <div
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                  borderRadius: "9999px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 px-2 py-[2px] rounded-[3px] flex items-center">
              <span className="px-1 py-[2px] text-gray-500">
                Quantity: {quantity}
              </span>{" "}
            </div>
            <span>Price: {price}$</span>
          </div>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-500" />
    </div>
    // </Link>
  );
};

export default CardInCart;
