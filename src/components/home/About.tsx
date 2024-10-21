import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row justify-end items-center gap-14 lg:ml-44 py-12 text-center lg:text-left ">
      <div className="flex-1">
        <div>
          <span className="subtle-semibold text-light_green uppercase">
            About Company
          </span>
          <h2 className="h3-bold lg:h2-bold">
            We Provide a Full Range <br />
            of Services
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4 mt-4">
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className="base-medium lg:h3-medium hover:text-light_green hover:no-underline transition-colors duration-300 ">
              We support growers with personalized services
            </AccordionTrigger>
            <AccordionContent className=" text-light-2 rounded-md">
              Euismod elementum nisi quis eleifend quam adipiscing vitae proin.
              Pellentesque diam volutpat commodo sed egestas. Ante metus dictum
              at tempor commodo ullamcorper. Morbi tempus iaculis urna id
              volutpat lacus laoreet. Donec pretium vulputate sapien nec
              sagittis aliquam. Fames ac turpis egestas sed tempus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="base-medium lg:h3-medium hover:text-light_green hover:no-underline transition-colors duration-300">
            Our innovations are helping people live healthier lives
            </AccordionTrigger>
            <AccordionContent className=" text-light-2 rounded-md">
              Euismod elementum nisi quis eleifend quam adipiscing vitae proin.
              Pellentesque diam volutpat commodo sed egestas. Ante metus dictum
              at tempor commodo ullamcorper. Morbi tempus iaculis urna id
              volutpat lacus laoreet. Donec pretium vulputate sapien nec
              sagittis aliquam. Fames ac turpis egestas sed tempus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="base-medium lg:h3-medium hover:text-light_green hover:no-underline transition-colors duration-300">
            Innovative solutions for consumers seeking foods
            </AccordionTrigger>
            <AccordionContent className=" text-light-2 rounded-md">
              Euismod elementum nisi quis eleifend quam adipiscing vitae proin.
              Pellentesque diam volutpat commodo sed egestas. Ante metus dictum
              at tempor commodo ullamcorper. Morbi tempus iaculis urna id
              volutpat lacus laoreet. Donec pretium vulputate sapien nec
              sagittis aliquam. Fames ac turpis egestas sed tempus.
            </AccordionContent>
          </AccordionItem>
          </Accordion>
      </div>
      <div className="">
        <Image
          src="/about.jpg"
          width={400}
          height={300}
          alt="A depiction of our services and support for growers"
          className="object-cover size-[500px] rounded-md"
        />
      </div>
    </section>
  );
};

export default About;
