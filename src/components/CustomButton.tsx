"use client";
import { useRef } from "react";
import gsap from "gsap";

const CustomButton = ({
  title,
  className,

}: {
  title: string;
  type: string;
  label: string;
  className?: string;
}) => {
  const buttonRef = useRef(null);

  // Hover animation to move the button relative to the main div
  const handleHover = () => {
    gsap.to(buttonRef.current, {
      top: "-3px",
      left: "-6px",
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  // Reset animation when mouse leaves
  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      top: "0px",
      left: "0px",
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  return (
    <div className={`relative border-2 border-green rounded-lg ${className}`}>
      <button
        type="submit"
        ref={buttonRef}
        className="bg-green text-white font-dmSans small-bold xl:base-bold  w-full h-full flex items-center justify-center absolute rounded-lg"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
