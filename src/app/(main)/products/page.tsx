import Products from "@/components/products/Products";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Shop Organic Products | FarmTrail",
  description:
    "Browse our fresh, sustainably farmed organic fruits, dairy, spreads, seeds, and produce straight from local farms.",
};

const Shop = () => {
  return (
    <main className="min-h-screen pt-20 bg-[#161616]">
      {/* Top Banner / Breadcrumb */}
      <div className="relative bg-[#1e1e1e] border-b border-zinc-800 py-6 px-6 lg:px-24">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-light_green">Products Catalog</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
              Organic Farm Store
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Certified Organic &middot; Direct Farm-to-Table</span>
          </div>
        </div>
      </div>

      <Products />
    </main>
  );
};

export default Shop;
