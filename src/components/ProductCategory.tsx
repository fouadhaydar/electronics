"use client";
import {
  Laptop,
  Phone,
  Tablet,
  Earbuds,
  Smartwatch,
  PcDisplay,
} from "react-bootstrap-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/fetchData";

const ProductCategory = () => {
  const [categories, setCategories] = useState<
    { id: string; categoryName: string; products: null }[]
  >([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      // console.log(categories);
      if (categories != undefined) {
        setCategories(() => [...categories]);
      }
    };
    getCategories();
  }, []);
  categories.length > 0 && console.log(categories);

  return (
    <section className="w-full">
      <div className="flex flex-row flex-wrap justify-around items-center lg:gap-4 sm:gap-2 w-full text-white">
        {categories.length > 0 &&
          categories.map((cat) => (
            <div className="icon_style_container" key={cat.id}>
              <Link href={`/products/${cat.categoryName.toLowerCase()}`}>
                <Laptop className="icon_style" />
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
};

export default ProductCategory;
