
import Image from 'next/image'
import { Navbar } from './Reuseable/Navbar'
import Home from './Home/Home'
import Category from './Home/Category'
import Footer from './Reuseable/Footer'
import Degree from './Home/Degree'
import Head from 'next/head'

export default function Index() {
  return (
    <main>
      <Head>
        <title>UniSol | Home</title>
      </Head>
      <Navbar/>
      <Home/>
      <Category/>
      <Degree/>
      <Footer/>
    </main>
  )
}
