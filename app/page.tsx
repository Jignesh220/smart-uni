
import Image from 'next/image'
import { Navbar } from './Reuseable/Navbar'
import Home from './Home/Home'
import Category from './Home/Category'
import Footer from './Reuseable/Footer'
import Degree from './Home/Degree'
import AdSense from './googleAds/AdSense'

export default function Index() {
  return (
    <main>
      <Navbar/>
      <Home/>
      <Category/>
      <AdSense/>
      <Degree/>
      <Footer/>
    </main>
  )
}
