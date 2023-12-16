"use client";
import Card from "../../components/Card";
import HorizontalSlider from "@/components/HorizentalSlider";

const NewProductSection = ({ header }: { header: string }) => {
  return (
    <section className="container mt-16 h-[500px]">
      <h2 className="text-gray-500 text-center md:text-4xl xsm:text-xl">
        {header}
      </h2>
      <HorizontalSlider>
        <Card cardClass="card" title={""} description={""} id={""} review={0} />
        <Card cardClass="card" title={""} description={""} id={""} review={0} />
        <Card cardClass="card" title={""} description={""} id={""} review={0} />
        <Card cardClass="card" title={""} description={""} id={""} review={0} />
        <Card cardClass="card" title={""} description={""} id={""} review={0} />
      </HorizontalSlider>
    </section>
  );
};

export default NewProductSection;
