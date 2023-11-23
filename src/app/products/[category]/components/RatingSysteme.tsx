"use client";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StarFill } from "react-bootstrap-icons";
import RatingBar from "./RatingBar";
import uuid from "react-uuid";
import useSetToken from "@/hooks/useSetToken";
import { useRouter } from "next/navigation";
import useCustomeFetch from "@/hooks/useCustomeFetch";
import useAxiosInterceptors from "@/app/(auth)/hooks/useAxiosInterceptors";
import { useSelectore } from "@/redux/store";
import axios from "axios";
import { axiosAuth } from "@/app/(auth)/api/axiosAuth";

const RatingSysteme = ({
  x,
  s,
  totalNum,
  show,
  productId,
}: {
  x: number;
  s: number[];
  totalNum: number;
  show: boolean;
  productId: string;
}) => {
  const [value, setValue] = useState<number | null>(0);
  const [rated, setRated] = useState<number | null>(null);
  const axiosInterceptors = useAxiosInterceptors();
  const router = useRouter();
  const email = useSelectore((state) => state.user.email);

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          const res = await axiosAuth({
            url: "/product/getproductreview",
            data: JSON.stringify({
              email: email,
              productId,
            }),
          });
          setRated(res.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [email, productId]);

  console.log(rated);

  const handleRating = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    // const controller = new AbortController();
    try {
      const resp = await axiosInterceptors({
        url: "/product/postreview",
        data: JSON.stringify({
          email,
          productId,
          review: newValue,
        }),
      });
      setValue(newValue);
    } catch (err) {
      setValue(0);
      router.push("/log-in");
    }
  };
  return (
    <div
      className={`mt-16 flex flex-col gap-6 w-[100%] transition ease-in-out duration-150 justify-center`}
      style={{ transform: `translateX(${x}px)` }}
    >
      <Rating
        name="hover-feedback"
        value={rated != null ? rated : value}
        onChange={handleRating}
        emptyIcon={<StarFill style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <div className="flex flex-col gap-4 h-full w-full">
        {s.map((num) => {
          return (
            <RatingBar
              key={uuid()}
              percentage={() => {
                return (num / totalNum) * 100;
              }}
              show={show}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingSysteme;
