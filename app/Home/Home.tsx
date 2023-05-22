"use client";

import React from "react";
import Image from "next/image";
import Avtar from "../../images/home_cover_3.png";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 lg:px-64 md:px-20 min-[0px]:px-8 mt-5">
        <div className="col-span-8 h-auto relative">
          <div className="min-h-full min-w-full flex items-end justify-start lg:pb-8 min-[0px]:pb-0">
            <div className="flex flex-col md:gap-2 min-[0px]:gap-0">
              <div className="lg:text-6xl md:text-4xl min-[0px]:text-xl font-bold font-capriola tracking-tight">Smart <span className="text-rose-600">Learning</span> </div>
              <div className="lg:text-6xl md:text-4xl min-[0px]:text-xl font-bold font-capriola tracking-tight">With</div>
              <div className="lg:text-6xl md:text-4xl min-[0px]:text-xl font-bold font-capriola tracking-tight"><span className="text-blue-600">New-Age</span>  Education</div>
              {/* <button className="bg-blue-500 md:w-44 min-[0px]:w-36 md:p-3 min-[0px]:p-2 md:mt-8 min-[0px]:mt-2 rounded-full shadow-lg shadow-slate-400 font-lexend_deca text-white tracking-wide md:text-lg min-[0px]:text-xs">Get Started</button> */}
            </div>
          </div>
        </div>
        <div className="col-span-4 h-auto">
          <center>
          <Image src={Avtar} alt="home_image"/>
          </center>
        </div>
      </div>
    </div>
  );
}
