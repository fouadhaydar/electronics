"use client";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env["NEXT_PUBLIC_PK"]!);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch("http://192.168.1.11:5148/api/create-payment-intent/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `[
          {
            "productId": "d9a3345f-2588-4a28-897c-3c818b29ba23",
            "productVariantId": "0e74794f-2c20-400b-8434-0e6c13a00db8",
            "qty": 2
          }
        ]`,
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.log(err));
  }, []);

  const options = {
    clientSecret,
  };

  if (!clientSecret) {
    return <div>Loding ...</div>;
  }

  return (
    <div className="container mt-12">
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm />
      </Elements>
    </div>
    // <div>payment</div>
  );
};

export default PaymentPage;
