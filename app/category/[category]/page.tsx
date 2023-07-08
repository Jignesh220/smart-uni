"use client";

import React from "react";
import Home from "./Home";
import SmoothScrollbar from "@/app/Reuseable/SmoothScrollbar";
import Footer from "@/app/Reuseable/Footer";

export default function page({ params }: { params: { category: string } }) {
  return (
    <SmoothScrollbar>
      <Home category={params.category}/>
      <Footer/>
    </SmoothScrollbar>
  );
}
