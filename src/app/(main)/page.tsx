"use client";

import Blogs from "@/components/home/Blogs";
import Contact from "@/components/home/Contact";
import Loader from "@/components/Loader";
import Quote from "@/components/home/Quote";
import Testimonials from "@/components/home/Testimonials";
import { useEffect, useState } from "react";
import Provide from "@/components/home/Provide";
import Services from "@/components/home/Services";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import InstaStories from "@/components/home/InstaStories";

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
        <main className="relative min-h-screen w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto  px-5 pt-20">
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
