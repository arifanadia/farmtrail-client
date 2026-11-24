import Link from "next/link";
import React from "react";
import { FaArrowRight, FaShoppingBasket, FaPhoneAlt } from "react-icons/fa";

const AboutCTA = () => {
  return (
    <section className="my-16 lg:my-24 text-white">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#172e19] via-dark-1 to-[#152317] border border-light_green/30 p-8 sm:p-12 lg:p-16 text-center max-w-6xl mx-auto shadow-2xl">
        {/* Glow backdrop effects */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-light_green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light_green/20 text-light_green border border-light_green/40 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Taste The Organic Difference
          </span>

          <h2 className="h3-bold text-2xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-tight">
            Ready to Bring Pure, Fresh Farm Produce to Your Table?
          </h2>

          <p className="subtle-regular sm:base-regular text-light-2 max-w-2xl mx-auto leading-relaxed">
            Support regional organic farmers while providing your household with the cleanest, nutrient-dense fruits, vegetables, and natural goods. Harvested fresh, packaged responsibly, and delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-light_green text-black font-semibold text-sm sm:text-base hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <FaShoppingBasket className="text-base" />
              <span>Explore Our Shop</span>
              <FaArrowRight className="text-xs ml-1" />
            </Link>

            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-dark-2/80 text-white font-semibold text-sm sm:text-base border border-light-br hover:border-light_green hover:text-light_green transition-all duration-300"
            >
              <FaPhoneAlt className="text-xs" />
              <span>Partner With Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
