import React from "react";
export const metadata = {
  title: "UniSmart | Search",
  description:
    "Discover, Search and explore a vast selection of high-quality BSc notes and exam papers, tailored to meet your academic needs.",
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
