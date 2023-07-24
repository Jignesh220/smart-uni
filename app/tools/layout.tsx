import React from "react";
export const metadata = {
  title: "UniSmart | Tools",
  description:
    "Discover a vast selection of high-quality tools.",
};

export default function BscLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {children}
      </section>
    );
  }
