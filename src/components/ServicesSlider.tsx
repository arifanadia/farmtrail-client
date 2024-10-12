"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface Slide {
  title: string;
  img: string;
}

const slides: Slide[] = [
  { title: "Farm Services", img: "/Service/farm-service.jpg" },
  { title: "Agriculture", img: "/Service/Agriculture.jpg" },
  { title: "Food & Beverage", img: "/Service/food.jpg" },
  { title: "Animal Services", img: "/Service/animal.jpg" },
  { title: "Education and Training", img: "/Service/Education & Training.jpg" },
  { title: "Tech & Innovation", img: "/Service/Technology & innovation.jpg" },
  { title: "Agri Financial Service", img: "/Service/finacial.jpg" },
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (slides.length - 3));
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(".slides-container", {
      x: `-${currentIndex * 35}%`,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="slides-container flex" style={{ width: `${slides.length * 23}%` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-1/4"> 
            <h2 className="h3-medium text-white mb-4">{slide.title}</h2>
            <Image
              src={slide.img}
              alt={slide.title}
              width={320}
              height={170}
              className="object-cover h-40"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
