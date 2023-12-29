// "use client";
import Link from "next/link";
import { useCustomeFetch } from "@/hooks/useCustomeFetch";
import { Alert, AlertTitle } from "@mui/material";
import Image from "next/image";
import ipad from "../../../public/assets/categories/ipadpro11-digitalmat-gallery-1-202210.png";
import laptop from "../../../public/assets/categories/image-from-rawpixel-id-2763835-original.png";
import phone from "../../../public/assets/phones/iphone14-digitalmat-gallery-3-202209.png";
import HorizontalSlider from "@/components/HorizentalSlider";
import Loader from "@/components/Loader";
import { Category } from "@/types";

const ProductCategory = () => {
  const { isLoading, data, error } = useCustomeFetch<Category[]>(
    "/category/getallcategory"
  );

  if (isLoading) {
    return <Loader />;
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
        <div>
          {data && (
            <HorizontalSlider>
              {data.map((cat) => (
                <div className="icon_style_container" key={cat.id}>
                  <Link href={`/products/${cat.categoryName.toLowerCase()}`}>
                    <Image
                      src={cat.imgeUrl}
                      width={100}
                      height={100}
                      alt="image"
                    />
                  </Link>
                  <span>{cat.categoryName}</span>
                </div>
              ))}
            </HorizontalSlider>
          )}
        </div>
      </section>
    );
  }
};

export default ProductCategory;
