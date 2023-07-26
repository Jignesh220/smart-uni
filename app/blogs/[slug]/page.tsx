import React from 'react'
import { Navbar } from '@/app/Reuseable/Navbar'
import Footer from '@/app/Reuseable/Footer'
import SmoothScrollbar from '@/app/Reuseable/SmoothScrollbar'
import dynamic from "next/dynamic";
const BlogItem = dynamic(() => import("./BlogItems"), { ssr: false });


export default function page({ params }: { params: { slug: string } }) {
  return (
    <SmoothScrollbar>
      <Navbar/>
      <BlogItem id={params.slug}/>
      <Footer/>
    </SmoothScrollbar>
  )
}
