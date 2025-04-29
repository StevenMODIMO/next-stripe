"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Pay() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const payHandler = async () => {
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: 500 * 100,
        currency: "usd",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      setClientSecret(json.clientSecret);
    } else {
      console.log(json);
    }
  };
  const appearance = {
    theme: "stripe",
  };
  return (
    <div className="h-[60%] w-full flex items-center justify-center">
      {!clientSecret ? (
        <button
          onClick={payHandler}
          className="text-white p-2 rounded-tr rounded-bl text-xl font-medium cursor-pointer bg-green-400 hover:bg-white hover:border-2 hover:border-green-400 hover:text-black transition-all duration-200 ease-in-out hover:dark:text-white hover:dark:bg-[#1f1f1f]"
        >
          Start payment
        </button>
      ) : (
        <div>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const confirmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });
    if (error) {
      // Show error to your customer (like "Your card was declined")
      setMessage(error.message ?? "An unexpected error occurred.");
    }
  };
  return (
    <div>
      <form onSubmit={confirmHandler}>
        <PaymentElement />
        <button>Complete Payment</button>
      </form>
      {message && (
        <div className="font-medium text-sm text-center p-2 text-white ">
          {message}
        </div>
      )}
    </div>
  );
};
