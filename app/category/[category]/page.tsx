"use client";

import React from "react";
import Home from "./Home";

export default function page({ params }: { params: { category: string } }) {
  return (
    <div>
      <Home category={params.category}/>
    </div>
  );
}
