
import Image from 'next/image'
import { Navbar } from './Reuseable/Navbar'
import Home from './Home/Home'
import Category from './Home/Category'

export default function Index() {
  return (
    <main>
      <Navbar/>
      <Home/>
      <Category/>
    </main>
  )
}
