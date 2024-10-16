"use client"

import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import InstaStories from "@/components/InstaStories";
import Loader from "@/components/Loader";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";
import Projects from "../components/Projects";
import Provide from "@/components/Provide";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
import About from "./about/page";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const lazyLoad = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(lazyLoad);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className=" relative min-h-screen w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 pt-20  ">
          <div className="w-full mx-auto">
            <Hero />
            <Services />
            <Provide />
            <Projects />
            <About />
            <Testimonials />
            <Quote />
            <Blogs />
            <InstaStories />
            <Contact />
          </div>
        </main>
      )}
    </>
  );
}
