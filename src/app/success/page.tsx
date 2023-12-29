"use client";
import { clearCart } from "@/redux/features/product-slice";
import { Alert, AlertTitle } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <section className="container mt-12 h-[100vh] flex items-center w-full">
      <Alert severity="success" className="w-full py-6 rounded-md">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    </section>
  );
};

export default Success;
