import React from "react";
import { Navbar } from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";
export const metadata = {
  title: "UniSmart | Category",
  description:
    "Discover a vast selection of high-quality notes and exam papers, tailored to meet your academic needs By Category.",
};
export default function DashboardLayout({
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
