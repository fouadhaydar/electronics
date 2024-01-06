"use client";
import Loader from "@/components/Loader";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import { Category } from "@/types";
import { Alert, AlertTitle } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Nav from "@/components/navBar/Nav";

const Categories = () => {
  const route = useRouter();

  useEffect(() => {
    if (window) {
      if (window.innerWidth > 768) route.push("/");
    }
  }, []);

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
  }
  return (
    <section>
      <Nav />
      <h1 className="p-6 w-full text-center text-lg">Categories</h1>
      <div className="grid grid-cols-2 h-[100vh] gap-2 w-[90%] mx-auto">
        {data?.map((cat, i) => (
          <div
            className="icon_style_container rounded-md drop_shadow"
            key={cat.id}
          >
            <Link href={`/products/${cat.categoryName.toLowerCase()}`}>
              <Image src={cat.imgeUrl} width={150} height={150} alt="image" />
            </Link>
            <span>{cat.categoryName}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
