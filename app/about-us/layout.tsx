import React from 'react'
import { Navbar } from '../Reuseable/Navbar';
import Footer from '../Reuseable/Footer';
export const metadata = {
    title: "UniSmart | About Us",
    description:
      "About UniSmart",
  };
  
  export default function AdminLayout({
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
