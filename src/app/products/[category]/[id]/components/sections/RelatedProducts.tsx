"use client";
import Card from "@/components/Card";
import HorizontalSlider from "@/components/HorizentalSlider";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import { ProductCard } from "@/types";
import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";

const RelatedProducts = ({ manufacturerId }: { manufacturerId: number }) => {
  const {
    data: recomandationProducts,
    isLoading,
    error,
  } = useCustomeFetch<ProductCard[]>(
    `/product/getproductsofmanufacturer?id=${manufacturerId}`
  );

  if (isLoading) {
    return <div>loding ...</div>;
  }

  if (error) {
    return <div>error ...</div>;
  }

  return (
    <section>
      <div className="my-16 h-[500px]">
        <h3 className="section_title">Related Products</h3>
        {/* cart of new product */}
        {recomandationProducts && (
          <HorizontalSlider>
            {recomandationProducts.map((product) => {
              return (
                <Card
                  title={product.title}
                  description={product.description}
                  cardClass="card"
                  id={product.id}
                  key={product.id}
                  review={product.review}
                  imageUrl={product.imageUrl}
                />
              );
            })}
          </HorizontalSlider>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
