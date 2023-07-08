import React from 'react'
import { Navbar } from '../Reuseable/Navbar'
import Home from './Home'
import Footer from '../Reuseable/Footer'
import SmoothScrollbar from '../Reuseable/SmoothScrollbar'

export default function page() {
  return (
    <>
        <Navbar/>
        <Home/>
    </>
  )
}
