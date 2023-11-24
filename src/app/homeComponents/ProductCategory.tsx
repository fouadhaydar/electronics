// "use client";
import { Laptop } from "react-bootstrap-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BarLoader, HashLoader } from "react-spinners";
import { CSSProperties } from "styled-components";
import { useCustomeFetch } from "@/hooks/useCustomeFetch";
import { Alert, AlertTitle } from "@mui/material";
import Image from "next/image";
import ipad from "../../../public/assets/categories/ipadpro11-digitalmat-gallery-1-202210.png";
import laptop from "../../../public/assets/categories/image-from-rawpixel-id-2763835-original.png";
import phone from "../../../public/assets/phones/iphone14-digitalmat-gallery-3-202209.png";

const ProductCategory = () => {
  const { isLoading, data, error } = useCustomeFetch<
    { id: string; categoryName: string; products: null }[]
  >("/category/getallcategory");

  if (isLoading) {
    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };
    return (
      <HashLoader
        loading={isLoading}
        cssOverride={override}
        size={80}
        color={"#36d7b7"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (error) {
    return (
      <div className="container mt-12">
        <Alert severity="error" className="">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </div>
    );
  } else {
    return (
      <section className="container mt-16">
        <h2 className="text-gray-500 text-center md:text-4xl xsm:text-xl ">
          Products Categories
        </h2>
        <div className="flex flex-row flex-wrap justify-around items-center lg:gap-4 sm:gap-2 w-full text-balck pt-10">
          {data!.map((cat, i) => (
            <div className="icon_style_container" key={cat.id}>
              <Link href={`/products/${cat.categoryName.toLowerCase()}`}>
                {/* <Laptop className="icon_style" /> */}
                <Image
                  src={i == 0 ? phone : i == 1 ? ipad : laptop}
                  width={150}
                  height={150}
                  alt="image"
                />
              </Link>
              <span>{cat.categoryName}</span>
            </div>
          ))}
          {/* <div className="icon_style_container">
          <Link href={"/products/laptops"}>
            <Laptop className="icon_style" />
          </Link>
          <span>Laptops</span>
        </div>
        <div className="icon_style_container">
          <Link href={"/products/phones"}>
            <Phone className="icon_style" />
          </Link>
          <span>Smart Phone</span>
        </div>
        <div className="icon_style_container">
          <Link href={"/products/tablets"}>
            <Tablet className="icon_style" />
          </Link>
          <span>Tablets</span>
        </div>
        <div className="icon_style_container">
          <Link href={"/pcs"}>
            <PcDisplay className="icon_style" />
          </Link>
          <span>Pc</span>
        </div>
        <div className="icon_style_container">
          <Link href={"/earbuds"}>
            <Earbuds className="icon_style" />
          </Link>
          <span>Earbuds</span>
        </div>
        <div className="icon_style_container">
          <Link href={"/smart-watches"}>
            <Smartwatch className="icon_style" />
          </Link>
          <span>Smart Watches</span>
        </div> */}
        </div>
      </section>
    );
  }
};

export default ProductCategory;