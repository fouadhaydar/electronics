"use client";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Nav from "@/components/navBar/Nav";
import { useSelectore } from "@/redux/store";
import { useRouter } from "next/navigation";
import useAxiosInterceptors from "../(auth)/hooks/useAxiosInterceptors";

const stripePromise = loadStripe(process.env["NEXT_PUBLIC_PK"]!);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string>();
  const axiosInterceptors = useAxiosInterceptors();

  const products = useSelectore((state) => state.CartSliceSliceReducer.cart);
  const totalPrice = useSelectore(
    (state) => state.CartSliceSliceReducer.totalePrice
  );
  const router = useRouter();

  console.log(products);

  const getData = () => {
    let data: Object[] = [];
    products.forEach((product) => {
      let obj = {
        productId: product.productId,
        productVariantId: product.variationId,
        qty: product.quantity,
      };
      data.push(obj);
    });
    return data;
  };

  useEffect(() => {
    const data = getData();
    const controller = new AbortController();
    console.log(data);

    (async () => {
      try {
        const res = await axiosInterceptors({
          url: "/create-payment-intent/create",
          data: JSON.stringify(data),
          signal: controller.signal,
        });
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      } catch {
        router.push("/log-in");
      }
    })();
    return () => {
      controller.abort();
    };
  }, []);

  const options = {
    clientSecret,
  };

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        Loding ...
      </div>
    );
  }

  return (
    <>
      <Nav bgColor="bg-white" />
      <div className="container mt-12 flex justify-center gap-3">
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      </div>
    </>
    // <div>payment</div>
  );
};

export default PaymentPage;
