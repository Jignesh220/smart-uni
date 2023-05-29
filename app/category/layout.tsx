import React from "react";
import { Navbar } from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";

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
