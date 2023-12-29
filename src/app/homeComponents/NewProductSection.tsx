"use client";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import Card from "../../components/Card";
import HorizontalSlider from "@/components/HorizentalSlider";
import { ProductCard } from "@/types";
import Loader from "@/components/Loader";
import { Alert, AlertTitle } from "@mui/material";

const NewProductSection = ({
  header,
  specialOffer,
}: {
  header: string;
  specialOffer: boolean;
}) => {
  const path = specialOffer
    ? "/product/getspecialoffer"
    : "/product/getlast10item";
  const { data, error, isLoading } = useCustomeFetch<ProductCard[]>(path);

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
    <section className="container mt-16 h-[500px]">
      <h2 className="text-gray-500 text-center md:text-4xl xsm:text-xl">
        {header}
      </h2>
      {data && (
        <HorizontalSlider>
          {data.map((ele) => (
            <Card
              key={ele.id}
              title={ele.title}
              id={ele.id}
              description={ele.description}
              cardClass="card"
              review={ele.review}
              imageUrl={ele.imageUrl}
            />
          ))}
        </HorizontalSlider>
      )}
    </section>
  );
};

export default NewProductSection;
