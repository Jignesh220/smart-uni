
import Image from 'next/image'
import { Navbar } from './Reuseable/Navbar'
import Home from './Home/Home'
import Category from './Home/Category'
import Footer from './Reuseable/Footer'
import Degree from './Home/Degree'

export default function Index() {
  return (
    <main>
      <Navbar/>
      <Home/>
      <Category/>
      <Degree/>
      <Footer/>
    </main>
  )
}
