"use client";
import Card from "@/components/Card";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import { useSelectore } from "@/redux/store";
import { ProductCard } from "@/types";
import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarLoader, HashLoader } from "react-spinners";
import { CSSProperties } from "styled-components";

const Products = ({ params }: { params: { category: string } }) => {
  const [filterdProducts, setFilterdProducts] = useState<ProductCard[]>([]);

  const { data, isLoading, error } = useCustomeFetch<ProductCard[]>(
    `/product/getproductsofcategory?catName=${params.category}`
  );
  useEffect(() => {
    if (data) setFilterdProducts(data);
  }, [data]);

  const select = useSelectore(
    (state) => state.ManufacturerSliceReducer.manufacturerid
  );
  const selectName = useSelectore(
    (state) => state.ManufacturerSliceReducer.manufacturerName
  );

  useEffect(() => {
    if (data) {
      if (select == 0) {
        setFilterdProducts(() => [...data]);
      } else {
        setFilterdProducts(() => [
          ...data.filter((product) => product.manufacturerId === select),
        ]);
      }
    }
  }, [select]);

  useEffect(() => {
    if (data) {
      setFilterdProducts(() => [
        ...data.filter((product) =>
          product.title.toLowerCase().startsWith(selectName.toLowerCase())
        ),
      ]);
    }
  }, [selectName]);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <HashLoader
          loading={isLoading}
          cssOverride={override}
          color={"#006d1d"}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className=" min-h-[100vh] flex justify-center items-center">
        <Alert severity="error" className="w-full py-6">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </div>
    );
  }
  return (
    <section className="mt-8">
      <div className="grid_card">
        {filterdProducts &&
          filterdProducts.map((product) => (
            <Card
              cardClass="card_plus"
              key={product.id}
              title={product.title}
              description={product.description}
              id={product.id}
              review={product.review}
              categoryName={params.category}
              // imageUrl={product.imageUrl}
            />
          ))}
      </div>
    </section>
  );
};

export default Products;
