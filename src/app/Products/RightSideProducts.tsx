"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Timer from "@/components/ui/Timer";
import Image from "next/image";
import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const RightSideProducts = () => {
  const [values, setValues] = useState<[number, number]>([100, 900]);
  const categories = [
    "ALl Products",
    "Berris",
    "Milk Products",
    "Fruits",
    "Vegetables",
    "Equipment",
    "Boxes and Bundles",
  ];

  const handleSliderChange = (newValues: [number, number]) => {
    setValues(newValues);
  };
  return (
    <aside className="mt-6">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search Products..."
          className="search-input"
        ></Input>
        <IoSearchSharp className="absolute text-lg font-extrabold right-4 top-1/2 transform -translate-y-1/2 text-light_green pointer-events-none" />
      </div>
      <div>
        <h3 className="body-bold uppercase my-8">Products Categories</h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-3 ">
              <div className="border-y-4 border-l-2 border-r-4 border-light_green size-3"></div>
              <h3 className="body-bold ">{category}</h3>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="body-bold uppercase my-8">Products Categories</h3>
        <div className="flex gap-4 items-center">
          <Image
            src={"/argula.jpeg"}
            alt="argula"
            width={150}
            height={150}
            className="object-cover size-28"
          />
          <div>
            <h5 className="base-semibold">Fresh argula</h5>
            <span className="body-bold text-light_green">$ 4.87</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="body-bold uppercase mt-10 mb-6">Filter price</h3>
        <div className="w-full max-w-full mx-auto ">
          <RangeSlider
            id="range-slider-ab"
            className="h-4 bg-gray-700"
            min={0}
            max={1000}
            step={1}
            value={values}
            onInput={handleSliderChange}
            thumbClassName="w-8 h-8 rounded"
            rangeClassName="bg-red-500"
          />
          <div className="flex justify-between mt-6 text-light-2 small-medium">
            <div className="">From ${values[0]}</div>
            <div className="">TO ${values[1]}</div>
          </div>
        </div>
        <Button className="mt-6 w-full text-dark-2 hover:text-light-1 bg-light_green hover:border-2 hover:border-light_green px-6 py-3 base-bold transition-all ease-in">
          Filter
        </Button>
      </div>
      <div className="mt-8 relative">
        <Image
          src={"/insta/story1.jpg"}
          alt="Raspberries"
          width={500}
          height={500}
          className="object-cover size-96 "
        />
        <div className=" absolute top-0 h-96 w-[304px] bg-black bg-opacity-40 "></div>
        <h3 className="h3-bold uppercase absolute top-6 px-6">
          <span className="text-light_green bg-black">-50%</span> Traditional
          veggie box
        </h3>
        <div className="bg-black p-4 absolute top-28 mx-6">
          <Timer duration={2 * 24 * 60 * 60 * 1000} />
        </div>
      </div>
    </aside>
  );
};

export default RightSideProducts;
