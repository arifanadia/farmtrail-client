import Products from "@/components/products/Products";
import Link from "next/link";
import React from "react";


const Shop = () => {
  return (
    <main className="min-h-screen pt-20 ">
      <div className="h-16 w-full flex items-center base-semibold gap-4 bg-[#272727] py-4 pl-[114px]">
        <Link href={"/"}>Home</Link>
        <div className="border-b-4 border-light-br w-6 mt-1"></div>
        <Link href={"/products"} className="text-light_green">Shop</Link>
      </div>
      <Products />
    </main>
  );
};

export default Shop;
