"use client";
import CountUp from "react-countup"; // Import CountUp
import ServicesSlider from "./ServicesSlider";

const Services = () => {
  return (
    <section className="flex items-center gap-14 lg:gap-44 my-24 container mx-auto">
      <div className="">
        <div className="flex items-center gap-3 h2-bold text-light_green">
          <div className="flex items-center gap-1 h2-bold text-light_green -ml-2">
            <CountUp start={0} end={10} duration={2.75} delay={1.5} />
            <span>+</span>
          </div>
          years
        </div>
        <p className="small-semibold mt-3 font-openSans ">
          We are Growing and Selling Organic Food
        </p>
      </div>
      <div>
        <ServicesSlider />
      </div>
    </section>
  );
};

export default Services;
