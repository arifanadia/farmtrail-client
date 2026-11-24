import Image from "next/image";
import React from "react";
import { FaLeaf, FaSeedling, FaShieldAlt } from "react-icons/fa";

const highlights = [
  {
    icon: FaLeaf,
    title: "100% Organic",
    desc: "Grown naturally without synthetic chemicals",
  },
  {
    icon: FaSeedling,
    title: "Regenerative Care",
    desc: "Nourishing living soils for future generations",
  },
  {
    icon: FaShieldAlt,
    title: "Direct From Farm",
    desc: "Transparent origin and uncompromised purity",
  },
];

const AboutIntro = () => {
  return (
    <section className="text-white mt-10 lg:mt-16">
      <div className="text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light_green/10 text-light_green border border-light_green/30 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
          <FaSeedling className="text-sm" /> Rooted in Nature • Dedicated to Purity
        </span>
        <h1 className="h3-bold text-3xl sm:text-4xl lg:text-5xl xl:h1-bold text-white tracking-tight leading-tight">
          Cultivating A Healthier Future <br className="hidden sm:inline" />
          From <span className="text-light_green">Farm to Your Table</span>
        </h1>
        <p className="subtle-regular sm:base-regular text-light-2 mt-5 max-w-2xl mx-auto leading-relaxed">
          At FarmTrail, we believe nutritious food starts with living soil and honest hands.
          For over four decades, our community of passionate growers has pioneered sustainable,
          regenerative agriculture—delivering fresh, chemical-free harvests straight to conscious homes.
        </p>

        {/* Highlight Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-dark-1/80 border border-light-br/60 hover:border-light_green/50 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-light_green/10 text-light_green shrink-0 mt-0.5">
                  <Icon className="text-lg" />
                </div>
                <div>
                  <h4 className="base-bold text-white text-sm sm:text-base">{item.title}</h4>
                  <p className="subtle-regular text-light-2 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hero Banner Image */}
        <div className="relative mt-12 rounded-2xl overflow-hidden border border-light-br shadow-2xl group">
          <Image
            src="/about/aboutintro.jpg"
            width={1200}
            height={600}
            alt="FarmTrail sustainable farmland and crops"
            priority
            className="object-cover w-full h-[320px] sm:h-[450px] lg:h-[520px] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Floating badge */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-left bg-dark-2/90 backdrop-blur-md border border-light_green/40 p-4 sm:p-5 rounded-xl max-w-xs sm:max-w-md shadow-lg">
            <p className="text-light_green text-xs font-semibold uppercase tracking-wider">Our Heritage</p>
            <p className="text-white font-medium text-sm sm:text-base mt-1">
              &quot;Treating the earth with respect, so every harvest gives life back to the community.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
