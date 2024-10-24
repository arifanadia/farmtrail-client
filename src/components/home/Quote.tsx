import Image from "next/image";
import React from "react";

const Quote = () => {
  return (
    <section className="relative my-24">
      <div className="w-[80%]">
        <Image src="/quote.gif" alt="" width={800} height={500} className="w-full lg:w-[850px] h-auto" unoptimized />
      </div>
      <div className="bg-black absolute top-[25%] left-[10%] sm:left-[40%] p-6 sm:p-12 max-w-[90%] sm:max-w-[60%">
        <h3 className="body-bold lg:h3-bold lg:w-[70%]">
          Organic is a “whole system” approach to farming and food production.
          It recognises the interrelationships between all parts of the
          production
        </h3>
        <div className="flex justify-between items-center mt-6">
          <div>
            <h4 className="base-bold text-light_green my-2">Jordan Ntolo</h4>
            <p className="subtle-regular lg:small-regular text-light-2">Owner Agria Company</p>
          </div>
          <Image src="/png/Quote-icon.png" alt="quote" width={70} height={70} className="w-[40px] lg:w-[70px] h-auto"/>
        </div>
      </div>
    </section>
  );
};

export default Quote;
