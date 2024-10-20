import Image from "next/image";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Typewriter from 'typewriter-effect';

const Provide = () => {
  return (
    <section className="container max-w-7xl mx-auto px-4">
      <div className="flex items-center">
        <span className="subtle-semibold text-light_green uppercase flex-1">
          Quality Products
        </span>
        <div className="w-[72%]">
          <h2 className="h2-bold w-full">
            <Typewriter
              options={{
                strings: [
                  "We provide our growers with the best quality products available"
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 50,
              }}
            />
          </h2>
          <p className="subtle-regular w-[68%]">
            Odio ut sem nulla pharetra diam sit amet nisl suscipit. Amet aliquam
            id diam maecenas ultricies mi eget mauris. Leo vel orci porta non
            pulvinar neque
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 flex-wrap lg:flex-nowrap">
        <div className="py-8 pl-8 pr-12 flex items-center border-2 border-light-br hover:scale-105 hover:shadow-lg hover:border-light_green transition-transform duration-300">
          <Image
            src="/Service/Natural-products.jpg"
            width={160}
            height={160}
            alt="Natural products"
            className="size-40 object-cover"
            loading="lazy"
          />
          <h2 className="h3-medium text-white">Natural Products</h2>
        </div>
        <div className="py-8 pl-8 pr-12  flex items-center border-2 border-light-br my-12 hover:scale-105 hover:shadow-lg hover:border-light_green transition-transform duration-300">
          <Image
            src="/Service/innovation.jpg"
            width={180}
            height={180}
            alt="Innovation and Expertise"
            className="size-40 object-cover"
            loading="lazy" 
          />
          <div>
            <h2 className="h3-medium text-white">Innovation and Expertise</h2>
            <div className="mt-4 space-y-1">
              <span className="flex items-center gap-2 text-[12px] animate-bounce">
                <FaCircleCheck className="text-sm text-light_green" />
                Successful Food
              </span>
              <span className="flex items-center gap-2 text-[12px] animate-bounce">
                <FaCircleCheck className="text-sm text-light_green" />
                Beverage Products
              </span>
            </div>
          </div>
        </div>
        <div className="py-8 pl-8 pr-12 flex items-center border-2 border-light-br hover:scale-105 hover:shadow-lg hover:border-light_green transition-transform duration-300">
          <Image
            src="/Service/animal-nutration.jpg"
            width={200}
            height={200}
            alt="Animal Nutrition Products"
            className="size-40 object-cover"
            loading="lazy"  
          />
          <h2 className="h3-medium text-white">Animal Nutrition Products</h2>
        </div>
      </div>
    </section>
  );
};

export default Provide;
