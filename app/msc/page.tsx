import React from 'react'
import { Navbar } from '../Reuseable/Navbar'
import Home from './Home'
import Footer from '../Reuseable/Footer'

export default function page() {
  return (
    <div>
        <Navbar/>
        <Home/>
    </div>
  )
}
