import Image from "next/image";
import { Navbar } from "./Reuseable/Navbar";
import Home from "./Home/Home";
import Category from "./Home/Category";
import Footer from "./Reuseable/Footer";
import Degree from "./Home/Degree";
import Head from "next/head";
import Home2 from "./Home/Home2";
import SmoothScrollbar from "./Reuseable/SmoothScrollbar";

export default function Index() {
  return (
    <div className="">
      <SmoothScrollbar>
        <Navbar />
        <Home2 />
        <Category />
        <Degree />
        <Footer />
      </SmoothScrollbar>
    </div>
  );
}
