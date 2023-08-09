"use client";
import React from "react";
import { Navbar } from "../Reuseable/Navbar";
import Footer from "../Reuseable/Footer";
import Home from "./Home";
import SmoothScrollbar from "../Reuseable/SmoothScrollbar";

export default function page() {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
