import Link from "next/link";
import React from "react";
import Products from "./Products";

const Shop = () => {
  return (
    <main className="min-h-screen pt-24 ">
      <div className="h-16 w-full flex items-center base-medium gap-8  bg-[#272727] py-4 px-9">
        <Link href={"/"}>Home</Link>
        <Link href={"/Products"} className="text-light_green">Shop</Link>
      </div>
      <Products />
    </main>
  );
};

export default Shop;
