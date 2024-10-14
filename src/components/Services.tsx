"use client";
import CountUp from "react-countup"; // Import CountUp
import ServicesSlider from "./ServicesSlider";

const Services = () => {
  return (
    <section className="flex justify-end items-center gap-14 my-24 container ml-28 ">
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
      <div className="">
        <ServicesSlider />
      </div>
    </section>
  );
};

export default Services;
