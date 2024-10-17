"use client";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CustomButton from "@/components/CustomButton";

const Hero = () => {
  const cowRef = useRef(null);
  const henRef = useRef(null);
  const farmerRef = useRef(null);
  const vegetablesRef = useRef(null);
  const reviewRef = useRef(null);
  
  useEffect(() => {
    gsap.from(cowRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
      onComplete: () => {
        gsap.to(cowRef.current, { x: 0, opacity: 1 });
    
      },
    });
    gsap.from(henRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
      onComplete: () => {
        gsap.to(henRef.current, { y: 0, opacity: 1 });
      },
    });
    gsap.from(farmerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.4,
      onComplete: () => {
        gsap.to(farmerRef.current, { y: 0, opacity: 1 });
   
      },
    });
    gsap.from(vegetablesRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
      onComplete: () => {
        gsap.to(vegetablesRef.current, { y: 0, opacity: 1 });

      },
    });
    gsap.to(reviewRef.current, {
      x: 20, 
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.8,
      onComplete: () => {
        gsap.to(reviewRef.current, { y: 0, opacity: 1 });
      },
    });
  }, []);

  return (
    <section className="relative flex flex-col sm:flex-row justify-between gap-80 lg:my-24">
      <div className="w-[50%]">
        
        <div className="absolute border-2 border-light_green rounded-lg w-[270px] h-[200px] xl:h-[300px] xl:w-[500px] lg:top-14 top-60 md:top-[75px] "></div>

        <Image
          src="/png/cow.png"
          alt="cow"
          height={200}
          width={260}
          ref={cowRef}
          className="absolute xl:top-[100px] top-[308px] md:  xl:w-[260px] w-[140px]"
        />
        <Image
          src="/png/hen.png"
          alt="hen"
          height={80}
          width={100}
          ref={henRef}
          className="absolute xl:top-64 top-[376px] left-40 xl:left-64 w-[60px] xl:w-[100px] "
        />
        <Image
          src="/png/farmer.png"
          alt="farmer"
          height={200}
          width={250}
          ref={farmerRef}
          className="absolute top-[242px] xl:-top-14 left-20 w-[120px] xl:w-[250px]"
        />
        <Image
          src="/png/vegetables.png"
          alt="vegetables"
          height={100}
          width={150}
          ref={vegetablesRef}
          className="absolute xl:top-64 top-[378px] left-10 w-[80px] xl:w-[150px]"
        />

        {/* Review container with ref for animation */}
        <div ref={reviewRef} className="absolute bg-white shadow-md p-4 rounded-xl w-[200px] xl:w-[350px] left-[150px] top-[130px] xl:left-[300px] xl:top-[10px]" style={{ opacity: 0 }}>
          <h3 className="xl:body-bold subtle-bold  text-dark-2">What Farmers Say</h3>
          <p className="mt-2 text-dark-2 tiny-medium xl:base-semibold w-[80%]">
            &quot;FarmTrail has been a game-changer for us! The platform connects us directly with buyers, making the process smooth and transparent.&quot;
          </p>
          <p className="mt-4 text-sm subtle-semibold text-gray-700">
            - John Doe, Farmer
          </p>
          <Image
            src="/png/grass.png"
            alt="grass"
            width={100}
            height={40}
            className="absolute bottom-0 right-0"
          />
        </div>

      </div>
      <div className="lg:ml-36 2xl:ml-0 mt-24 md:mt-0 text-center sm:text-left" >
        <span className="lg:small-semibold tiny-medium uppercase text-light_green">
          global Nutrition
        </span>
        <h1 className="body-bold 2xl:h2-bold 3xl:h1-bold uppercase">
          Have a safe and <br /> productive harvest
        </h1>
        <p className="small-regular xl:menu-regular text-light-2 w-[100%] xl:w-[80%] mb-8 xl:mb-20">
          Cras sed felis eget velit aliquet sagittis. Varius quam quisque id diam vel quam. Odio ut sem nulla pharetra diam sit. Cras sed felis
          eget velit aliquet sagittis. Varius quam quisque id diam vel quam
        </p>
        <div className="flex justify-center md:justify-start gap-3 xl:gap-8 items-center">
        <CustomButton title="Learn More" type="" label="" className="w-40 h-12" />
          <Link href='' className="flex items-center gap-2">
            <div className="border-2 border-light_green p-2 xl:p-4 rounded-full transition-all duration-300 ease-in-out hover:bg-light_green">
              <FaPlay className="text-light_green text-sm xl:text-base transition-all duration-300 ease-in-out hover:text-white" />
            </div>
            <button className="bg-transparent xl:base-bold small-bold border-none text-light_green transition-all duration-300 ease-in-out">
              Watch About Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
