"use client";
import { getOneProduct, getProducts } from "@/app/fetchData";
import Card from "@/components/Card";
import { useSelectore } from "@/redux/store";
import { PhoneCard } from "@/types";
import React, { useEffect, useState } from "react";

const Phones = ({ params }: { params: { category: string } }) => {
  const [phones, setPhones] = useState<PhoneCard[]>([]);
  const [filterdPhones, setFilterdPhones] = useState<PhoneCard[]>([]);

  //   console.log(params);
  useEffect(() => {
    const phones = async () => {
      return await getProducts(params.category);
    };
    phones().then((res) => {
      setPhones(res);
      setFilterdPhones(res);
    });
  }, []);

  console.log(phones);

  const select = useSelectore(
    (state) => state.ManufacturerSliceReducer.manufacturerid
  );
  const selectName = useSelectore(
    (state) => state.ManufacturerSliceReducer.manufacturerName
  );

  useEffect(() => {
    if (select == 0) {
      setFilterdPhones(() => [...phones]);
    } else {
      setFilterdPhones(() => [
        ...phones.filter((phone) => phone.manufacturerId === select),
      ]);
    }
  }, [select]);

  useEffect(() => {
    setFilterdPhones(() => [
      ...phones.filter((phone) =>
        phone.title.toLowerCase().startsWith(selectName.toLowerCase())
      ),
    ]);
  }, [selectName]);

  return (
    <section className="mt-8">
      <div className="grid_card">
        {filterdPhones &&
          filterdPhones.map((phone) => (
            <Card
              cardClass="card_plus"
              key={phone.id}
              title={phone.title}
              description={phone.description}
              id={phone.id}
              review={phone.review}
              categoryName={params.category}
              // imageUrl={phone.imageUrl}
            />
          ))}
      </div>
    </section>
  );
};

export default Phones;
