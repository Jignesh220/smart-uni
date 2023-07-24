import React from "react";
export const metadata = {
  title: "UniSmart | Add Watermark To PDF",
  description:
    "Add Watermark to PDF",
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
