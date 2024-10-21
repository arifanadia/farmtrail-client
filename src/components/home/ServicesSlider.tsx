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
  const [slideWidth, setSlideWidth] = useState(0); // Dynamic slide width
  const [xPercentage, setXPercentage] = useState(0); // GSAP x percentage

  const updateSliderValues = () => {
    const screenWidth = window.innerWidth;

    // Calculate values based on screen width
    if (screenWidth >= 1024) {
      // For large screens
      setSlideWidth(20); // Each slide takes 20% of the container
      setXPercentage(15); // Move by 15% on large screens
    } else {
      // For small screens
      setSlideWidth(40); // Each slide takes 40% of the container
      setXPercentage(40); // Move by 40% on small screens
    }
  };

  useEffect(() => {
    // Initialize values on mount
    updateSliderValues();

    // Add a resize listener to update values dynamically
    window.addEventListener("resize", updateSliderValues);

    return () => window.removeEventListener("resize", updateSliderValues);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate the slides container based on dynamic xPercentage
    gsap.to(".slides-container", {
      x: `-${currentIndex * xPercentage}%`,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, [currentIndex, xPercentage]);

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className="slides-container flex gap-4 mt-6"
        style={{ width: `${slides.length * slideWidth}%` }} // Dynamic width
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0" style={{ width: `${slideWidth}%` }}>
            <h2 className="base-medium lg:h3-medium text-white mb-4">{slide.title}</h2>
            <Image
              src={slide.img}
              alt={slide.title}
              width={320}
              height={170}
              className="object-cover w-full h-40"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
