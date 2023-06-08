import React from "react";
import Footer from "../Reuseable/Footer";
import { Navbar } from "../Reuseable/Navbar";
export const metadata = {
  title: "UniSmart | Contact Us",
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
        <Navbar/>
        {children}
        <Footer/>
      </section>
    );
  }
