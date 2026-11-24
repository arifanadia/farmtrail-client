import Image from "next/image";
import React from "react";
import { FaCheckCircle, FaAward, FaUsers, FaSeedling } from "react-icons/fa";

const stats = [
  { value: "40+", label: "Years of Heritage", desc: "Sustainably cultivating since 1984" },
  { value: "100%", label: "Certified Organic", desc: "Zero synthetic pesticides or chemicals" },
  { value: "15K+", label: "Acres Protected", desc: "Regenerated soil and natural reserves" },
  { value: "25K+", label: "Happy Families", desc: "Supplied with wholesome farm-fresh food" },
];

const Overview = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      {/* Section Header */}
      <div className="w-full text-center lg:text-left mb-12">
        <span className="subtle-semibold text-light_green uppercase tracking-wider inline-flex items-center gap-2">
          <FaSeedling /> Company Overview
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold lg:w-[65%] mt-2">
          Bridging Traditional Agricultural Wisdom with Modern Organic Science
        </h2>
        <p className="subtle-regular lg:base-regular text-light-2 mt-4 max-w-3xl leading-relaxed">
          FarmTrail was established with a singular, unwavering mission: to restore the bond between people and the land that sustains them. Over four decades, we have evolved into a collective of generational growers who champion sustainable ecology, biological crop protection, and community food sovereignty.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: 5 Cols */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-dark-1/70 border border-light-br/70 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-light_green/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-light_green subtle-semibold uppercase tracking-wider">Our Genesis</span>
            <h3 className="h3-bold text-xl sm:text-2xl mt-2 text-white">
              Rooted in Passion <span className="text-light_green">Since 1984</span>
            </h3>
            <p className="small-regular sm:base-regular text-light-2 mt-3 leading-relaxed">
              What began as a modest 15-acre organic orchard has grown into an interconnected network of regenerative farms. We shun synthetic fertilizers in favor of nutrient-dense composting, biodiverse companion planting, and natural pollinator habitats.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "100% Non-GMO verified heirloom seed stocks",
                "Clean solar-powered irrigation and harvesting",
                "Full harvest-to-doorstep cold-chain transparency",
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-light-1">
                  <FaCheckCircle className="text-light_green shrink-0 text-base" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-8 rounded-2xl overflow-hidden border border-light-br shadow-xl group">
            <Image
              src="/about/overview1.jpg"
              width={600}
              height={600}
              alt="Farmer in organic crop field"
              className="object-cover w-full h-[300px] sm:h-[380px] lg:h-[420px] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-dark-2/90 backdrop-blur-md p-4 rounded-xl border border-light-br/60 flex items-center gap-3">
              <FaAward className="text-light_green text-2xl shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Certified Ecological Excellence</p>
                <p className="text-light-2 text-xs">Pioneering regenerative crop standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 7 Cols */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-dark-1/80 border border-light-br/70 p-6 rounded-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <h3 className="text-light_green text-2xl sm:text-3xl font-bold tracking-tight">
                  {stat.value}
                </h3>
                <h4 className="text-white font-semibold text-xs sm:text-sm mt-1">{stat.label}</h4>
                <p className="text-light-2 text-[11px] sm:text-xs mt-0.5 line-clamp-2">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-dark-1/40 border border-light-br/60 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-light_green/10 text-light_green rounded-xl shrink-0">
                <FaUsers className="text-2xl" />
              </div>
              <div>
                <h4 className="base-bold text-white text-lg">Empowering Growers & Sustaining Communities</h4>
                <p className="small-regular text-light-2 mt-2 leading-relaxed">
                  Every product that carries the FarmTrail seal directly supports local smallholder growers with fair compensation, agronomic education, and advanced biological cultivation tools. By eliminating excessive intermediaries, our crops arrive crisper, more flavorful, and packed with vitality.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 rounded-2xl overflow-hidden border border-light-br shadow-xl group">
            <Image
              src="/about/overview2.jpg"
              width={1000}
              height={600}
              alt="Harvesting fresh organic produce at FarmTrail"
              className="object-cover w-full h-[300px] sm:h-[380px] lg:h-[420px] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-dark-2/90 backdrop-blur-md p-4 rounded-xl border border-light-br/60 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Peak Ripeness Guarantee</p>
                <p className="text-light-2 text-xs">Harvested within 24 hours of dispatch</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-light_green/20 text-light_green text-xs font-semibold border border-light_green/40">
                100% Traceable
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
