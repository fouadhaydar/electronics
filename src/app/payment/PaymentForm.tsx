"use client";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  //   const [clientSecret, setClientSecret] = useState<string>();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message || "");
    }
    setIsLoading(false);
  };
  return (
    // <div id="checkout">
    //   {clientSecret && (
    //     <EmbeddedCheckoutProvider
    //       stripe={stripePromise}
    //       options={{ clientSecret }}
    //     >
    //       <EmbeddedCheckout />
    //     </EmbeddedCheckoutProvider>
    //   )}
    // </div>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <button disabled={isLoading || !stripe || !elements}>
        {isLoading ? "Loading..." : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};
