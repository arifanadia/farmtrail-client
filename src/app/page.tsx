"use client"
import About from "@/components/About";
import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import Provide from "@/components/Provide";
import Quote from "@/components/Quote";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";
import InstaStories from "@/components/InstaStories";
import Contact from "@/components/Contact";

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
