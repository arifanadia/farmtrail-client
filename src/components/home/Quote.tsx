import Image from "next/image";
import React from "react";

const Quote = () => {
  return (
    <section className="relative my-24">
      <div className="w-[80%]">
        <Image src="/Quote.gif" alt="" width={800} height={500} className="w-[850px] h-[500px]" />
      </div>
      <div className="bg-black absolute top-[25%] left-[40%] p-12">
        <h3 className="h3-bold w-[70%]">
          Organic is a “whole system” approach to farming and food production.
          It recognises the interrelationships between all parts of the
          production
        </h3>
        <div className="flex justify-between items-center mt-6">
          <div>
            <h4 className="base-bold text-light_green my-2">Jordan Ntolo</h4>
            <p className="small-regular text-light-2">Owner Agria Company</p>
          </div>
          <Image src="/png/Quote-icon.png" alt="quote" width={70} height={70} />
        </div>
      </div>
    </section>
  );
};

export default Quote;
