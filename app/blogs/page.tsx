import React from "react";
import BlogData from "./BlogData";
import { Navbar } from "../Reuseable/Navbar";
import SmoothScrollbar from "../Reuseable/SmoothScrollbar";
import Footer from "../Reuseable/Footer";

export default function page() {
  return (
    <SmoothScrollbar>
      <Navbar />
      <BlogData />
      <Footer/>
    </SmoothScrollbar>
  );
}
