import AboutIntro from '@/components/about/AboutIntro'
import Overview from '@/components/about/Overview'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <main className="max-w-7xl mx-auto  min-h-screen pt-20 ">
      <div className="mt-12 h-16 w-full flex justify-center items-center base-semibold gap-4 bg-[#272727] py-4">
        <Link href={"/"}>Home</Link>
        <div className="border-b-4 border-light-br w-6 mt-1"></div>
        <Link href={"/products"} className="text-light_green">About</Link>
      </div>
      <div>
        <AboutIntro />
        <Overview />
      </div>
    </main>
  )
}

export default About