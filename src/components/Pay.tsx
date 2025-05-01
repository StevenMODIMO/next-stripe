"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Pay() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const payHandler = async () => {
    if (!currency || !amount || Number(amount) < 1 || Number(amount) > 10000)
      return;
    setLoading(true);
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      setClientSecret(json.clientSecret);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(json);
    }
  };

  return (
    <div className="font-medium w-[90%] mx-auto p-4 md:w-[70%] lg:w-[50%]">
      {!clientSecret ? (
        <form className="flex flex-col gap-6 text-sm bg-[#1b1b1b] py-4 px-6 rounded-tr rounded-bl">
          <label className="flex flex-col gap-2">
            <span className="flex gap-2 items-center text-white">
              <MdCurrencyExchange />
              <span>Choose currency</span>
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="outline-none rounded-tr rounded-bl p-2 border bg-[#1b1b1b] border-white text-white font"
            >
              <option value="">--Choose a currency--</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
            {currency && (
              <p className="text-white">Selected Currency: {currency}</p>
            )}
          </label>
          <label className="flex flex-col gap-2">
            <span className="flex gap-2 items-center text-white">
              <FaMoneyBillWave />
              <span>Amount: {currency}</span>
            </span>
            <input
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                const number = Number(value);
                if (/^\d*$/.test(value) && number >= 1 && number <= 10000) {
                  setAmount(value);
                }
              }}
              placeholder={`Enter amount in: ${currency}`}
              className="text-white outline-none rounded-tr rounded-bl p-2 border border-white font"
            />
          </label>
          <button
            onClick={payHandler}
            className={`w-fit mx-auto text-white p-2 rounded-tr rounded-bl cursor-pointer bg-green-400 hover:bg-white hover:border-2 hover:border-green-400 hover:text-black transition-all duration-200 ease-in-out hover:dark:text-white hover:dark:bg-[#1f1f1f] ${
              !currency ||
              !amount ||
              Number(amount) < 1 ||
              Number(amount) > 10000 ||
              loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              !currency ||
              !amount ||
              Number(amount) < 1 ||
              Number(amount) > 10000 ||
              loading
            }
          >
            {!loading ? (
              <span>Start payment</span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="border-2 border-t-transparent border-white rounded-full animate-spin h-5 w-5"></span>
                <span>Processing</span>
              </span>
            )}
          </button>
        </form>
      ) : (
        <div className="overflow-y-auto">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "flat",
                labels: "floating",
                variables: {
                  colorPrimary: "#34d399",
                  colorBackground: "#1b1b1b",
                  colorText: "#ffffff",
                  colorDanger: "#ef4444",
                  fontFamily: "Inter, sans-serif",
                  spacingUnit: "2px",
                  borderRadius: "2px",
                },
                rules: {
                  ".Input": {
                    color: "#ffffff",
                    backgroundColor: "#1b1b1b",
                    borderColor: "#ffffff",
                    padding: "8px",
                  },
                  ".Input:focus": {
                    borderColor: "#34d399",
                  },
                  ".Label": {
                    color: "#ffffff",
                  },
                  ".Tab": {
                    backgroundColor: "#1b1b1b",
                    borderColor: "#ffffff",
                  },
                  ".Tab:hover": {
                    color: "#34d399",
                  },
                  ".Tab--selected": {
                    color: "#34d399",
                    borderColor: "#34d399",
                  },
                },
              },
            }}
          >
            <div className="p-4">
              <PaymentForm />
            </div>
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
  const [loading, setLoading] = useState(false);

  const confirmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
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
      setLoading(false);
      setMessage(error.message ?? "An unexpected error occurred.");
    }
  };
  return (
    <div>
      <form onSubmit={confirmHandler}>
        <PaymentElement options={{ layout: "auto" }} />
        <button className="w-fit my-3 mx-auto text-white p-2 rounded-tr rounded-bl cursor-pointer bg-green-400">
          {!loading ? (
            <span>Complete Payment</span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="border-2 border-t-transparent border-white rounded-full animate-spin h-5 w-5"></span>
              <span>Processing</span>
            </span>
          )}
        </button>
      </form>
      {message && (
        <div className="rounded-tr rounded-bl font-medium text-sm text-center p-2 text-white bg-red-400 w-fit mx-auto">
          {message}
        </div>
      )}
    </div>
  );
};
