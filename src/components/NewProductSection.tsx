"use client";

import HorizontalSlider from "./HorizentalSlider";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import Card from "./Card";

const NewProductSection = ({ header }: { header: string }) => {
  return (
    <section className="container mt-16 h-[500px]">
      <h2 className="text-gray-500 text-center md:text-4xl xsm:text-xl">
        {header}
      </h2>
      {/* cart of new product */}
      {/* <HorizontalSlider
        PrevElement={ArrowLeftCircle}
        NextElement={ArrowRightCircle}
      >
        <Card cardClass="card" title={""} description={""} id={""} />
        <Card cardClass="card" />
        <Card cardClass="card" />
        <Card cardClass="card" />
        <Card cardClass="card" />
        <Card cardClass="card" />
        <Card cardClass="card" />
      </HorizontalSlider> */}
    </section>
  );
};

export default NewProductSection;
