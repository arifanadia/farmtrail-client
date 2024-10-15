import Image from "next/image";
import React from "react";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBasket2Fill } from "react-icons/bs";
import RightSideProducts from "./RightSideProducts";

const Products = () => {
  return (
    <section className="grid grid-cols-4 gap-12 container mx-auto my-24">
      <div className="col-span-3">
        {/* Top section for sorting */}
        <div className="flex justify-between items-center my-6">
          <span className="uppercase small-medium">
            Showing 1-9 of 20 results
          </span>
          <div className="relative inline-block">
            <select className="appearance-none px-6 py-3 border border-light-2 rounded-none focus:outline-none focus:border-light_green w-[270px] bg-[#272727] text-white">
              <option value="">Default Sorting</option>
              <option value="100">100</option>
              <option value="">Default Sorting</option>
              <option value="">Default Sorting</option>
            </select>
            <IoIosArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light_green pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 ">
          <div className="w-full p-10 border-2 border-light-br">
            <div className="relative">
              <Image
                src={"/Raspberries.jpg"}
                alt="Raspberries"
                width={500}
                height={500}
                className="object-cover size-60"
              />
              <div className="absolute bg-white bg-opacity-10 bottom-0 w-60 p-4 flex justify-end">
                <FiHeart className="text-green text-2xl" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="h3-medium mt-4">Raspberries</h3>

              <div className="flex justify-between mt-3 items-center">
                <div>
                  <div className="flex gap-4 items-center">
                    <h5 className="body-bold text-[#798076] line-through">
                      $ 26.88
                    </h5>
                    <h5 className="body-bold text-light_green">$ 24.55</h5>
                  </div>
                  <p className="small-medium text-[#798076] mt-1">
                    $ 1.99/100g
                  </p>
                </div>
                <button className="border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out p-2">
                  <BsFillBasket2Fill className="text-green hover:text-white text-xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-10 border-2 border-light-br">
            <div className="relative">
              <Image
                src={"/Raspberries.jpg"}
                alt="Raspberries"
                width={500}
                height={500}
                className="object-cover size-60"
              />
              <div className="absolute bg-white bg-opacity-10 bottom-0 w-60 p-4 flex justify-end">
                <FiHeart className="text-green text-2xl" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="h3-medium mt-4">Raspberries</h3>

              <div className="flex justify-between mt-3 items-center">
                <div>
                  <div className="flex gap-4 items-center">
                    <h5 className="body-bold text-[#798076] line-through">
                      $ 26.88
                    </h5>
                    <h5 className="body-bold text-light_green">$ 24.55</h5>
                  </div>
                  <p className="small-medium text-[#798076] mt-1">
                    $ 1.99/100g
                  </p>
                </div>
                <button className="border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out p-2">
                  <BsFillBasket2Fill className="text-green hover:text-white text-xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-10 border-2 border-light-br">
            <div className="relative">
              <Image
                src={"/Raspberries.jpg"}
                alt="Raspberries"
                width={500}
                height={500}
                className="object-cover size-60"
              />
              <div className="absolute bg-white bg-opacity-10 bottom-0 w-60 p-4 flex justify-end">
                <FiHeart className="text-green text-2xl" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="h3-medium mt-4">Raspberries</h3>

              <div className="flex justify-between mt-3 items-center">
                <div>
                  <div className="flex gap-4 items-center">
                    <h5 className="body-bold text-[#798076] line-through">
                      $ 26.88
                    </h5>
                    <h5 className="body-bold text-light_green">$ 24.55</h5>
                  </div>
                  <p className="small-medium text-[#798076] mt-1">
                    $ 1.99/100g
                  </p>
                </div>
                <button className="border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out p-2">
                  <BsFillBasket2Fill className="text-green hover:text-white text-xl" />
                </button>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <div>
        <RightSideProducts />
      </div>
    </section>
  );
};

export default Products;
