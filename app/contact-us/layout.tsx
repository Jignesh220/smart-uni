import React from "react";
export const metadata = {
  title: "UniSol | Contact Us",
  description:
    "Discover a vast selection of high-quality BSc notes and exam papers, tailored to meet your academic needs.",
};
export default function ContactUsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
   
        {children}
      </section>
    );
  }
