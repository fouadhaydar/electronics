"use client";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import {
  AddressElement,
  useStripe,
  useElements,
  CardElement,
  ShippingAddressElementComponent,
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
        return_url: `${window.location.origin}/success`,
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
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <AddressElement options={{ mode: "billing" }} />
      <button
        disabled={isLoading || !stripe || !elements}
        className="text-center gradient_blue py-2 w-full my-4 text-white  rounded-md"
      >
        {isLoading ? "Submitting..." : "Pay"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
