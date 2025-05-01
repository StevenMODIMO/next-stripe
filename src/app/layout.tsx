import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pay Me!!",
    template: "%s | Pay Me!!",
  },
  description: "A simple payment gateway with Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url(public/bg.jpeg)]">{children}</body>
    </html>
  );
}
