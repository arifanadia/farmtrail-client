'use client'
import Image from "next/image";
import React, { useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBasket2Fill } from "react-icons/bs";
import RightSideProducts from "./RightSideProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/store/features/productsSlice";
import { RootState, AppDispatch } from "../../lib/store/store"; 

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products: {error}</p>;
  }

  return (
    <section className="grid grid-cols-4 gap-12 container mx-auto my-24">
      <div className="col-span-3">
        {/* Top section for sorting */}
        <div className="flex justify-between items-center my-6">
          <span className="uppercase small-medium">Showing 1-9 of {products.length} results</span>
          <div className="relative inline-block">
            <select className="appearance-none px-6 py-3 border border-light-2 rounded-none focus:outline-none focus:border-light_green w-[270px] bg-[#272727] text-white">
              <option value="">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <IoIosArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light_green pointer-events-none" />
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-full p-10 border-2 border-light-br">
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.productName}
                  width={500}
                  height={500}
                  className="object-cover size-60"
                />
                <div className="absolute bg-white bg-opacity-10 bottom-0 w-60 p-4 flex justify-end">
                  <FiHeart className="text-green text-2xl" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="h3-medium mt-4">{product.productName}</h3>

                <div className="flex justify-between mt-3 items-center">
                  <div>
                    <div className="flex gap-4 items-center">
                   
                        <h5 className="body-bold text-[#798076] line-through">
                          ${product.mainPrice.toFixed(2)}
                        </h5>
                     
                      <h5 className="body-bold text-light_green">${product.offerPrice.toFixed(2)}</h5>
                    </div>
                    <p className="small-medium text-[#798076] mt-1">$</p>
                  </div>
                  <button className="border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out p-2">
                    <BsFillBasket2Fill className="text-green hover:text-white text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <RightSideProducts />
      </div>
    </section>
  );
};

export default Products;
