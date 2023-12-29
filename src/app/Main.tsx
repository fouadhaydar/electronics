"use client";

import {
  getPriceFromLocalStorage,
  getProductsFromLocalStorage,
} from "@/functions/LocalStorageFunctions";
import { setCartFromLocalStorage } from "@/redux/features/product-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosAuth } from "./(auth)/api/axiosAuth";
import { setUserCredentials } from "@/redux/features/auth/userSlice";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let products = getProductsFromLocalStorage();
    let price = getPriceFromLocalStorage();

    const controller = new AbortController();
    const auth = async () => {
      try {
        const res = await axiosAuth.post("/user/refreshtoken", {
          signal: controller.signal,
        });
        dispatch(
          setUserCredentials({ email: res.data.email, token: res.data.token })
        );
      } catch (error) {
        console.log("error");
      }
    };
    auth();
    dispatch(setCartFromLocalStorage({ data: products || [], price }));

    return () => {
      controller.abort();
    };
  }, []);

  return <></>;
};

export default Main;
