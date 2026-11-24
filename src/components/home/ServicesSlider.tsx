"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

const ServicesSlider = () => {
  const slidesContainerRef = useRef<HTMLDivElement>(null);
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!slidesContainerRef.current) return;
    // Animate the slides container based on dynamic xPercentage
    gsap.to(slidesContainerRef.current, {
      x: `-${currentIndex * xPercentage}%`,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, [currentIndex, xPercentage]);

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        ref={slidesContainerRef}
        className="slides-container flex gap-4 mt-6"
        style={{ width: `${services.length * slideWidth}%` }} // Dynamic width
      >
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="flex-shrink-0 group"
            style={{ width: `${slideWidth}%` }}
          >
            <h2 className="base-medium lg:h3-medium text-white group-hover:text-light_green transition-colors mb-4">
              {service.title}
            </h2>
            <Image
              src={service.image}
              alt={service.title}
              width={320}
              height={170}
              className="object-cover w-full h-40 rounded transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
