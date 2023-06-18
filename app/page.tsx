
import Image from 'next/image'
import { Navbar } from './Reuseable/Navbar'
import Home from './Home/Home'
import Category from './Home/Category'
import Footer from './Reuseable/Footer'
import Degree from './Home/Degree'
import Head from 'next/head'
import Home2 from './Home/Home2'

export default function Index() {
  return (
    <main>
      <Head>
        <title>UniSol | Home</title>
      </Head>
      <Navbar/>
      <Home2/>
      <Category/>
      <Degree/>
      <Footer/>
    </main>
  )
}
