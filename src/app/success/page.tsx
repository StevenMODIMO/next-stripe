import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hooray!!",
  description: "Payment Successfull",
};

export default function Success() {
  return (
    <div className="text-white font-medium text-center text-xl flex items-center h-screen w-screen bg-[#1f1f1f] sm:text-5xl sm:justify-center md:text-7xl">
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-100">Thank You, Your Payment Has Been Received!!</div>
    </div>
  );
}
